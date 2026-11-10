import { reach } from './goals.js';

// Портфолио: фильтр по категориям, просмотр на весь экран, лёгкий параллакс.
export function initPortfolio() {
  const grid = document.querySelector('[data-works]');
  if (!grid) return;
  const works = Array.from(grid.querySelectorAll('[data-work]'));

  // ---- фильтры ----
  const bar = document.querySelector('[data-filters]');
  if (bar) {
    bar.hidden = false;
    bar.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      const f = b.getAttribute('data-filter');
      bar.querySelectorAll('[data-filter]').forEach((x) => { const on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', String(on)); });
      works.forEach((w) => { w.hidden = !(f === 'all' || w.getAttribute('data-cat') === f); });
      grid.classList.remove('is-filtering'); void grid.offsetWidth; grid.classList.add('is-filtering');
      grid.querySelectorAll('[data-reveal]').forEach((r) => r.classList.add('is-in'));
    });
  }
  const visible = () => works.filter((w) => !w.hidden);

  // ---- просмотр ----
  const lb = document.querySelector('[data-lightbox]');
  const img = lb && lb.querySelector('[data-lb-img]');
  const cap = lb && lb.querySelector('[data-lb-cap]');
  const count = lb && lb.querySelector('[data-lb-count]');
  let list = [], idx = 0, opener = null;
  const pad = (n) => (n < 10 ? '0' : '') + n;
  const show = (i) => {
    idx = (i + list.length) % list.length;
    const b = list[idx].querySelector('[data-open]');
    img.src = b.getAttribute('data-full');
    img.alt = b.getAttribute('data-alt') || '';
    const t = b.getAttribute('data-title'), n = b.getAttribute('data-note');
    cap.textContent = [t, n].filter(Boolean).join(' — ');
    count.textContent = pad(idx + 1) + ' / ' + pad(list.length);
    // следующий кадр подгружаем заранее
    const nx = list[(idx + 1) % list.length].querySelector('[data-open]'); if (nx) { const pre = new Image(); pre.src = nx.getAttribute('data-full'); }
  };
  const open = (btn) => {
    if (!lb || typeof lb.showModal !== 'function') { window.open(btn.getAttribute('data-full'), '_blank', 'noopener'); return; }
    list = visible(); opener = btn;
    const i = list.indexOf(btn.closest('[data-work]'));
    show(i < 0 ? 0 : i);
    lb.showModal(); document.body.classList.add('lb-open');
    reach('portfolio_open');
  };
  const close = () => { if (lb.open) lb.close(); };
  if (lb) {
    grid.addEventListener('click', (e) => { const b = e.target.closest('[data-open]'); if (b) open(b); });
    lb.querySelector('[data-lb-close]').addEventListener('click', close);
    lb.querySelector('[data-lb-prev]').addEventListener('click', () => show(idx - 1));
    lb.querySelector('[data-lb-next]').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('close', () => { document.body.classList.remove('lb-open'); if (opener) opener.focus(); });
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    });
  }
}

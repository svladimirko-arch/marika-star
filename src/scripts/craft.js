// Скрипты фирменных анимаций. Тяжёлое — только пока блок в поле зрения; при reduced-motion — статичное финальное состояние.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const raf = (fn) => { let t = false; return () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; fn(); }); } }; };

// Пауза/запуск анимации по видимости (швейная машинка, ткань)
function watch(selector, cls) {
  document.querySelectorAll(selector).forEach((el) => {
    if (!('IntersectionObserver' in window)) { el.classList.add(cls); return; }
    new IntersectionObserver((entries) => el.classList.toggle(cls, entries[0].isIntersecting), { threshold: 0.15 }).observe(el);
  });
}

// Вкладки процесса: «для себя» / «для бренда»
function initTabs() {
  const list = document.querySelector('[data-tablist]');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  list.hidden = false;
  const select = (seg, focus) => {
    tabs.forEach((t) => { const on = t.dataset.tab === seg; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
    panels.forEach((p) => { p.hidden = p.dataset.panel !== seg; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t.dataset.tab));
    t.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length].dataset.tab, true); }
      if (e.key === 'Home') select(tabs[0].dataset.tab, true);
      if (e.key === 'End') select(tabs[tabs.length - 1].dataset.tab, true);
    });
  });
  select('private');
}

// Анимации 2–3: прогресс прокрутки через «дорожку» с липкой сценой
function initScrub() {
  const el = document.querySelector('[data-scrub]');
  const frame = el && el.querySelector('[data-scrub-frame]');
  if (!el || !frame || reduce) return;
  const steps = [...el.querySelectorAll('[data-phase]')];
  el.classList.add('is-scrub');
  let last = 0;
  const update = () => {
    const r = el.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const p = total > 0 ? clamp(-r.top / total) : 1;
    const v = { 1: clamp(p / 0.22), 2: clamp((p - 0.22) / 0.14), 3: clamp((p - 0.4) / 0.22), 4: clamp((p - 0.64) / 0.12), 5: clamp((p - 0.8) / 0.2) };
    for (const k in v) frame.style.setProperty('--s' + k, v[k].toFixed(3));
    // Финальный приём, как в hero: готовая вещь уходит ребром и разворачивается уже на клиенте
    frame.style.setProperty('--rf', (-184 * Math.min(v[5], 0.5)).toFixed(2) + 'deg');
    frame.style.setProperty('--rb', (92 - 184 * Math.max(v[5] - 0.5, 0)).toFixed(2) + 'deg');
    const phase = p < 0.22 ? 1 : p < 0.4 ? 2 : p < 0.64 ? 3 : p < 0.8 ? 4 : 5;
    if (phase !== last) { last = phase; steps.forEach((li) => li.classList.toggle('is-active', +li.dataset.phase === phase)); el.dataset.phase = phase; }
  };
  const on = raf(update);
  window.addEventListener('scroll', on, { passive: true });
  window.addEventListener('resize', on);
  update();
}

// Слайдер-сравнение: «шов» между двумя фото тянется указателем или стрелками
function initCompare() {
  document.querySelectorAll('[data-compare]').forEach((el) => {
    const seam = el.querySelector('.compare__seam');
    if (!seam) return;
    const set = (x) => {
      const v = clamp(x, 2, 98);
      el.style.setProperty('--x', v.toFixed(2));
      seam.setAttribute('aria-valuenow', Math.round(v));
    };
    const fromEvent = (e) => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    let drag = false;
    el.addEventListener('pointerdown', (e) => { drag = true; el.setPointerCapture(e.pointerId); fromEvent(e); });
    el.addEventListener('pointermove', (e) => { if (drag) fromEvent(e); });
    ['pointerup', 'pointercancel'].forEach((t) => el.addEventListener(t, () => { drag = false; }));
    seam.addEventListener('keydown', (e) => {
      const cur = parseFloat(el.style.getPropertyValue('--x')) || 50;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); set(cur + (e.key === 'ArrowRight' ? 4 : -4)); }
      if (e.key === 'Home') { e.preventDefault(); set(2); }
      if (e.key === 'End') { e.preventDefault(); set(98); }
    });
  });
}

// Анимация 4: ткань становится объёмной по мере прокрутки
function initFabric() {
  document.querySelectorAll('[data-fabric]').forEach((el) => {
    if (reduce) return;
    const update = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = clamp((vh - r.top) / (vh * 0.9 + r.height * 0.5));
      el.style.setProperty('--amp', (0.1 + 0.9 * p).toFixed(3));
    };
    const on = raf(update);
    window.addEventListener('scroll', on, { passive: true });
    update();
  });
}

// Анимация 5: строчка-навигатор. Прорисовывается по мере прокрутки, точки ведут к разделам.
function initRail() {
  if (window.innerWidth < 1200) return;
  const MAP = { start: 'Старт', choose: 'С чего начнём', philosophy: 'Философия', private: 'Для себя', business: 'Для брендов', process: 'Процесс', transform: 'От чертежа к изделию', portfolio: 'Работы', master: 'Мастер', prices: 'Стоимость', faq: 'Вопросы', contacts: 'Контакты' };
  const secs = Object.keys(MAP).map((id) => document.getElementById(id)).filter(Boolean);
  if (secs.length < 3) return;
  const rail = document.createElement('div');
  rail.className = 'rail'; rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML = '<div class="rail__base"></div><div class="rail__fill"></div>';
  const dots = secs.map((s) => {
    const b = document.createElement('button');
    b.className = 'rail__dot'; b.type = 'button'; b.tabIndex = -1; b.title = MAP[s.id];
    b.addEventListener('click', () => s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }));
    rail.appendChild(b); return b;
  });
  document.body.appendChild(rail);
  const max = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const place = () => secs.forEach((s, i) => { dots[i].style.top = (clamp((s.getBoundingClientRect().top + window.scrollY) / max()) * 100).toFixed(2) + '%'; });
  const update = () => {
    const p = clamp(window.scrollY / max());
    rail.style.setProperty('--p', p.toFixed(4));
    const under = document.elementFromPoint(22, window.innerHeight / 2);
    rail.classList.toggle('on-dark', !!(under && under.closest('.section--dark, .section--burgundy, .scrub, .fabric, .site-footer')));
    dots.forEach((d, i) => d.classList.toggle('is-passed', p * max() + window.innerHeight * 0.4 >= secs[i].getBoundingClientRect().top + window.scrollY));
  };
  const on = raf(update);
  window.addEventListener('scroll', on, { passive: true });
  window.addEventListener('resize', raf(() => { place(); update(); }));
  window.addEventListener('load', () => { place(); update(); });
  place(); update();
}

export function initCraft() {
  watch('[data-fabric]', 'is-live');
  initTabs(); initScrub(); initCompare(); initFabric(); initRail();
}

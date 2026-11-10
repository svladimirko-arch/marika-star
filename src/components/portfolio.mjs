import { html, esc } from '../lib/html.mjs';
import { picture, manifest } from '../lib/images.mjs';
import { portfolio, portfolioCategories } from '../config/images.mjs';

// Блок «Работы». Реальные фото берутся из src/config/images.mjs → portfolio. Ничего не выдумываем:
// пока снимков нет, показывается честное пустое состояние.
const fullSrc = (w) => {
  const m = manifest[w.file];
  if (!m) return '';
  return m.kind === 'svg' ? `/images/${w.file}.svg` : `/images/${w.file}-${m.widths[m.widths.length - 1]}.webp`;
};

const tile = (w, i) => {
  const shape = w.shape || 'std';
  const reveal = i % 2 ? 'mask-x' : 'mask';
  return html`
  <figure class="work work--${esc(shape)}" data-cat="${esc(w.category)}" data-work style="--rd:${(i % 3) * 120}">
    <button class="work__btn" type="button" data-open="${i}" data-full="${esc(fullSrc(w))}" data-alt="${esc(w.alt)}" data-title="${esc(w.title || '')}" data-note="${esc(w.note || '')}" aria-label="Открыть фото: ${esc(w.title || w.alt)}">
      <span class="work__media" data-reveal="${reveal}" style="--rd:${(i % 3) * 120}"><span class="work__par" data-parallax>${picture(w.file, { sizes: '(min-width:900px) 40vw, 92vw' })}</span></span>
    </button>
    ${w.title || w.note ? html`<figcaption class="work__cap"><span class="work__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${w.title ? html`<strong>${esc(w.title)}</strong>` : ''}${w.note ? html`<span>${esc(w.note)}</span>` : ''}</figcaption>` : ''}
  </figure>`;
};

const empty = () => html`
  <div class="works-empty" data-reveal>
    <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true" focusable="false"><path d="M18 96V30l42-14 42 14v66l-42-14z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 5"/><path d="M60 16v66" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
    <div>
      <h3>Фотографии работ добавляются</h3>
      <p>Мы показываем только настоящие изделия ателье, поэтому галерея наполняется реальными снимками. А пока — напишите или позвоните, и мы обсудим вашу задачу.</p>
      <a class="btn btn--ghost" href="#order-private" data-goal="cta_click_private" data-cta="portfolio-empty">Обсудить мой заказ</a>
    </div>
  </div>`;

export const portfolioBlock = () => {
  const has = portfolio.length > 0;
  const cats = portfolioCategories.filter((c) => portfolio.some((w) => w.category === c.id));
  return html`
<section class="section works" id="portfolio" aria-labelledby="works-title">
  <div class="container">
    <header class="works__head">
      <p class="eyebrow" data-reveal>Портфолио</p>
      <h2 id="works-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">Работы, которые</span></span>
        <span class="line"><span class="line__in" style="--i:1">можно <em>рассмотреть</em></span></span>
      </h2>
    </header>
    ${has ? html`
    <div class="works__filters" data-filters hidden role="group" aria-label="Категории работ">
      <button type="button" class="chip is-active" data-filter="all" aria-pressed="true">Все</button>
      ${cats.map((c) => html`<button type="button" class="chip" data-filter="${esc(c.id)}" aria-pressed="false">${esc(c.label)}</button>`)}
    </div>
    <div class="works__grid" data-works>${portfolio.map(tile)}</div>
    <dialog class="lightbox" data-lightbox aria-label="Просмотр фотографии">
      <div class="lightbox__bar"><span class="lightbox__count" data-lb-count aria-live="polite"></span><button type="button" class="lightbox__x" data-lb-close aria-label="Закрыть">✕</button></div>
      <button type="button" class="lightbox__nav lightbox__nav--prev" data-lb-prev aria-label="Предыдущее фото">←</button>
      <figure class="lightbox__fig"><img data-lb-img alt="" decoding="async"><figcaption data-lb-cap></figcaption></figure>
      <button type="button" class="lightbox__nav lightbox__nav--next" data-lb-next aria-label="Следующее фото">→</button>
    </dialog>` : empty()}
  </div>
</section>`;
};

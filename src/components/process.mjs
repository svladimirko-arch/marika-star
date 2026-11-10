import { html, esc } from '../lib/html.mjs';
import { stepsPrivate, stepsBusiness } from '../config/services.mjs';
import { compare } from './compare.mjs';

const icon = (inner) => `<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const dot = (x, y) => `<circle cx="${x}" cy="17.5" r="1" fill="currentColor" stroke="none"/>`;
const icons = {
  private: [
    // 01 знакомство: округлый диалог с многоточием
    `<rect x="8" y="9" width="24" height="17" rx="8.5"/><path d="M14.5 26v6.5l6.5-6.5"/>${dot(15.5)}${dot(20)}${dot(24.5)}`,
    // 02 выбор ткани: волны драпировки
    `<path d="M7 13c4.3-3.2 8.7 3.2 13 0s8.7 3.2 13 0"/><path d="M7 20c4.3-3.2 8.7 3.2 13 0s8.7 3.2 13 0"/><path d="M7 27c4.3-3.2 8.7 3.2 13 0s8.7 3.2 13 0"/>`,
    // 03 мерки и лекала: сантиметровая лента дугой с делениями
    `<path d="M8 29a12 12 0 0 1 24 0"/><path d="M8 29h24"/><path d="M20 17v4.5M13.6 19.4l2.3 3.7M26.4 19.4l-2.3 3.7M9.8 24.6l3.9 2.2M30.2 24.6l-3.9 2.2"/>`,
    // 04 пошив и примерка: игла с нитью
    `<path d="M8.5 31.5L27 13"/><ellipse cx="28.6" cy="11.4" rx="2" ry="2.6" transform="rotate(45 28.6 11.4)"/><path d="M28.5 12.5c6.5.5 8.5 6.5 4.5 11s-10.5 3.5-13-1"/>`,
    // 05 готовое изделие: вешалка
    `<path d="M20 6.5a2.6 2.6 0 1 1 2.6 2.6c0 1.5-2.6 1.7-2.6 3.4"/><path d="M20 12.5L8.3 22.3c-1.9 1.6-.8 4.7 1.8 4.7h19.8c2.6 0 3.7-3.1 1.8-4.7z"/><path d="M13.5 27v2.5M26.5 27v2.5" stroke-width="1.2"/>`,
  ],
  business: [
    // 01 техническое задание: документ со сгибом
    `<path d="M11 6h12l7 7v21H11z"/><path d="M23 6v7h7"/><path d="M15.5 20h9M15.5 24.5h9M15.5 29h5.5"/>`,
    // 02 конструирование: циркуль
    `<circle cx="20" cy="8.5" r="2.5"/><path d="M17.9 10.7L11.5 32M22.1 10.7L28.5 32"/><path d="M14.6 23.5h10.8"/><path d="M9.5 29.5a11.5 11.5 0 0 0 21 0" stroke-dasharray="2.5 2.8"/>`,
    // 03 тестовый образец: портновский манекен
    `<path d="M18 4.5h4V8h-4z"/><path d="M18 8c-3 1-4.6 3-4.6 6L12 21.5c0 3.2 3.6 5.5 8 5.5s8-2.3 8-5.5L26.6 14c0-3-1.6-5-4.6-6"/><path d="M20 27v5"/><path d="M13 35.5c0-2 3.1-3.5 7-3.5s7 1.5 7 3.5"/>`,
    // 04 корректировка: карандаш над пунктирной линией правок
    `<path d="M8.5 30.5l1.6-6.2L26 8.7a2.7 2.7 0 0 1 3.8 0l1.7 1.7a2.7 2.7 0 0 1 0 3.8L15.6 29z"/><path d="M24 10.7l4.6 4.6"/><path d="M7 35.5h26" stroke-dasharray="3.5 3.5"/>`,
    // 05 подготовка к партии: слои
    `<path d="M20 7l12 5.5L20 18 8 12.5z"/><path d="M9 19.5l11 5 11-5"/><path d="M9 25.5l11 5 11-5"/>`,
  ],
};

const panel = (seg, steps, label, cta, href) => html`
<div class="proc__panel" id="proc-${seg}" role="tabpanel" aria-labelledby="tab-${seg}" data-panel="${seg}">
  <ol class="steps" data-reveal>
    ${steps.map((s, i) => html`
    <li class="step" style="--i:${i}">
      <span class="step__icon">${icon(icons[seg][i])}</span>
      <span class="step__n" aria-hidden="true">${s.n}</span>
      <h3 class="step__t">${esc(s.title)}</h3>
    </li>`)}
  </ol>
  <a class="btn ${seg === 'private' ? 'btn--accent' : ''}" href="${href}" data-goal="cta_click_${seg}" data-cta="process">${cta}</a>
</div>`;

export const process = () => html`
<section class="section proc" id="process" aria-labelledby="proc-title">
  <div class="container">
    <header class="proc__head">
      <p class="eyebrow" data-reveal>Как создаётся изделие</p>
      <h2 id="proc-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">Пять этапов</span></span>
        <span class="line"><span class="line__in" style="--i:1"><em>от идеи до результата</em></span></span>
      </h2>
    </header>
    ${compare()}
    <div class="proc__tabs" role="tablist" aria-label="Выберите сценарий" data-tablist hidden>
      <button class="proc__tab" role="tab" id="tab-private" aria-controls="proc-private" aria-selected="true" data-tab="private" data-goal="proc_tab_private">Для себя</button>
      <button class="proc__tab" role="tab" id="tab-business" aria-controls="proc-business" aria-selected="false" tabindex="-1" data-tab="business" data-goal="proc_tab_business">Для бренда</button>
    </div>
    <div class="proc__panels" data-tabs>
      ${panel('private', stepsPrivate, 'Для себя', 'Обсудить заказ', '#order-private')}
      ${panel('business', stepsBusiness, 'Для бренда', 'Обсудить проект', '#order-business')}
    </div>
  </div>
</section>`;

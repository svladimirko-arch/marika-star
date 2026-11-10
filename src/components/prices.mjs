import { html, esc } from '../lib/html.mjs';
import { prices, catalog, terms, priceNote, formatPrice } from '../config/prices.mjs';

// Блок «Стоимость»: основные услуги + ориентиры по изделиям + условия оплаты.
const main = (seg, title) => html`
  <div class="price-card" data-reveal>
    <h3>${title}</h3>
    <ul class="price-card__list">
      ${prices.filter((p) => p.segment === seg).map((p) => html`
      <li><span>${esc(p.title)}</span><span class="price-card__dots" aria-hidden="true"></span><strong>от ${formatPrice(p.from)}${p.unit ? html` <small>${esc(p.unit)}</small>` : ''}</strong></li>`)}
    </ul>
  </div>`;

export const pricesBlock = () => html`
<section class="section section--light prices" id="prices" aria-labelledby="prices-title">
  <div class="container">
    <header class="prices__head">
      <p class="eyebrow" data-reveal>Стоимость</p>
      <h2 id="prices-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">Понятные цены,</span></span>
        <span class="line"><span class="line__in" style="--i:1"><em>честные</em> условия</span></span>
      </h2>
    </header>

    <div class="prices__cards">
      ${main('private', 'Для себя')}
      ${main('business', 'Для брендов')}
      <div class="price-card price-card--terms" data-reveal style="--rd:120">
        <h3>Условия</h3>
        <ul class="price-card__list price-card__list--terms">
          <li>${esc(terms.prepayment)}</li>
          <li>${esc(terms.consultation)}</li>
          <li>${esc(terms.documents)}</li>
          <li>${esc(terms.visit)}</li>
        </ul>
        <a class="btn btn--accent" href="#order-private" data-goal="cta_click_private" data-cta="prices">Обсудить мой заказ</a>
      </div>
    </div>

    <div class="prices__catalog" data-reveal>
      <h3 class="prices__subtitle">Ориентиры по изделиям</h3>
      <div class="prices__groups">
        ${catalog.map((g) => html`
        <div class="prices__group">
          <h4>${esc(g.group)}</h4>
          <ul>
            ${g.items.map((it) => html`<li><span>${esc(it.title)}</span><span class="price-card__dots" aria-hidden="true"></span><strong>от ${formatPrice(it.from)}</strong></li>`)}
          </ul>
        </div>`)}
      </div>
      <p class="prices__note">${esc(priceNote)}</p>
    </div>
  </div>
</section>`;

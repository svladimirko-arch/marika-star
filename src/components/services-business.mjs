import { html, esc } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { businessServices } from '../config/services.mjs';
import { prices, formatPrice } from '../config/prices.mjs';

const priceFor = { patterns: 'patterns', samples: 'sample' };
const fromPrice = (id) => { const p = prices.find((x) => x.id === priceFor[id]); return p ? `от ${formatPrice(p.from)}` : ''; };

export const servicesBusiness = () => html`
<section class="section section--dark services services--business" id="business" aria-labelledby="business-title">
  <div class="container biz__grid">
    <div class="biz__intro">
      <p class="eyebrow" data-reveal>Для брендов и дизайнеров</p>
      <h2 id="business-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">От идеи коллекции</span></span>
        <span class="line"><span class="line__in" style="--i:1">до <em>готового изделия</em></span></span>
      </h2>
      <p class="lead" data-reveal style="--rd:160">Лекала, тестовые образцы и пошив небольших партий — в одном ателье, с понятным маршрутом от технического задания до партии.</p>
      <div class="biz__media" data-reveal="mask" style="--rd:200">${picture('business-desk', { sizes: '(min-width:900px) 38vw, 92vw' })}</div>
    </div>
    <div class="biz__list">
      <ol class="biz-services">
        ${businessServices.map((s, i) => html`
        <li class="biz-svc" data-reveal style="--rd:${i * 90}">
          <span class="biz-svc__n" aria-hidden="true">0${i + 1}</span>
          <div class="biz-svc__body"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
          <span class="biz-svc__price">${fromPrice(s.id)}</span>
        </li>`)}
      </ol>
      <aside class="biz__value" data-reveal>
        <p class="eyebrow">Ценность комплексной работы</p>
        <p>Конструирование, тестовый образец, корректировка после примерки и пошив партии собраны в одном месте: модель сначала проверяется на образце, конструкция правится по итогам примерки, и только потом идёт партия.</p>
      </aside>
      <a class="btn" href="#order-business" data-goal="cta_click_business" data-cta="business-services">Обсудить проект</a>
    </div>
  </div>
</section>`;

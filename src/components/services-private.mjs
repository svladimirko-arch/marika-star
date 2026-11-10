import { html, esc } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { privateServices } from '../config/services.mjs';
import { prices, formatPrice } from '../config/prices.mjs';

// Цена показывается, только если для услуги она подтверждена в ТЗ (config/prices.mjs).
const priceFor = { women: 'tailoring', men: 'tailoring', reference: 'tailoring', 'suit-fitting': 'fitting', repair: 'repair' };
const fromPrice = (id) => { const p = prices.find((x) => x.id === priceFor[id]); return p ? `от ${formatPrice(p.from)}` : ''; };

export const servicesPrivate = () => html`
<section class="section services services--private" id="private" aria-labelledby="private-title">
  <div class="container">
    <header class="services__head">
      <p class="eyebrow" data-reveal>Для частных клиентов</p>
      <h2 id="private-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">Индивидуальный подход.</span></span>
        <span class="line"><span class="line__in" style="--i:1"><em>Без готовых шаблонов</em></span></span>
      </h2>
    </header>
    <div class="svc-grid">
      ${privateServices.map((s, i) => html`
      <article class="svc svc--${i + 1}">
        <div class="svc__media" data-reveal="${i % 2 ? 'mask-x' : 'mask'}" style="--rd:${(i % 3) * 140}">${picture(s.image, { sizes: '(min-width:900px) 34vw, 92vw' })}</div>
        <div class="svc__body" data-reveal style="--rd:${160 + (i % 3) * 140}">
          <p class="svc__price">${fromPrice(s.id)}</p>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <a class="link-arrow" href="#order-private" data-goal="cta_click_private" data-cta="service-${s.id}">Обсудить заказ</a>
        </div>
      </article>`)}
    </div>
  </div>
</section>`;

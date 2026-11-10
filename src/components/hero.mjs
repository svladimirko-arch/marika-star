import { html, esc } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';
import { contacts } from '../config/contacts.mjs';

export const hero = () => html`
<div class="hero-track" data-hero-track>
<section class="hero" id="start" aria-labelledby="hero-title" data-hero>
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="hero__brand eyebrow reveal" style="--i:0">MARIKA STAR <span aria-hidden="true">/</span> Atelier <span aria-hidden="true">/</span> Тюмень</p>
      <h1 class="hero__title" id="hero-title">
        <span class="line"><span class="line__in" style="--i:1">Одежда, созданная</span></span>
        <span class="line"><span class="line__in" style="--i:2">точно по вашей <em>фигуре</em></span></span>
      </h1>
      <p class="hero__lead reveal" style="--i:3">Индивидуальный пошив, безупречная посадка и внимание к каждой детали. От первой идеи до готового изделия.</p>
      <div class="hero__cta reveal reveal--last" style="--i:5">
        <a class="btn btn--accent" href="#order-private" data-goal="cta_click_private" data-cta="hero">Обсудить мой заказ</a>
        <a class="link-arrow" href="#portfolio" data-goal="portfolio_open_link">Посмотреть работы</a>
      </div>
      <p class="hero__note reveal" style="--i:5">${esc(contacts.hours)}</p>
    </div>

    <figure class="hero__visual">
      <div class="hero__frame" data-flip-frame>
        <div class="hero__photo" data-flip>
          <div class="hero__face hero__face--front">${picture('hero-woman', { eager: true, sizes: '(min-width:1080px) 46vw, 92vw', cls: 'hero__img' })}</div>
          <div class="hero__face hero__face--back">${picture('hero-girl', { eager: true, sizes: '(min-width:1080px) 46vw, 92vw', cls: 'hero__img' })}</div>
        </div>
      </div>
      <figcaption class="hero__strip" aria-hidden="true">Atelier / Handmade / Pattern design</figcaption>
    </figure>
  </div>

  <!-- пунктир превращается в швейную строчку -->
  <div class="container"><svg class="hero__stitch" viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <line class="stitch-base" x1="0" y1="6" x2="1200" y2="6"/>
    <g class="stitch-clip"><line class="stitch-real" x1="0" y1="6" x2="1200" y2="6"/></g>
  </svg></div>
</section>
</div>`;

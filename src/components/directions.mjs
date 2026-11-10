import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';

const paths = [
  {
    num: '01', seg: 'private', title: 'Для себя', img: 'path-private', href: '#private', cta: 'Индивидуальный пошив',
    text: 'Создаём одежду, которая учитывает ваши пожелания, особенности фигуры и стиль.',
    more: '/individual-tailoring/',
  },
  {
    num: '02', seg: 'business', title: 'Для своего бренда', img: 'path-business', href: '#business', cta: 'Разработка и производство',
    text: 'Помогаем дизайнерам и брендам пройти путь от идеи и конструкции до готового изделия.',
    more: '/production/',
  },
];

export const directions = () => html`
<section class="section section--dark choose" id="choose" aria-labelledby="choose-title">
  <div class="container">
    <header class="choose__head">
      <p class="eyebrow" data-reveal>Выберите направление</p>
      <h2 id="choose-title" data-reveal="lines"><span class="line"><span class="line__in" style="--i:0">С чего <em>начнём?</em></span></span></h2>
    </header>
    <div class="choose__grid">
      ${paths.map((p, i) => html`
      <article class="path path--${p.seg}">
        <div class="path__media" data-reveal="mask" style="--rd:${i * 180}">
          ${picture(p.img, { sizes: '(min-width:900px) 46vw, 92vw', cls: 'path__img' })}
        </div>
        <div class="path__body" data-reveal style="--rd:${300 + i * 180}">
          <span class="path__num" aria-hidden="true">${p.num}</span>
          <h3 class="path__title">${p.title}</h3>
          <p class="path__text">${p.text}</p>
          <div class="path__actions">
            <a class="btn" href="${p.href}" data-goal="cta_click_${p.seg}" data-cta="choose">${p.cta}</a>
          </div>
        </div>
      </article>`)}
    </div>
  </div>
</section>`;

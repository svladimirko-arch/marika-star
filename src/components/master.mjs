import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';

// Блок «Мастер». Только подтверждённые факты из inform/информация.docx.
const facts = [
  { n: '10+', t: 'лет опыта в конструировании и пошиве' },
  { n: '01', t: 'примерки чаще всего достаточно' },
  { n: '100%', t: 'работы — в одной мастерской в центре Тюмени' },
];

const materials = ['Шерсть', 'Хлопок', 'Лён', 'Шёлк', 'Вискоза', 'Трикотаж', 'Атлас', 'Фатин', 'Экокожа', 'Полиэстер'];

export const master = () => html`
<section class="section master" id="master" aria-labelledby="master-title">
  <div class="container master__grid">
    <div class="master__copy">
      <p class="eyebrow" data-reveal>Мастер</p>
      <h2 id="master-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">Marika —</span></span>
        <span class="line"><span class="line__in" style="--i:1">конструктор <em>и портной</em></span></span>
      </h2>
      <p class="lead" data-reveal>Разрабатываю лекала и отшиваю тестовые образцы для брендов и производств, создаю индивидуальный гардероб для частных заказчиков — от одной вещи до коллекции. Готовлю модель к запуску: от вашей идеи до образца, по которому можно шить партию.</p>
      <p data-reveal>Всё в одной мастерской: не нужно искать, где распечатать лекала или отшить образец. Работаю с костюмной группой — пиджаки, костюмы, подгонка по фигуре. Помогу выбрать ткань и фурнитуру, предложу фасон под вашу фигуру.</p>
      <ul class="master__facts">
        ${facts.map((f, i) => html`<li data-reveal style="--rd:${i * 120}"><span class="master__n">${f.n}</span><span>${f.t}</span></li>`)}
      </ul>
      <div class="master__materials" data-reveal>
        <p class="eyebrow">Материалы, с которыми работаю</p>
        <ul>${materials.map((m) => html`<li>${m}</li>`)}</ul>
      </div>
    </div>
    <figure class="master__media" data-reveal="mask" data-parallax-img>
      ${picture('master', { sizes: '(min-width:900px) 42vw, 92vw' })}
      <figcaption class="master__cap" aria-hidden="true">Мастерская · Тюмень, центр</figcaption>
    </figure>
  </div>
</section>`;

import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';

const benefits = [
  { n: '01', t: 'Индивидуальная посадка' },
  { n: '02', t: 'Продуманная конструкция' },
  { n: '03', t: 'Внимание к деталям' },
];

// Блок 3. Философия ателье.
export const philosophy = () => html`
<section class="section section--light philosophy" id="philosophy" aria-labelledby="philo-title">
  <div class="container philosophy__grid">
    <figure class="philosophy__media" data-reveal="mask" data-parallax-img>
      ${picture('philosophy-detail', { sizes: '(min-width:900px) 46vw, 92vw' })}
      <figcaption class="philosophy__cap" aria-hidden="true">Деталь изделия · Collection 01</figcaption>
    </figure>

    <div class="philosophy__copy">
      <p class="eyebrow" data-reveal>Философия ателье</p>
      <h2 id="philo-title" data-reveal>Не просто одежда. Вещь, которая <em>становится вашей</em></h2>
      <p class="lead" data-reveal>Каждая вещь начинается с идеи. Выбор ткани, создание конструкции, точная работа с лекалами и внимание к деталям превращают задумку в изделие, которое идеально подходит именно вам.</p>
      <ul class="philosophy__list">
        ${benefits.map((b, i) => html`<li data-reveal style="--rd:${i * 120}"><span class="philosophy__n">${b.n}</span><span>${b.t}</span></li>`)}
      </ul>
    </div>
  </div>
</section>`;

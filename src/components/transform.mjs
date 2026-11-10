import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';

// Анимации 2 и 3. Лекало прорисовывается, детали собираются в силуэт, силуэт проявляет фото готового изделия.
// Состояние задаётся прогрессом прокрутки: --s1 (чертёж), --s2 (размеры), --s3 (сборка), --s4 (фото).
// Детали заданы в «собранных» координатах; --dx/--dy выносят их в раскладку лекал.
const pieces = [
  // полочки (передние половинки): плечо → центр переда → подол → боковой шов → пройма
  { id: 'f1', d: 'M335 160L400 205V900H205C192 760 182 560 168 350C172 280 178 222 188 185Z', dx: -150, dy: 30, k: 0 },
  { id: 'f2', d: 'M465 160L400 205V900H595C608 760 618 560 632 350C628 280 622 222 612 185Z', dx: 150, dy: 30, k: 0.12 },
  // рукава
  { id: 's1', d: 'M190 190C168 320 155 580 152 855L248 850C252 580 245 330 238 200C222 192 206 189 190 190Z', dx: -190, dy: 60, k: 0.22 },
  { id: 's2', d: 'M610 190C632 320 645 580 648 855L552 850C548 580 555 330 562 200C578 192 594 189 610 190Z', dx: 190, dy: 60, k: 0.3 },
  // лацканы
  { id: 'l1', d: 'M335 165L400 565L350 548L302 295Z', dx: -70, dy: -115, k: 0.42 },
  { id: 'l2', d: 'M465 165L400 565L450 548L498 295Z', dx: 70, dy: -115, k: 0.5 },
  // клапаны карманов
  { id: 'p1', d: 'M195 668h95l-4 26h-92z', dx: -60, dy: 170, k: 0.6 },
  { id: 'p2', d: 'M510 668h95l4 26h-92z', dx: 60, dy: 170, k: 0.68 },
];

const phases = ['Чертёж', 'Детали', 'Сборка', 'Готовое изделие', 'Примерка'];

export const transform = () => html`
<section class="scrub section--dark" id="transform" data-scrub aria-labelledby="scrub-title">
  <div class="scrub__sticky">
    <div class="container scrub__grid">
      <div class="scrub__copy">
        <p class="eyebrow">От чертежа к изделию</p>
        <h2 id="scrub-title">Лекало <em>становится</em> вещью</h2>
        <ol class="scrub__steps" aria-label="Этапы превращения">
          ${phases.map((t, i) => html`<li data-phase="${i + 1}"><span>0${i + 1}</span>${t}</li>`)}
        </ol>
      </div>

      <figure class="scrub__frame" data-scrub-frame>
        <svg class="scrub__svg" viewBox="0 0 800 1000" aria-hidden="true" focusable="false">
          <!-- миллиметровка -->
          <defs><pattern id="sc-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#D8C8B2" stroke-width=".5"/></pattern></defs>
          <rect class="sc-grid" width="800" height="1000" fill="url(#sc-grid)"/>

          <!-- вспомогательные линии: исчезают при сборке -->
          <g class="sc-aux" fill="none" stroke-linecap="round">
            <path class="sc-fold" d="M400 150V920"/>
            <path d="M140 300V800M132 312l8-12 8 12M132 788l8 12 8-12M660 300V800M652 312l8-12 8 12M652 788l8 12 8-12" class="sc-grain"/>
            <path d="M60 700H250M60 688v24M250 688v24" class="sc-dim"/>
            <path d="M550 700H740M550 688v24M740 688v24" class="sc-dim"/>
            <circle class="sc-mark" cx="82" cy="402" r="5"/><circle class="sc-mark" cx="186" cy="336" r="5"/><circle class="sc-mark" cx="52" cy="732" r="5"/>
            <circle class="sc-mark" cx="718" cy="402" r="5"/><circle class="sc-mark" cx="614" cy="336" r="5"/><circle class="sc-mark" cx="748" cy="732" r="5"/>
          </g>

          <!-- детали лекал -->
          ${pieces.map((p) => `<g class="sc-piece" style="--dx:${p.dx};--dy:${p.dy};--k:${p.k}"><path class="sc-out" pathLength="1" d="${p.d}"/></g>`).join('')}
        </svg>

        <span class="sc-label sc-label--fold">Долевая нить</span>
        <span class="sc-label sc-label--dim">Ширина</span>
        <span class="sc-label sc-label--mark">Контрольные отметки</span>

        <div class="scrub__photo" data-flip>
          <div class="scrub__face scrub__face--front">${picture('transform-final', { sizes: '(min-width:900px) 40vw, 80vw' })}</div>
          <div class="scrub__face scrub__face--back">${picture('transform-back', { sizes: '(min-width:900px) 40vw, 80vw' })}</div>
        </div>
      </figure>
    </div>
  </div>
</section>`;

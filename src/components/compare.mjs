import { html } from '../lib/html.mjs';
import { picture } from '../lib/images.mjs';

// Слайдер-сравнение «тогда и сейчас»: фото лежат друг на друге, верхнее обрезано
// clip-path по позиции «шва» (--x, %). Шов тянется мышью/пальцем и стрелками с клавиатуры.
export const compare = () => html`
<figure class="compare" data-compare data-reveal style="--x:50">
  <div class="compare__layer">${picture('machine-vintage', { sizes: '(min-width:1280px) 1140px, 94vw', cls: 'compare__img' })}</div>
  <div class="compare__layer compare__layer--top">${picture('workshop-modern', { sizes: '(min-width:1280px) 1140px, 94vw', cls: 'compare__img' })}</div>
  <div class="compare__seam" role="slider" tabindex="0" aria-label="Сравнение эпох: потяните шов влево или вправо" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
    <span class="compare__handle" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5.5L3.5 12L9 18.5"/><path d="M15 5.5L20.5 12L15 18.5"/></svg></span>
  </div>
  <figcaption class="visually-hidden">Слева — швейная машинка начала XX века с тканью под иглой, справа — современный швейный цех. Перетащите шов, чтобы сравнить.</figcaption>
</figure>`;

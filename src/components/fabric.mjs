import { html } from '../lib/html.mjs';

// Анимация 4. Ткань: мягкие волны, медленный дрейф складок, блик; по мере прокрутки полотно из плоского становится объёмным.
const wave = (cls, base, a, grad, extra = '') => {
  const t = base - a, b = base + a;
  const one = (o) => `C${o + 240} ${t} ${o + 480} ${t} ${o + 720} ${base} S${o + 1200} ${b} ${o + 1440} ${base}`;
  return `<g class="fw ${cls}" ${extra}><path class="fw__p" d="M0 ${base} ${one(0)} ${one(1440).replace(/^/, '')} V400 H0Z" fill="url(#${grad})"/></g>`;
};

export const fabric = () => html`
<section class="fabric section--burgundy" data-fabric aria-label="Ткань">
  <svg class="fabric__waves" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="fw-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B7727B" stop-opacity=".55"/><stop offset="1" stop-color="#773C43" stop-opacity="0"/></linearGradient>
      <linearGradient id="fw-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A525B" stop-opacity=".85"/><stop offset="1" stop-color="#5A2C33" stop-opacity=".2"/></linearGradient>
      <linearGradient id="fw-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A343B"/><stop offset="1" stop-color="#3C1C21"/></linearGradient>
    </defs>
    ${wave('fw--1', 190, 70, 'fw-a')}
    ${wave('fw--2', 240, 60, 'fw-b')}
    ${wave('fw--3', 300, 46, 'fw-c')}
  </svg>
  <div class="fabric__sheen" aria-hidden="true"></div>
  <div class="container fabric__inner">
    <p class="eyebrow eyebrow--light" data-reveal>Fabric / Drape / Fit</p>
    <p class="fabric__line display" data-reveal style="--rd:120">Из плоской ткани — в <em>объёмную</em> форму</p>
  </div>
</section>`;

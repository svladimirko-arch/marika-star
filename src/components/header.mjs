import { html, esc } from '../lib/html.mjs';
import { nav } from '../config/links.mjs';
import { contacts } from '../config/contacts.mjs';

export const logo = (cls = '') => html`<span class="logo ${cls}" aria-label="MARIKA STAR">
  <svg class="logo__mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
    <path d="M16 3 L19 13 L29 16 L19 19 L16 29 L13 19 L3 16 L13 13 Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M16 8 V24 M8 16 H24" stroke="currentColor" stroke-width=".8" stroke-dasharray="1.5 2"/>
  </svg>
  <span class="logo__word">MARIKA <em>STAR</em></span>
</span>`;

export const header = () => html`
<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="site-header__logo" href="/" aria-label="MARIKA STAR — на главную">${logo()}</a>
    <nav class="site-nav" id="site-nav" aria-label="Основная навигация" data-nav>
      <ul class="site-nav__list">
        ${nav.map((i) => html`<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`)}
      </ul>
      <div class="site-nav__foot">
        <a class="site-nav__phone" href="tel:${contacts.phoneTel}" data-goal="click_phone">${esc(contacts.phoneDisplay)}</a>
        <p class="site-nav__hours">${esc(contacts.hours)}</p>
      </div>
    </nav>
    <a class="site-header__phone" href="tel:${contacts.phoneTel}" data-goal="click_phone">${esc(contacts.phoneDisplay)}</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Открыть меню" data-burger>
      <span></span><span></span>
    </button>
  </div>
</header>`;

import { html, esc } from '../lib/html.mjs';
import { logo } from './header.mjs';
import { nav, landings } from '../config/links.mjs';
import { contacts } from '../config/contacts.mjs';
import { site } from '../config/site.mjs';

export const footer = () => html`
<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      ${logo('logo--light')}
      <p class="site-footer__tag">Ателье индивидуального пошива и разработки лекал. ${esc(site.city)}.</p>
    </div>
    <nav aria-label="Навигация в подвале">
      <h2 class="eyebrow eyebrow--light">Разделы</h2>
      <ul>${nav.map((i) => html`<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`)}</ul>
    </nav>
    <nav aria-label="Услуги">
      <h2 class="eyebrow eyebrow--light">Услуги</h2>
      <ul>${landings.map((l) => html`<li><a href="${l.path}">${esc(l.label)}</a></li>`)}</ul>
    </nav>
    <div>
      <h2 class="eyebrow eyebrow--light">Контакты</h2>
      <ul>
        <li>${esc(contacts.address)}</li>
        <li><a href="tel:${contacts.phoneTel}" data-goal="click_phone">${esc(contacts.phoneDisplay)}</a></li>
        <li>${esc(contacts.hours)}</li>
      </ul>
    </div>
  </div>
  <div class="container site-footer__legal">
    <span>© ${new Date().getFullYear()} MARIKA STAR</span>
    <a href="${site.legal.privacyPath}">Политика конфиденциальности</a>
    <a href="${site.legal.consentPath}">Согласие на обработку персональных данных</a>
  </div>
</footer>`;

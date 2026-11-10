import { html, esc } from '../lib/html.mjs';
import { contacts } from '../config/contacts.mjs';
import { site } from '../config/site.mjs';

// Блок «Контакты» + форма заявки. Якоря #order-private / #order-business ведут сюда же:
// скрипт forms.js по хэшу выбирает нужный сегмент в форме.
export const contactsBlock = () => html`
<section class="section section--dark contacts" id="contacts" aria-labelledby="contacts-title">
  <div class="container contacts__grid">
    <div class="contacts__info">
      <p class="eyebrow" data-reveal>Контакты</p>
      <h2 id="contacts-title" data-reveal="lines">
        <span class="line"><span class="line__in" style="--i:0">Обсудим</span></span>
        <span class="line"><span class="line__in" style="--i:1">вашу <em>задачу?</em></span></span>
      </h2>
      <p class="lead" data-reveal>Расскажите, что нужно сшить, подогнать или разработать — отвечу с расчётом стоимости и сроков.</p>
      <ul class="contacts__list" data-reveal>
        <li>
          <span class="contacts__label">Телефон</span>
          <a class="contacts__phone" href="tel:${contacts.phoneTel}" data-goal="click_phone">${esc(contacts.phoneDisplay)}</a>
        </li>
        <li>
          <span class="contacts__label">Адрес</span>
          <span>${esc(contacts.address)}, Центральный район</span>
        </li>
        <li>
          <span class="contacts__label">Часы работы</span>
          <span>${esc(contacts.hours)}</span>
        </li>
      </ul>
      <div class="contacts__actions" data-reveal>
        <a class="btn btn--ghost" href="${contacts.yandexMapsUrl}" target="_blank" rel="noopener" data-goal="click_maps">Показать на карте</a>
        ${contacts.telegramUrl ? html`<a class="btn btn--ghost" href="${esc(contacts.telegramUrl)}" target="_blank" rel="noopener" data-goal="click_telegram">Telegram</a>` : ''}
        ${contacts.maxUrl ? html`<a class="btn btn--ghost" href="${esc(contacts.maxUrl)}" target="_blank" rel="noopener" data-goal="click_max">MAX</a>` : ''}
      </div>
    </div>

    <div class="contacts__form-wrap" data-reveal style="--rd:160">
      <span class="anchor" id="order-private" aria-hidden="true"></span>
      <span class="anchor" id="order-business" aria-hidden="true"></span>
      <form class="lead-form" data-lead-form novalidate>
        <h3 class="lead-form__title">Оставить заявку</h3>
        <div class="lead-form__seg" role="radiogroup" aria-label="Тип заказа">
          <label><input type="radio" name="segment" value="private" checked><span>Для себя</span></label>
          <label><input type="radio" name="segment" value="business"><span>Для бренда</span></label>
        </div>
        <label class="lead-form__field">
          <span>Имя</span>
          <input type="text" name="name" autocomplete="name" placeholder="Как к вам обращаться">
        </label>
        <label class="lead-form__field">
          <span>Телефон <em aria-hidden="true">*</em></span>
          <input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 ___ ___-__-__" required>
        </label>
        <label class="lead-form__field">
          <span>Задача</span>
          <textarea name="message" rows="3" placeholder="Например: подогнать пиджак по фигуре или сшить платье к событию"></textarea>
        </label>
        <input type="text" name="company" class="lead-form__hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn--accent lead-form__submit" type="submit" data-goal="lead_submit">Отправить заявку</button>
        <p class="lead-form__agree">Нажимая кнопку, вы соглашаетесь с <a href="${site.legal.privacyPath}">политикой конфиденциальности</a> и <a href="${site.legal.consentPath}">обработкой персональных данных</a>.</p>
        <p class="lead-form__status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`;

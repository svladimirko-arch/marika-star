import { html } from '../lib/html.mjs';

export default {
  path: '/404.html', file: '404.html', noindex: true, skipSitemap: true,
  title: 'Страница не найдена — MARIKA STAR',
  description: 'Такой страницы нет. Вернитесь на главную страницу ателье MARIKA STAR.',
  body: () => html`
<section class="section"><div class="container">
  <p class="eyebrow">404</p>
  <h1>Эта страница не найдена</h1>
  <p class="lead" style="margin-block:1.5rem 2rem">Возможно, ссылка устарела. Вернитесь на главную.</p>
  <a class="btn" href="/">На главную</a>
</div></section>`,
};

import { readFileSync, existsSync } from 'node:fs';
import { html } from '../lib/html.mjs';

// Реальные тексты кладите в src/legal/privacy.html и src/legal/consent.html (только HTML-содержимое).
// Документы не придумываются: пока файл пуст, показывается пометка.
const read = (name) => {
  const p = new URL(`../legal/${name}.html`, import.meta.url);
  const t = existsSync(p) ? readFileSync(p, 'utf8').trim() : '';
  return t || '<p class="lead">Документ готовится к публикации. Текст будет добавлен владельцем сайта.</p>';
};

const make = (path, name, h1, description) => ({
  path, file: path.slice(1) + 'index.html', noindex: true, priority: 0.1, skipSitemap: true,
  title: `${h1} — MARIKA STAR`, description,
  body: () => html`
<section class="section"><div class="container container--narrow legal">
  <p class="eyebrow">MARIKA STAR</p>
  <h1 class="legal__title">${h1}</h1>
  ${read(name)}
</div></section>`,
});

export const privacy = make('/privacy/', 'privacy', 'Политика конфиденциальности', 'Политика конфиденциальности сайта ателье MARIKA STAR.');
export const consent = make('/consent/', 'consent', 'Согласие на обработку персональных данных', 'Согласие на обработку персональных данных на сайте ателье MARIKA STAR.');

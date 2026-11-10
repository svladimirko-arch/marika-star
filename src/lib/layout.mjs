import { html, esc } from './html.mjs';
import { site } from '../config/site.mjs';
import { contacts } from '../config/contacts.mjs';
import { metrika } from '../config/metrika.mjs';
import { header } from '../components/header.mjs';
import { footer } from '../components/footer.mjs';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap';

const metrikaSnippet = () => !metrika.counterId ? '' : html`
<script>
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
window.__ymId=${Number(metrika.counterId)};
ym(${Number(metrika.counterId)},"init",${JSON.stringify(metrika.options)});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${Number(metrika.counterId)}" style="position:absolute;left:-9999px" alt=""></div></noscript>`;

const jsonLd = () => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: site.name,
  url: site.siteUrl + '/',
  telephone: contacts.phoneTel,
  address: { '@type': 'PostalAddress', addressLocality: 'Тюмень', streetAddress: contacts.addressShort, addressCountry: 'RU' },
});

// page: { path, title, description, h1Hidden?, noindex?, body, bodyClass?, jsonLd? }
export const layout = (page, assets) => {
  const url = site.siteUrl + page.path;
  const og = site.siteUrl + site.ogImage;
  return '<!doctype html>' + html`
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${page.noindex ? '<meta name="robots" content="noindex,follow">' : ''}
<meta name="theme-color" content="${site.themeColor}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<script>document.documentElement.classList.add('js');requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.add('is-ready')})})</script>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${assets.css}">
<script type="application/ld+json">${jsonLd()}</script>
${page.head || ''}
</head>
<body class="${page.bodyClass || ''}">
<a class="skip-link" href="#main">К содержимому</a>
${header()}
<main id="main">${page.body}</main>
${footer()}
<script defer src="${assets.js}"></script>
${metrikaSnippet()}
</body>
</html>`;
};

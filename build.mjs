// Сборка: src/ + public/ → dist/. Без внешних зависимостей, кроме esbuild и sharp (опционально).
import { rm, mkdir, writeFile, cp, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, process.env.RELATIVE ? 'preview' : 'dist');

// Подгружаем esbuild/sharp из проекта, а при отсутствии — из глобального набора инструментов.
const load = (name) => {
  for (const base of [ROOT + '/', '/opt/npm-tools/node_modules/']) {
    try { return createRequire(base)(name); } catch { /* пробуем дальше */ }
  }
  return null;
};

const { layout } = await import('./src/lib/layout.mjs');
const { pages } = await import('./src/pages/_registry.mjs');
const { site } = await import('./src/config/site.mjs');

await rm(DIST, { recursive: true, force: true });
await mkdir(path.join(DIST, 'assets'), { recursive: true });
if (existsSync(path.join(ROOT, 'public'))) await cp(path.join(ROOT, 'public'), DIST, { recursive: true });

// 1. CSS и JS
const esbuild = load('esbuild');
if (!esbuild) throw new Error('Не найден esbuild. Выполните: npm i -D esbuild');
const result = await esbuild.build({
  entryPoints: { main: path.join(ROOT, 'src/styles/main.css'), app: path.join(ROOT, 'src/scripts/main.js') },
  outdir: path.join(DIST, 'assets'), entryNames: '[name]-[hash]', bundle: true, minify: true,
  format: 'iife', target: ['es2020', 'chrome90', 'safari14'], metafile: true, logLevel: 'warning',
});
const out = Object.keys(result.metafile.outputs).map((p) => path.basename(p));
const assets = { css: '/assets/' + out.find((f) => f.endsWith('.css')), js: '/assets/' + out.find((f) => f.endsWith('.js')) };

// 2. Изображения → AVIF/WebP (если есть sharp и исходники)
try {
  const { processImages } = await import('./src/lib/images.mjs');
  await processImages({ ROOT, DIST, sharp: load('sharp') });
} catch (e) {
  if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e;
}

// Режим просмотра без сервера (RELATIVE=1): корневые пути заменяются на относительные,
// чтобы страницы открывались двойным кликом по файлу (file://).
const relativize = (html, file) => {
  const depth = file.split('/').length - 1;
  const prefix = depth ? '../'.repeat(depth) : './';
  return html
    .replace(/(href|src|data-full)="\/(?!\/)([^"#]*)(#[^"]*)?"/g, (_, attr, p, hash = '') => {
      const target = p === '' || p.endsWith('/') ? p + 'index.html' : p;
      return `${attr}="${prefix}${target}${hash}"`;
    })
    .replace(/srcset="([^"]*)"/g, (_, v) => `srcset="${v.replace(/(^|, )\/images\//g, `$1${prefix}images/`)}"`);
};

// 3. Страницы
for (const p of pages) {
  let html = layout({ ...p, body: typeof p.body === 'function' ? p.body() : p.body }, assets);
  if (process.env.RELATIVE) html = relativize(html, p.file);
  const file = path.join(DIST, p.file);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

// 4. sitemap.xml и robots.txt
const urls = pages.filter((p) => !p.noindex && !p.skipSitemap);
const today = new Date().toISOString().slice(0, 10);
await writeFile(path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((p) => `  <url><loc>${site.siteUrl}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority ?? 0.8}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
await writeFile(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`);

console.log(`Сборка готова: ${pages.length} стр. → dist/ (${assets.css}, ${assets.js})`);

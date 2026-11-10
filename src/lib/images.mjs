// Изображения: при сборке растр (jpg/png/webp) → AVIF + WebP трёх размеров, SVG копируется как есть.
// Исходники: src/images/<папка>/<имя>.(jpg|jpeg|png|webp|svg). Имена и папки — в src/config/images.mjs.
import { mkdir, copyFile, readFile, writeFile, stat, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { images, portfolio } from '../config/images.mjs';
import { html, esc } from './html.mjs';

const EXTS = ['avif', 'webp', 'jpg', 'jpeg', 'png', 'svg'];
const WIDTHS = [480, 960, 1600];
export const manifest = {};

const findSource = (ROOT, dir, name) => {
  for (const ext of EXTS) {
    const p = path.join(ROOT, 'src/images', dir, `${name}.${ext}`);
    if (existsSync(p)) return { p, ext };
  }
  return null;
};

// Кэш перекодированных изображений: повторные сборки копируют готовые файлы вместо кодирования.
const CACHE = '.image-cache';

async function cachedVariants({ ROOT, cacheKey, srcStat, files }) {
  // files: ['name-480.avif', ...]; возвращает true, если кэш свежий и полный
  try {
    const meta = JSON.parse(await readFile(path.join(ROOT, CACHE, `${cacheKey}.json`), 'utf8'));
    if (meta.mtimeMs !== srcStat.mtimeMs || meta.size !== srcStat.size) return null;
    for (const f of files) await stat(path.join(ROOT, CACHE, cacheKey, f));
    return meta;
  } catch { return null; }
}

async function saveToCache({ ROOT, cacheKey, srcStat, meta, dir }) {
  await cp(dir, path.join(ROOT, CACHE, cacheKey), { recursive: true });
  await writeFile(path.join(ROOT, CACHE, `${cacheKey}.json`), JSON.stringify({ ...meta, mtimeMs: srcStat.mtimeMs, size: srcStat.size }));
}

export async function processImages({ ROOT, DIST, sharp }) {
  const out = path.join(DIST, 'images');
  await mkdir(out, { recursive: true });
  await mkdir(path.join(ROOT, CACHE), { recursive: true });
  const slots = [
    ...Object.entries(images).map(([name, v]) => [name, v.dir]),
    ...portfolio.filter((w) => !images[w.file]).map((w) => [w.file, 'portfolio']),
  ];
  let encoded = 0, copied = 0;
  for (const [name, dir] of slots) {
    const src = findSource(ROOT, dir, name);
    if (!src) { console.warn(`  ! нет файла для «${name}» (src/images/${dir}/${name}.*)`); continue; }
    if (src.ext === 'svg') {
      const svg = await readFile(src.p, 'utf8');
      const vb = svg.match(/viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) ([\d.]+)"/);
      await copyFile(src.p, path.join(out, `${name}.svg`));
      manifest[name] = { kind: 'svg', w: vb ? +vb[1] : 800, h: vb ? +vb[2] : 1000 };
      continue;
    }
    if (!sharp) throw new Error('Для растровых фото нужен sharp: npm i -D sharp');
    const meta = await sharp(src.p).metadata();
    const srcStat = await stat(src.p);
    const widths = WIDTHS.filter((w) => w < meta.width).concat(meta.width <= WIDTHS.at(-1) ? [meta.width] : [WIDTHS.at(-1)]);
    const files = widths.flatMap((w) => [`${name}-${w}.avif`, `${name}-${w}.webp`]);
    manifest[name] = { kind: 'raster', w: meta.width, h: meta.height, widths };

    // Свежий кэш → просто копируем
    if (await cachedVariants({ ROOT, cacheKey: name, srcStat, files })) {
      await cp(path.join(ROOT, CACHE, name), out, { recursive: true });
      copied++;
      continue;
    }
    // Иначе кодируем во временную папку, затем в кэш и в сборку
    const tmp = path.join(ROOT, CACHE, `${name}.tmp`);
    await mkdir(tmp, { recursive: true });
    for (const w of widths) {
      const img = () => sharp(src.p).rotate().resize({ width: w, withoutEnlargement: true });
      await img().avif({ quality: 55, effort: 2 }).toFile(path.join(tmp, `${name}-${w}.avif`));
      await img().webp({ quality: 78 }).toFile(path.join(tmp, `${name}-${w}.webp`));
    }
    await saveToCache({ ROOT, cacheKey: name, srcStat, meta: {}, dir: tmp });
    await cp(tmp, out, { recursive: true });
    await rm(tmp, { recursive: true, force: true });
    encoded++;
  }
  if (encoded || copied) console.log(`  изображения: закодировано ${encoded}, из кэша ${copied}`);
  // Обложка для соцсетей из главного кадра (заменится автоматически, когда появится реальное фото)
  const hero = findSource(ROOT, 'hero', 'hero-woman');
  if (hero && sharp) {
    const heroStat = await stat(hero.p);
    const ogCache = path.join(ROOT, CACHE, 'og-cover.jpg');
    let fresh = false;
    try {
      const m = JSON.parse(await readFile(path.join(ROOT, CACHE, 'og-cover.json'), 'utf8'));
      fresh = m.mtimeMs === heroStat.mtimeMs && m.size === heroStat.size && existsSync(ogCache);
    } catch { /* нет кэша */ }
    if (!fresh) {
      await sharp(hero.p, hero.ext === 'svg' ? { density: 150 } : {}).resize(1200, 630, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 82 }).toFile(ogCache);
      await writeFile(path.join(ROOT, CACHE, 'og-cover.json'), JSON.stringify({ mtimeMs: heroStat.mtimeMs, size: heroStat.size }));
    }
    await copyFile(ogCache, path.join(out, 'og-cover.jpg'));
  }
}

// <picture> для слота. opts: { sizes, eager, cls, alt }
export function picture(name, opts = {}) {
  const m = manifest[name];
  const cfg = images[name] || portfolio.find((w) => w.file === name) || {};
  const alt = esc(opts.alt ?? cfg.alt ?? '');
  if (!m) return `<div class="img-missing" role="img" aria-label="${alt}"></div>`;
  // loading="lazy" не используем: маски clip-path в reveal-анимациях откладывают lazy-загрузку
  // до открытия маски — фото появлялось рывком. Все кадры лёгкие (AVIF/WebP), грузим сразу.
  const common = `width="${m.w}" height="${m.h}" alt="${alt}" decoding="async"${opts.eager ? ' fetchpriority="high"' : ''}${opts.cls ? ` class="${opts.cls}"` : ''}`;
  if (m.kind === 'svg') return `<img src="/images/${name}.svg" ${common}>`;
  const set = (ext) => m.widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ');
  const sizes = opts.sizes || '100vw';
  return html`<picture>
<source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
<source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
<img src="/images/${name}-${m.widths.at(-1)}.webp" ${common}>
</picture>`;
}

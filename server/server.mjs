// Сервер: раздаёт dist/ и принимает заявки (POST /api/lead).
// Доставка: Telegram-бот (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID) и/или webhook (LEADS_WEBHOOK_URL),
// плюс резервная запись в leads.jsonl. Настройки — в .env (см. .env.example).
import http from 'node:http';
import { readFile, stat, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
// Порт: --port=XXXX / -p XXXX в argv или PORT в окружении.
const argPort = (() => {
  const i = process.argv.findIndex((a) => a === '-p' || a === '--port');
  if (i > -1 && process.argv[i + 1]) return Number(process.argv[i + 1]);
  const eq = process.argv.find((a) => a.startsWith('--port='));
  return eq ? Number(eq.slice(7)) : 0;
})();
const PORT = argPort || Number(process.env.PORT || 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.woff2': 'font/woff2',
};

const SECURITY = {
  'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// --- Заявки ---
const json = (res, code, obj) => {
  res.writeHead(code, { ...SECURITY, 'Content-Type': TYPES['.json'] });
  res.end(JSON.stringify(obj));
};
const readBody = (req, limit = 16 * 1024) => new Promise((resolve, reject) => {
  let size = 0; const chunks = [];
  req.on('data', (c) => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
  req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  req.on('error', reject);
});
const clean = (s, max) => String(s || '').replace(/[\x00-\x1F\x7F]/g, ' ').trim().slice(0, max);

async function notify(lead) {
  const text = [
    'Новая заявка с сайта MARIKA STAR',
    `Тип: ${lead.segment === 'business' ? 'для бренда' : 'для себя'}`,
    lead.name && `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    lead.message && `Задача: ${lead.message}`,
  ].filter(Boolean).join('\n');
  const jobs = [];
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    jobs.push(fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
    }));
  }
  if (process.env.LEADS_WEBHOOK_URL) {
    jobs.push(fetch(process.env.LEADS_WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.LEADS_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEADS_WEBHOOK_SECRET}` } : {}) },
      body: JSON.stringify(lead),
    }));
  }
  await Promise.allSettled(jobs);
}

async function handleLead(req, res) {
  try {
    const raw = await readBody(req);
    const data = JSON.parse(raw || '{}');
    if (clean(data.company, 100)) return json(res, 200, { ok: true }); // honeypot: ботам отвечаем «успехом»
    const lead = {
      at: new Date().toISOString(),
      segment: data.segment === 'business' ? 'business' : 'private',
      name: clean(data.name, 80),
      phone: clean(data.phone, 40),
      message: clean(data.message, 1000),
      page: clean(data.page, 120),
    };
    if (!lead.phone || lead.phone.replace(/\D/g, '').length < 10) return json(res, 400, { ok: false, error: 'phone' });
    await mkdir(ROOT, { recursive: true });
    await appendFile(path.join(ROOT, 'leads.jsonl'), JSON.stringify(lead) + '\n');
    await notify(lead);
    json(res, 200, { ok: true });
  } catch (e) {
    console.error('lead:', e.message);
    json(res, 400, { ok: false });
  }
}

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  let file = path.join(DIST, clean);
  if (!file.startsWith(DIST)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = path.join(file, 'index.html');
    await stat(file);
    return file;
  } catch { return null; }
}

export const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://x');
    if (pathname === '/api/lead') {
      if (req.method !== 'POST') return json(res, 405, { ok: false });
      return await handleLead(req, res);
    }
    const file = await resolveFile(pathname);
    if (!file) {
      res.writeHead(404, { ...SECURITY, 'Content-Type': TYPES['.html'] });
      return res.end(await readFile(path.join(DIST, '404.html')));
    }
    const ext = path.extname(file);
    const immutable = pathname.startsWith('/assets/') || pathname.startsWith('/images/');
    res.writeHead(200, {
      ...SECURITY, 'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    res.end(await readFile(file));
  } catch (e) {
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Внутренняя ошибка сервера');
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

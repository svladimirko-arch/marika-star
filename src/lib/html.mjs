// Мини-шаблонизатор: экранирование и теги-помощники.
export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// html`...` — подставляет значения как есть; для небезопасных данных используйте esc().
export const html = (strings, ...vals) =>
  strings.reduce((out, s, i) => out + s + (vals[i] === undefined || vals[i] === false || vals[i] === null
    ? '' : Array.isArray(vals[i]) ? vals[i].join('') : vals[i]), '');

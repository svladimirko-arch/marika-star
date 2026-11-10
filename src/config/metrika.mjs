// Яндекс Метрика. Номер счётчика берётся из METRIKA_ID (.env). Пусто = счётчик не подключается.
export const metrika = {
  counterId: process.env.METRIKA_ID || '',
  options: { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false },
};

// Идентификаторы целей. Создайте их в Метрике как «JavaScript-событие» с тем же идентификатором.
// Суффикс _private / _business разделяет частных клиентов и бизнес.
export const goals = {
  formStart: (seg) => `form_start_${seg}`,
  formSubmit: (seg) => `form_submit_${seg}`,
  formError: (seg) => `form_error_${seg}`,
  cta: (seg) => `cta_click_${seg}`,
  phone: 'click_phone',
  telegram: 'click_telegram',
  max: 'click_max',
  maps: 'click_maps',
  portfolioOpen: 'portfolio_open',
  pricesView: 'view_prices',
};

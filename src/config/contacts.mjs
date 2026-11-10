// Контакты. Менять только здесь.
const address = 'Тюмень, ул. Харьковская, 57к2';

export const contacts = {
  brand: 'MARIKA STAR',
  address,
  addressShort: 'ул. Харьковская, 57к2',
  phoneDisplay: '8 969 801-00-08',
  phoneTel: '+79698010008',
  hours: 'Пн–Пт, 11:00–19:00 · по предварительной записи',
  // Поиск по адресу на Яндекс Картах (ссылка на организацию — когда будет карточка)
  yandexMapsUrl: 'https://yandex.ru/maps/?text=' + encodeURIComponent(address),
  // Каналы. Пустая строка = кнопка не показывается. Задаются в .env.
  telegramUrl: process.env.TELEGRAM_URL || '',
  maxUrl: process.env.MAX_URL || '',
};

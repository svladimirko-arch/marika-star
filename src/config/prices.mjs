// Ориентировочные цены (по информации владельца, inform/информация.docx). Менять только здесь.
// id используется блоками услуг (services-private / services-business) — не переименовывать.
export const prices = [
  { id: 'fitting',  segment: 'private',  title: 'Подгонка по фигуре',     from: 1000 },
  { id: 'repair',   segment: 'private',  title: 'Ремонт костюмной группы', from: 1500 },
  { id: 'tailoring', segment: 'private', title: 'Пошив изделия',           from: 4000 },
  { id: 'patterns', segment: 'business', title: 'Разработка лекал',        from: 2500 },
  { id: 'sample',   segment: 'business', title: 'Тестовый образец',        from: 3000 },
  { id: 'batches',  segment: 'business', title: 'Производство одежды',     from: 750, unit: 'за единицу' },
];

// Ориентиры по изделиям (каталог из inform/информация.docx).
export const catalog = [
  { group: 'Верхняя одежда', items: [
    { title: 'Пальто', from: 15000 },
  ]},
  { group: 'Деловая одежда', items: [
    { title: 'Пиджак', from: 12000 },
    { title: 'Брюки', from: 35000 },
    { title: 'Рубашка', from: 6000 },
    { title: 'Жилет', from: 7000 },
  ]},
  { group: 'Повседневная одежда', items: [
    { title: 'Платье', from: 7000 },
    { title: 'Футболка', from: 1500 },
    { title: 'Юбка', from: 3500 },
  ]},
  { group: 'Вечерняя и сценическая одежда', items: [
    { title: 'Свадебное платье', from: 15000 },
    { title: 'Вечернее платье', from: 15000 },
    { title: 'Театральный костюм', from: 3000 },
  ]},
  { group: 'Другое', items: [
    { title: 'Установка кнопок, заклёпок и пуговиц', from: 50 },
    { title: 'Подгонка по фигуре, ушивание одежды', from: 1000 },
    { title: 'Изготовление лекал', from: 1500 },
  ]},
];

export const priceNote =
  'Цены ориентировочные. Итоговая стоимость зависит от сложности модели и ткани — напишите, рассчитаю под вашу задачу.';

export const terms = {
  prepayment: 'Предоплата 50%',
  consultation: 'Консультация — 1 000 ₽, при оформлении заказа засчитывается в предоплату',
  documents: 'Чек и договор',
  visit: 'Приём по предварительной записи',
};

export const formatPrice = (n) => n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₽';

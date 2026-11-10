// Навигация. Якоря ведут на главную, поэтому на внутренних страницах работают так же.
export const nav = [
  { label: 'Для себя',  href: '/#private' },
  { label: 'Для брендов', href: '/#business' },
  { label: 'Работы',    href: '/#portfolio' },
  { label: 'Стоимость', href: '/#prices' },
  { label: 'Вопросы',   href: '/#faq' },
  { label: 'Контакты',  href: '/#contacts' },
];

// Рекламные посадочные страницы (каждая — отдельный URL для кампаний Яндекс Директа)
export const landings = [
  { path: '/individual-tailoring/', label: 'Индивидуальный пошив', campaign: 1 },
  { path: '/patterns/',             label: 'Разработка лекал',     campaign: 2 },
  { path: '/production/',           label: 'Пошив для брендов',    campaign: 3 },
  { path: '/clothing-repair/',      label: 'Ремонт и подгонка',    campaign: 4 },
];

// Общие настройки сайта. Значения из .env подставляются при сборке.
export const site = {
  name: 'MARIKA STAR',
  city: 'Тюмень',
  siteUrl: (process.env.SITE_URL || 'https://marika-star.ru').replace(/\/$/, ''),
  locale: 'ru_RU',
  themeColor: '#F4F0E8',
  ogImage: '/images/og-cover.jpg',
  // Юридические документы: вставьте реальные тексты в src/legal/*.html
  // Пока файлы пусты, страницы показывают пометку «документ готовится».
  legal: {
    privacyPath: '/privacy/',
    consentPath: '/consent/',
  },
};

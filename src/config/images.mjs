// Реестр изображений. Файл лежит в src/images/<папка>/<name>.(jpg|png|webp), а при сборке
// превращается в AVIF/WebP нескольких размеров в dist/images/.
// Чтобы заменить заглушку на фото — положите файл с тем же именем (см. README).
// placeholder: true — временная заглушка; когда замените, поставьте false.
export const images = {
  'hero-woman':        { dir: 'hero',      alt: 'Бордовое вечернее платье на портновском манекене', placeholder: false },
  'hero-girl':         { dir: 'hero',      alt: 'Бордовое вечернее платье индивидуального пошива на модели', placeholder: false },
  'path-private':      { dir: 'direction', alt: 'Платье индивидуального пошива на манекене', placeholder: false },
  'path-business':     { dir: 'direction', alt: 'Бумажные лекала с конструктивными линиями на рабочем столе', placeholder: false },
  'philosophy-detail': { dir: 'about',     alt: 'Отработка посадки корсета на манекене', placeholder: false },
  'service-women':     { dir: 'services',  alt: 'Женское платье на вешалке в ателье', placeholder: false },
  'service-men':       { dir: 'services',  alt: 'Мужской пиджак на вешалке с сантиметровой лентой', placeholder: false },
  'service-reference': { dir: 'services',  alt: 'Эскиз платья и референс на доске с образцами ткани', placeholder: false },
  'service-fitting':   { dir: 'services',  alt: 'Пиджак на манекене с меловыми метками и булавками', placeholder: false },
  'service-repair':    { dir: 'services',  alt: 'Ремонт подкладки пиджака: игла, напёрсток, ножницы', placeholder: false },
  'business-desk':     { dir: 'business',  alt: 'Рабочий стол конструктора: лекала, лента, ножницы', placeholder: false },
  'machine-vintage':   { dir: 'process',   alt: 'Швейная машинка начала XX века с тканью под иглой', placeholder: false },
  'workshop-modern':   { dir: 'process',   alt: 'Просторный современный цех по пошиву одежды', placeholder: false },
  'transform-final':   { dir: 'about',     alt: 'Мужской пиджак индивидуального пошива на портновском манекене', placeholder: false },
  'transform-back':    { dir: 'about',     alt: 'Мужской пиджак индивидуального пошива на клиенте ателье', placeholder: false },
  'master':            { dir: 'master',    alt: 'Marika — конструктор и портной ателье MARIKA STAR', placeholder: false },
};

// Портфолио: реальные фото работ из src/images/portfolio/ (фото с моделями используются только здесь).
// Поля: file — имя файла без расширения; category — id из списка ниже; alt — что на фото (по реальному снимку);
// title и note — необязательные подписи; shape — 'tall' | 'wide' | 'std' (форма плитки в галерее).
const real = [
  { file: 'work-01', category: 'women', alt: 'Вечернее платье в пол с пайетками', title: 'Вечернее платье', note: 'Индивидуальный пошив', shape: 'std' },
  { file: 'work-02', category: 'women', alt: 'Красное вечернее платье с акцентными рукавами', title: 'Вечернее платье', note: 'Пошив по меркам', shape: 'tall' },
  { file: 'work-03', category: 'men', alt: 'Мужской костюм индивидуального пошива', title: 'Мужской костюм', note: 'Подгонка по фигуре', shape: 'tall' },
  { file: 'work-04', category: 'women', alt: 'Чёрное платье в пол с контрастным воротником', title: 'Платье в пол', note: 'Индивидуальный пошив', shape: 'tall' },
  { file: 'work-05', category: 'women', alt: 'Чёрное коктейльное платье с объёмным воланом', title: 'Коктейльное платье', note: 'Сложная конструкция', shape: 'tall' },
  { file: 'work-06', category: 'women', alt: 'Серый женский костюм с широкими брюками', title: 'Женский костюм', note: 'Костюмная группа', shape: 'std' },
  { file: 'work-07', category: 'women', alt: 'Розовое платье с отделкой кружевом', title: 'Платье с кружевом', note: 'Пошив по меркам', shape: 'tall' },
  { file: 'work-08', category: 'women', alt: 'Горчичное платье с кружевной отделкой', title: 'Повседневное платье', note: 'Индивидуальный пошив', shape: 'std' },
];

// PORTFOLIO_DEMO=1 — только для проверки вёрстки: подставляет иллюстрации-заглушки. На публикацию не включать.
const demo = [
  { file: 'service-women', category: 'women', alt: 'Демо: женская одежда', title: 'Демо-плитка 1', shape: 'tall' },
  { file: 'service-men', category: 'men', alt: 'Демо: мужская одежда', title: 'Демо-плитка 2', shape: 'std' },
  { file: 'service-reference', category: 'women', alt: 'Демо: по эскизу', title: 'Демо-плитка 3', shape: 'wide' },
  { file: 'service-fitting', category: 'men', alt: 'Демо: подгонка', title: 'Демо-плитка 4', shape: 'std' },
  { file: 'philosophy-detail', category: 'details', alt: 'Демо: деталь', title: 'Демо-плитка 5', shape: 'tall' },
  { file: 'business-desk', category: 'brands', alt: 'Демо: для брендов', title: 'Демо-плитка 6', shape: 'wide' },
  { file: 'service-repair', category: 'details', alt: 'Демо: ремонт', title: 'Демо-плитка 7', shape: 'std' },
];
export const portfolio = process.env.PORTFOLIO_DEMO ? demo : real;

export const portfolioCategories = [
  { id: 'women', label: 'Женская одежда' },
  { id: 'men', label: 'Мужская одежда' },
  { id: 'details', label: 'Детали и обработка' },
  { id: 'brands', label: 'Работы для брендов' },
];

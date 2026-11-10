import { html } from '../lib/html.mjs';
import { hero } from '../components/hero.mjs';
import { directions } from '../components/directions.mjs';
import { philosophy } from '../components/philosophy.mjs';
import { servicesPrivate } from '../components/services-private.mjs';
import { servicesBusiness } from '../components/services-business.mjs';
import { fabric } from '../components/fabric.mjs';
import { process } from '../components/process.mjs';
import { transform } from '../components/transform.mjs';
import { portfolioBlock } from '../components/portfolio.mjs';
import { master } from '../components/master.mjs';
import { pricesBlock } from '../components/prices.mjs';
import { faq } from '../components/faq.mjs';
import { contactsBlock } from '../components/contacts.mjs';

// Главная. Блоки добавляются поэтапно: каждый — отдельный компонент в src/components/.
export default {
  path: '/',
  file: 'index.html',
  title: 'Ателье индивидуального пошива в Тюмени — MARIKA STAR',
  description: 'Индивидуальный пошив одежды в Тюмени, подгонка и ремонт костюмов, разработка лекал и пошив партий для брендов. MARIKA STAR — работа по предварительной записи.',
  priority: 1.0,
  body: () => html`${hero()}${directions()}${philosophy()}${servicesPrivate()}${servicesBusiness()}${fabric()}${process()}${transform()}${portfolioBlock()}${master()}${pricesBlock()}${faq()}${contactsBlock()}`,
};

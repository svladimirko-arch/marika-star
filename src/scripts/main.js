// Точка входа клиентского JS. Модули подключаются по мере появления блоков.
import { initChrome } from './chrome.js';
import { initHero } from './hero.js';
import { initReveal, initImageFade } from './reveal.js';
import { initCraft } from './craft.js';
import { initPortfolio } from './portfolio.js';
import { initGoals } from './goals.js';
import { initForms } from './forms.js';

initChrome();
initHero();
initReveal();
initImageFade();
initCraft();
initPortfolio();
initGoals();
initForms();

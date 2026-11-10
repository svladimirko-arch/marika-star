// Реестр страниц. Чтобы добавить рекламную страницу — создайте файл в src/pages/ и добавьте его сюда.
import home from './home.mjs';
import { privacy, consent } from './legal.mjs';
import notFound from './not-found.mjs';

export const pages = [home, privacy, consent, notFound];

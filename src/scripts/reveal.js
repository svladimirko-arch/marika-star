// Появление элементов при прокрутке. Без IntersectionObserver всё показывается сразу.
export function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (els.length) {
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
  }
}

// Плавное проявление фото по мере загрузки: кадр не «включается» рывком,
// даже если маска блока уже открылась, а картинка ещё декодируется.
export function initImageFade() {
  const imgs = document.querySelectorAll('img:not([data-lb-img])');
  imgs.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) { img.classList.add('is-loaded'); return; }
    img.addEventListener('load', () => img.classList.add('is-loaded'));
    img.addEventListener('error', () => img.classList.add('is-loaded'));
  });
}

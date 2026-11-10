// Перелистывание фото в hero: при скролле кадр сужается, поворачиваясь вокруг вертикальной оси
// (манекен уходит ребром), и разворачивается уже с девушкой в том же платье и положении.
// Десктоп: hero прилипает (sticky) на высоту .hero-track. Мобильные и reduced-motion — статичный кадр.
export function initHero() {
  const track = document.querySelector('[data-hero-track]');
  const flip = document.querySelector('[data-flip]');
  if (!track || !flip) return;
  const ok = window.matchMedia('(prefers-reduced-motion:no-preference)').matches;
  if (!ok) return;
  const wide = () => window.matchMedia('(min-width:1080px)').matches;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let ticking = false;
  const update = () => {
    ticking = false;
    // Десктоп: hero прилипает, дорожка 260svh. Узкие экраны: флип идёт, пока hero уходит за экран.
    const total = wide() ? track.offsetHeight - window.innerHeight : track.offsetHeight * 0.85;
    const p = total > 0 ? clamp(window.scrollY / total, 0, 1) : 0;
    // 0→0.5: front 0→−92° (уходит ребром); 0.5→1: back 92°→0 (разворачивается модель)
    flip.style.setProperty('--rf', (-184 * Math.min(p, 0.5)).toFixed(2) + 'deg');
    flip.style.setProperty('--rb', (92 - 184 * Math.max(p - 0.5, 0)).toFixed(2) + 'deg');
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

// Цели Яндекс Метрики. Если счётчик не подключён (METRIKA_ID пуст), вызовы тихо игнорируются.
export function reach(goal, params) {
  try {
    var id = window.__ymId;
    if (id && typeof window.ym === 'function') window.ym(id, 'reachGoal', goal, params);
  } catch (e) { /* аналитика не должна ломать страницу */ }
}

// Клики по элементам с data-goal (кнопки, телефон, мессенджеры, карта).
export function initGoals() {
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-goal]');
    if (!el) return;
    var g = el.getAttribute('data-goal');
    if (g && g.slice(-5) !== '_link') reach(g);
  });
}

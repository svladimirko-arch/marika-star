// Форма заявки: выбор сегмента по хэшу (#order-private / #order-business), отправка на /api/lead.
import { reach } from './goals.js';

function currentSegment(form) {
  const checked = form.querySelector('input[name="segment"]:checked');
  return checked ? checked.value : 'private';
}

function selectSegmentFromHash(form) {
  const seg = location.hash === '#order-business' ? 'business' : location.hash === '#order-private' ? 'private' : null;
  if (!seg) return;
  const input = form.querySelector(`input[name="segment"][value="${seg}"]`);
  if (input) input.checked = true;
}

async function submitLead(form, status, btn) {
  const data = {
    segment: currentSegment(form),
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim(),
    company: form.company.value, // honeypot: люди его не видят
    page: location.pathname,
  };
  if (!data.phone) {
    status.textContent = 'Укажите телефон — без него мы не сможем связаться.';
    form.phone.focus();
    return;
  }
  btn.disabled = true;
  status.textContent = 'Отправляем…';
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    reach('form_submit_' + data.segment);
    form.reset();
    form.querySelector('input[name="segment"][value="' + data.segment + '"]').checked = true;
    status.textContent = 'Заявка отправлена. Перезвоним, чтобы договориться о времени.';
    status.classList.add('is-ok');
  } catch (e) {
    reach('form_error_' + data.segment);
    status.textContent = 'Не получилось отправить. Позвоните нам — номер указан рядом с формой.';
    status.classList.add('is-error');
  } finally {
    btn.disabled = false;
  }
}

export function initForms() {
  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const btn = form.querySelector('.lead-form__submit');
    let started = false;
    selectSegmentFromHash(form);
    window.addEventListener('hashchange', () => selectSegmentFromHash(form));
    form.addEventListener('input', () => {
      status.textContent = '';
      status.classList.remove('is-ok', 'is-error');
      if (!started) { started = true; reach('form_start_' + currentSegment(form)); }
    });
    form.addEventListener('submit', (e) => { e.preventDefault(); submitLead(form, status, btn); });
  });
}

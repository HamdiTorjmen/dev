const form = document.querySelector('#don-form');
const today = new Date().toISOString().slice(0, 10);
form.elements.donDate.value = today;

const formatDate = (value) => value ? new Intl.DateTimeFormat('fr-FR').format(new Date(`${value}T12:00:00`)) : '—';
const formatMoney = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(value) || 0);
const amountInWords = (value) => {
  const amount = Number(value) || 0;
  if (amount === 0) return 'zéro euro';
  return `${amount.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} euros`;
};

function updatePreview() {
  document.querySelector('[data-preview-association]').textContent = form.elements.association.value || '—';
  document.querySelector('[data-preview-donor]').textContent = form.elements.donor.value || '—';
  document.querySelector('[data-preview-receipt]').textContent = form.elements.receipt.value || '—';
  document.querySelector('[data-preview-date]').textContent = formatDate(form.elements.donDate.value);
  document.querySelector('[data-preview-amount]').textContent = formatMoney(form.elements.amount.value);
  document.querySelector('[data-preview-amount-text]').textContent = amountInWords(form.elements.amount.value);
}

form.addEventListener('input', updatePreview);
form.addEventListener('change', updatePreview);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('[data-status]').textContent = 'Enregistré';
  document.querySelector('.button-accent').textContent = 'Brouillon enregistré';
});
document.querySelector('[data-print]').addEventListener('click', () => window.print());
updatePreview();

const form = document.querySelector('#report-form');
const today = new Date().toISOString().slice(0, 10);
const dateInput = form.elements.date;
const footerDate = document.querySelector('[data-footer-date]');

dateInput.value = today;
footerDate.textContent = new Intl.DateTimeFormat('fr-FR').format(new Date());

const euro = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);

function addEntry(type, label = '', amount = '') {
  const list = document.querySelector(`[data-list="${type}"]`);
  const row = document.createElement('div');
  row.className = 'entry-row';
  row.innerHTML = `<input type="text" placeholder="Libellé" value="${label}" aria-label="Libellé de ${type === 'income' ? 'la recette' : 'la dépense'}" /><input class="entry-amount" type="number" min="0" step="0.01" placeholder="0,00" value="${amount}" aria-label="Montant" /><button class="remove-entry" type="button" aria-label="Supprimer la ligne">×</button>`;
  list.append(row);
  row.querySelector('.entry-amount').addEventListener('input', updateTotals);
  row.querySelector('.remove-entry').addEventListener('click', () => { row.remove(); updateTotals(); });
  updateTotals();
}

function getTotal(type) {
  return [...document.querySelectorAll(`[data-list="${type}"] .entry-amount`)].reduce((total, input) => total + (Number(input.value) || 0), 0);
}

function updateTotals() {
  const income = getTotal('income');
  const expense = getTotal('expense');
  document.querySelector('.total-income').textContent = euro(income);
  document.querySelector('.total-expense').textContent = euro(expense);
  document.querySelector('[data-balance]').textContent = euro((Number(form.elements.opening.value) || 0) + income - expense);
}

document.querySelectorAll('[data-add]').forEach((button) => button.addEventListener('click', () => addEntry(button.dataset.add)));
form.elements.opening.addEventListener('input', updateTotals);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.document-state').innerHTML = '<span class="state-dot"></span>Enregistré';
  document.querySelector('.button-accent').textContent = 'Brouillon enregistré';
});
document.querySelector('[data-print]').addEventListener('click', () => window.print());

addEntry('income');
addEntry('expense');

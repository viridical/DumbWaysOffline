const expenseForm  = document.getElementById('expenseForm');
const nameInput    = document.getElementById('nameInput');
const nominalInput = document.getElementById('nominalInput');
const totalExpense = document.getElementById('totalExpense');
const listExpense  = document.getElementById('listExpense');
const alertError   = document.getElementById('alertError');

const DEFAULT_ERROR = 'Harap Isi Nama dan Pengeluaran!';

let expense = JSON.parse(localStorage.getItem('expense') || '[]');

function renderExpense() {
    listExpense.innerHTML = '';
    let total = 0;

    expense.forEach(function (item, index) {
        const nominal = Number(item.nominal) || 0;
        total += nominal;

        const div = document.createElement('div');
        div.className = 'expense-item d-flex justify-content-between align-items-center mb-2 border-bottom pb-2';
        div.innerHTML = `
            <span class="expense-name">${item.name}</span>
            <div>
                <span class="expense-amount me-2 text-danger fw-semibold">Rp ${nominal.toLocaleString('id-ID')}</span>
                <button class="btn btn-sm btn-danger btn-delete" data-index="${index}">Hapus</button>
            </div>`;
        listExpense.appendChild(div);
    });

    totalExpense.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function saveToLocalStorage() {
    localStorage.setItem('expense', JSON.stringify(expense));
}

function showError(message) {
    alertError.innerText = message;
    alertError.classList.remove('d-none');
}

function hideError() {
    alertError.classList.add('d-none');
    alertError.innerText = DEFAULT_ERROR;
}

expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name    = nameInput.value.trim();
    const nominal = nominalInput.value.trim();

    alertError.innerText = DEFAULT_ERROR;

    if (name === '' || nominal === '') {
        showError(DEFAULT_ERROR);
        return;
    }

    const cleaned = nominal.replace(/[^0-9]/g, '');
    const parsedNominal = parseInt(cleaned) || 0;

    if (parsedNominal <= 0) {
        showError('Nominal harus berupa angka lebih dari 0!');
        return;
    }

    hideError();

    expense.push({ name: name, nominal: parsedNominal });
    saveToLocalStorage();
    renderExpense();

    nameInput.value = '';
    nominalInput.value = '';
    nameInput.focus();
});

listExpense.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.dataset.index;
        expense.splice(index, 1);
        saveToLocalStorage();
        renderExpense();
    }
});

[nameInput, nominalInput].forEach(function (input) {
    input.addEventListener('input', function () {
        hideError();
    });
});

renderExpense();
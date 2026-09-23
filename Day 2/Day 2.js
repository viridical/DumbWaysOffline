const guestForm = document.getElementById('guestForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

guestForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  console.log('Submit fired!', name, message);

  if (!name || !message) return;

  const newMessageHTML = `
    <div class="col-md-6">
      <div class="message-item p-3 bg-white border rounded shadow-sm">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-person-circle text-primary fs-4 me-2"></i>
          <strong>${name}</strong>
        </div>
        <p class="mb-0 text-muted small">${message}</p>
      </div>
    </div>`;

  messageContainer.insertAdjacentHTML('beforeend', newMessageHTML);
  guestForm.reset();
  nameInput.focus();
});
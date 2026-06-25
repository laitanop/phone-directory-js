let name = document.getElementById("name");
let mobile = document.getElementById("mobile");
let email = document.getElementById("email");
let errorMessage = document.getElementById("error-message");
let table = document.getElementsByTagName("table");
let tableBody = document.getElementById("contacts-body");
let searchInput = document.getElementById("search-input");
let contactCount = document.querySelectorAll(".contact-count-display");

/* ── Helpers ─────────────────────────────────────── */
function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic on-theme accent for each avatar based on the name.
const AVATAR_COLORS = [
  "#84b179",
  "#6fa3c9",
  "#c99a6f",
  "#9a7fc9",
  "#c97f9a",
  "#5fb0a0",
];
function avatarColor(fullName) {
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function updateCount() {
  contactCount.forEach((el) => (el.textContent = contacts.length));
}

function createRow(contact) {
  const newRow = document.createElement("tr");
  newRow.className = "contact-row";
  newRow.innerHTML = `
    <td>
      <div class="contact-cell">
        <span class="avatar" style="background:${avatarColor(contact.name)}">${escapeHtml(getInitials(contact.name))}</span>
        <span class="contact-name">${escapeHtml(contact.name)}</span>
      </div>
    </td>
    <td class="mono">${escapeHtml(contact.mobile)}</td>
    <td class="email-cell">${escapeHtml(contact.email)}</td>
    <td class="actions-cell">
      <button class="btn-delete" type="button" aria-label="Delete ${escapeHtml(contact.name)}" title="Delete contact">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </td>`;
  newRow
    .querySelector(".btn-delete")
    .addEventListener("click", () => deleteContact(contact));
  return newRow;
}

function showEmptyState(message) {
  tableBody.innerHTML = `
    <tr class="empty-row">
      <td colspan="4">
        <div class="empty-state">
          <span class="material-symbols-outlined empty-icon">contacts</span>
          <p class="empty-text">${escapeHtml(message)}</p>
        </div>
      </td>
    </tr>`;
}

/* ── Rendering ───────────────────────────────────── */
function getFilteredContacts() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === "") return contacts;
  return contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query) ||
      contact.mobile.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query),
  );
}

function renderContacts() {
  updateCount();
  tableBody.innerHTML = "";

  const list = getFilteredContacts();

  if (list.length === 0) {
    showEmptyState(
      contacts.length === 0
        ? "No contacts yet. Add your first vendor above."
        : "No contacts match your search.",
    );
    return;
  }

  // Newest contacts appear first.
  list.forEach((contact) => tableBody.prepend(createRow(contact)));
}

function deleteContact(contact) {
  const index = contacts.indexOf(contact);
  if (index > -1) {
    contacts.splice(index, 1);
    renderContacts();
  }
}

function search() {
  renderContacts();
}

searchInput.addEventListener("input", renderContacts);

renderContacts();

/* ── Validation ──────────────────────────────────── */
let validateName = () => {
  let isValid = false;
  const regEx1 = /[^a-zA-Z\s]+/;

  if (name.value.trim() === "") {
    errorMessage.textContent = "Name is required";
    errorMessage.style.display = "block";
  } else if (regEx1.test(name.value)) {
    errorMessage.textContent = "Name must contain only letter and spaces";
    errorMessage.style.display = "block";
  } else if (name.value.length > 20) {
    errorMessage.textContent = "Name should be shorten";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    isValid = true;
  }
  return isValid;
};

let validateMobile = () => {
  let isValid = false;
  let onlyNumbers = /^\d+$/;
  if (mobile.value.trim() === "") {
    errorMessage.textContent = "Mobile is required";
    errorMessage.style.display = "block";
  } else if (!onlyNumbers.test(mobile.value)) {
    errorMessage.textContent = "Mobile must contain only numbers.";
    errorMessage.style.display = "block";
  } else if (mobile.value.length != 10) {
    errorMessage.textContent = "Mobile must be only 10 digits";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    isValid = true;
  }
  return isValid;
};

let validateEmail = () => {
  let isValid = false;
  let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]{1,9}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,10}$/;

  if (email.value === "") {
    errorMessage.textContent = "Email is required";
    errorMessage.style.display = "block";
  } else if (!emailRegex.test(email.value)) {
    errorMessage.textContent = "invalid email";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    isValid = true;
  }
  return isValid;
};

let resetInputs = () => {
  name.value = "";
  mobile.value = "";
  email.value = "";
};

function addVendor() {
  if (validateName() && validateMobile() && validateEmail()) {
    contacts.push({
      name: name.value,
      mobile: mobile.value,
      email: email.value,
    });
    // Clear any active search so the newly added contact is visible.
    searchInput.value = "";
    renderContacts();
    resetInputs();
    name.focus();
  }
}

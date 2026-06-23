let name = document.getElementById("name");
let mobile = document.getElementById("mobile");
let email = document.getElementById("email");
let errorMessage = document.getElementById("error-message");
let table = document.getElementsByTagName("table");
let tableBody = document.getElementById("contacts-body");
let searchInput = document.getElementById("search-input");

function renderContacts() {
  contacts.forEach((contact) => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<tr>
              <td>${contact.name}</td>
             <td>${contact.mobile}</td>
             <td>${contact.email}</td>
            </tr>`;
    tableBody.appendChild(newRow);
  });
}

function search() {
  tableBody.innerHTML = "";

  if (searchInput.value === "") {
    renderContacts();
    return;
  }

  let filtered = contacts.filter(
    (contact) => contact.mobile === searchInput.value,
  );

  filtered.forEach((contact) => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.mobile}</td>
      <td>${contact.email}</td>
    `;
    tableBody.appendChild(newRow);
  });
}
renderContacts();
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
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
  <td>${name.value}</td>
  <td>${mobile.value}</td>
  <td>${email.value}</td>
`;
    tableBody.prepend(newRow);
    resetInputs();
  }
}

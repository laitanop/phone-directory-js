let name = document.getElementById("name");
let mobile = document.getElementById("mobile");
let email = document.getElementById("email");
let errorMessage = document.getElementById("error-message");

let validateName = () => {
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
  }
};

let validateMobile = () => {
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
  }
};

let validateEmail = () => {
  let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]{1,9}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,10}$/;

  if (email.value === "") {
    errorMessage.textContent = "Email is required";
    errorMessage.style.display = "block";
  } else if (!emailRegex.test(email.value)) {
    errorMessage.textContent = "invalid email";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
};

function addVendor() {
  validateName();
  validateMobile();
  validateEmail();
  console.log(name.value);
  console.log(mobile.value);
  console.log(email.value);
}

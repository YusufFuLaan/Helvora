const form = document.getElementById("form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const passwordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("confirm-password");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  errorMessage.innerHTML = "";
  document
    .querySelectorAll(".incorrect")
    .forEach((el) => el.classList.remove("incorrect"));

  const errors = signupErrors(
    firstNameInput.value,
    lastNameInput.value,
    passwordInput.value,
    repeatPasswordInput.value,
    emailInput.value
  );

  if (errors.length > 0) {
    errorMessage.innerHTML = errors.join(". ");
    return;
  }

  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  localStorage.setItem("tempUser", JSON.stringify(userData));
  window.location.href = "register_as_a.html";
});

const signupErrors = function (
  firstName,
  lastName,
  password,
  repeatPassword,
  email
) {
  let errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName.trim()) {
    errors.push("First name is required");
    firstNameInput.parentElement.classList.add("incorrect");
  }

  if (!lastName.trim()) {
    errors.push("Last name is required");
    lastNameInput.parentElement.classList.add("incorrect");
  }

  if (!email.trim()) {
    errors.push("Email is required");
    emailInput.parentElement.classList.add("incorrect");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
    emailInput.parentElement.classList.add("incorrect");
  }

  if (!password) {
    errors.push("Password is required");
    passwordInput.parentElement.classList.add("incorrect");
  } else {
    if (password.length <= 4) {
      errors.push("Password must be longer than 4 characters");
      passwordInput.parentElement.classList.add("incorrect");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
      passwordInput.parentElement.classList.add("incorrect");
    }
  }

  if (!repeatPassword) {
    errors.push("Confirm password is required");
    repeatPasswordInput.parentElement.classList.add("incorrect");
  } else if (password !== repeatPassword) {
    errors.push("Passwords do not match");
    repeatPasswordInput.parentElement.classList.add("incorrect");
  }

  return errors;
};

const allInputs = [
  firstNameInput,
  lastNameInput,
  passwordInput,
  repeatPasswordInput,
  emailInput,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      errorMessage.innerHTML = "";
    }
  });
});

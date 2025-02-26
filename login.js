document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("button");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  const clearForm = () => {
    emailInput.value = "";
    passwordInput.value = "";
    emailInput.autocomplete = "off";
    passwordInput.autocomplete = "new-password";
  };

  clearForm();

  window.onpageshow = function (event) {
    if (event.persisted) {
      clearForm();
    }
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const errors = [];

    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");

    if (errors.length > 0) {
      errorMessage.textContent = errors.join(". ");
      return;
    }

    if (!isValidEmail(email)) {
      errorMessage.textContent = "Invalid email format";
      return;
    }

    const user = JSON.parse(localStorage.getItem(email));
    if (!user) {
      errorMessage.textContent = "Account not found. Please sign up first.";
      return;
    }

    if (user.password !== password) {
      errorMessage.textContent = "Invalid email/password combination";
      return;
    }

    // Role-based redirection based on the stored value
    switch (user.role) {
      case "patient_onboarding_screen":
        window.location.href = "register_as_a.html";
        break;
      case "doctors_form":
        window.location.href = "doctors_dashboard.html";
        break;
      case "":
        window.location.href = "admin_dashboard.html"; // Assuming empty value corresponds to admin
        break;
      default:
        errorMessage.textContent = "Invalid account type";
    }

    clearForm(); // Clear form after successful login
  });

  // Email validation
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Clear errors on input
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      errorMessage.textContent = "";
      input.parentElement.classList.remove("invalid");
    });
  });

  // Force clear on page refresh
  if (performance.navigation?.type === 1) {
    sessionStorage.setItem("loginRefresh", "true");
    clearForm();
  }

  // Initialize autocomplete prevention
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
});

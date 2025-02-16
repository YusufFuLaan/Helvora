// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  // Clear inputs and disable autocomplete
  const clearForm = () => {
    emailInput.value = "";
    passwordInput.value = "";
    emailInput.autocomplete = "off";
    passwordInput.autocomplete = "new-password";
  };

  // Clear on initial load
  clearForm();

  // Handle browser history navigation
  window.onpageshow = function (event) {
    if (event.persisted) {
      clearForm();
    }
  };

  // Handle form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    // Get current values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs
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

    // Check user exists
    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
      errorMessage.textContent = "Account not found. Please sign up first.";
      return;
    }

    // Verify credentials
    if (user.password !== password) {
      errorMessage.textContent = "Invalid email/password combination";
      return;
    }

    // Role-based redirection
    if (user.role === "patient") {
      window.location.href = "patient_dashboard.html";
    } else if (user.role === "doctor") {
      if (user.role === "doctors_form") {
        window.location.href = "sign_up.html";
        return;
      }
      window.location.href = "sign_up.html";
    } else if (user.role === "admin") {
      window.location.href = "admin_dashboard.html";
    } else {
      errorMessage.textContent = "Invalid account type";
    }
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
  loginForm.reset();
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
});

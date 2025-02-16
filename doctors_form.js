// doctors_form.js
document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const form = document.querySelector(".form");
  const saveButton = document.querySelector(".button");
  const fileUpload = document.getElementById("fileUpload");
  const fileInput = document.getElementById("photos");
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-container";
  form.prepend(errorContainer);

  // File upload handling
  fileUpload.addEventListener("click", () => fileInput.click());
  fileUpload.addEventListener("dragover", handleDragOver);
  fileUpload.addEventListener("drop", handleFileDrop);

  // Save button handler
  saveButton.addEventListener("click", handleSubmit);

  // Input validation
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.parentElement.classList.remove("invalid");
      errorContainer.textContent = "";
    });
  });

  async function handleSubmit(e) {
    e.preventDefault();
    errorContainer.textContent = "";

    // Basic validation
    const requiredFields = [
      "name",
      "phone",
      "address",
      "email",
      "country",
      "state",
      "clinic-name",
      "clinic-address",
      "education",
      "experience",
      "license",
      "services",
      "working-hours",
      "consultation-fee",
    ];

    let isValid = true;
    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        field.parentElement.classList.add("invalid");
        isValid = false;
      }
    });

    // Phone validation
    const phone = document.getElementById("phone").value;
    if (!/^\d{10,15}$/.test(phone)) {
      showError("Invalid phone number format");
      isValid = false;
    }

    // Email validation
    const email = document.getElementById("email").value;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError("Invalid email format");
      isValid = false;
    }

    // File validation
    if (!fileInput.files.length) {
      showError("Please upload at least one photo");
      isValid = false;
    } else {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      const files = Array.from(fileInput.files);
      if (files.some((file) => !validTypes.includes(file.type))) {
        showError("Only PNG/JPG files allowed");
        isValid = false;
      }
    }

    if (!isValid) return;

    // Prepare doctor data
    const doctorData = {
      personalInfo: {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        country: document.getElementById("country").value,
        state: document.getElementById("state").value,
        photos: await Promise.all(
          Array.from(fileInput.files).map(convertToBase64)
        ),
      },
      clinicInfo: {
        clinicName: document.getElementById("clinic-name").value,
        clinicAddress: document.getElementById("clinic-address").value,
        education: document.getElementById("education").value,
        experience: parseInt(document.getElementById("experience").value, 10),
        license: document.getElementById("license").value,
        services: document.getElementById("services").value.split(","),
      },
      availability: {
        workingHours: document.getElementById("working-hours").value,
        consultationFee: document.getElementById("consultation-fee").value,
      },
    };

    // Save to localStorage
    try {
      const existingUser = JSON.parse(localStorage.getItem(email));
      if (!existingUser) {
        showError("No user found with this email. Please sign up first.");
        return;
      }

      const userData = { ...existingUser, doctorProfile: doctorData };
      localStorage.setItem(email, JSON.stringify(userData));
      window.location.href = "login.html";
    } catch (error) {
      showError("Error saving data. Please try again.");
      console.error("Storage error:", error);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    fileUpload.classList.add("dragover");
  }

  async function handleFileDrop(e) {
    e.preventDefault();
    fileUpload.classList.remove("dragover");
    fileInput.files = e.dataTransfer.files;
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.color = "red";
    errorContainer.style.margin = "10px 0";
  }
});

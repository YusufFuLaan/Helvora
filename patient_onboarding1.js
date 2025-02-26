document.addEventListener("DOMContentLoaded", () => {
  // Select form elements
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const dobInput = document.getElementById("dob");
  const genderSelect = document.getElementById("gender");
  const fileInput = document.getElementById("fileInput");
  const dragDropArea = document.getElementById("dragDropArea");
  const continueButton = document.querySelector(".continue-button");

  // Function to handle file upload
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      dragDropArea.textContent = file.name; // Display the uploaded file name
    }
  }

  // Attach event listener to file input
  fileInput.addEventListener("change", handleFileUpload);

  // Allow drag-and-drop functionality
  dragDropArea.addEventListener("click", () => {
    fileInput.click(); // Trigger file input when drag-drop area is clicked
  });

  // Function to validate form inputs
  function validateForm() {
    const errors = [];
    if (!nameInput.value.trim()) {
      errors.push("Name is required.");
    }
    if (!phoneInput.value.trim()) {
      errors.push("Phone number is required.");
    }
    if (!addressInput.value.trim()) {
      errors.push("Address is required.");
    }
    if (!dobInput.value) {
      errors.push("Date of birth is required.");
    }
    if (!genderSelect.value) {
      errors.push("Gender is required.");
    }

    return errors;
  }

  // Function to store data in localStorage
  function storeData(data) {
    let onboardData = JSON.parse(localStorage.getItem("onboardData")) || {};
    Object.assign(onboardData, data);
    localStorage.setItem("onboardData", JSON.stringify(onboardData));
  }

  // Event listener for the "Continue" button
  continueButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Validate form inputs
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join("\n")); // Display validation errors
      return;
    }

    // Collect form data
    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      address: addressInput.value.trim(),
      dob: dobInput.value,
      gender: genderSelect.value,
      healthRecord: fileInput.files[0] ? fileInput.files[0].name : null,
    };

    // Store form data in localStorage
    storeData(formData);

    // Navigate to the next page
    window.location.href = "patient_onboarding-screen2.html";
  });
});

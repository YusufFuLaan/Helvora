document.addEventListener("DOMContentLoaded", () => {
  // Select form elements
  const chronicConditionRadios = document.querySelectorAll(
    'input[name="chronic-condition"]'
  );
  const surgeryRadios = document.querySelectorAll('input[name="surgery"]');
  const continueButton = document.querySelector(".continue-button");

  // Function to store data in localStorage
  function storeData(data) {
    let onboardData = JSON.parse(localStorage.getItem("onboardData")) || {};
    Object.assign(onboardData, data);
    localStorage.setItem("onboardData", JSON.stringify(onboardData));
  }

  // Event listener for the "Continue" button
  continueButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Collect form data
    const formData = {
      chronicCondition: getSelectedRadioValue(chronicConditionRadios),
      surgeryHistory: getSelectedRadioValue(surgeryRadios),
    };

    // Validate form inputs
    if (!formData.chronicCondition || !formData.surgeryHistory) {
      alert("Please answer all questions before continuing.");
      return;
    }

    // Store form data in localStorage
    storeData(formData);

    // Navigate to the next page
    window.location.href = "patient_onboarding_screen3.html";
  });

  // Helper function to get the value of the selected radio button
  function getSelectedRadioValue(radioGroup) {
    for (const radio of radioGroup) {
      if (radio.checked) {
        return radio.value;
      }
    }
    return null; // No radio button is selected
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".side-bar li, #side-menu li");
  const contentSections = document.querySelectorAll(".content-section");
  const appointmentBtn = document.querySelectorAll(".book-appointment");
  const findDoctorsPage = document.querySelector(
    ".for-doctors-cards-container"
  );
  const confirmBtn = document.querySelector(".confirm-btn-container");
  const appointmentPage2 = document.querySelector(".appointment-screen2");
  const overlayBookNowBtn = document.querySelector(".book-now");
  const aboutDoctors = document.querySelector(".about-doctors");
  const backToFindDoctorsBtn = document.getElementById(
    "back-to-find-doctors-btn"
  );

  if (backToFindDoctorsBtn) {
    backToFindDoctorsBtn.addEventListener("click", function () {
      console.log("Back button clicked!");

      // Show the "Find Doctors" section

      // Hide the "Appointment 2" section

      findDoctorsPage.classList.remove("hiddens");
      appointmentPage2.classList.add("hiddens");
      confirmBtn.classList.add("hiddens");
      backToFindDoctorsBtn.style.display = "none";
    });
  }

  function showContent(targetId) {
    console.log("Target ID:", targetId); // Debugging log
    contentSections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === targetId) {
        section.classList.add("active");
      }
    });
  }
  console.log(`my style`);

  function handleNavigation(e) {
    e.preventDefault();
    const target = e.currentTarget;

    // Normalize the link text
    const normalizedText = target.textContent.trim().replace(/\s+/g, " ");
    const targetId =
      normalizedText.toLowerCase().replace(/ /g, "-") + "-content";

    console.log("Link Text:", normalizedText);
    console.log("Generated Target ID:", targetId);

    navLinks.forEach((link) => link.classList.remove("active"));
    target.classList.add("active");
    showContent(targetId);
  }
  appointmentBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      findDoctorsPage.classList.add("hiddens");
      appointmentPage2.classList.remove("hiddens");
      confirmBtn.classList.remove("hiddens");
      backToFindDoctorsBtn.style.display = "block";
    });
  });
  overlayBookNowBtn.addEventListener("click", function () {
    findDoctorsPage.classList.add("hiddens");
    appointmentPage2.classList.remove("hiddens");
    confirmBtn.classList.remove("hiddens");
    backToFindDoctorsBtn.style.display = "block";
    aboutDoctors.classList.remove("hidden");

    aboutDoctors.classList.add("hidden");
  });

  // Attach event listeners to all relevant links
  navLinks.forEach((link) => {
    if (!link.classList.contains("last")) {
      link.addEventListener("click", handleNavigation);
    }
  });

  // Activate the default section
  document.querySelector(".side-bar li:first-child").classList.add("active");
  document.getElementById("dashboard-content").classList.add("active");

  // Dropdown menu functionality
  const dropDownMenu = document.querySelector(".images");
  const sideMenu = document.getElementById("side-menu");
  const openSide = document.getElementById("image");
  const closeSide = document.getElementById("drop_down");

  closeSide.style.display = "none";

  function forOpening() {
    sideMenu.style.left = "0";
    closeSide.style.display = "block";
  }

  function forClosing() {
    sideMenu.style.left = "-800px";
    openSide.style.display = "block";
    closeSide.style.display = "none";
  }

  openSide.addEventListener("click", forOpening);
  closeSide.addEventListener("click", forClosing);
});

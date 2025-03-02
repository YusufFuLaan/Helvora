console.log(`halo`);

// Select necessary elements
const dropDownMenu = document.querySelector(".images");
const sideMenu = document.getElementById("side-menu");
const openSide = document.getElementById("image");
const closeSide = document.getElementById("drop_down");
const hideDoctor = document.querySelectorAll(".hide-doctors"); // NodeList of elements
const closingOverlay = document.querySelector(".closing-overlay");
const aboutDoctors = document.querySelector(".about-doctors");
const doctorsContainer = document.querySelector(".for-doctors-cards-container");

function forOpening() {
  sideMenu.style.left = "0";
  closeSide.style.display = "block";
}
openSide.addEventListener("click", forOpening);

function forClosing() {
  sideMenu.style.left = "-800px";
  openSide.style.display = "block";
  closeSide.style.display = "none";
}
closeSide.addEventListener("click", forClosing);

const viewBtn = document.querySelectorAll(".view-profile");
viewBtn.forEach((btn) =>
  btn.addEventListener("click", function () {
    console.log(`halo world`);
    aboutDoctors.classList.remove("hidden");
  })
);
closingOverlay.addEventListener("click", function () {
  aboutDoctors.classList.add("hidden");

  hideDoctor.forEach((element) => {
    element.style.display = "";
  });
});
const dropDownPersonalInfo = document.querySelectorAll(
  ".drop-down-personal-info"
);
const personalInfoDisplay = document.querySelectorAll(".parent");
const closeModalProfilePhoto = document.querySelectorAll(".close-modal-image");

dropDownPersonalInfo.forEach((btn) => {
  btn.addEventListener("click", function () {
    personalInfoDisplay.forEach((image) => {
      image.style.display = "grid";
    });
  });
});
closeModalProfilePhoto.forEach((btn) => {
  btn.addEventListener("click", function () {
    personalInfoDisplay.forEach((image) => {
      image.style.display = "none";
    });
  });
});

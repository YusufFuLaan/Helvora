console.log(`halo`);

const dropDownMenu = document.querySelector(".images");
const sideMenu = document.getElementById("side-menu");
const openSide = document.getElementById("image");
const closeSide = document.getElementById("drop_down");

closeSide.style.display = "none";
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

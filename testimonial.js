document.querySelector("#menu").addEventListener("click", function () {
  const menuLinks = document.querySelector(".header-links");
  const icon = document.querySelector(".fa-bars");
  menuLinks.classList.toggle("show");
  icon.classList.toggle("fa-xmark");
});

let heroSlide = document.querySelectorAll(".hero-slide");
let heroSlideBtns = document.querySelectorAll(".heroslide-nav-btn");
let currentSlide = 1;

//js for manual nav
let manualNav = function (manual) {
  heroSlide.forEach((slide) => {
    slide.classList.remove("active");

    heroSlideBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  heroSlide[manual].classList.add("active");
  heroSlideBtns[manual].classList.add("active");
};

heroSlideBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

//Js for autoplay nav
let repeat = function (activeClass) {
  let active = document.getElementsByClassName("active");
  let i = 1;

  let repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active");
      });

      heroSlide[i].classList.add("active");
      heroSlideBtns[i].classList.add("active");
      i++;

      if (heroSlide.length == i) {
        i = 0;
      }
      if (i >= heroSlide.length) {
        return;
      }
      repeater();
    }, 6000);
  };
  repeater();
};
repeat();

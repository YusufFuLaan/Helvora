document.querySelector("#menu").addEventListener("click", function () {
  const menuLinks = document.querySelector(".header-links");
  const icon = document.querySelector(".fa-bars");
  menuLinks.classList.toggle("show");
  icon.classList.toggle("fa-xmark");
});

// Hero Slide------------------------------------------

let heroSlide = document.querySelectorAll(".hero-slide");
let heroSlideBtns = document.querySelectorAll(".heroslide-nav-btn");
let currentSlide = 1;

//hero manual slide
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

//hero autoplay slide
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

// Testimonial Slide------------------------------------------

let testimonialSlide = document.querySelectorAll(".testimonial-slide");
let testimonialSlideBtns = document.querySelectorAll(".testimonial-nav-btn");
let currentsSlide = 1;

//Testimonial manual slide
let manualTestimonialNav = function (manualTestimonial) {
  testimonialSlide.forEach((slide) => {
    slide.classList.remove("tes-active");

    testimonialSlideBtns.forEach((btn) => {
      btn.classList.remove("tes-active");
    });
  });

  testimonialSlide[manualTestimonial].classList.add("tes-active");
  testimonialSlideBtns[manualTestimonial].classList.add("tes-active");
};

testimonialSlideBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualTestimonialNav(i);
    currentsSlide = i;
  });
});

// testimonial autoplay slide
let repeats = function (activeClass) {
  let active = document.getElementsByClassName("tes-active");
  let i = 1;

  let repeaters = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("tes-active");
      });

      testimonialSlide[i].classList.add("tes-active");
      testimonialSlideBtns[i].classList.add("tes-active");
      i++;

      if (testimonialSlide.length == i) {
        i = 0;
      }
      if (i >= testimonialSlide.length) {
        return;
      }
      repeaters();
    }, 6000);
  };
  repeaters();
};
repeats();

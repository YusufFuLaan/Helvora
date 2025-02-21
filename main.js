// Hero Slide-----------------------------------------------------------------------------------------------------------

document.querySelector("#menu").addEventListener("click", function () {
  const menuLinks = document.querySelector(".header-links");
  const icon = document.querySelector(".fa-bars");
  menuLinks.classList.toggle("show");
  icon.classList.toggle("fa-xmark");
});

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

// Services Slide-----------------------------------------------------------------------------------------------------------------

const servicesContainer = document.querySelector(".services-container");

function autoScroll() {
  if (
    servicesContainer.scrollLeft >=
    servicesContainer.scrollWidth - servicesContainer.clientWidth
  ) {
    servicesContainer.scrollLeft = 0; // Instantly reset scroll position to the start
  } else {
    servicesContainer.scrollLeft += 1; // Move forward
  }
}

setInterval(autoScroll, 20); // Adjust speed by changing interval time

// Testimonial Slide---------------------------------------------------------------------------------------------------------------
// Select elements
let testimonialSlides = document.querySelectorAll(".testimonial-slide");
let testimonialNavBtns = document.querySelectorAll(".testimonial-nav-btn");
let prevBtn = document.querySelector(".testimonial-prev");
let nextBtn = document.querySelector(".testimonial-next");
let currentTesSlide = 0; // Track the active slide index

// Function to update slides
function updateTestimonialSlide(index) {
  // Remove active class from all slides and buttons
  testimonialSlides.forEach((slide) => slide.classList.remove("tes-active"));
  testimonialNavBtns.forEach((btn) => btn.classList.remove("tes-active"));

  // Add active class to the current slide and button
  testimonialSlides[index].classList.add("tes-active");
  testimonialNavBtns[index].classList.add("tes-active");
}

// Manual navigation (dots)
testimonialNavBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    currentTesSlide = i;
    updateTestimonialSlide(currentTesSlide);
  });
});

// Next button functionality
nextBtn.addEventListener("click", () => {
  currentTesSlide = (currentTesSlide + 1) % testimonialSlides.length; // Loop forward
  updateTestimonialSlide(currentTesSlide);
});

// Prev button functionality
prevBtn.addEventListener("click", () => {
  currentTesSlide =
    (currentTesSlide - 1 + testimonialSlides.length) % testimonialSlides.length; // Loop backward
  updateTestimonialSlide(currentTesSlide);
});

// Initialize with first slide visible
updateTestimonialSlide(currentTesSlide);

// Partners Slide-----------------------------------------------------------------------------------------------------------------

const partnersContainer = document.querySelector(".partners-ctn");

function autoPartnersScroll() {
  if (
    partnersContainer.scrollLeft >=
    partnersContainer.scrollWidth - partnersContainer.clientWidth
  ) {
    partnersContainer.scrollLeft = 1; // Instantly reset scroll position to the start
  } else {
    partnersContainer.scrollLeft += 1; // Move forward
  }
}

setInterval(autoPartnersScroll, 20); // Adjust speed by changing interval time

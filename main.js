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

// Services Slide-----------------------------------------------------------------------------------------------------

const servicesContainer = document.querySelector(".services-container");

let scrollAmount = 0;
let scrollInterval;
let direction = 1; // 1 for right, -1 for left

function autoScroll() {
  if (servicesContainer.scrollWidth > servicesContainer.clientWidth) {
    scrollInterval = setInterval(() => {
      servicesContainer.scrollLeft += 1.5 * direction; // Adjust speed here

      // Check if it has reached the end, then reverse direction
      if (
        servicesContainer.scrollLeft + servicesContainer.clientWidth >=
        servicesContainer.scrollWidth
      ) {
        direction = -1;
      } else if (servicesContainer.scrollLeft <= 0) {
        direction = 1;
      }
    }, 30); // Adjust interval speed
  }
}

// Start auto-scrolling
autoScroll();

// Stop auto-scroll when user interacts
servicesContainer.addEventListener("mouseenter", () =>
  clearInterval(scrollInterval)
);
servicesContainer.addEventListener("mouseleave", autoScroll);

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

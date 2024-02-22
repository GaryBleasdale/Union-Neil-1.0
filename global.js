// Make navbar fixed on scroll
const navbar = document.body.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    navbar.classList.add("fixed", "w-[100%]", "z-[1]");
    navbar.classList.remove("relative");
  } else {
    navbar.classList.remove("fixed");
    navbar.classList.add("relative");
  }
});

// // Mobile
const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");

hamburgerMenu.addEventListener("click", () => {
  // Toggle classes for visibility and opacity
  mobileMenu.classList.toggle("opacity-100");
  mobileMenu.classList.toggle("opacity-0");

  // Toggle classes for visibility
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("block");

  // Toggle classes for transform
  mobileMenu.classList.toggle("translate-y-full");
  mobileMenu.classList.toggle("translate-y-0");
  document.addEventListener("click", (e) => {
    // Check if the click is outside the mobile menu and the hamburger menu
    if (
      !mobileMenu.contains(e.target) &&
      !hamburgerMenu.contains(e.target) &&
      mobileMenu.classList.contains("translate-y-0")
    ) {
      // Hide the mobile menu
      mobileMenu.classList.toggle("opacity-100");
      mobileMenu.classList.toggle("opacity-0");

      // Toggle classes for visibility
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("block");

      // Toggle classes for transform
      mobileMenu.classList.toggle("translate-y-full");
      mobileMenu.classList.toggle("translate-y-0");
    }
  });
});

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

// Function to toggle mobile menu visibility
function toggleMobileMenu() {
  mobileMenu.classList.toggle("opacity-100");
  mobileMenu.classList.toggle("opacity-0");

  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("block");

  mobileMenu.classList.toggle("translate-y-full");
  mobileMenu.classList.toggle("translate-y-0");
}

// Event listener for the hamburger menu
hamburgerMenu.addEventListener("click", () => {
  toggleMobileMenu();
});

// Event listener for clicking outside the mobile menu
document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !hamburgerMenu.contains(e.target) &&
    mobileMenu.classList.contains("translate-y-0")
  ) {
    toggleMobileMenu();
  }
});

// Prevent the document-level event listener from hiding the menu when it's clicked
mobileMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Add event listeners to links inside the mobile menu to close the menu on click
const menuLinks = mobileMenu.querySelectorAll("a");
for (const link of menuLinks) {
  link.addEventListener("click", () => {
    toggleMobileMenu();
  });
}

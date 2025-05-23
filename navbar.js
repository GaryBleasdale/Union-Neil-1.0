let navbar = document.querySelector("nav");
let mobileMenu = document.querySelector(".mobile-menu");
let latestScrollValue = 0;
let lastMovement = "";

window.addEventListener("scroll", function () {
  if (lastMovement === "up") {
    latestScrollValue = scrollY;
    lastMovement = "";
    return;
  }
  if (scrollY > latestScrollValue) {
    latestScrollValue = scrollY;
    if (window.pageYOffset > 760) {
      navbar.classList.add("hidden");
      mobileMenu.style.display = "none";
      lastMovement = "down";
    }
  } else {
    navbar.classList.remove("hidden");
    lastMovement = "up";
  }
});

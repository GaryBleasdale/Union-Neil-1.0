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
  mobileMenu.classList.toggle("opacity-100");
  mobileMenu.classList.toggle("opacity-0");

  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("block");

  mobileMenu.classList.toggle("translate-y-full");
  mobileMenu.classList.toggle("translate-y-0");
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !hamburgerMenu.contains(e.target) &&
      mobileMenu.classList.contains("translate-y-0")
    ) {
      mobileMenu.classList.toggle("opacity-100");
      mobileMenu.classList.toggle("opacity-0");

      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("block");

      mobileMenu.classList.toggle("translate-y-full");
      mobileMenu.classList.toggle("translate-y-0");
    }
  });
});

// Google Map JS
function initMap() {
  const unionNeilOffice = { lat: -23.5122291, lng: -47.45891 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: unionNeilOffice,
  });
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h3 id="firstHeading" class="firstHeading">Escritório Union Neil</h3>' +
    '<div id="bodyContent">' +
    "<p>Av. Washington Luiz 310, Torre White <br/> Jardim Faculdade, Sorocaba, SP <br/> 18031-000 <br/> <a href='https://goo.gl/maps/Rxa5RgpZ6ukGm8VQ7' target='_blank' style='text-decoration:underline;color:blue'>Abrir no Google Maps</a></p>" +
    "</div>" +
    "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Uluru",
  });
  const marker = new google.maps.Marker({
    position: unionNeilOffice,
    icon: "img/union_neil_pin_80x106_2_65x86.png",
    map: map,
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
}

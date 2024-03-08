// Make navbar fixed on scroll
const navbar = document.body.querySelector(".navbar");
const whatsAppCTA = document.getElementById("whatsapp-cta");
const topNavbar = document.getElementById("top-navbar");
window.addEventListener("scroll", () => {
	if (window.scrollY > 1000) {
		navbar.classList.add("fixed", "w-[100%]", "z-[1]");
		navbar.classList.remove("relative");
		whatsAppCTA.classList.remove("bg-[rgba(72,200,87,0.25)]");
		whatsAppCTA.classList.add("bg-[rgba(72,200,87,0.15)]");
		topNavbar.classList.add("hidden");
	} else {
		navbar.classList.remove("fixed");
		navbar.classList.add("relative");
		whatsAppCTA.classList.add("bg-[rgba(72,200,87,0.25)]");
		whatsAppCTA.classList.remove("bg-[rgba(72,200,87,0.15)]");
		topNavbar.classList.remove("hidden");
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

// Wistia video API
window._wq = window._wq || [];
_wq.push({
	id: "_all",
	onReady: (video) => {
		const initialModal = document.getElementById("initial-modal");
		initialModal.classList.add("hidden");
		const body = document.querySelector("body");
		body.classList.remove("overflow-y-hidden");

		video.bind("play", () => {
			const initialModal = document.getElementById("initial-modal");
			console.log("im", initialModal);
			initialModal.classList.add("hidden");
			console.log("Wistia video has started playing!");
		});

		// You can bind to other events in a similar manner
		// video.bind("pause", function() {
		//   console.log("Wistia video is paused.");
		// });

		// video.bind("end", function() {
		//   console.log("Wistia video has ended.");
		// });
	},
});

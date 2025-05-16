// Make navbar fixed on scroll
const navbar = document.body.querySelector(".navbar");
const whatsAppCTA = document.getElementById("whatsapp-cta");
const topNavbar = document.getElementById("top-navbar");
// window.addEventListener("scroll", () => {
// 	if (window.scrollY > 1900) {
// 		navbar.classList.add("fixed", "w-[100%]", "z-[1]");
// 		navbar.classList.remove("relative");
// 		whatsAppCTA.classList.remove("hidden");
// 		topNavbar.classList.add("hidden");
// 	} else {
// 		navbar.classList.remove("fixed");
// 		navbar.classList.add("relative");
// 		whatsAppCTA.classList.add("hidden");
// 		topNavbar.classList.remove("hidden");
// 	}
// });

// const mobileVideo = document.getElementById("mobile-hero-video");
// const mobilePlaceholder = document.getElementById("mobile-hero-placeholder");
// const desktopVideo = document.getElementById("desktop-hero-video");
// const desktopPlaceholder = document.getElementById("desktop-hero-placeholder");

// mobileVideo.addEventListener("canplaythrough", () => {
// 	mobilePlaceholder.classList.add("hidden");
// 	mobileVideo.classList.remove("hidden");
// });

// desktopVideo.addEventListener("canplaythrough", () => {
// 	desktopPlaceholder.classList.add("hidden");
// 	desktopVideo.classList.remove("hidden");
// });

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

// Lazy load Wistia player
function initWistiaPlayer() {
  const container = document.getElementById('wistia-player-container');
  if (!container) return;
  
  const loadWistia = (e) => {
    console.log(e)
    console.log('hi')
    // Only load once
    container.removeEventListener('click', loadWistia);
    
    // Create Wistia player script
    const wistiaScript1 = document.createElement('script');
    wistiaScript1.src = 'https://fast.wistia.com/player.js';
    wistiaScript1.defer = true;

    const wistiaScript2 = document.createElement('script');
    wistiaScript2.src = 'https://fast.wistia.com/embed/8a0ge966sw.js';
    wistiaScript2.defer = true;
    wistiaScript2.type = 'module';

    
    // Create the player element
    container.innerHTML = `
      <style>
        wistia-player[media-id='8a0ge966sw']:not(:defined) { 
          background-color:black; 
          display: block; 
          padding-top:56.25%; 
          
        }
      </style>
      <wistia-player id="depoimento-wistia" media-id="8a0ge966sw" aspect="1.7777777777777777"></wistia-player>
    `;

    // Add scripts to the document
    document.head.appendChild(wistiaScript1);
    document.head.appendChild(wistiaScript2);
    
    const player = document.getElementById("depoimento-wistia");
    console.log(player)
    player.addEventListener('loaded-data',()=>{
      player.play()
    })

  };
  
  // Add click event listener
  container.addEventListener('click', loadWistia);
}

// Initialize Wistia player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initWistiaPlayer();
  
  // Other existing DOMContentLoaded code...
  const faqItems = document.querySelectorAll(".faq-item");
  for (const item of faqItems) {
    item.addEventListener("click", () => toggleFAQ(item));
  }
});

// Functionality for services section mobile
const chevrons = document.querySelectorAll(".service-title");
for (const chevron of chevrons) {
	chevron.addEventListener("click", () => {
		const chevronIcon = chevron.querySelector("img");
		const serviceContent = chevron.querySelector(".service-card-text");
		chevronIcon.classList.toggle("rotate-180");
		serviceContent.classList.toggle("hidden");
	});
}
function toggleFAQ(element) {
	const answer = element.nextElementSibling;
	const chevronIcon = element.querySelector("img");
	answer.classList.toggle("hidden");
	chevronIcon.classList.toggle("rotate-180");
}

document.addEventListener("DOMContentLoaded", () => {
	const faqItems = document.querySelectorAll(".faq-item");
	for (const item of faqItems) {
		item.addEventListener("click", () => toggleFAQ(item));
	}
});
// // Wistia video API
// window._wq = window._wq || [];
// _wq.push({
// 	id: "_all",
// 	onReady: (video) => {
// 		const initialModal = document.getElementById("initial-modal");
// 		initialModal.classList.add("hidden");
// 		const body = document.querySelector("body");
// 		body.classList.remove("overflow-y-hidden");

// 		video.bind("play", () => {
// 			const initialModal = document.getElementById("initial-modal");
// 			console.log("im", initialModal);
// 			initialModal.classList.add("hidden");
// 			console.log("Wistia video has started playing!");
// 		});

// 		// You can bind to other events in a similar manner
// 		// video.bind("pause", function() {
// 		//   console.log("Wistia video is paused.");
// 		// });

// 		// video.bind("end", function() {
// 		//   console.log("Wistia video has ended.");
// 		// });
// 	},
// });

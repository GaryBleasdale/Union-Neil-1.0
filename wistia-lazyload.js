// Lazy load Wistia player
function initWistiaPlayer() {
  const container = document.getElementById("wistia-player-container");
  if (!container) return;

  const loadWistia = (e) => {
    container.removeEventListener("click", loadWistia);

    const wistiaScript1 = document.createElement("script");
    wistiaScript1.src = "https://fast.wistia.com/player.js";
    wistiaScript1.defer = true;

    const wistiaScript2 = document.createElement("script");
    wistiaScript2.src = "https://fast.wistia.com/embed/8a0ge966sw.js";
    wistiaScript2.defer = true;
    wistiaScript2.type = "module";

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

    document.head.appendChild(wistiaScript1);
    document.head.appendChild(wistiaScript2);

    const player = document.getElementById("depoimento-wistia");
    player.addEventListener("loaded-data", () => {
      player.play();
    });
  };

  container.addEventListener("click", loadWistia);
}

document.addEventListener("DOMContentLoaded", () => {
  initWistiaPlayer();
});

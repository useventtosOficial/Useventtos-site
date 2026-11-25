// ================= PLAYLIST YOUTUBE USEVENTTOS =================
// Link configurado: https://www.youtube.com/watch?v=tQ0yjYUFKAE&list=PLDUAx1zZF7ls0-WrIub5yQV-PaevXAKYj
const YOUTUBE_INITIAL_VIDEO_ID = "tQ0yjYUFKAE";
const YOUTUBE_PLAYLIST_ID = "PLDUAx1zZF7ls0-WrIub5yQV-PaevXAKYj";

let ytPlayer = null;
let isPlaying = false;

const soundBtn = document.getElementById("soundBtn");
const musicDock = document.getElementById("musicDock");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicNextBtn = document.getElementById("musicNextBtn");
const musicStatusText = document.getElementById("musicStatusText");

// Carrega a API oficial do YouTube IFrame
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player("yt-player", {
    height: "1",
    width: "1",
    videoId: YOUTUBE_INITIAL_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      listType: "playlist",
      list: YOUTUBE_PLAYLIST_ID,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

function updateAudioUI(playing) {
  isPlaying = playing;
  if (playing) {
    musicDock.classList.add("playing");
    musicStatusText.textContent = "Som ativo";
    if (soundBtn) soundBtn.textContent = "❚❚ Pausar som";
  } else {
    musicDock.classList.remove("playing");
    musicStatusText.textContent = "Tocar som";
    if (soundBtn) soundBtn.textContent = "♫ Ativar som";
  }
}

function onPlayerReady(event) {
  event.target.setVolume(45);
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    updateAudioUI(true);
  } else if (event.data === YT.PlayerState.PAUSED) {
    updateAudioUI(false);
  }
}

function toggleMusic() {
  if (!ytPlayer || typeof ytPlayer.getPlayerState !== "function") return;
  const state = ytPlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
}

function playNextTrack() {
  if (!ytPlayer || typeof ytPlayer.nextVideo !== "function") return;
  ytPlayer.nextVideo();
}

// Desbloqueio automático na primeira interação do visitante (regra dos navegadores modernos)
function unlockAudioOnFirstInteraction() {
  if (ytPlayer && typeof ytPlayer.getPlayerState === "function") {
    if (ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
      ytPlayer.unMute();
      ytPlayer.playVideo();
    }
  }
  ["click", "touchstart", "scroll", "keydown"].forEach((evt) => {
    window.removeEventListener(evt, unlockAudioOnFirstInteraction);
  });
}

["click", "touchstart", "scroll", "keydown"].forEach((evt) => {
  window.addEventListener(evt, unlockAudioOnFirstInteraction, { once: true, passive: true });
});

if (soundBtn) soundBtn.addEventListener("click", toggleMusic);
if (musicToggleBtn) musicToggleBtn.addEventListener("click", toggleMusic);
if (musicNextBtn) musicNextBtn.addEventListener("click", playNextTrack);

// ================= VISUALIZADOR 360° DO MINI SNEAKER =================
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const TOTAL_FRAMES = 24; // Ajuste conforme a quantidade de arquivos spin-01.webp .. spin-24.webp no repositório
let currentFrame = 1;
let isDragging = false;
let startX = 0;

function setFrame(frame) {
  currentFrame = ((frame - 1 + TOTAL_FRAMES) % TOTAL_FRAMES) + 1;
  const padded = String(currentFrame).padStart(2, "0");
  if (viewerImg) viewerImg.src = `spin-${padded}.webp`;
}

if (viewer) {
  viewer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });
  window.addEventListener("mouseup", () => { isDragging = false; });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 8) {
      setFrame(currentFrame + (dx > 0 ? 1 : -1));
      startX = e.clientX;
    }
  });

  viewer.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  }, { passive: true });
  window.addEventListener("touchend", () => { isDragging = false; });
  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    if (Math.abs(dx) > 8) {
      setFrame(currentFrame + (dx > 0 ? 1 : -1));
      startX = e.touches[0].clientX;
    }
  }, { passive: true });
}

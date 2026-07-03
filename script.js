const popup=document.getElementById("popup");
const closePopup=document.getElementById("closePopup");
const seeSite=document.getElementById("seeSite");
function hidePopup(){popup.classList.remove("show")}
window.addEventListener("load",()=>{setTimeout(()=>popup.classList.add("show"),500);setTimeout(hidePopup,25500)});
closePopup.addEventListener("click",hidePopup);seeSite.addEventListener("click",hidePopup);
popup.addEventListener("click",e=>{if(e.target===popup)hidePopup()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")hidePopup()});
const videos=document.querySelectorAll("video");const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{const v=entry.target;if(entry.isIntersecting){v.play().catch(()=>{})}else{v.pause()}})},{threshold:.35});videos.forEach(v=>observer.observe(v));
const music=document.getElementById("bgMusic");const soundToggle=document.getElementById("soundToggle");const trackSelect=document.getElementById("trackSelect");music.volume=.22;
async function toggleMusic(){try{if(music.paused){await music.play();soundToggle.textContent="Pausar som";soundToggle.classList.add("on")}else{music.pause();soundToggle.textContent="Ativar som";soundToggle.classList.remove("on")}}catch(e){soundToggle.textContent="Arquivo ausente"}}
soundToggle.addEventListener("click",toggleMusic);
trackSelect.addEventListener("change",async()=>{const wasPlaying=!music.paused;music.src=trackSelect.value;music.load();if(wasPlaying){try{await music.play()}catch(e){soundToggle.textContent="Arquivo ausente"}}});

const siteHeader = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) siteHeader.classList.add("scrolled");
  else siteHeader.classList.remove("scrolled");
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) setTimeout(() => preloader.classList.add("hide"), 650);
});


/* POPUP_FINAL_FIX */
(function(){
  const popupFinal = document.getElementById("popup");
  const closeBtnFinal = document.getElementById("closePopup");
  const seeBtnFinal = document.getElementById("seeSite");

  function closeFinalPopup(){
    if (popupFinal) popupFinal.classList.remove("show");
  }

  if (closeBtnFinal) closeBtnFinal.addEventListener("click", closeFinalPopup);
  if (seeBtnFinal) seeBtnFinal.addEventListener("click", closeFinalPopup);

  if (popupFinal) popupFinal.addEventListener("click", (event) => {
    if (event.target === popupFinal) closeFinalPopup();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFinalPopup();
  });
})();

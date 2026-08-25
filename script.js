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

/* ===== VISUALIZADOR 360 USEVENTTOS ===== */
(function(){const img=document.getElementById("viewer360Image"),slider=document.getElementById("viewer360Slider"),viewer=document.getElementById("viewer360");if(!img||!slider||!viewer)return;const totalFrames=24;let frame=1,isDragging=false,startX=0,startFrame=1;function setFrame(nextFrame){frame=((nextFrame-1+totalFrames)%totalFrames)+1;img.src=`sneaker-360-${String(frame).padStart(2,"0")}.jpg`;slider.value=frame}slider.addEventListener("input",()=>setFrame(parseInt(slider.value,10)));viewer.addEventListener("pointerdown",e=>{isDragging=true;startX=e.clientX;startFrame=frame;viewer.setPointerCapture(e.pointerId)});viewer.addEventListener("pointermove",e=>{if(!isDragging)return;setFrame(startFrame+Math.round((e.clientX-startX)/18))});viewer.addEventListener("pointerup",()=>isDragging=false);viewer.addEventListener("pointercancel",()=>isDragging=false);let autoplay=true;setInterval(()=>{if(autoplay&&!isDragging&&document.visibilityState==="visible")setFrame(frame+1)},900);viewer.addEventListener("mouseenter",()=>autoplay=false);viewer.addEventListener("mouseleave",()=>autoplay=true)})();


/* ===== BANNERS USEVENTTOS ===== */
(function(){
  const slider = document.getElementById("campaignSlider");
  if(!slider) return;
  const slides = Array.from(slider.querySelectorAll(".campaign-slide"));
  const prev = slider.querySelector(".campaign-arrow.prev");
  const next = slider.querySelector(".campaign-arrow.next");
  const dotsWrap = slider.querySelector(".campaign-dots");
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para banner ${i+1}`);
    dot.addEventListener("click", () => show(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll("button"));

  function show(i, resetTimer=false){
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    if(resetTimer) restart();
  }
  function restart(){
    clearInterval(timer);
    timer = setInterval(() => show(current+1), 6000);
  }
  prev?.addEventListener("click", () => show(current-1, true));
  next?.addEventListener("click", () => show(current+1, true));
  show(0);
  restart();
})();

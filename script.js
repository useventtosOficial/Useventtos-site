const popup=document.getElementById("popup");
const closePopup=document.getElementById("closePopup");
const seeSite=document.getElementById("seeSite");

function hidePopup(){ popup.classList.remove("show"); }

window.addEventListener("load",()=>{
  setTimeout(()=>popup.classList.add("show"),500);
  setTimeout(hidePopup,25500);
});

closePopup.addEventListener("click",hidePopup);
seeSite.addEventListener("click",hidePopup);
popup.addEventListener("click",e=>{ if(e.target===popup) hidePopup(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") hidePopup(); });

const videos = document.querySelectorAll("video");
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const v = entry.target;
    if(entry.isIntersecting){ v.play().catch(()=>{}); }
    else{ v.pause(); }
  });
},{threshold:.35});
videos.forEach(v=>observer.observe(v));

const music=document.getElementById("bgMusic");
const soundToggle=document.getElementById("soundToggle");
const trackSelect=document.getElementById("trackSelect");
music.volume=.22;

soundToggle.addEventListener("click",async()=>{
  try{
    if(music.paused){
      await music.play();
      soundToggle.textContent="♪ Pausar som";
      soundToggle.classList.add("on");
    } else {
      music.pause();
      soundToggle.textContent="♪ Ativar som";
      soundToggle.classList.remove("on");
    }
  }catch(e){
    soundToggle.textContent="Arquivo ausente";
  }
});

trackSelect.addEventListener("change",async()=>{
  const wasPlaying=!music.paused;
  music.src=trackSelect.value;
  music.load();
  if(wasPlaying){
    try{ await music.play(); }
    catch(e){ soundToggle.textContent="Arquivo ausente"; }
  }
});

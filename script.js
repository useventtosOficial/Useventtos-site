const header=document.getElementById("siteHeader");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>40));

const radio=document.getElementById("radio"),soundBtn=document.getElementById("soundBtn");
if(soundBtn&&radio){radio.volume=.20;soundBtn.addEventListener("click",async()=>{if(radio.paused){try{await radio.play();soundBtn.textContent="♫ Pausar som"}catch(e){soundBtn.textContent="♫ Toque novamente"}}else{radio.pause();soundBtn.textContent="♫ Ativar som"}})}

const metricObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;if(el.dataset.done)return;el.dataset.done="1";const target=parseInt(el.dataset.count||"0",10);let n=0;const step=Math.max(1,Math.ceil(target/45));const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent="+"+n;if(n>=target)clearInterval(timer)},28)})},{threshold:.5});
document.querySelectorAll("[data-count]").forEach(el=>metricObserver.observe(el));

(function(){
 const box=document.getElementById("viewer"),img=document.getElementById("viewerImg");
 if(!box||!img)return;
 let frame=1,startX=0,startFrame=1,drag=false,total=12;
 function show(n){frame=((n-1+total)%total)+1;img.src=`spin-${String(frame).padStart(2,"0")}.webp`}
 box.addEventListener("pointerdown",e=>{drag=true;startX=e.clientX;startFrame=frame;box.setPointerCapture(e.pointerId)});
 box.addEventListener("pointermove",e=>{if(!drag)return;show(startFrame+Math.round((e.clientX-startX)/22))});
 box.addEventListener("pointerup",()=>drag=false);box.addEventListener("pointercancel",()=>drag=false);
})();

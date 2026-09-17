(()=>{
const els=document.querySelectorAll('[data-tz]');
const tick=()=>els.forEach(e=>e.dataset.time=new Date().toLocaleTimeString('en-GB',{timeZone:e.dataset.tz,hour:'2-digit',minute:'2-digit'}));
tick();setInterval(tick,15e3);
})();

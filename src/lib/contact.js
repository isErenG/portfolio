(()=>{
const em=document.getElementById('email');if(!em)return;
const t=em.textContent;em.textContent='';
[...t].forEach((c,i)=>{const s=document.createElement('span');s.textContent=c;s.style.setProperty('--i',i);em.append(s)});
em.style.setProperty('--n',t.length);
document.querySelector('a[href="#contact"]').addEventListener('click',()=>{em.classList.remove('wave');void em.offsetWidth;em.classList.add('wave');clearTimeout(em.t);em.t=setTimeout(()=>em.classList.remove('wave'),t.length*70*3+100)});
})();

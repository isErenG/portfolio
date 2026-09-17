(()=>{
const g1=document.getElementById('globe'),g2=document.getElementById('globe2');
if(!g1||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const W=84,H=42,N=1120,R=.96;
// fibonacci lattice; low-freq noise carves gaps (like the reference) and picks orange clusters
const nz=(x,y,z,k)=>Math.sin(x*k+1.3)*Math.sin(y*k*1.3+.7)+Math.sin(z*k*.8+2.1)*.6;
const P=[];for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),t=i*2.399963,x=r*Math.cos(t),z=r*Math.sin(t);
	if(nz(x,y,z,3.2)>.75||nz(x,y,z,9)>1.25)continue; // gaps
	P.push({x,y,z,o:nz(x,y,z,4.5)>.4,dx:0,dy:0})}
let a=0,mx=-1e9,my=-1e9,run=true;
const host=g1.parentElement;
host.addEventListener('pointermove',e=>{const b=g1.getBoundingClientRect();mx=(e.clientX-b.left)/b.width;my=(e.clientY-b.top)/b.height});
host.addEventListener('pointerleave',()=>{mx=my=-1e9});
new IntersectionObserver(([e])=>run=e.isIntersecting).observe(host);
document.addEventListener('click',e=>{
	if(e.button||e.target.closest('a')||!host.offsetParent)return;
	// pick a random lattice slot on the visible hemisphere as the landing point
	let q;do{const y=1-2*Math.random(),r=Math.sqrt(1-y*y),t=Math.random()*6.283;q={x:r*Math.cos(t),y,z:r*Math.sin(t),o:true,dx:0,dy:0}}while(q.x*Math.sin(a)+q.z*Math.cos(a)<.3);
	const b=g1.getBoundingClientRect(),cs=getComputedStyle(g2),fs=parseFloat(cs.fontSize);
	const tx=b.left+(.5+(q.x*Math.cos(a)-q.z*Math.sin(a))*R*.5)*b.width,ty=b.top+(.5-q.y*R*.5)*b.height;
	const f=document.createElement('span');f.textContent='@';f.className='flyer';
	Object.assign(f.style,{position:'fixed',left:e.clientX+'px',top:e.clientY+'px',font:cs.font,color:cs.color,transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:1});
	document.body.append(f);
	f.animate([{transform:'translate(-50%,-50%) scale(1.6)'},{transform:`translate(calc(${tx-e.clientX}px - 50%),calc(${ty-e.clientY}px - 50%)) scale(1)`}],{duration:900,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=()=>{f.remove();P.push(q)};
});
function frame(){
	if(!run){requestAnimationFrame(frame);return}
	a+=.0012;const ca=Math.cos(a),sa=Math.sin(a);
	const A=Array.from({length:H},()=>Array(W).fill(' ')),B=Array.from({length:H},()=>Array(W).fill(' '));
	for(const p of P){
		const x=p.x*ca-p.z*sa,z=p.x*sa+p.z*ca;if(z<.05)continue;
		const sx=.5+x*R*.5,sy=.5-p.y*R*.5;
		const ddx=sx-mx,ddy=(sy-my)*.5,d=Math.hypot(ddx,ddy);
		if(d<.12){const f=(.12-d)/.12*.05;p.dx+=ddx/d*f;p.dy+=ddy/d*f}
		p.dx*=.9;p.dy*=.9;
		const cx=Math.round((sx+p.dx)*(W-1)),cy=Math.round((sy+p.dy)*(H-1));
		if(cx<0||cy<0||cx>=W||cy>=H)continue;
		(p.o?B:A)[cy][cx]='@';
	}
	g1.textContent=A.map(r=>r.join('')).join('\n');
	g2.textContent=B.map(r=>r.join('')).join('\n');
	requestAnimationFrame(frame);
}
frame();
})();

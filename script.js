
// Custom cursor with smooth trail
const cur = document.getElementById('cur');
const trail = document.getElementById('cur-trail');
let mx=0,my=0,tx=0,ty=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});
(function animTrail(){
  tx+=(mx-tx)*.11; ty+=(my-ty)*.11;
  trail.style.left=tx+'px'; trail.style.top=ty+'px';
  requestAnimationFrame(animTrail);
})();

document.querySelectorAll('a,button,.project-item,.skill-row,.stat,.featured-card,.btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
});

// Nav sticky
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('stuck',scrollY>60));

// Scroll reveal
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealObs.unobserve(e.target)}});
},{threshold:.1});
document.querySelectorAll('.r').forEach(el=>revealObs.observe(el));

// Count-up
function countUp(el){
  const target=+el.dataset.count;
  const suffix=el.dataset.count==='100'?'%':'+';
  const dur=1800;const start=performance.now();
  (function frame(now){
    const p=Math.min((now-start)/dur,1);
    const ease=1-Math.pow(1-p,4);
    el.textContent=Math.round(ease*target)+(p===1?suffix:'');
    if(p<1)requestAnimationFrame(frame);
  })(performance.now());
}
const countObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      countObs.unobserve(e.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.stats').forEach(el=>countObs.observe(el));

// Parallax mesh
const mesh=document.querySelector('.mesh');
document.addEventListener('mousemove',e=>{
  const x=(e.clientX/window.innerWidth-.5)*18;
  const y=(e.clientY/window.innerHeight-.5)*18;
  mesh.style.transform=`translate(${x}px,${y}px) scale(1.04)`;
});

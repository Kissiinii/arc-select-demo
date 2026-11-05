// scroll suave (Lenis)
if(window.Lenis&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
  const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href');if(id.length<2)return;const el=document.querySelector(id);if(!el)return;
    e.preventDefault();lenis.scrollTo(el,{offset:-88});
  }));
}else document.documentElement.style.scrollBehavior='smooth';

// header e menu
const hd=document.querySelector('header'),mb=document.getElementById('menuBtn');
const sync=()=>hd.classList.toggle('solid',scrollY>window.innerHeight*.6||hd.classList.contains('menu-open'));
mb.addEventListener('click',()=>{const o=hd.classList.toggle('menu-open');mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Fechar menu':'Abrir menu');sync()});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{hd.classList.remove('menu-open');mb.setAttribute('aria-expanded',false);sync()}));
addEventListener('scroll',sync,{passive:true});sync();

// revelação suave
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
}else document.querySelectorAll('.rv').forEach(el=>el.classList.add('in'));

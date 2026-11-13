(() => {
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const top=document.createElement('button');top.className='back-top';top.textContent='↑';top.setAttribute('aria-label','Back to top');document.body.append(top);
top.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});document.querySelector('.wordmark').focus({preventScroll:true});});
let pending=false;function update(){const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,scrollY/total):0})`;top.classList.toggle('visible',scrollY>500);pending=false;}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
})();

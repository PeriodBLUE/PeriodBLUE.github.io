(() => {
  const canvas = document.getElementById('agent-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const button = document.getElementById('network-motion');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, frame = 0, last = 0, angle = 0;
  let targetX = 0, targetY = 0, tiltX = 0, tiltY = 0, width = 0, height = 0;
  const points = Array.from({length: 26}, (_, i) => {
    const y = 1 - 2 * (i + .5) / 26, r = Math.sqrt(1 - y*y), a = i * 2.399963;
    return [Math.cos(a)*r, y, Math.sin(a)*r];
  });
  const edges = [];
  points.forEach((p,i) => points.forEach((q,j) => {
    if (j > i && Math.hypot(...p.map((v,k) => v-q[k])) < .88) edges.push([i,j]);
  }));
  function draw(time) {
    frame = 0;
    const dt = last ? Math.min((time-last)/1000,.05) : 0; last = time;
    if (!paused) angle += dt * .12;
    tiltX += (targetX-tiltX)*.06; tiltY += (targetY-tiltY)*.06;
    ctx.clearRect(0,0,width,height);
    const a = angle+tiltX, b = -.2+tiltY, radius = Math.min(width*.36,height*.39);
    const projected = points.map(([x,y,z],i) => {
      const xx=x*Math.cos(a)+z*Math.sin(a), zz=z*Math.cos(a)-x*Math.sin(a);
      const yy=y*Math.cos(b)-zz*Math.sin(b), depth=y*Math.sin(b)+zz*Math.cos(b), scale=3/(3-depth);
      return {x:width/2+xx*radius*scale,y:height/2+yy*radius*scale,z:depth,scale};
    });
    edges.forEach(([i,j]) => {
      const p=projected[i],q=projected[j];ctx.strokeStyle=`rgba(48,110,176,${.16+(p.z+q.z+2)*.09})`;ctx.lineWidth=.55;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
    });
    projected.sort((a,b)=>a.z-b.z).forEach(p=>{
      ctx.beginPath();ctx.arc(p.x,p.y,1.45*p.scale,0,Math.PI*2);
      ctx.fillStyle=`rgba(35,103,175,${.45+(p.z+1)*.26})`;ctx.shadowColor='#6eace9';ctx.shadowBlur=2*p.scale;ctx.fill();ctx.shadowBlur=0;
      ctx.beginPath();ctx.arc(p.x-.7,p.y-.7,.45*p.scale,0,Math.PI*2);ctx.fillStyle='#e8f5ff';ctx.fill();
    });
    if (!paused && visible && !document.hidden) frame=requestAnimationFrame(draw);
  }
  function refresh(){cancelAnimationFrame(frame);last=0;if(visible&&!document.hidden)frame=requestAnimationFrame(draw);}
  function state(){button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Resume network animation':'Pause network animation');button.title=button.getAttribute('aria-label');refresh();}
  button.addEventListener('click',()=>{paused=!paused;state();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;state();});
  canvas.addEventListener('pointermove',e=>{if(paused)return;const r=canvas.getBoundingClientRect();targetX=((e.clientX-r.left)/r.width-.5)*.8;targetY=((e.clientY-r.top)/r.height-.5)*.5;});
  canvas.addEventListener('pointerleave',()=>{targetX=targetY=0;});
  new ResizeObserver(()=>{const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);refresh();}).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;refresh();}).observe(canvas);
  document.addEventListener('visibilitychange',refresh);
  state();
})();

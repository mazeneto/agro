/* LP Agro Sebrae RS · hero expansível, spotlight, entradas no scroll e números dobrando */
(function(){
  var root=document.querySelector('.agr-lp'); if(!root) return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap=!!(window.gsap&&window.ScrollTrigger);
  if(hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hero expansível (adaptado do ScrollExpand do React Bits) ---------- */
  (function(){
    var xp=root.querySelector('[data-agr-xp]'); if(!xp) return;
    var track=xp.querySelector('.agr-xp__track'), stage=xp.querySelector('.agr-xp__stage'),
        frame=xp.querySelector('.agr-xp__frame'), media=xp.querySelector('.agr-xp__media'),
        scrim=xp.querySelector('.agr-xp__scrim'), title=xp.querySelector('.agr-xp__title'),
        overlay=xp.querySelector('.agr-xp__overlay');
    var clamp=function(v,a,b){return v<a?a:v>b?b:v};
    var smooth=function(e0,e1,x){var t=clamp((x-e0)/(e1-e0||1e-6),0,1);return t*t*(3-2*t)};
    function cfg(){
      var m=window.innerWidth<768;
      return {startW:m?94:90,startH:m?88:84,startR:m?24:28,endR:0,zoom:1.2,dist:1.2,hold:.4,smoothing:.1,scrim:.5};
    }
    var c=cfg(), stageH=0, lastW=0, raf=0, cur=0, tgt=0, running=false;

    function apply(p){
      var e=smooth(0,1,p);
      var w=c.startW+(100-c.startW)*e, h=c.startH+(100-c.startH)*e;
      var ix=Math.max(0,(100-w)/2), iy=Math.max(0,(100-h)/2), r=c.startR+(c.endR-c.startR)*e;
      frame.style.clipPath='inset('+iy+'% '+ix+'% '+iy+'% '+ix+'% round '+r+'px)';
      media.style.transform='scale('+(c.zoom+(1-c.zoom)*e)+')';
      scrim.style.opacity=c.scrim*e;
      var out=smooth(.25,.7,p);
      title.style.opacity=1-out;
      title.style.transform='translate3d(0,'+(-28*out)+'px,0) scale('+(1+.04*out)+')';
      title.style.pointerEvents=out>.5?'none':'';
      title.style.visibility=out>=1?'hidden':'';
      var inn=smooth(.72,1,p);
      overlay.style.opacity=inn;
      overlay.style.transform='translate3d(0,'+(18*(1-inn))+'px,0)';
    }
    function measure(){
      c=cfg();
      stageH=document.documentElement.clientHeight||window.innerHeight;
      stage.style.height=stageH+'px';
      track.style.height=(stageH*(1+c.dist+c.hold))+'px';
      lastW=window.innerWidth;
    }
    function read(){ return clamp(-track.getBoundingClientRect().top/(stageH*c.dist),0,1); }
    function tick(){
      var k=1-Math.exp(-1/(60*c.smoothing));
      cur+=(tgt-cur)*k;
      if(Math.abs(tgt-cur)<.0004){cur=tgt;running=false;}
      apply(cur);
      raf=running?requestAnimationFrame(tick):0;
    }
    function onScroll(){
      tgt=read();
      if(reduce){cur=tgt;apply(cur);return;}
      if(!running){running=true;if(!raf)raf=requestAnimationFrame(tick);}
    }
    function onResize(){
      if(window.innerWidth===lastW) return; /* ignora a barra de endereço do celular subindo/descendo */
      measure();tgt=cur=read();apply(cur);
    }
    measure();tgt=cur=read();apply(cur);
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onResize);
    window.addEventListener('orientationchange',function(){setTimeout(function(){lastW=0;onResize();},200)});
  })();

  /* ---------- Spotlight nos cards (adaptado do SpotlightCard do React Bits) ---------- */
  root.querySelectorAll('.agr-spot').forEach(function(card){
    card.addEventListener('pointermove',function(e){
      if(e.pointerType!=='mouse') return;
      var r=card.getBoundingClientRect();
      card.style.setProperty('--mouse-x',(e.clientX-r.left)+'px');
      card.style.setProperty('--mouse-y',(e.clientY-r.top)+'px');
    });
  });

  /* ---------- Entrada dos boxes (adaptado do AnimatedContent do React Bits) ----------
     Sobe 56px · 1.4s · expo.out · opacidade 0 · scale .97 · blur 10px · threshold .2
     data-delay = atraso próprio (segundos) para escalonar boxes lado a lado */
  if(hasGsap&&!reduce){
    var OPT={distance:56,duration:1.4,ease:'expo.out',initialOpacity:0,scale:.97,blur:10,threshold:.2,delay:.1};
    var mobile=window.matchMedia('(max-width:767px)').matches;
    root.querySelectorAll('[data-agr-anim]').forEach(function(el){
      var dist=mobile?32:OPT.distance;
      var delay=el.dataset.delay?parseFloat(el.dataset.delay):OPT.delay;
      gsap.set(el,{y:dist,scale:OPT.scale,opacity:OPT.initialOpacity,filter:'blur('+OPT.blur+'px)'});
      var tl=gsap.timeline({paused:true,delay:delay});
      tl.to(el,{y:0,scale:1,opacity:1,filter:'blur(0px)',duration:OPT.duration,ease:OPT.ease,clearProps:'transform,filter'});
      ScrollTrigger.create({trigger:el,start:'top '+((1-OPT.threshold)*100)+'%',once:true,onEnter:function(){tl.play()}});
    });
  }

  /* ---------- Números dobrando (adaptado do FoldText do React Bits) ----------
     splitBy char · dobradiça no topo · 0.65s · stagger .06 · power3.out · perspective 700 · creaseShading .55 */
  if(hasGsap&&!reduce){
    root.querySelectorAll('[data-agr-fold]').forEach(function(el){
      var text=el.textContent.trim();
      el.textContent='';
      var sr=document.createElement('span');sr.className='agr-fold-sr';sr.textContent=text;el.appendChild(sr);
      var vis=document.createElement('span');vis.setAttribute('aria-hidden','true');
      Array.from(text).forEach(function(ch){
        var seg=document.createElement('span');seg.className='agr-fold-seg';
        var piece=document.createElement('span');piece.className='agr-fold-piece';
        piece.textContent=ch===' '?' ':ch;
        seg.appendChild(piece);vis.appendChild(seg);
      });
      el.appendChild(vis);
      var pieces=vis.querySelectorAll('.agr-fold-piece');
      var box=el.closest('[data-agr-anim]');
      var extra=box&&box.dataset.delay?parseFloat(box.dataset.delay):0;
      gsap.set(pieces,{opacity:0,rotateX:-92,'--fold-crease':.55,transformOrigin:'50% 0%',force3D:true});
      ScrollTrigger.create({trigger:el,start:'top 82%',once:true,onEnter:function(){
        gsap.to(pieces,{opacity:1,rotateX:0,'--fold-crease':0,duration:.65,ease:'power3.out',stagger:.06,delay:.35+extra});
      }});
    });
  }

  /* ---------- Reveal dos textos ---------- */
  var els=root.querySelectorAll('.agr-reveal,.agr-countries');
  if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('is-visible')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target);} });
  },{threshold:.2,rootMargin:'0px 0px -60px 0px'});
  els.forEach(function(el){io.observe(el)});
})();

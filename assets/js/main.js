/* LP Agro Sebrae RS · interações: painéis, spotlight, animações de scroll */
(function(){
  var root=document.querySelector('.agr-lp'); if(!root) return;

  /* Painéis: abrem a partir do botão "+" que foi clicado e fecham pelo mesmo caminho */
  function closeSheet(d){
    if(!d.open||d.classList.contains('is-closing')) return;
    d.classList.add('is-closing');
    setTimeout(function(){d.classList.remove('is-closing');d.close();},220);
  }
  root.querySelectorAll('.agr-plus').forEach(function(btn){
    btn.addEventListener('click',function(){
      var d=document.getElementById(btn.dataset.sheet); if(!d||!d.showModal) return;
      var r=btn.getBoundingClientRect(), vw=window.innerWidth, vh=window.innerHeight;
      d.style.transformOrigin=((r.left+r.width/2)/vw*100)+'% '+((r.top+r.height/2)/vh*100)+'%';
      d.showModal();
    });
  });
  root.querySelectorAll('.agr-sheet').forEach(function(d){
    d.querySelector('.agr-sheet__close').addEventListener('click',function(){closeSheet(d)});
    d.addEventListener('click',function(e){ if(e.target===d) closeSheet(d); });
    d.addEventListener('cancel',function(e){e.preventDefault();closeSheet(d);});
  });


  /* Spotlight nos cards (adaptado do SpotlightCard do React Bits) */
  root.querySelectorAll('.agr-spot').forEach(function(card){
    card.addEventListener('pointermove',function(e){
      if(e.pointerType!=='mouse') return;
      var r=card.getBoundingClientRect();
      card.style.setProperty('--mouse-x',(e.clientX-r.left)+'px');
      card.style.setProperty('--mouse-y',(e.clientY-r.top)+'px');
    });
  });

  /* Entrada dos boxes no scroll (adaptado do AnimatedContent do React Bits)
     Config: sobe 56px · duration 1.4 · expo.out (sem quique) · opacidade 0 · scale .97 · blur 10px · threshold .2 · delay .1
     data-delay = atraso próprio (segundos) para escalonar cards lado a lado */
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(window.gsap&&window.ScrollTrigger&&!reduce){
    gsap.registerPlugin(ScrollTrigger);
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

  /* Reveal no scroll */
  var els=root.querySelectorAll('.agr-reveal,.agr-countries');
  if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('is-visible')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target);} });
  },{threshold:.2,rootMargin:'0px 0px -60px 0px'});
  els.forEach(function(el){io.observe(el)});
})();

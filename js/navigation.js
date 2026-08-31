(function(){
  var toggle=document.getElementById('menuToggle');
  var nav=document.getElementById('siteNav');
  if(!toggle||!nav)return;
  var links=nav.querySelectorAll('a');
  var page=document.body.getAttribute('data-page');
  links.forEach(function(link){if(link.getAttribute('data-nav')===page)link.classList.add('active');});
  function close(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Buka menu navigasi');document.body.classList.remove('no-scroll');}
  toggle.addEventListener('click',function(){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');if(open&&window.innerWidth<981)document.body.classList.add('no-scroll');else document.body.classList.remove('no-scroll');});
  links.forEach(function(link){link.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  window.addEventListener('resize',function(){if(window.innerWidth>980)close();});
})();

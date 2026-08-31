(function(){
  var root=document.documentElement, key='Captain_Z-MD-theme', btn=document.getElementById('themeToggle');
  function apply(theme){root.setAttribute('data-theme',theme);localStorage.setItem(key,theme);if(btn){btn.setAttribute('aria-pressed',String(theme==='dark'));btn.setAttribute('aria-label',theme==='dark'?'Gunakan light mode':'Gunakan dark mode');var sun=btn.querySelector('.icon-sun'),moon=btn.querySelector('.icon-moon');if(sun)sun.style.display=theme==='dark'?'none':'inline';if(moon)moon.style.display=theme==='dark'?'inline':'none';}}
  if(btn){apply(root.getAttribute('data-theme')||'light');btn.addEventListener('click',function(){apply(root.getAttribute('data-theme')==='dark'?'light':'dark');});}
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});
  var profile=document.getElementById('profileImage');
  if(profile){profile.addEventListener('error',function(){this.hidden=true;var fb=this.parentElement.querySelector('.photo-fallback');if(fb)fb.hidden=false;});}
  var aboutPreview=document.getElementById('aboutPreview');
if(aboutPreview){fetch('About/About.CPTZ',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('About/About.CPTZ HTTP '+r.status);return r.text();}).then(function(text){var paras=text.split(/\n\s*\n/).map(function(p){return p.trim();}).filter(Boolean);var p=aboutPreview.querySelector('p');if(p)p.innerHTML=paras[1]||'Cerita perjalanan belum tersedia.';}).catch(function(err){console.error(err);var p=aboutPreview.querySelector('p');if(p)p.textContent='Tentang saya belum dapat dimuat.';});}
  var copy=document.getElementById('copyContact');
  if(copy){copy.addEventListener('click',function(){var text='https://captain-z.pages.dev/contact.html',status=document.getElementById('copyStatus');function success(){if(status)status.textContent='Link berhasil disalin ✓';copy.textContent='Tersalin ✓';setTimeout(function(){copy.textContent='Salin Link';},1600);}function fail(){if(status)status.textContent='Clipboard tidak tersedia di browser ini.';}
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(success).catch(fail);return;} 
    var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')?success():fail();}catch(e){console.error(e);fail();}finally{ta.remove();}
  });} 
  var full=document.getElementById('aboutFull');
  if(full){fetch('About/About.CPTZ',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('About/About.CPTZ HTTP '+r.status);return r.text();}).then(function(text){var parts=text.split(/\n\s*\n/).map(function(p){return p.trim();}).filter(Boolean);full.innerHTML='';
      
      parts.forEach(function(part){var p=document.createElement('p');p.style.whiteSpace='pre-line';p.innerHTML=part;;full.appendChild(p);});
      
      }).catch(function(err){console.error(err);full.innerHTML='<p>Tentang saya belum dapat dimuat.</p><button class="button button-ghost" type="button" id="aboutRetry">Coba Lagi</button>';var retry=document.getElementById('aboutRetry');if(retry)retry.addEventListener('click',function(){window.location.reload();});});}
})();

(function(){
  var loader=document.getElementById('siteLoader');
  if(!loader)return;
  var bar=document.getElementById('loaderBar'),status=document.getElementById('loaderStatus'),items=document.getElementById('loaderItems'),retry=document.getElementById('loaderRetry');
  var checks=[
    ['Profile','image/profile.jpg','image'],
    ['Preview','image/preview.jpg','image'],
    ['About','About/About.CPTZ','fetch'],
    ['Projects','src/project.json','json'], 
    ['fonts', 'fonts/CaptainZ.woff2','woff2']
  ];
  function checkImage(url){return new Promise(function(resolve){var img=new Image();img.onload=function(){resolve(true);};img.onerror=function(){resolve(false);};img.src=url+'?loader='+Date.now();});}
  function checkFetch(url,type){return fetch(url,{cache:'no-store'}).then(function(r){if(!r.ok)return false;if(type==='json')return r.json().then(function(data){if(!Array.isArray(data))return false;return data.every(function(item){return item&&typeof item==='object'&&typeof item.judul==='string'&&typeof item.deskripsi==='string'&&typeof item.namabtn==='string'&&typeof item.link==='string';});}).catch(function(){return false;});return true;}).catch(function(){return false;});}
  function check(name,url,type){return (type==='image'?checkImage(url):checkFetch(url,type)).then(function(ok){return {name:name,ok:ok};});}
  function render(results){items.innerHTML='';results.forEach(function(r){var row=document.createElement('div');row.className='loader-item';var name=document.createElement('span');name.textContent=r.name;var state=document.createElement('strong');state.textContent=r.ok?'✓ READY':'⚠ FAILED';row.appendChild(name);row.appendChild(state);items.appendChild(row);});}
  function run(){retry.hidden=true;items.innerHTML='';status.textContent='Checking resources…';bar.style.width='8%';var start=performance.now();Promise.all(checks.map(function(c){return check(c[0],c[1],c[2]);})).then(function(results){render(results);var passed=results.filter(function(r){return r.ok;}).length;bar.style.width=passed===results.length?'100%':Math.round((passed/results.length)*88+8)+'%';var wait=Math.max(0,1250-(performance.now()-start));setTimeout(function(){if(results.every(function(r){return r.ok;})){status.textContent='Resource validation complete. Ready.';setTimeout(function(){loader.classList.add('is-hidden');},180);}else{status.textContent='Some resources failed to load.';retry.hidden=false;}},wait);}).catch(function(err){console.error(err);bar.style.width='100%';status.textContent='Validation failed. Please retry.';retry.hidden=false;});}
  retry.addEventListener('click',run);run();
})();
(function(){
  var grid=document.getElementById('projectGrid');
  if(!grid)return;

  fetch('/src/project.json',{cache:'no-store'}).then(function(r){
    if(!r.ok)throw new Error('project.json HTTP '+r.status);
    return r.json();
  }).then(function(projects){
    if(!Array.isArray(projects))throw new Error('project.json must contain an array');

    if(!projects.length){
      grid.innerHTML='<div class="loading-copy">Belum ada project yang tersedia.</div>';
      return;
    }

    grid.innerHTML='';

    projects.forEach(function(item,index){
      var card=document.createElement('article');
      card.className='project-card reveal';

      if(item.preview){
        var preview=document.createElement('div');
        preview.className='project-preview';

        var img=document.createElement('img');
        img.src=item.preview;
        img.alt='Preview '+(item.judul||'Project');
        img.loading='eager';

        img.onerror=function(){
          console.error('Preview gagal:',item.preview);
        };

        preview.appendChild(img);
        card.appendChild(preview);
      }

      var top=document.createElement('div');
      top.className='project-card-top';
      top.innerHTML='<span>PROJECT '+String(index+1).padStart(2,'0')+'</span><span>LOGBOOK</span>';

      var middle=document.createElement('div');

      var h=document.createElement('h2');
      h.textContent=item.judul||'Untitled Project';

      var p=document.createElement('p');
      p.textContent=item.deskripsi||'';

      middle.appendChild(h);
      middle.appendChild(p);

      var foot=document.createElement('div');
      foot.className='project-card-footer';

      var idx=document.createElement('span');
      idx.className='project-index';
      idx.textContent='CZ / '+String(index+1).padStart(3,'0');

      var a=document.createElement('a');
      a.className='project-link';
      a.href=item.link||'#';
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.textContent=(item.namabtn||'Lihat Project')+' →';

      foot.appendChild(idx);
      foot.appendChild(a);

      card.appendChild(top);
      card.appendChild(middle);
      card.appendChild(foot);

      grid.appendChild(card);
    });
  }).catch(function(err){
    console.error(err);

    grid.innerHTML='<div class="loading-copy">Project belum dapat dimuat.<br><button class="button button-ghost" type="button" id="projectRetry" style="margin-top:14px">Coba Lagi</button></div>';

    var retry=document.getElementById('projectRetry');

    if(retry){
      retry.addEventListener('click',function(){
        window.location.reload();
      });
    }
  });
})();

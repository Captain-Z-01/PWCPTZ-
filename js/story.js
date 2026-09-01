(function(){
  var grid=document.getElementById('storyGrid');
  if(!grid)return;

  fetch('/src/story.json',{cache:'no-store'}).then(function(r){
    if(!r.ok)throw new Error('story.json HTTP '+r.status);
    return r.json();
  }).then(function(stories){
    if(!Array.isArray(stories))throw new Error('story.json must contain an array');

    if(!stories.length){
      grid.innerHTML='<div class="loading-copy">Belum ada story yang dipublikasikan.</div>';
      return;
    }

    grid.innerHTML='';

    var orderedStories=stories.slice().reverse();

    orderedStories.forEach(function(item){
      var originalIndex=stories.indexOf(item);

      if(!item.deskripsi)return;

      var card=document.createElement('article');
      card.className='story-card reveal';

      if(item.preview&&item.preview.trim()){
        var preview=document.createElement('div');
        preview.className='story-preview';

        var img=document.createElement('img');
        img.src=item.preview;
        img.alt=item.judul&&item.judul.trim()?item.judul:'Story '+String(originalIndex+1).padStart(2,'0');
        img.loading='eager';

        img.onerror=function(){
          console.error('Story preview gagal:',item.preview);
          preview.remove();
        };

        preview.appendChild(img);
        card.appendChild(preview);
      }

      var top=document.createElement('div');
      top.className='story-card-top';

      var number=document.createElement('span');
      number.textContent='STORY '+String(originalIndex+1).padStart(2,'0');

      var status=document.createElement('span');
      status.textContent='LOGBOOK';

      top.appendChild(number);
      top.appendChild(status);
      card.appendChild(top);

      var middle=document.createElement('div');
      middle.className='story-card-content';

      if(item.judul&&item.judul.trim()){
        var h=document.createElement('h2');
        h.textContent=item.judul;
        middle.appendChild(h);
      }

      var p=document.createElement('p');
      p.textContent=item.deskripsi;
      middle.appendChild(p);

      card.appendChild(middle);

      var foot=document.createElement('div');
      foot.className='story-card-footer';

      var idx=document.createElement('span');
      idx.className='story-index';
      idx.textContent='CZ / '+String(originalIndex+1).padStart(3,'0');

      foot.appendChild(idx);

      if(item.link&&item.link.trim()){
        var a=document.createElement('a');
        a.className='story-link';
        a.href=item.link;
        a.target='_blank';
        a.rel='noopener noreferrer';
        a.textContent=(item.namabtn&&item.namabtn.trim()?item.namabtn:'Read Story')+' →';
        foot.appendChild(a);
      }

      card.appendChild(foot);
      grid.appendChild(card);
    });

    if(!grid.children.length){
      grid.innerHTML='<div class="loading-copy">Belum ada story yang dapat ditampilkan.</div>';
    }

  }).catch(function(err){
    console.error(err);

    grid.innerHTML='<div class="loading-copy">Story belum dapat dimuat.<br><button class="button button-ghost" type="button" id="storyRetry" style="margin-top:14px">Coba Lagi</button></div>';

    var retry=document.getElementById('storyRetry');

    if(retry){
      retry.addEventListener('click',function(){
        window.location.reload();
      });
    }
  });
})();

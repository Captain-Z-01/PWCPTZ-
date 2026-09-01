(function(){
  var key='Captain_Z-MD.theme';
  var saved=localStorage.getItem(key);
  var theme=(saved==='dark'||saved==='light')?saved:'light';
  document.documentElement.setAttribute('data-theme',theme);
  if(saved===null)localStorage.setItem(key,theme);
})();

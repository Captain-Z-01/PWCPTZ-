(function(){
  var year=document.getElementById("year");
  var datetime=document.getElementById("datetime");

  if(year)year.textContent=new Date().getFullYear();

  function updateDateTime(){
    if(!datetime)return;

    var now=new Date();

    var date=now.toLocaleDateString("id-ID",{
      day:"2-digit",
      month:"long",
      year:"numeric"
    });

    var time=now.toLocaleTimeString("id-ID",{
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit",
      hour12:false
    });

    datetime.textContent=date+" • "+time;
  }

  updateDateTime();
  setInterval(updateDateTime,1000);
})();
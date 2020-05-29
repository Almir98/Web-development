var izbornik=document.getElementById("Izbornik");
izbornik.style.height="0px";

document.querySelector("#IzbornikDugme").addEventListener('click',function(){

    if(izbornik.style.height=="0px")
    {
        izbornik.style.height=izbornik.scrollHeight+"px";
    }
    else{
        izbornik.style.height="0px";
    }
});




























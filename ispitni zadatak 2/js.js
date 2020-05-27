var dugme=document.getElementById("IzbornikDugme");

dugme.addEventListener('click',function(){
    var izbornik=document.querySelector("#Izbornik")
    if(izbornik.style.display == 'block'){
        izbornik.style.display = 'none';
    }
    else izbornik.style.display= 'block';
})
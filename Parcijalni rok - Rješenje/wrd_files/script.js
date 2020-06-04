var izbornik=document.getElementById("Izbornik");
izbornik.style.height="0px";

document.getElementById("IzbornikDugme").addEventListener('click',function(){

    if(izbornik.style.height=="0px")
    {
        izbornik.style.height=izbornik.scrollHeight+"px";
    }
    else{
        izbornik.style.height="0px";
    }
});


var vile=document.getElementsByClassName('VilaKolonaWrapper');

for (let i = 0; i < vile.length; i++) {

    vile[i].addEventListener('click',function(){

        var roditelj=this.parentNode;

        document.getElementById("Slika").value=roditelj.children[i].querySelector('.VilaOpis').innerText;

        var dana=document.querySelector('#BrojDana').value;
        var cijena=document.querySelector('#CijenaPoDanu').value=roditelj.children[i].querySelector('span').innerHTML;

        var ukupna=parseInt(cijena)*parseInt(dana);
        document.getElementById("test").addEventListener('click',function(){

            document.getElementById("IznosUkupno").value=ukupna;
        })
    });
}




















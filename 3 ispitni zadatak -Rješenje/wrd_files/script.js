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

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#forma").validate({
    rules:{
        dostavaIme:{
            required:true,
            regex:/^[A-Za-z]{1,}$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[A-Za-z]{1,}$/
        },
        dostavaPostanskiBroj:{
            required:true,
            regex:/^[0-9]{5}$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^\+[0-9]{3}\-[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/
        }
    },
    messages:{
        dostavaIme:("Nije dobar format"),
        dostavaAdresa:("Nije dobar format"),
        dostavaPostanskiBroj:("Nije dobar format"),
        dostavaTelefon:("Nije dobar format"),
    }
});

// HTTPS

var glavniURL="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll";
getPoziv(ucitajPodatke,glavniURL);

function NapraviRed(objekat)
{
    return `<tr>
    <td>${objekat.narudzbaId}</td>
    <td>${objekat.datumNarudzbe}</td>
    <td>${objekat.dostavaIme}</td>
    <td>${objekat.dostavaAdresa}</td>
    <td>${objekat.dostavaPostanskiBroj}</td>
    <td>${objekat.dostavaTelefon}</td>
    <td>${objekat.napomena}</td>
    </tr>`;
}

function ucitajPodatke(objekat) {

    for (let i = 0; i < objekat.length; i++) {

        document.getElementById("tabelaID").innerHTML+=NapraviRed(objekat[i]);
    }
}

function getPoziv(funkcija,url)
{
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function()
    {
        if(zahtjev.status==200)
        {
            funkcija(JSON.parse(zahtjev.responseText));
        }
        else{
            alert("greska je");
        }
    }
    zahtjev.onerror=function(){
        alert("greska je ");
    }

    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}


//Dodaj

function Dodaj()
{
    var zahtjev=new XMLHttpRequest();

    var novi=new Object();
    
    novi.dostavaIme=document.getElementById("dostavaIme").value;
    novi.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    novi.dostavaPostanskiBroj=document.getElementById("dostavaPostanskiBroj").value;
    novi.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    novi.napomena=document.getElementById("napomena").value;

    var strJSON=JSON.stringify(novi);

    zahtjev.onload=function()
    {
        if(zahtjev.status==200)
        {
            alert("Dodan");
        }
        else{
            alert("greska je");
        }
    }
    zahtjev.onerror=function(){
        alert("greska je ");
    }

    var dodajURL="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj";

    zahtjev.open("POST",dodajURL,true);
    zahtjev.setRequestHeader('Content-Type','application/json');
    zahtjev.send(strJSON);
}










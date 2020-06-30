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
            regex:/^[A-Z][a-z]{1,}[A-Z][a-z]{1,}$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[A-Za-z]{1,}$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^\+[0-9]{3}\-[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/
        }
    }
})

//HTTPS

var glavniURL="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";
getPoziv(ucitajPodatke,glavniURL);

function NapraviRed(objekat)
{
    return `<tr>
    <td>${objekat.proizvodID}</td>
    <td>${objekat.likeCounter}</td>
    <td>${objekat.naziv}</td>
    <td>
        <img src="${objekat.slikaUrl}" style="width:75px;height:60px;">
    </td>
    <td>${objekat.cijenaPoKvadratu}</td>
    <td>
        <button onclick="Lajkaj(${objekat.proizvodID})">Like</button>
    </td>
    <td>
        <button onclick="Lajkaj(${objekat.proizvodID})">Odaberi</button>
    </td>
    </tr>`;
}

function ucitajPodatke(objekat)
{
    for (let i = 0; i < objekat.length; i++) {
        document.getElementById("proizvodi").innerHTML+=NapraviRed(objekat[i]);        
    }
}


function getPoziv(funkcija,url)
{
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){
        if(zahtjev.status==200)
        {
            funkcija(JSON.parse(zahtjev.responseText));
        }
        else{alert("greska je");}
    }
    zahtjev.onerror=function(){alert("greska je");}

    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}

function Dodaj()
{
    var zahtjev=new XMLHttpRequest();

    var novi=new Object();

    novi.proizvodId=document.getElementById("idProizvoda").value;
    novi.dostavaIme=document.getElementById("dostavaIme").value;
    novi.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    novi.dostavaGrad=document.getElementById("dostavaGrad").value;
    novi.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    novi.opcija=document.getElementById("opcija").value;

    var strJSON=JSON.stringify(novi);

    zahtjev.onload=function(){
        if(zahtjev.status==200)
        {
            alert("Nova narudzba je dodana");
        }
        else{
            alert("Nije uspjesna");
        }
    }
    zahtjev.onerror=function()
    {
        alert("Greska servera");
    }

    var dodajURL="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj";

    zahtjev.open("POST",dodajURL,true);
    zahtjev.setRequestHeader('Content-type','application/json');
    zahtjev.send(strJSON);
}

//narudzbe

var url="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll";
getPoziv(ucitaj,url);


function Napravi(objekat)
{
    return `<tr>
    <td>${objekat.proizvodID}</td>
    <td>${objekat.naziv}</td>
    <td>${objekat.cijena}</td>
    <td>${objekat.kolicina}</td>
    <td>${objekat.iznos}</td>
    <td>${objekat.dostavaIme}</td>
    <td>${objekat.dostavaAdresa}</td>
    <td>${objekat.datumNarudzbe}</td>
    <td>${objekat.dostavaTelefon}</td>
    </tr>`;
}

function ucitaj(objekat)
{
    for (let i = 0; i < objekat.length; i++) {
        document.getElementById("narudzbe").innerHTML+=Napravi(objekat[i]);        
    }
}
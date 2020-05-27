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
            regex:/^[A-Z][a-z ]{1,}[A-Z][a-z]{1,}$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[A-Z][a-z]{1,}$/
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
        dostavaIme:("Ime nije dobar format"),
        dostavaAdresa:("Najmanje jedno veliko slovo mora bit"),     
        dostavaPostanskiBroj:("Broj mora imat 5 cifara"),     
        dostavaTelefon:("Nije dobar format")     
    }
});

// HTTPS

var glavniURL='http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll';

getPoziv(ucitajPodatke,glavniURL);


function generesiRed(objekat)
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

function ocisti()
{
    $("#tabelaID").empty();
}

function ucitajPodatke(objekat) {
    
    ocisti();
    for (let i = 0; i < objekat.length; i++) {
         document.querySelector("#tabelaID").innerHTML += generesiRed(objekat[i]);
    }
}


function getPoziv(funkcija,url)
{
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){
        if(zahtjev.status===200)
        {
            funkcija(JSON.parse(zahtjev.responseText));
        }
        else{
            alert("Greska je neka "+ zahtjev.statusText);
        }
    }
    zahtjev.onerror=function(){
        alert("Greska je neka "+ zahtjev.statusText);
    }

    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}

// dodaj

function Dodaj()
{
    var zahtjev=new XMLHttpRequest();

    var novi=new Object();
    novi.dostavaIme=document.getElementById("dostavaIme").value;
    novi.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    novi.dostavaPostanskiBroj=document.getElementById("dostavaPostanskiBroj").value;
    novi.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    novi.napomena=document.getElementById("napomena").value;

    var strjson=JSON.stringify(novi);

    zahtjev.onload=function(){
        if(zahtjev.status===200){

            getPoziv(ucitajPodatke,glavniURL);
        }
        else{
            alert("error");
        }
    }

    zahtjev.open("POST",'http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj',true);
    zahtjev.setRequestHeader('Content-Type','application/json');
    zahtjev.send(null);
}

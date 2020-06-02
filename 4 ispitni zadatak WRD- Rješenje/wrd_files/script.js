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
            regex:/^[A-Z][a-z ]{1,}[A-Z][a-z]{1,}$/
        },
        dostavaAdresa:{
            regex:/^[A-Za-z]{2,}$/
        },
        dostavaTelefon:{
            regex:/^\+[0-9]{4}\-[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/
        }
    }
});


// HTTPS

var glavniUrl="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";
getPoziv(UcitajPodatke,glavniUrl);

function Ocisti()
{
    $("#proizvodi").empty();
}

function NapraviRed(objekat)
{
    return `<tr>
    <td>${objekat.proizvodID}</td>
    <td>${objekat.likeCounter}</td>
    <td>${objekat.naziv}</td>
    <td>${objekat.slikaUrl}</td>
    <td>${objekat.cijenaPoKvadratu}</td>
    <td>
        <button onclick="Lajkaj(${objekat.proizvodID})">Like</button>
    </td>
    <td>
        <button onclick="Odaberi(${objekat.proizvodID})">Odaberi</button>
    </td>
    </tr>`;
}

function UcitajPodatke(objekat)
{
    Ocisti();
    for (let i = 0; i < objekat.length; i++) {

        document.getElementById("proizvodi").innerHTML +=NapraviRed(objekat[i]);
    }
}

function getPoziv(funkcija,url)
{
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){

        if(zahtjev.status===200){
            funkcija(JSON.parse(zahtjev.responseText));
        }
    }

    zahtjev.onerror=function(){
        alert("Greska neka");
    }
    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}


function Lajkaj(id)
{

    var zahtjev=new XMLHttpRequest();

    
    zahtjev.onload=function(){
        if(zahtjev.status===200)
        {
            var element=JSON.parse(zahtjev.responseText);
            element.likeCounter++;
            getPoziv(UcitajPodatke,glavniUrl);
        }
    }
    var url=`http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Like?proizvodId=${id}`;

    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}


function Odaberi(id)
{
    var zahtjev=new XMLHttpRequest();

    // var tabela=$("#proizvodi tbody td");

    zahtjev.onload=function()
    {
        if(zahtjev.status===200)
        {
            // var obj=JSON.parse(zahtjev.responseText);
            
            // for (let i = 0; i < tabela; i++) {
            //     if(tabela[i].proizvodID==id)
            //     {
            //         var el=tabela[i];
            //         document.getElementById("nazivProizvoda").value=tabela[i].nazivProizvoda;
            //     }
            // }
    
            document.getElementById("kolicina").value=1;
            document.getElementById("idProizvoda").value=id;
        }
    }
    var url=`http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodOpcije?proizvodId=${id}`;
    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}

// narudzbe

function NapraviRedN(objekat)
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
    </tr>
    `;
}


function UcitajNarudzbe(objekat)
{
    for (let i = 0; i < objekat.length; i++) {

        document.getElementById("narudzbe").innerHTML +=NapraviRedN(objekat[i]);
        
    }
}

var urlnarudzbe="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll";
getPoziv(UcitajNarudzbe,urlnarudzbe);

function Naruci()
{
    var zahtjev=new XMLHttpRequest();

    var novi=new Object();

    novi.dostavaIme=document.getElementById("dostavaIme").value;
    novi.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    novi.dostavaGrad=document.getElementById("dostavaGrad").value;
    novi.idProizvoda=document.getElementById("idProizvoda").value;
    novi.nazivProizvoda=document.getElementById("nazivProizvoda").value;
    novi.kolicina=document.getElementById("kolicina").value;

    var strjson=JSON.stringify(novi);

    zahtjev.onload=function()
    {
        if(zahtjev.status===200){
            alert("Dodano");
        }
        else{
            alert("Greska tvoja");
        }
    }
    zahtjev.onerror=function(){
        alert("Greska server");
    }

    var url="http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj";

    zahtjev.open("POST",url,true);
    zahtjev.setRequestHeader('Content-Type','application/json');
    zahtjev.send(strjson);
}

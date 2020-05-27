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
            regex:/^[A-Za-z]{5,}$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^\+[0-9]{3}\-[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/
        }
    },
    messages:{
        dostavaIme:("Nije dobar format"),
        dostavaAdresa:("Mora imat najmanje 5 slova"),
        dostavaTelefon:("Nije dobar format telefona")
    }
});


//HTTPS

var allproducts='https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll';

getPoziv(ucitajPodatke,allproducts);

function generisiRed(objekat)
{
        return `<tr>
        <td>${objekat.proizvodID}</td>
        <td>${objekat.naziv}</td>
        <td>${objekat.cjena}</td>
        <td>${objekat.jedinicaMjere}</td>
        <td>${objekat.likeCounter}</td>
        <td><button onclick="Lajkovi(${objekat.proizvodID})">Like</button></td>
        <td><button onclick="Odaberi(${objekat.proizvodID})">Odaberi</button></td>
        </tr>`
}

 function ocisti()
 {
     $("#tabelaID tbody").empty();
 }

function ucitajPodatke(objekat)
{
    ocisti();
    for(var i=0; i<objekat.length; i++)
        {
            document.getElementById("tabelaID").innerHTML+=generisiRed(objekat[i]);
        }
}


function Lajkovi(id)
{
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function()
    {
        if(zahtjev.status===200)
        {
            var el=JSON.parse(zahtjev.responseText);
            el.likeCounter++;
            getPoziv(ucitajPodatke,allproducts);
        }
    }
    var lajkURL=`https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodID=${id}`;
    zahtjev.open("GET",lajkURL,true);
    zahtjev.send(null);
}


function Odaberi(id)
{
    document.getElementById("proizvodID").innerHTML=id;
}


function getPoziv(funkcija,url)
    {
        var zahtjev = new XMLHttpRequest();
       
        zahtjev.onload  = function() { 
                if (zahtjev.status === 200) {  
                    funkcija(JSON.parse(zahtjev.responseText));
                }
                else {  
                    alert("Server javlja grešku: " + zahtjev.statusText);  
                }  
        }
        zahtjev.onerror = function() {
            document.getElementById("greska").innerHTML="Greška u komunikaciji sa serverom.";  
        };

        zahtjev.open("GET",url, true);
        zahtjev.send(null);
    }

// naruci

function Naruci()
{
    var novi=new Object();

    var zahtjev=new XMLHttpRequest();

    novi.dostavaGrad=document.getElementById("dostavaGrad");
    novi.dostavaAdresa=document.getElementById("dostavaAdresa");
    novi.dostavaIme=document.getElementById("dostavaIme");
    novi.dostavaTelefon=document.getElementById("dostavaTelefon");
    novi.proizvodId=document.getElementById("proizvodId");
    novi.kolicina=document.getElementById("kolicina");

    var strjson=JSON.stringify(novi);

    zahtjev.onload=function()
    {
        if(zahtjev.status===200)
        {
            getPoziv(ucitajPodatke,allproducts);
        }
    }
    zahtjev.open("POST",'http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj',true);
    zahtjev.setRequestHeader("Content-Type","application/json");
    zahtjev.send(strjson);
}



//narudzbe

function NapraviRed(obj)
{
    return `<tr>
    <td>${obj.proizvodID}</td>
    <td>${obj.naziv}</td>
    <td>${obj.cijena}</td>
    <td>${obj.kolicina}</td>
    <td>${obj.dostavaIme}</td>
    <td>${obj.dostavaAdresa}</td>
    <td>${obj.dostavaTelefon}</td>
     </tr>`
}

function ocistiRedoveNarudzbi()
    {
        $("#tableDesno tbody").empty();
    }

    function ucitajNarudzbe(obj)
    {
        ocistiRedoveNarudzbi();
        for(var i=0; i<obj.length; i++)
        {
            document.querySelector("#tableDesno tbody").innerHTML+=NapraviRed(obj[i]);
        }
       
    }
    allNarudzbe='https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetNarudzbeAll';
    getPoziv(ucitajNarudzbe,allNarudzbe);


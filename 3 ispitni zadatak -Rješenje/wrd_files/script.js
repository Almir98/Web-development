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
            regex:/[A-Za-z]{1,}/
        },
        dostavaAdresa:{
            required:true,
            regex:/[A-Za-z]{1,}/
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
        dostavaPostanskiBroj:("Mora imat samo 5 cifara !"),
        dostavaTelefon:("Nije dobar format telefona"),
    }
});


//HTTPS

var glavni="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll";

getPoziv(ucitajPodatke,glavni);

function NapraviRed(objekat){

    return `<tr>
    <td>${objekat.narudzbaId}</td>
    <td>${objekat.datumNarudzbe}</td>    
    <td>${objekat.dostavaIme}</td>    
    <td>${objekat.dostavaAdresa}</td>    
    <td>${objekat.dostavaPostanskiBroj}</td>    
    <td>${objekat.dostavaTelefon}</td>    
    <td>${objekat.napomena}</td>    
    </tr>
    `;
}

function ocisti(){
    $("#tabelaID").empty();
}

function ucitajPodatke(objekat)
{
    // ocisti();
    for (let i = 0; i < objekat.length; i++) {
        
        document.getElementById("tabelaID").innerHTML +=NapraviRed(objekat[i]);
    }
}



function getPoziv(funckija,url)
{
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function()
    {

    if(zahtjev.status===200)
    {
        funckija(JSON.parse(zahtjev.responseText));
    }
    else{
        alert("Greska u komunikaciji sa serverom");
    }
    }

    zahtjev.onerror=function(){
        alert("Greska u komunikaciji sa serverom");
    }

    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}

// Dodaj

function Dodaj()
{
    if(!$("#forma").valid())
    {
        alert("Popunite formu do kraja!");
        return;
    }

    var zahtjev=new XMLHttpRequest();

    var novi=new Object();

    novi.dostavaIme=document.getElementById("dostavaIme").value;
    novi.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    novi.dostavaPostanskiBroj=document.getElementById("dostavaPostanskiBroj").value;
    novi.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    novi.napomena=document.getElementById("napomena").value;

    var strjson=JSON.stringify(novi);

    zahtjev.onload=function()
    {
        if(zahtjev.status===200)
        {
            alert("Uspjeno dodan");
        }
    }

    zahtjev.onerror=function()
    {
        alert("Nije dodan");
    }

    var url="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj";
    zahtjev.open("POST",url,true);
    zahtjev.setRequestHeader('Content-type', 'application/json');
    zahtjev.send(strjson);


    document.getElementById("dostavaIme").value="";
    document.getElementById("dostavaAdresa").value="";
    document.getElementById("dostavaPostanskiBroj").value="";
    document.getElementById("dostavaTelefon").value="";
    document.getElementById("napomena").value="";
}
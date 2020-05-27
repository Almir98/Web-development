var button1 = document.querySelector("#IzbornikDugme");
var izbornik = document.querySelector("#Izbornik");
izbornik.style.height = '0px';
button1.onclick=function(){
    if(izbornik.style.height == '0px'){
        izbornik.style.height = izbornik.scrollHeight + 'px';
    }
    else{
        izbornik.style.height = '0px';
    }
}

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

// $('#forma').validate({
    // rules:{
        // dostavaIme:{
            // regex: /[A-Za-z]/
        // },
        // dostavaAdresa:{
            // regex: /[A-Za-z]/
        // },
        // dostavaPostanskiBroj:{
            // regex: /[0-9]/
        // },
        // dostavaTelefon:{
            // regex: /\+[0-9]{3}\-[0-9]{2}\-[0-9]{3}\-[0-9]{3}/
        // }

    // }
// })

function get1(mojUrl,fun){   
    var zahtjev = new XMLHttpRequest();
    
    zahtjev.onload  = function() { 
            if (zahtjev.status === 200) { 
                var r=JSON.parse(zahtjev.responseText);
                fun(r); 
               }
            else {  
                alert("Server javlja grešku: " + zahtjev.statusText);  
            }  
    }
    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");  
    };

    zahtjev.open("GET", mojUrl, true);
    zahtjev.send(null);
}
get1('http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll',function(x){
   var body=$("tbody");
   x.forEach(function(el){
       var red = $("<tr></tr>");
       red.appendTo(body);
       $("<td>" + el.narudzbaID + "</td>").appendTo(red);
       $("<td>" + el.datumNarudzbe + "</td>").appendTo(red);
       $("<td>" + el.dostavaIme + "</td>").appendTo(red);
       $("<td>" + el.dostavaAdresa + "</td>").appendTo(red);
       $("<td>" + el.dostavaPostanskiBroj + "</td>").appendTo(red);
       $("<td>" + el.dostavaTelefon + "</td>").appendTo(red);
       $("<td>" + el.napomena + "</td>").appendTo(red);
   });
})
var button = document.querySelector("#button");
button.addEventListener('click',function(){

    var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj';
    
    var zahtjev = new XMLHttpRequest();
    var objekat = {
        dostavaIme:document.querySelector("#dostavaIme").value,
        dostavaAdresa:document.querySelector("#dostavaAdresa").value,
        dostavaPostanskiBroj:document.querySelector("#dostavaPostanskiBroj").value,
        dostavaTelefon:document.querySelector("#dostavaTelefon").value,
        napomena: document.querySelector("#napomena").value
    };
    
    zahtjev.onload  = function() { 
            if (zahtjev.status === 200) {  

            }
            else {  
                alert("Server javlja grešku: " + zahtjev.statusText);  
            }  
    }

    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");  
    };
    var strobj = JSON.stringify(objekat);
    zahtjev.open("POST", mojUrl, true);
    zahtjev.setRequestHeader("Content-Type","application/json");
    zahtjev.send(strobj);

    document.querySelector('#dostavaAdresa').value = '';
    document.querySelector('#dostavaIme').value = '';
    document.querySelector('#dostavaPostanskiBroj').value = '';
    document.querySelector('#dostavaTelefon').value = '';
    document.querySelector('#napomena').value = '';
})


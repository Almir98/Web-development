$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#formaid").validate({

    rules:
    {
        DostavaIme:{
            required:true,
            regex:/[A-Za-z]{1,}/
        },
        DostavaAdresa:{
            required:true,
            regex:/[A-Za-z]{1,}/
        },
        DostavaTelefon:{
            required:true,
            regex:/^\+[0-9]{3}\-[0-9]{3}\-[0-9]{3}-[0-9]{3}$/
        },
        indeks:{
            regex:/^\IB1[0-9]{5}$/
        },
        Napomena:
        {
            required:true,
            regex:/[A-Za-z]{5,}/
        }
    },
    messages:{
        DostavaIme:("Ime mora sadrzavat slova."),
        DostavaAdresa:("Adresa mora sadrzavat bar jedno slovo."),
        DostavaTelefon:("Telefon nije u dobrom formatu."),
        Napomena:("Napomena mora imat bar 5 karaktera."),
        indeks:("Indeks treba bit u formatu IB1xxxxx")

    }
});
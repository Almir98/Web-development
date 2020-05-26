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

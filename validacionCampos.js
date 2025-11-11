class ValidacionCampos {

    constructor(){
        //Declaro el objeto de patrones REGEX
        const patterns = {
            dni: /^[x]*\d{8}[a-z]$/i     
          };

        const inputs = document.querySelectorAll('input');
          
    }


    // ------------NOMBRE---------
    //Que empiece por mayúscula  

      iniciar(){

        inputs.forEach((input) => {
            input.addEventListener('keyup', (e) => {
                if(e.target.name == "dni"){
                    validarMayus(e.target, regex)
                }
                validarMayus(e.target, patterns[e.target.attributes.name.value]);
            });
        });
    
      }
    

    //Campo del formulario, utilizando la expresión regular (variable 'regex')
     validarMayus(campo, regex){
        //test() comprueba que el valor recibido (e.target) cumple la expresión regular recibida (patterns[e.target.attributes.name.value]) 
        if(regex.test(campo.value)){
            campo.className = 'valido';
        }else {
            campo.className = 'invalido';
        }
    }
    // ------------APELLIDO---------
    // ------------DNI/NIE---------
    // -----------FECHA_NAC---------
    // ------------CP-------------
    // ------------E_MAIL---------
    // ------------TLF_FIJO---------
    // ------------TLF_MOVIL---------
    // ------------IBAN---------
    // ------------TARJETA_CREDITO---------
    // ------------CONTRASENA---------
    // ------------REPETIR_CONTRASENA---------


    // ------------SESSION_STORAGE---------

}
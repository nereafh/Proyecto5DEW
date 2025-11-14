class ValidacionCampos {

    constructor(){
        //Declaro el objeto de patrones REGEX
        this.patterns = {
            nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/   
          };

         this.inputs = document.querySelectorAll('input');
          
    }

    //---------EVENTOS-------
    // ------------NOMBRE---------
    //Que empiece por mayúscula  

      iniciar(){

        this.inputs.forEach((input) => {
            input.addEventListener('keyup', (e) => {

                const name = e.target.name; //nombre del campo que guardo en la variable name para mayor comodidad
                const regex = this.patterns[name];

                if(regex){
                    this.validarMayus(e.target, regex);
                }
            });
        });
    
      }
    

    //Campo del formulario, utilizando la expresión regular (variable 'regex')
     validarMayus(campo, regex){
        //test() comprueba que el valor recibido (e.target) cumple la expresión regular recibida (patterns[e.target.attributes.name.value]) 
        if(regex.test(campo.value)){
            campo.classList.remove("invalido");
            campo.classList.add("valido");
        }else {
            campo.classList.remove("valido");
            campo.classList.add("invalido");
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


//---------CREACIÓN DEL OBJETO------
const validar = new ValidacionCampos();
validar.iniciar();
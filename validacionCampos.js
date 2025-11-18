class ValidacionCampos {

    constructor(){
        //Declaro el objeto de patrones REGEX
        this.patterns = {
            nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/,  
            apellidos: /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+$/,          
            dni: /^[XYZ]?\d{7,8}[A-Za-z]$/,
            fecha_nac: /^((31[\/-](0[13578]|1[02]))[\/-](19|20)\d{2}|(29|30)[\/-](0[13-9]|1[0-2])[\/-](19|20)\d{2}|29[\/-]02[\/-](19|20)(0[48]|[2468][048]|[13579][26])|(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])[\/-](19|20)\d{2})$/,
            cp:/^[0-5]\d{4}$/,
            email: /^[a-zA-Z0-9._%+-ñáéíóúüÁÉÍÓÚÜÑ]{5,12}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            tlf_fijo: /^[89]\d{8}$/,
            tlf_movil: /^[67]\d{8}$/,
            iban: /^ES\d{22}$/,
            tarjeta_credito: /^\d{16}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/,
            repit_password: null //se valida con método
          };

         this.inputs = document.querySelectorAll('input');
         this.form = document.querySelector('form');
         this.btnGuardar = document.getElementById("btnGuardar");
         this.btnRecuperar = document.getElementById("btnRecuperar");
          
    }

    //---------EVENTOS-------

      iniciar(){

        //añado eventos a todos los inputs
        this.inputs.forEach((input) => {
            input.addEventListener('keyup', (e) => {

                const name = e.target.name; //nombre del campo que guardo en la variable name para mayor comodidad
                const regex = this.patterns[name]; //obtengo regex del objeto

                //Validación repetición contraseña
                if(name == "repit_password"){
                    this.validarRepetir(e.target);
                }else if(regex){
                    this.validarMayus(e.target, regex);
                }
            });
        });
    
    

      

    //GUARDAR
    this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.guardarSession();
    });

    //RECUPERAR 
    this.btnGuardar.addEventListener('click', () => this.guardarSession());
    this.btnRecuperar.addEventListener('click', () => this.recuperarSession());
}

   // ------------NOMBRE y APELLIDOS---------
    //Que empiece por mayúscula  
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

    // ------------REPETIR_CONTRASENA---------
    validarRepetir(campo){
        let password = document.querySelector('input[name="password"]').value;
        if(campo.value === password && password !== ""){
            campo.classList.remove("invalido");
            campo.classList.add("valido");
        }else{
            campo.classList.remove("valido");
            campo.classList.add("invalido");
        }

    }

    // ------------SESSION_STORAGE---------
    /*
    Si se quieren guardar objetos, arrays... se necesita usar JSON.stringify() al guardar
    y JSON.parse() al recuperar

    Estructura: sessionStorage.setItem("clave", "valor");
    */
    guardarSession(){
        //Objeto vacío
        let datos = new Object();
        let validado = true;

        //this.inputs es el resultado de document.querySelectorAll('input') por lo que es un NodeList que se recorre con forEach(), mientras que for se utiliza para recorrer las propiedades de un objeto
        this.inputs.forEach(input => {
            datos[input.name] = input.value; //Guardo cada valor en el objeto datos

            //Valido el input
            if(input.name === 'repit_password'){
                this.validarRepetir(input);
            } else {
                const regex = this.patterns[input.name];
                if(regex){
                    this.validarMayus(input, regex);
                }
            }


        // Si algún campo está vacío o no válido, no guardar
        if(input.value.trim() === "" || !input.classList.contains("valido")){
            validado = false;
        }


        });

        if(validado){

        
        sessionStorage.setItem("registro", JSON.stringify(datos));
        alert("Guardado");
        } else {
            alert("no guardado");
        }
    }

recuperarSession(){
    // Obtenemos los datos del sessionStorage
    const datosRecuperados = JSON.parse(sessionStorage.getItem("registro"));

    // Si existen datos, los colocamos en los inputs
    if(datosRecuperados){
        this.inputs.forEach(input => {
            if(datosRecuperados[input.name] !== undefined){
                input.value = datosRecuperados[input.name];

                // Validamos automáticamente al recuperar
                if(input.name === "repit_password"){
                    this.validarRepetir(input);
                } else {
                    const regex = this.patterns[input.name];
                    if(regex) this.validarMayus(input, regex);
                }
            }
        });
        alert("Datos recuperados correctamente!");
    } else {
        alert("No hay datos guardados.");
    }
}

    /*
    nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/
    ^ comienzo de la cadena, $ finalización
    [A-ZÁÉÍÓÚÑ] primera letra obligatoria en mayúsculas, incluyendo acentos y ñ
    [a-záéíóúñ] el resto minúsuclas, permitiendo acentos y ñ
    + una o mas letras

    */

    /*
    apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/,

    [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ una o mas letras, la primera con mayúscula, incluye acentos y ñ
                espacio
    [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ una o mas letras, la primera con mayúscula, permite acentos y ñ

    */
    
    // ------------DNI/NIE---------
    /*
    dni: /^[XYZ]?\d{7,8}[A-Za-z]$/

    [XYZ]? opcional, letra X,Y o Z (NIE)
    \d{7,8} después 7 mínimo, 8 máximo números seguidos
    [A-Za-z] letra final del DNI/NIE incluyendo mayúsculas y minúsculas

    */

    // -----------FECHA_NAC---------
    /*
    formato YYYY-MM-DD: fecha_nac: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    sino poner input a text y permitir - /


    fecha_nac: /^((31[\/-](0[13578]|1[02]))[\/-](19|20)\d{2}|(29|30)[\/-](0[13-9]|1[0-2])[\/-](19|20)\d{2}|29[\/-]02[\/-](19|20)(0[48]|[2468][048]|[13579][26])|(0[1-9]|1\d|2[0-8])[\/-](0[1-9]|1[0-2])[\/-](19|20)\d{2})$/

    Bloque1
    (31  Día 31
    \/
    (0[13578]|1[02])) Meses que acaben en 31: 1,3,5,7,8,10,12
    \/
    (19|20)\d{2} Años del 1900-2099 donde sus meses acaben en 31 

    Bloque2, lo mismo pero con meses acabados en 29 y 30
    |(29|30)
    \/
    (0[13-9]|1[0-2])
    \/
    (19|20)\d{2}
    
    Bloque3, valido febrero
    |29
    \/
    02
    \/
    (19|20)(0[48]|[2468][048]|[13579][26]) años bisiestos
    
    Bloque4, cualquier mes
    |(0[1-9]|1[0-9]|2[0-8]) Días 01-28
    \/
    (0[1-9]|1[0-2]) Meses 1-12
    \/
    (19|20)\d{2} Años, por lo menos dos dígitos más 1900-2099

    */


    // ------------CP-------------
    /*
    cp:/^[0-5]\d{4}$/

    [0-5]\d{4} un dígito entre 0-5 y luego 4 dígitos más con cualquier número del 0-9
    [0-5][0-9]{4} otra forma de hacer lo mismo

    */


    // ------------E_MAIL---------
    /*
    email: /^[a-zA-Z0-9._%+-ñáéíóúüÁÉÍÓÚÜÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    email: /^[a-zA-Z0-9._%+-ñáéíóúüÁÉÍÓÚÜÑ]{5,12}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ igual pero entre 5 y 12 caracteres

    
    [a-zA-Z0-9._%+-ñáéíóúüÁÉÍÓÚÜÑ]+ minimo 1+, letras, numeros, guiones, caracteres especiales, acentos, ñ
    @ obligatorio que empiece así
    [a-zA-Z0-9.-]+ minimo 1+, dominio, sin acentos ni ñ
    \.[a-zA-Z]{2,} finalización, mínimo 2 letras

    */


    // ------------TLF_FIJO---------
    /*
    tlf_fijo: /^[89]\d{8}$/
    [89] primer dígito 8 o 9
    \d{8} siguientes ocho dígitos entre 0-9
    */


    // ------------TLF_MOVIL---------
    /*
    tlf_movil: /^[67]\d{8}$/
    [67] primer dígito 6 o 7
    \d{8} siguientes ocho dígitos entre 0-9
    */


    // ------------IBAN---------
    /*
    iban: /^ES\d{22}$/,

    ES comienza obligatoriamente por ES
    \d{22} los siguientes 22 dígitos numéricos entre 0-9
    */


    // ------------TARJETA_CREDITO---------
    /*
    tarjeta_credito: /^\d{16}$/

    \d{16} exactamente dieciseis dígitos entre 0-9
    */

    // ------------CONTRASENA---------
    /*
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/
    Para obligar a que cada caracter aparezca al menos una vez en cualquier posición: (?=.*[])

    (?=.*[a-z]) al menos una letra minúscula
    (?=.*[A-Z]) al menos una letra mayúscula
    (?=.*\d) al menos un dígito numérico 
    (?=.*[!@#$%^&*]) al menos un caracter especial
    [A-Za-z\d!@#$%^&*]{12, 18} letras, números, caracteres especiales, mínimo 12 máximo 18

    */





}


//---------CREACIÓN DEL OBJETO------
const validar = new ValidacionCampos();
validar.iniciar();
document.addEventListener('DOMContentLoaded', () => {
    
    var ultimoCierre = localStorage.getItem('ultimoCierre');
    //comprobamos si el formulado ya ha sido enviado
    var enviado = localStorage.getItem('enviado');
    //comprobamos si ha pasado una semana desde que se cerró por última vez
    //var semana = ultimoCierre && (new Date().getTime() > parseInt(ultimoCierre) + 7 * 24 * 60 * 60 * 1000);
    //para hacer la prueba del código en vez de tomar una semana de tiempo hemos tomado 2 minutos
    var semana = ultimoCierre && (new Date().getTime() > parseInt(ultimoCierre) + 2 * 60 * 1000);

    //comprobacion de que hay un último cierre y ha ocurrido hace menos de una semana
    //si esto se cumple no se muestra el popup
    //sino (ha pasado más de una semana o no ha habido ningún cierre del popup) se muestra
    if (ultimoCierre == null || (semana && !enviado)){
        setTimeout(function () {
            document.getElementById('popup').style.display = 'block';
        }, 500);
    }

    var cerrarPopup = document.getElementById('close');
    var popup = document.getElementById('popup');

    cerrarPopup.addEventListener('click', function () {
        popup.style.display = 'none';
        localStorage.setItem('ultimoCierre', new Date().getTime().toString());
    });

    var formulario = document.getElementById('formulario');
    var telefono = document.getElementById('tel');

    formulario.addEventListener('submit', function (event){
        event.preventDefault();

        if (validarTelefono(telefono.value)){
            // Actualizar el estado de envío del formulario en almacenamiento local
            localStorage.setItem('enviado', 'true');
            document.getElementById('popup').style.display = 'none';
            // Enviar evento de seguimiento a Google Analytics (por ejemplo)
            // ga('send', 'event', 'Formulario', 'Envío Correcto');
            alert('Gracias por solicitar información! Nos pondremos en contacto contigo lo antes posible');
            // Bloquear el popup permanentemente cuando el usuario envía el formulario
            //bloquearExperimento();
        }
        else{
            alert ('Debes introducir un teléfono válido');
        }
    });

    function validarTelefono(telefono) {
        var regexTelefono = /^[679]\d{8}$/;
        return regexTelefono.test(telefono);
    }

        // Función para bloquear el experimento
        // function bloquearExperimento() {
            // Si el formulario ya se ha enviado, bloquear permanentemente
            // Esto dependerá de la implementación específica de la herramienta de test A/B
        // }

        console.log("ultimoCierre:", ultimoCierre);
        console.log("enviado:", enviado);
        console.log("semana:", semana);        
});


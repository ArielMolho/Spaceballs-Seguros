// Validación
var validation;
(function() {
    'use strict';
    $(document).ready(function() {
        var forms = $('.needs-validation');
        validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event){
                event.preventDefault();
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                $("#cotizarBoton").text("Cotizar Póliza");
                $("#cotizarBoton").css("color", "#FF0000");
                procesarFormulario ();
            }, false);
        });
    }, false);
})();

// Inicialización
var nombre;
var email;
var modelo;
var antiguedad;
var seguroTipo;
var valorNave;
var valorAsegurable;
var porcentajeAsegurable;
var primaAnual;
var infoSolicitante;
var nuevaPoliza;

// Eventos y Funciones
function valorResidualNave (){
    // Cálculo de póliza 1: valor residual asegurable = valor nave - depreciación por antiguedad
    for (var i=0; i<starships.length; i++){
        if (modelo == starships[i].model) {
            //console.log(`El valor de esta nave nueva ${starships[i].cost_in_credits} de créditos y tiene una depreciación anual del 10%`); // para control
            valorNave = parseInt(starships[i].cost_in_credits);
            valorNave = (valorNave-(valorNave*antiguedad*0.1));
            //console.log(valorNave); // para control
        }
    };
};

function procesarPoliza (){
    valorResidualNave ();
    if(seguroTipo == "Bronce") {
        porcentajeAsegurable = 0.5;
    } else if (seguroTipo == "Plata") {
        porcentajeAsegurable = 0.65;
    } else if (seguroTipo == "Oro") {
        porcentajeAsegurable = 0.85;
    } else if (seguroTipo == "Platino") {
        porcentajeAsegurable = 1;
    }
    
    //Cálculo de póliza 2: valor a segurar = valor asegurable * porcentaje a asegurar según póliza seleccionada
    valorAsegurable = (valorNave*porcentajeAsegurable);
    
    //Cálculo de póliza 3: prima = valor a segurar * porcentaje que se considera de reaseguro anual
    primaAnual = ((valorAsegurable/10)*(porcentajeAsegurable/10));

    // JSON
    infoSolicitante = {
        "nombre": nombre,
        "email": email,
        "modelo": modelo,
        "antiguedad": antiguedad,
        "valorNave": Math.round(valorNave),
        "asegurable": Math.round(valorAsegurable),
        "poliza": seguroTipo,
        "porcentajeAsegurable": porcentajeAsegurable,
        "prima": Math.round(primaAnual)
    };
    
    // Modal Output
    modal();
    $('#cotizarBoton').prop('disabled', true);
};

function procesarFormulario (){
    $("#cotizarBoton").click( function(){
        nombre = $("#name").val();
        email = $("#email").val();
        modelo = $("#formSelectShip").val();
        antiguedad = $("#formSelectAge").val();
        seguroTipo = $("#formSelectCoverage").val();
        nuevaPoliza = new InsuredShip(modelo, antiguedad, seguroTipo);
        nuevaPoliza.getEvaluation();
    })
};

function modal(){
    $("#modal-body").append(
        `<p>Estimado/a ${infoSolicitante["nombre"]}, <br>
        Gracias por confiar en Spaceballs Seguros ©. A continuación le detallamos la información de su póliza: <br>
        - Nave: ${infoSolicitante["modelo"]} <br>
        - Antigüedad: ${infoSolicitante["antiguedad"]} <br>
        - Valor Asegurable: ${infoSolicitante["asegurable"]} de créditos. <br>
        <br>
        Habiendo seleccionado la póliza ${infoSolicitante["poliza"]}, la cobertura máxima es del ${(infoSolicitante["porcentajeAsegurable"]*100)}%. <br>
        Su prima anual será de ${infoSolicitante["prima"]} de créditos por el/los próximo(s) ${(10-infoSolicitante["antiguedad"])} año(s). <br>
        <br>
        Le agradecemos la confianza en Spaceballs Seguros © <br>
        <br>
        Que la fuerza lo acompañe y larga vida al Imperio.</p>`
    );
    $("#staticBackdrop").modal({show: true});
};

function limpiarFormulario (){
    $("#limpiarForm").click( function(){
        if ($("#cotizarBoton").text() == "Cotizar Póliza") {
            $("#cotizarBoton").text("validar Datos");
            $("#cotizarBoton").css("color", "#FFE81F");
        }
        location.reload();
    })
};
limpiarFormulario ();

//Elementos ocultos o inactivos al iniciar el cotizador
$(document).ready(function () {
    $("#confirm").hide();
    $("#close").hide();
    validateStorage();
});

function validateStorage(){
    var valmodelo = localStorage.Modelo;
    if (valmodelo != null && valmodelo != '') {
        $('#ultimaCotBoton').prop('disabled', false);
    } else {
        $('#ultimaCotBoton').prop('disabled', true);
    };
}

//Animación con fadeIn para confirmar póliza
$("#confirmarPoliza").click(function(){ 
    $("#confirm").fadeIn(2000);
    $("#close").fadeIn(2000); 
});

$("#confirmarPolizaLast").click(function(){ 
    $("#confirmLast").fadeIn(2000);
    $("#closeLast").fadeIn(2000); 
});
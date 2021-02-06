// Validación
var validation;
(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                procesarFormulario ();
            }, false);
        });
    }, false);
})();

// Inicialización
var nombre = document.getElementById("name");
var email = document.getElementById("email");
var modelo = document.getElementById("formSelectShip");
var modelSelected;
var antiguedad = document.getElementById("formSelectAge");
var ageSelected;
var seguroTipo = document.getElementById("formSelectCoverage");
var insuranceSelected;
var valorNave;
var valorAsegurable;
var porcentajeAsegurable;
var primaAnual;
var cotizarBoton = document.getElementById('cotizarBoton');
var infoSolicitante;

// Eventos y Funciones
function valorResidualNave (){
    // Cálculo de póliza: valor residual asegurable = valor nave - depreciación por antiguedad
    if (modelSelected == 'Star Destroyer') {                
        console.log("El valor de esta nave nueva 150 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (150000000-(150000000*ageSelected*0.1));
    } else if (modelSelected == 'Dreadnought Super Star Destroyer') {                
        console.log("El valor de esta nave nueva 325.000 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (325000000000-(325000000000*ageSelected*0.1));
    } else if (modelSelected == 'Mon Calamari Star Cruiser') {                
        console.log("El valor de esta nave nueva 88 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (88000000-(88000000*ageSelected*0.1));
    } else if (modelSelected == 'Corellian Corvette') {                
        console.log("El valor de esta nave nueva 3.5 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (3500000-(3500000*ageSelected*0.1));
    } else if (modelSelected == 'Corellian Hammerhead Corvette') {   
        console.log("El valor de esta nave nueva 1.5 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (1500000-(1500000*ageSelected*0.1));
    } else if (modelSelected == 'Corellian Freighter') {   
        console.log("El valor de esta nave nueva 100.000 créditos y tiene una depreciación anual del 10%");
        valorNave = (100000-(100000*ageSelected*0.1));
    }
}

function procesarPoliza (){
    valorResidualNave ();
    if(insuranceSelected == "Bronce") {
        porcentajeAsegurable = 0.5;
    } else if (insuranceSelected == "Plata") {
        porcentajeAsegurable = 0.65;
    } else if (insuranceSelected == "Oro") {
        porcentajeAsegurable = 0.85;
    } else if (insuranceSelected == "Platino") {
        porcentajeAsegurable = 1;
    }
    
    //Cálculo de póliza: valor a segurar = valor asegurable * porcentaje a asegurar según póliza seleccionada
    valorAsegurable = (valorNave*porcentajeAsegurable);
    
    //Cálculo de póliza: prima = valor a segurar * porcentaje que se considera de reaseguro anual
    primaAnual = ((valorAsegurable/10)*(porcentajeAsegurable/10));
}

function procesarFormulario (){
    cotizarBoton.addEventListener('click', function(event){
        nombre = nombre.value;
        email = email.value;
        modelSelected = modelo.options[modelo.selectedIndex].value;
        ageSelected = antiguedad.options[antiguedad.selectedIndex].value;
        insuranceSelected = seguroTipo.options[seguroTipo.selectedIndex].value;
        if (ageSelected >= 10) {
            alert(`${nombre}, su nave ${modelSelected}, ya no es asegurable. Que la fuerza te acompañe!`);
        } else {
            procesarPoliza ();
            
            // JSON
            infoSolicitante = {
                "nombre": nombre,
                "email": email,
                "modelo": modelSelected,
                "antiguedad": ageSelected,
                "valorNave": valorNave,
                "asegurable": valorAsegurable,
                "poliza": insuranceSelected,
                "porcentajeAsegurable": porcentajeAsegurable,
                "prima": Math.round(primaAnual)
            };
            
            // Modal Output
            modal();
        }
    })
}

function modal(){
    var myContenedor = document.getElementById("modal-body");
    var myPoliza = document.createElement('p');
    myPoliza.innerHTML = 
        `Estimado/a ${infoSolicitante["nombre"]}, <br>
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
        Que la fuerza lo acompañe y larga vida al Imperio.`;
    myContenedor.appendChild(myPoliza);
    $("#staticBackdrop").modal({show: true});
}
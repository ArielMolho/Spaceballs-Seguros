var validation;
(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            procesarFormulario ();
        }, false);
    });
    }, false);
})();

var nombre = document.getElementById("name");
var email = document.getElementById("email");
var modelo = document.getElementById("formSelectShip");
var modelSelected;
var antiguedad = document.getElementById("formSelectAge");
var ageSelected;
var seguroTipo = document.getElementById("formSelectCoverage");
var insuranceSelected;
var valorNave;

let cotizarBoton = document.getElementById('cotizarBoton');
function procesarFormulario (){
    cotizarBoton.addEventListener('click', function(event){
        event.preventDefault();
        nombre = nombre.value;
        email = email.value;
        modelSelected = modelo.options[modelo.selectedIndex].value;
        ageSelected = antiguedad.options[antiguedad.selectedIndex].value;
        insuranceSelected = seguroTipo.options[seguroTipo.selectedIndex].value;
        if (ageSelected >= 10) {
            alert(`${nombre}, su nave ${modelSelected}, ya no es asegurable. Que la fuerza te acompañe!`);
        } else {
            //Cálculo de póliza: valor residual asegurable = valor nave - depreciación por antiguedad
            switch(modelSelected){
                case "Star Destroyer":
                    console.log("El valor de esta nave nueva 150 millones de créditos y tiene una depreciación anual del 10%");
                    valorNave = (150000000-(150000000*ageSelected*0.1));
                    break;
                case "Dreadnought Super Star Destroyer":
                    console.log("El valor de esta nave nueva 325.000 millones de créditos y tiene una depreciación anual del 10%");
                    valorNave = (325000000000-(325000000000*ageSelected*0.1));
                    break;
                case "Mon Calamari Star Cruiser":
                    console.log("El valor de esta nave nueva 88 millones de créditos y tiene una depreciación anual del 10%");
                    valorNave = (88000000-(88000000*ageSelected*0.1));
                    break;
                case "Corellian Corvette":
                    console.log("El valor de esta nave nueva 3.5 millones de créditos y tiene una depreciación anual del 10%");
                    valorNave = (3500000-(3500000*ageSelected*0.1));
                    break;
                case "Corellian Hammerhead Corvette":
                    console.log("El valor de esta nave nueva 1.5 millones de créditos y tiene una depreciación anual del 10%");
                    valorNave = (1500000-(1500000*ageSelected*0.1));
                    break;
                case "Corellian Freighter":
                    console.log("El valor de esta nave nueva 100.000 créditos y tiene una depreciación anual del 10%");
                    valorNave = (100000-(100000*ageSelected*0.1));
                    break;
            }
            
            var porcentajeAsegurable;
            
            switch(insuranceSelected){
                case "Bronce":
                    porcentajeAsegurable = 0.5;
                    break;
                case "Plata":
                    porcentajeAsegurable = 0.65;
                    break;
                case "Oro":
                    porcentajeAsegurable = 0.85;
                    break;
                case "Platino":
                    porcentajeAsegurable = 1;
                    break;
            }
            
            //Cálculo de póliza: valor a segurar = valor asegurable * porcentaje a asegurar según póliza seleccionada
            var valorAsegurable = (valorNave*porcentajeAsegurable);
            
            //Cálculo de póliza: prima = valor a segurar * porcentaje que se considera de reaseguro anual
            var primaAnual = ((valorAsegurable/10)*(porcentajeAsegurable/10));
            
            var infoSolicitante = {
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
            
            //Se que esto queda fatal en el HTML. Planeo que sea un modal o tal vez que abra una página nueva con la información.
            var myContenedor = document.getElementById("contenedor-poliza");
            var myPoliza = document.createElement('p');
            myPoliza.innerHTML = 
                `Estimado/a ${infoSolicitante["nombre"]}, <br>
                Gracias por confiar en Spaceballs Seguros ©. A continuación le detallamos la información de su póliza: <br>
                - Nave: ${infoSolicitante["modelo"]} <br>
                - Antigüedad: ${infoSolicitante["antiguedad"]} <br>
                - Valor Asegurable: ${infoSolicitante["asegurable"]} de créditos. <br>
                <br>
                Habiendo seleccionado la póliza ${infoSolicitante["poliza"]}, la cobertura máxima es del ${(infoSolicitante["porcentajeAsegurable"]*100)}%. <br>
                Su prima anual será de ${infoSolicitante["prima"]} de créditos. <br>
                <br>
                Le agradecemos la confianza en Spaceballs Seguros © <br>
                <br>
                Que la fuerza lo acompañe y larga vida al Imperio.`;
            
            if (infoSolicitante["nombre"] && infoSolicitante["email"] && infoSolicitante["modelo"] && infoSolicitante["antiguedad"] && infoSolicitante["poliza"]) {
                myContenedor.appendChild(myPoliza);
            }
        }
    })
}
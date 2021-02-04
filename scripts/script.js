var nombre = document.getElementById("name");
nombre.value;
var email = document.getElementById("email");
email.value;
var modelo = document.getElementById("formSelectShip");
modelo.value;
var antiguedad = parseInt(document.getElementById("formSelectAge"));
antiguedad.value;
var valorNave;

let cotizarBoton = document.getElementById('cotizarBoton');
cotizarBoton.addEventListener('submit', function(event){
    event.preventDefault();
    if (antiguedad >= 10) {
        alert(`${nombre}, su nave ${modelo}, ya no es asegurable. Que la fuerza te acompañe!`);
    } else {
        //Cálculo de póliza: valor residual asegurable = valor nave - depreciación por antiguedad
        switch(modelo){
            case "Star Destroyer":
                console.log("El valor de esta nave nueva 150 millones de créditos y tiene una depreciación anual del 10%");
                valorNave = (150000000-(150000000*antiguedad*0.1));
                break;
            case "Dreadnought Super Star Destroyer":
                console.log("El valor de esta nave nueva 325.000 millones de créditos y tiene una depreciación anual del 10%");
                valorNave = (325000000000-(325000000000*antiguedad*0.1));
                break;
            case "Mon Calamari Star Cruiser":
                console.log("El valor de esta nave nueva 88 millones de créditos y tiene una depreciación anual del 10%");
                valorNave = (88000000-(88000000*antiguedad*0.1));
                break;
            case "Corellian Corvette":
                console.log("El valor de esta nave nueva 3.5 millones de créditos y tiene una depreciación anual del 10%");
                valorNave = (3500000-(3500000*antiguedad*0.1));
                break;
            case "Corellian Hammerhead Corvette":
                console.log("El valor de esta nave nueva 1.5 millones de créditos y tiene una depreciación anual del 10%");
                valorNave = (1500000-(1500000*antiguedad*0.1));
                break;
            case "Corellian Freighter":
                console.log("El valor de esta nave nueva 100.000 créditos y tiene una depreciación anual del 10%");
                valorNave = (100000-(100000*antiguedad*0.1));
                break;
            default:
                console.log("Su nave no se encuentra en nuestra base de datos. Por favor contacte a un asesor para una propuesta personalizada.");
                break;
        }
        
        var seguroTipo = document.getElementById("formSelectCoverage");
        seguroTipo.value;
        var porcentajeAsegurable;
        
        switch(seguroTipo){
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
            default:
                console.log("No ha seleccionado una covertura que podamos ofrecer. Por favor contacte a un asesor para una propuesta personalizada.");
                break;
        }
        
        //Cálculo de póliza: valor a segurar = valor asegurable * porcentaje a asegurar según póliza seleccionada
        var valorAsegurable = (valorNave*porcentajeAsegurable);
        
        //Cálculo de póliza: prima = valor a segurar * porcentaje que se considera de reaseguro anual
        var primaAnual = ((valorAsegurable/10)*(porcentajeAsegurable/10));
        
        var infoSolicitante = {
            "nombre": nombre,
            "email": email,
            "modelo": modelo,
            "antiguedad": antiguedad,
            "valorNave": valorNave,
            "asegurable": valorAsegurable,
            "poliza": seguroTipo,
            "porcentajeAsegurable": porcentajeAsegurable,
            "prima": primaAnual
        };
        
        //Se que esto queda fatal en el HTML. Planeo que sea un modal o tal vez que abra una página nueva con la información.
        var myContenedor = document.getElementById("contenedor-poliza");
        var myPoliza = document.createElement('p');
        myPoliza.innerHTML = 
            `Estimado/a ${infoSolicitante["nombre"]}, <br>
            Gracias por confiar en Spaceballs Seguros ©. A continuación le detallamos la información de su póliza: <br>
            - Nave: ${infoSolicitante["modelo"]} <br>
            - Antigüedad: ${infoSolicitante["antiguedad"]} <br>
            - Valor Asegurable: ${infoSolicitante["asegurable"]} <br>
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
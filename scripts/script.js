var nombre = prompt("¿Cual es su nombre?");
var modelo = prompt("¿Qué tipo de nave espacial posee?").toUpperCase();
var esValido = false;
var miNave;

function edadNumeroPositivo() {
    while(!esValido) {
        var ingresarNumero = parseInt(prompt(`${nombre}, ¿Cuál es la antigüedad de la misma? (en años)`));
        validarNumero(ingresarNumero);
    }
}

edadNumeroPositivo();

function validarNumero(numero) {
    if(numero >= 1) {
        esValido = true;

        miNave = new spaceShip(nombre, modelo, numero);

        alert(miNave.getClientData());
        alert(miNave.getEvaluation());
    }
}

function spaceShip(argName, argModel, argAge) {
    this.name = argName;
    this.model = argModel;
    this.age = argAge;
    
    this.getClientData = function () { 
        return `Hola ${this.name}, por favor confirma que tu nave es un ${this.model} y tiene una antigüedad de ${this.age} año(s)`;
    };
    this.getEvaluation = function () {
        if (this.age > 10) {
            return `Su nave ${this.model}, ya no es asegurable. Que la fuerza te acompañe!`;
        } else {
            return `Su nave ${this.model} es una nave asegurable`;
        }
    }
}

var infoSolicitante = [miNave.name, miNave.model, miNave.age];

var valorNave;
//por ahora lo uso con console.log para no saturar de alerts y prompts
switch(infoSolicitante[1]){
    case "STAR DESTROYER":
        console.log("El valor de esta nave nueva 150 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (150000000-(150000000*infoSolicitante[2]*0.1));
        break;
    case "DREADNOUGHT SUPER STAR DESTROYER":
        console.log("El valor de esta nave nueva 325.000 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (325000000000-(325000000000*infoSolicitante[2]*0.1));
        break;
    case "MON CALAMARI STAR CRUISER":
        console.log("El valor de esta nave nueva 88 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (88000000-(88000000*infoSolicitante[2]*0.1));
        break;
    case "CORELLIAN CORVETTE":
        console.log("El valor de esta nave nueva 3.5 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (3500000-(3500000*infoSolicitante[2]*0.1));
        break;
    case "CORELLIAN HAMMERHEAD CORVETTE":
        console.log("El valor de esta nave nueva 1.5 millones de créditos y tiene una depreciación anual del 10%");
        valorNave = (1500000-(1500000*infoSolicitante[2]*0.1));
        break;
    case "CORELLIAN FREIGHTER":
        console.log("El valor de esta nave nueva 100.000 créditos y tiene una depreciación anual del 10%");
        valorNave = (100000-(100000*infoSolicitante[2]*0.1));
        break;
    default:
        console.log("Su nave no se encuentra en nuestra base de datos. Por favor contacte a un asesor para una propuesta personalizada.");
        break;
}

infoSolicitante.push(valorNave);
//Estas líneas son sólo para verificar que funcione. Serán eliminadas mas adelante.
console.log(infoSolicitante.length);
console.log(infoSolicitante[3]);

var seguroTipo = prompt("¿Qué tipo de cobertura desea contratar? (Bronce, Plata, Oro, Platino)").toUpperCase();
var porcentajeAsegurable;
//por ahora lo uso con console.log para no saturar de alerts y prompts
switch(seguroTipo){
    case "BRONCE":
        porcentajeAsegurable = 0.5;
        break;
    case "PLATA":
        porcentajeAsegurable = 0.65;
        break;
    case "ORO":
        porcentajeAsegurable = 0.85;
        break;
    case "PLATINO":
        porcentajeAsegurable = 1;
        break;
    default:
        console.log("No ha seleccionado una covertura que podamos ofrecer. Por favor contacte a un asesor para una propuesta personalizada.");
        break;
}

infoSolicitante.push(porcentajeAsegurable);

var valorAsegurable = (infoSolicitante[3]*infoSolicitante[4]);
console.log(valorAsegurable);
infoSolicitante.push(valorAsegurable);
var primaAnual = ((infoSolicitante[5]/10)*(infoSolicitante[4]/10));
console.log(primaAnual);
infoSolicitante.push(primaAnual);

//Se que esto queda fatal en el HTML pero quería probarlo
document.write(
    `Estimado/a ${infoSolicitante[0]}, <br>
    Gracias por confiar en Spaceballs Seguros ©. A continuación le detallamos la información de su póliza: <br>
    - Nave: ${infoSolicitante[1]} <br>
    - Antigüedad: ${infoSolicitante[2]} <br>
    - Valor Asegurable: ${infoSolicitante[3]} <br>
    <br>
    Habiendo seleccionado la póliza ${seguroTipo}, la cobertura máxima es del ${(infoSolicitante[4]*100)}%. <br>
    Su prima anual será de ${infoSolicitante[6]} de créditos. <br>
    <br>
    Le agradecemos la confianza en Spaceballs Seguros © <br>
    <br>
    Que la fuerza lo acompañe y larga vida al Imperio.
    `
);

//Cálculo póliza
//valor residual asegurable = valor nave - depreciación por antiguedad
//valor a segurar = valor asegurable * porcentaje a asegurar según póliza seleccionada
//prima = valor a segurar * porcentaje que se considera de reaseguro anual
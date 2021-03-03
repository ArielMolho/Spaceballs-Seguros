$("#desestimarPoliza").click(function(){ 
    localStorage.Nombre = infoSolicitante["nombre"];
    localStorage.Email = infoSolicitante["email"];
    localStorage.Modelo = infoSolicitante["modelo"];
    localStorage.Antiguedad = infoSolicitante["antiguedad"];
    localStorage.ValorNave = infoSolicitante["valorNave"];
    localStorage.Asegurable = infoSolicitante["asegurable"];
    localStorage.Poliza = infoSolicitante["poliza"];
    localStorage.PorcentajeAsegurable = infoSolicitante["porcentajeAsegurable"];
    localStorage.Prima = infoSolicitante["prima"];
    $('#ultimaCotBoton').prop('disabled', false);
});

$("#ultimaCotBoton").click(function(){
    var nombreLast = localStorage.Nombre;
    var emailLast = localStorage.Email;
    var modeloLast = localStorage.Modelo;
    var antiguedadLast = localStorage.Antiguedad;
    var valorNaveLast = localStorage.ValorNave;
    var valorAsegurableLast = localStorage.Asegurable;
    var seguroTipoLast = localStorage.Poliza;
    var porcentajeAsegurableLast = localStorage.PorcentajeAsegurable;
    var primaAnualLast = localStorage.Prima;

    // JSON
    infoSolicitanteLast = {
        "nombre": nombreLast,
        "email": emailLast,
        "modelo": modeloLast,
        "antiguedad": antiguedadLast,
        "valorNave": Math.round(valorNaveLast),
        "asegurable": Math.round(valorAsegurableLast),
        "poliza": seguroTipoLast,
        "porcentajeAsegurable": porcentajeAsegurableLast,
        "prima": Math.round(primaAnualLast)
    };
    
    // Modal Output
    modalUltima();
});

function modalUltima(){
    $("#modal-ultima").append(
        `<p>Estimado/a ${infoSolicitanteLast["nombre"]}, <br>
        Gracias por confiar en Spaceballs Seguros ©. La última vez que nos visitó le hicimos la siguiente propuesta de póliza: <br>
        - Nave: ${infoSolicitanteLast["modelo"]} <br>
        - Antigüedad: ${infoSolicitanteLast["antiguedad"]} <br>
        - Valor Asegurable: ${infoSolicitanteLast["asegurable"]} de créditos. <br>
        <br>
        Habiendo seleccionado la póliza ${infoSolicitanteLast["poliza"]}, la cobertura máxima es del ${(infoSolicitanteLast["porcentajeAsegurable"]*100)}%. <br>
        Su prima anual será de ${infoSolicitanteLast["prima"]} de créditos por el/los próximo(s) ${(10-infoSolicitanteLast["antiguedad"])} año(s). <br>
        <br>
        Le agradecemos la confianza en Spaceballs Seguros © <br>
        <br>
        Que la fuerza lo acompañe y larga vida al Imperio.</p>`
    );
    $("div .ultimaCoti").modal({show: true});
    $("#confirmLast").hide();
    $("#closeLast").hide();
};
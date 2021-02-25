var shipDirectory;
$("#cotizarBoton").click(function () {
    $.get("https://swapi.dev/api/starships/",
        function (data, status) {
            console.log("Mi status code es: " + status);
            console.log(data); // para control
            shipDirectory = data;
            console.log(shipDirectory.results); // para control
            // console.log(shipDirectory.results[1]); // para control
        }
    )
});

//Source: https://swapi.dev/
//https://swapi.dev/api/starships/
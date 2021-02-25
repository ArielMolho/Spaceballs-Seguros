var shipDirectory;
$("#getAjax").click(function () {
    $.get("https://swapi.dev/api/starships/",
        function (data, status) {
            console.log("Mi status code es: " + status);
            //console.log(JSON.stringify(data));
            shipDirectory = JSON.stringify(data);
            //console.log(shipDirectory["results"[3]]);
            console.log(shipDirectory);
        }
    )
});

//Source: https://swapi.dev/
//https://swapi.dev/api/starships/
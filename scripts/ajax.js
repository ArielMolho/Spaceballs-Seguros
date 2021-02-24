$("#getAjax").click(function () {
    $.get("https://swapi.dev/api/starships/schema/",
        function (data, status) {
            console.log("mi data es: " + data + " mi status code es: " + status);
        }
    )
});

//Source: https://swapi.dev/
//https://swapi.dev/api/starships/
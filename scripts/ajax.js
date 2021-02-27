//Source: https://swapi.dev/
//https://swapi.dev/api/starships/
//var shipDirectory = [];
// $(document).ready(function () {
//     for(let i=1;i<5;i++) {
//         $.get("https://swapi.dev/api/starships/?page="+i,
//             function (data, status) {
//                 console.log("Mi status code es: " + status);
//                 data.results.forEach(ship=>{
//                     shipDirectory.push(ship);
//                 })                
//                 //console.log(shipDirectory);                
//             }
//         )
//     }
//     console.log(shipDirectory);  
// });

// $(document).ready(function () {
//     for(let i=1;i<5;i++) {
//         $.ajax({
//             url: "https://swapi.dev/api/starships/?page="+i,
//             dataType: "json",
//             success: function (data) {
//                 data.results.forEach(ship=>{
//                     shipDirectory.push(ship);
//                 })
//             }
//         });
//     }
//     console.log(shipDirectory);
// });

const starships = [];

function renderShips(ships) {
    ships.sort(
        sortByPrice("cost_in_credits")
    ); // Ordeno antes de renderizar en pantalla.
    ships = filterUnknownShips(ships); // Me deshago de los ships que tienen price unknown.
    console.log(ships); // para control
    for (const ship of ships) { 
        starships.push(ship);
    }
    
    var select = $("#formSelectShip");
    for(var i = 0; i < starships.length; i++) {
        select.append(
            `<option value="${starships[i].model}">${starships[i].model}</option>`
        );
    } // agrego las naves al listado para seleccion del usuario
}

function getPage(nextUrl, ships) {
    $.ajax({
        url: nextUrl,
        dataType: 'json',
        success: function (response) {
            if (response.next) { 
                ships.push(...response.results);
                getPage(response.next, ships);
            } else {
                renderShips(ships);
            }
        }
    })
}

function getAllPages() {
    const shipDirectory = [];
    const initialUrl = 'https://swapi.dev/api/starships/?page=1';
    getPage(initialUrl, shipDirectory);
}

//Funcion Comparadora
function sortByPrice(prop) {
    return function(a, b) {
        if (parseInt(a[prop]) > parseInt(b[prop])) {
            return 1;
        } else if (parseInt(a[prop]) < parseInt(b[prop])) {
            return -1;
        }
        return 0;
    }
}

function filterUnknownShips(ships) {
    const filteredShips = ships.filter(x => x.cost_in_credits !== 'unknown');
    return filteredShips;
}

$(function() {
    getAllPages();
});
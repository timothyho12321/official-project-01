
// BOILER PLATE CODE from Paul 
// SOURCE: https://gist.githubusercontent.com/kunxin-chor/f1517e174acaf8d4d7196ad70b447f39/raw/0cabdff18d8ec0571b382346f97d020af63666a6/script.js
// Use DOMContentLoaded as our main entry point
window.addEventListener("DOMContentLoaded", async function () {

    // SETUP //////////////////////////////////////////////////////////////////
    // create a map object
    let map = L.map('map');
    // set the center point and the zoom
    map.setView([1.35, 103.81], 12);

    // need set up the tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);

    // CODE FOR CREATING ICON
    // SOURCE OF ICON IMAGE: <a href="https://www.flaticon.com/free-icons/park" title="park icons">Park icons created by Freepik - Flaticon</a>
    let parkIcon = L.icon({
        iconUrl: 'park-icon.png',

        iconSize: [60, 80],
        iconAnchor: [10, 50],
        popupAnchor: [-3, -76]
    })


    // PLACING ICON ON THE MAP
    let parkMarker = L.marker([1.3634, 103.8436], { icon: parkIcon });
    parkMarker.addTo(map);

    // Add popup marker to park icon
    parkMarker.bindPopup(`<h2>This is Ang Mo Kio Park</h2>`);
    //////////////////////////////////////////////////////////////////////////
})

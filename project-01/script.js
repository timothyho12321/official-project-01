
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
        iconUrl: 'tree.png',

        iconSize: [45, 50],
        iconAnchor: [23, 45],
        popupAnchor: [-3, -76]
    })

    // PLACING ICON ON THE MAP
    let parkMarker = L.marker([1.2890, 103.8604], { icon: parkIcon });
    parkMarker.addTo(map);

    // Add popup marker to park icon
    parkMarker.bindPopup(`<h2>This is Ang Mo Kio Park</h2>`);


    // Adding Npark tracks 
    // Read in geojson data for park connector track 
    let connectorResponse = await axios.get("nparks-tracks-geojson.geojson");
    // console.log(connectorResponse.data);

    //Create Park Connector Track Network Layer
    let connectorLayer = L.geoJson(connectorResponse.data, {

        onEachFeature: function (features, subLayer) {
            let holderElement = document.createElement("div");
            holderElement.innerHTML = features.properties.Description;

            let tdNum = holderElement.querySelectorAll("td");
            // console.log(tdNum);
            let connectorName = tdNum[0].innerText;
            // console.log(connectorName);
            let connectorKind = tdNum[1].innerText;
            subLayer.bindPopup(`<h5>Connect your journey via <div> this ${connectorKind.toLowerCase()} at ${connectorName}. </div></h5>`);
        }
    });
    connectorLayer.addTo(map);

    // Adjust style of park connector layer
    connectorLayer.setStyle({
        'color': '#FD5DA8',
        'strokeWidth': '0.5'

    })


    // Display geojson for Nparks parks on leaflet map
    // input 
    let parkResponse = await axios.get("nparks-parks-geojson.geojson");
    // console.log(parkResponse.data);

    // //Create Npark parks Layer
    // let parkLayer = L.geoJson(parkResponse.data, {

    //     onEachFeature: function (features, parkLayer) {
    //         let holderElement = document.createElement("div");
    //         holderElement.innerHTML = features.properties.Description;
    //         // console.log(holderElement.innerHTML);
    //         let tdFirst = holderElement.querySelectorAll("td");
    //         let tdOne = tdFirst[1].innerText;

    //         parkLayer.bindPopup(`<h3>This green space is ${tdOne}!</h3>`);
    //     }
    // });
    // parkLayer.addTo(map);

    // parkLayer.setStyle({
    //     'color': '#32CD32',
    //     'strokeWidth': '0.5'

    // })



    // Add foursquare input to search for nearby parks


    const FSQUARE_URL = "https://api.foursquare.com/v3/places/";
    const FSQUARE_KEY = "fsq3TbSfyMgtndp0pmKicwLy+rc3GDql+ihBOKh7xSLyhgU=";

    const headers = {
        "Accept": "application/json",
        "Authorization": FSQUARE_KEY
    }

    // this is a global function
    // therefore other JS files can  make use of it
    async function search(ll, search, radius, category = "") {

        let url = FSQUARE_URL + "search";
        let response = await axios.get(url, {
            "headers": headers,
            "params": {
                "ll": ll,
                "query": search,
                "radius": radius,
                "category": category,  // ok for category to be empty string
                "limit": 50,
                "v": '20221017'  // (Unique FourSquare) YYMMDD format (its for version control). I want to use your version of API dated before this date
            }
        });

        return response.data;  // return the search results from the function
    }

    let searchParkLayer = L.layerGroup();
    searchParkLayer.addTo(map);

    let locationName = document.querySelector("#search-park-type");
    // console.log(locationName);

    let searchPark = document.querySelector("#search-input-click");
    searchPark.addEventListener("click", async function () {

        searchParkLayer.clearLayers();

        //DOES NOT WORK WHEN COMBINED NAME TO FIND BISHAN PARK. Otherwise,
        //search results not accurate, give things other than park
        // let combinedName = locationName.value+ " park"

        let firstSearch = await search("1.3521,103.8198", locationName.value, 25000, 16035 && 16000);
        console.log(firstSearch.results);

        for (let p of firstSearch.results) {

            // Display the marker
            let lat = p.geocodes.main.latitude;
            let lng = p.geocodes.main.longitude;
            console.log(lat, lng);

            let marker = L.marker([lat, lng], { icon: parkIcon });
            marker.bindPopup(`This place is <h1>${p.name}</h1>`);
            marker.addTo(searchParkLayer);




        }

    })



    //     let searchTerms = document.querySelector("#searchTerms").value;
    // let boundaries = map.getBounds();
    // let center = boundaries.getCenter();  // in lat lng
    // let latLng = center.lat + "," + center.lng; // Foursquare expects lat lng to be in the format "lat,lng"
    // let searchResults = await search(latLng, searchTerms, 5000);
    // // console.log(searchResults);
    // let searchResultElement = document.querySelector("#results");

    // for (let r of searchResults.results) {

    //     // Display the marker
    //     let lat = r.geocodes.main.latitude;
    //     let lng = r.geocodes.main.longitude;
    //     let marker = L.marker([lat, lng]).addTo(searchResultLayer);
    //     marker.bindPopup(`<h1>${r.name}</h1>`)

    //     // add to the search results
    //     let resultElement = document.createElement("div");
    //     resultElement.innerText = r.name;
    //     resultElement.classList.add("search-result");

    // )


})

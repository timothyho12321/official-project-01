
// BOILER PLATE CODE from Paul 
// SOURCE: https://gist.githubusercontent.com/kunxin-chor/f1517e174acaf8d4d7196ad70b447f39/raw/0cabdff18d8ec0571b382346f97d020af63666a6/script.js
// Use DOMContentLoaded as our main entry point
window.addEventListener("DOMContentLoaded", async function () {

    // SETUP //////////////////////////////////////////////////////////////////
    // create a map object
    let map = L.map('map');
    // set the center point and the zoom
    map.setView([1.35, 103.81], 12);

    //const latLng =[1.3521,103.8198] // SINGAPORE's lat lng set as constant 

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
    const parkIcon = L.icon({
        iconUrl: 'tree.png',

        iconSize: [45, 50],
        iconAnchor: [23, 45],
        popupAnchor: [-3, -76]
    })

    // PLACING ICON ON THE MAP
    // let parkMarker = L.marker([1.2890, 103.8604], { icon: parkIcon });
    // parkMarker.addTo(map);

    // // Add popup marker to park icon
    // parkMarker.bindPopup(`<h2>This is Ang Mo Kio Park</h2>`);


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

    // READ IN FILE FOR CYCLING PATH NETWORK
    let cyclingResponse = await axios.get("cycling-path-network-geojson.geojson");
    console.log(cyclingResponse.data);

    //Create Cycling Path Network Layer
    let cyclingLayer = L.geoJson(cyclingResponse.data, {

        onEachFeature: function (features, subLayer) {
            let holderElement = document.createElement("div");
            holderElement.innerHTML = features.properties.Description;
            // console.log(holderElement.innerHTML);
            // subLayer.bindPopup(`<h5>${holderElement.innerHTML}</h5>`);


            let tdNum = holderElement.querySelectorAll("td");
            // console.log(tdNum);
            let cyclingPathName = tdNum[0].innerText;
            // console.log(cyclingPathName);
            let correctAgency = tdNum[1].innerText;
            // console.log(correctAgency);
            subLayer.bindPopup(`<h5>You can use this cycling path at <div> ${cyclingPathName}.</div> Path maintained by <div>${correctAgency}.</div></h5>`);
        }
    });
    cyclingLayer.addTo(map);

    cyclingLayer.setStyle({
        'color': 'purple',
        'strokeWidth': '0.5'
    })


    // CREATE BASE MAP AND OVERLAY MAP LAYER FOR LAYER CONTROL
    // SOURCE: https://leafletjs.com/examples/layers-control/
    // let baseMaps = {

    // };

    let overlayMaps = {
        // "<span style = 'color: grayscale'>Grayscale</span>": grayscale,
        // ERROR MESSAGE ReferenceError: grayscale is not defined
        "Park Connectors": connectorLayer,
        "Cycling path track": cyclingLayer
    }

    let layerControl = L.control.layers(null, overlayMaps).addTo(map);
    // to add in BASEMAP LAYER above WHEN IT IS INCLUDED IN FUTURE 

    // QUESTION STYLING LAYER CONTROL WHAT DOES IT MEAN?
    //https://leafletjs.com/examples/layers-control/
    // var baseMaps = {
    //     "<span style='color: gray'>Grayscale</span>": grayscale,
    //     "Streets": streets
    // };


    // Display geojson for Nparks parks on leaflet map 
    // SWITCH TO CYCLING PATHS AND PARK CONNECTORS INSTEAD.
    //QUESTION HOW TO SHADE INSIDE OF PARK?
    // input 
    // let parkResponse = await axios.get("nparks-parks-geojson.geojson");
    // // console.log(parkResponse.data);

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
    //     'strokeWidth': '0.5',
    //     'fillColor': '#32CD32'

    // })





    // Add foursquare input to search for nearby parks

    const FSQUARE_URL = "https://api.foursquare.com/v3/places/";
    const FSQUARE_KEY = "fsq3TbSfyMgtndp0pmKicwLy+rc3GDql+ihBOKh7xSLyhgU=";

    const headers = {
        "Accept": "application/json",
        "Authorization": FSQUARE_KEY
    }

    // Global search function for nearby category
    async function search(ll, search = "", radius, category = "") {

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


    // Try out test Search (success)
    async function search(categories, query, sort, limit = "") {

        let url = FSQUARE_URL + "search";
        let response = await axios.get(url, {
            "headers": headers,
            "params": {
                "categories": categories,// example either 16032(park),16019(hiking),16017(garden)
                "query": query,// example location name (clementi)
                "sort": "relevance", //sort by 
                "limit": limit, // number of search results 
                "ll": "1.3521,103.8198", // latLng of SG
                "radius": 15000,//radius of search

                "v": '20221017'  // (Unique FourSquare) YYMMDD format (its for version control). I want to use your version of API dated before this date
            }
        });

        return response.data;  // return the search results from the function
    }

    let testSearch = await search(16019, "", "relevance", 50);
    // console.log(testSearch.results);

    let searchParkLayer = L.layerGroup();
    searchParkLayer.addTo(map);

    // ADD IN SECOND API WEATHER 
    //SOURCE: https://openweathermap.org/api/one-call-api
    //Initial test search with OpenWeather
    // const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";
    let WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";
    let app_id = "891b31000be51f52585183d6ffdb3dc1"; //OpenWeather API Key 

    let exclude = 'minutely,daily,alerts';

    async function searchWeather(lat, lon) {

        let url = WEATHER_BASE_URL + `?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${app_id}&units=metric`
        // console.log(url);
        let response = await axios.get(url)

        return (response.data);
    };

    // return the test search results from the searchWeather function
    let weatherSearch = await searchWeather(1.3521, 103.8198);
    // console.log(weatherSearch);


    //CREATE EVENT LAYER - CLICK OF SUBMIT BUTTON
    let searchPark = document.querySelector("#search-input-click");

    searchPark.addEventListener("click", async function () {


        let isCategoriesValid = false; 
        // READ THE VALUE OF SELECTED CATEGORIES BUTTON
        let categoriesName = document.querySelectorAll(".categories");
        // console.log(categoriesName);
        let selectedCategories = null;
        for (let radio of categoriesName) {
            if (radio.checked) {
                selectedCategories = radio.value;
                isCategoriesValid=true;
            }
        }
        // console.log(selectedCategories);

displayErrors(isCategoriesValid);

// User validation input of categories
function displayErrors(isCategoriesValid){
    if(!isCategoriesValid){
        let categoriesError = document.querySelector("#categories-error");
        // console.log(categoriesError);
        categoriesError.innerHTML = `<div>Please select at least one category option.</div>`
    }
}



        let queryLocationName = document.querySelector("#search-park-type");
        // console.log(queryLocationName.value);


        searchParkLayer.clearLayers();

        // Key in First Search using form buttons on map 

        // READ IN VALUES FROM SORT BUTTON

        let sortName = document.querySelectorAll(".sort-button");
        // console.log(sortName);
        let selectedSort = null;
        for (let radio of sortName) {
            if (radio.checked) {
                selectedSort = radio.value;
            }
        }
        // console.log(selectedSort);

        // READ IN VALUES FROM LIMIT BUTTON
        let limitName = document.querySelectorAll(".limit-button");
        // console.log(limitName);
        let selectedLimit = null;
        for (let radio of limitName) {
            if (radio.checked) {
                selectedLimit = radio.value;
            }
        }
        // console.log(selectedLimit);

        // TEST CASE - USE CLEMENTI TO FILTER LOCATION. USE KALLANG ALSO. MUST BE SINGLE WORD LOCATION NAME.
        // let testSearch = await search(selectedCategories, queryLocationName.value, "relevance", 50);
        // console.log(testSearch.results);


        //Pass firstSearch case 
        let firstSearch = await search(selectedCategories, queryLocationName.value, selectedSort, selectedLimit);
        console.log(firstSearch.results);


        //create parkClusterLayer
        let parkClusterLayer = L.markerClusterGroup();
        parkClusterLayer.addTo(map);

        let displaySearch = document.querySelector("#display-search");
        // console.log(displaySearch);


        //Create For Loop to create parkMarkers from park Search results
        for (let p of firstSearch.results) {

            // Display the marker
            let lat = p.geocodes.main.latitude;
            let lng = p.geocodes.main.longitude;
            // console.log(lat, lng);



            // QUESTION (OVERLAPPING FUNCTION?) TAKE IN READING OF PARK MARKER LAT LNG AND PASS INTO SEARCHWEATHER TO FIND WEATHER FOR THIS PARK MARKER 
            let weatherSearch = await searchWeather(lat, lng);
            // console.log(weatherSearch);

            let weatherDescription = weatherSearch.current.weather[0].description;
            // console.log(weatherDescription);
            let weatherIcon = weatherSearch.current.weather[0].description;
            // console.log(weatherIcon);
            let weatherTemp = weatherSearch.current.temp;
            // console.log(weatherTemp);

            //PLACE MARKERS FOR PARK SEARCH 
            let searchMarker = L.marker([lat, lng], { icon: parkIcon });
            searchMarker.bindPopup(`This place is <h4>${p.name}.</h4>
            Weather pattern: ${weatherDescription}. <div>Current Temperature: ${weatherTemp} °C.</div>`);


            // TO DELETE AFTER CONFIRMING DOES NOT INTERACT WITH OTHER CODE (REPEAT LAYER)
            // searchMarker.addTo(searchParkLayer);

            //maybe generate another marker group with all the park spread out over SIngapore
            //and assign that layer as the parkClusterLayer
            searchMarker.addTo(parkClusterLayer);


            //Output displaySearch of search results
            let parkDummy = document.createElement("div");
            parkDummy.innerHTML = p.name;
            parkDummy.classList.add("park-result"); // add class to parkDummy


            parkDummy.addEventListener("click", function () {
                map.flyTo([p.geocodes.main.latitude, p.geocodes.main.longitude], 14)
                searchMarker.openPopup();


            })

            // function close() {
            //     searchMarker.bindPopup(``)
            // }


            displaySearch.appendChild(parkDummy);

        }


    })


})
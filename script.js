
window.addEventListener("DOMContentLoaded", async function () {

    //SOURCE FOR CHANGING BASEMAP: https://leaflet-extras.github.io/leaflet-providers/preview/

    // SETUP //////////////////////////////////////////////////////////////////
    // create a map object
    let map = L.map('map',
        {
            zoomControl: false,
            // closePopupOnClick: false

        });
    // set the center point and the zoom
    map.setView([1.35, 103.81], 12);

    // var map = L.mapbox.map('map', { zoomControl: false });
    //const latLng =[1.3521,103.8198] // SINGAPORE's lat lng set as constant 

    // change position of zoomControl to top right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // set up the tile layer
    var leaflet = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        // zoomControl: false,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    });

    // SOURCE FOR MAPS http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    var OneMapSG_Default = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
        minZoom: 11,
        maxZoom: 18,

        bounds: [[1.56073, 104.11475], [1.16, 103.502]],
        // attribution: '<div class = "attribution-word"><img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a></div>'
        attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
    }).addTo(map);

    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var OneMapSG_Night = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
        minZoom: 11,
        maxZoom: 18,
        bounds: [[1.56073, 104.11475], [1.16, 103.502]],
        attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
    });

    // CODE FOR CREATING ICON
    // SOURCE OF ICON IMAGE: <a href="https://www.flaticon.com/free-icons/park" title="park icons">Park icons created by Freepik - Flaticon</a>
    // SOURCE FOR H ICON: <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">Maps and location icons created by Freepik - Flaticon</a>
    // SOURCE FOR GARDEN ICON: <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">Maps and location icons created by Rmpp - Flaticon</a>

    const parkIcon = L.icon({
        iconUrl: 'images/tree.png',

        iconSize: [45, 50],
        iconAnchor: [23, 45],
        popupAnchor: [-3, -76]
    })

    //Make icon for hiking trail (h symbol)
    const hikeIcon = L.icon({
        iconUrl: 'images/h-for-hiking-trail.png',

        iconSize: [45, 45],
        iconAnchor: [23, 45],
        popupAnchor: [-3, -76]
    })

    //Make icon for garden (h symbol)
    const gardenIcon = L.icon({
        iconUrl: 'images/garden.png',

        iconSize: [50, 50],
        iconAnchor: [23, 45],
        popupAnchor: [-3, -76]
    })


    // LOOKUP TABLE FOR DIFFERENT MARKER ICONS 
    const categoriesValue =
    {
        '16032': parkIcon,
        '16019': hikeIcon,
        '16017': gardenIcon
    }



    // PLACING ICON ON THE MAP
    // let parkMarker = L.marker([1.2890, 103.8604], { icon: categoriesValue[16032] });
    // console.dir(categoriesValue[16032] );
    // parkMarker.addTo(map);

    // // Add popup marker to park icon
    // parkMarker.bindPopup(`<h2>This is Ang Mo Kio Park</h2>`);


    // Javascript for Modal to display about us message - gives error of undefined for myinput
    // var myModal = document.getElementById('exampleModal')
    // var myInput = document.getElementById('myInput')

    // myModal.addEventListener('shown.bs.modal', function () {
    //     myInput.focus()
    // })



    // Adding Npark tracks 
    // Read in geojson data for park connector track 
    // let connectorResponse = await axios.get("nparks-tracks-geojson.geojson");
    let connectorResponse = await axiosCall("nparks-tracks-geojson.geojson");

    // set up leaf logo icon 
    // SOURCE: <a href="https://www.flaticon.com/free-icons/nature" title="nature icons">Nature icons created by Freepik - Flaticon</a>
    // let icon = document.querySelector("#icon");
    // icon.innerHTML = `<img src = "leaf-logo.png"/>`;



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
            let stringVariable = `<p style ="font-size:1em">Connect your journey via <br> this ${connectorKind.toLowerCase()}  at <br> ${connectorName}. </p>`
            subLayer.bindPopup(stringVariable);
        }
    });
    connectorLayer.addTo(map);

    // Adjust style of park connector layer
    connectorLayer.setStyle({
        'color': '#228C22',
        'strokeWidth': '0.5'
    })

    // READ IN FILE FOR CYCLING PATH NETWORK
    // let cyclingResponse = await axios.get("cycling-path-network-geojson.geojson");
    // refactor into function - to delete
    let cyclingResponse = await axiosCall("cycling-path-network-geojson.geojson");

    // console.log(cyclingResponse.data);

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
            let stringVariable = `<p style ="font-size:1em">You can use this cycling path at <br>${cyclingPathName}. <br> Path maintained by: <br>${correctAgency}. </p>`
            subLayer.bindPopup(stringVariable);
        }
    });
    cyclingLayer.addTo(map);

    cyclingLayer.setStyle({
        'color': '#0999ec',
        'strokeWidth': '0.5'
    })

    //CREATE FOOD LAYER FOR SEARCH NEARBY FOOD PLACES LATER
    let foodLayer = L.layerGroup();
    foodLayer.addTo(map);

    // CREATE BASE MAP AND OVERLAY MAP LAYER FOR LAYER CONTROL
    // SOURCE: https://leafletjs.com/examples/layers-control/
    let baseMaps = {
        "Leaflet": leaflet,
        "OneMapSG": OneMapSG_Default,
        "Landscape image": Esri_WorldImagery,
        "Outdoors": Stadia_Outdoors,
        "Cycle direction": CyclOSM,
        "OneMapSG-Night": OneMapSG_Night
    };

    let overlayMaps = {
        // "<span style = 'color: grayscale'>Grayscale</span>": grayscale,
        // ERROR MESSAGE ReferenceError: grayscale is not defined
        "Park Connectors": connectorLayer,
        "Cycling path track": cyclingLayer,
        "Show nearby Food": foodLayer
    }

    let layerControl = L.control.layers(baseMaps, overlayMaps, { position: 'bottomright' }).addTo(map);
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

    // const FSQUARE_URL = "https://api.foursquare.com/v3/places/";
    // const FSQUARE_KEY = "fsq3TbSfyMgtndp0pmKicwLy+rc3GDql+ihBOKh7xSLyhgU=";

    // const headers = {
    //     "Accept": "application/json",
    //     "Authorization": FSQUARE_KEY
    // }

    // Global search function for nearby category - TO DELETE IF NOT RELEVANT ANYMORE
    // async function search(ll, search = "", radius, category = "") {

    //     let url = FSQUARE_URL + "search";
    //     let response = await axios.get(url, {
    //         "headers": headers,
    //         "params": {
    //             "ll": ll,
    //             "query": search,
    //             "radius": radius,
    //             "category": category,  // ok for category to be empty string
    //             "limit": 50,
    //             "v": '20221017'  // (Unique FourSquare) YYMMDD format (its for version control). I want to use your version of API dated before this date
    //         }
    //     });

    //     return response.data;  // return the search results from the function
    // }


    // Try out test Search (success)
    // async function search(categories, query, sort, limit = "") {

    //     let url = FSQUARE_URL + "search";
    //     let response = await axios.get(url, {
    //         "headers": headers,
    //         "params": {
    //             "categories": categories,// example either 16032(park),16019(hiking),16017(garden)
    //             "query": query,// example location name (clementi)
    //             "sort": sort, //sort by 
    //             "limit": limit, // number of search results 
    //             "ll": "1.3521,103.8198", // latLng of SG
    //             "radius": 15000,//radius of search

    //             "v": '20221017'  // (Unique FourSquare) YYMMDD format (its for version control). I want to use your version of API dated before this date
    //         }
    //     });

    //     return response.data;  // return the search results from the function
    // }

    // let testSearch = await search(16019, "", "relevance", 50);
    // console.log(testSearch.results);

    let searchParkLayer = L.layerGroup();
    searchParkLayer.addTo(map);

    // ADD IN SECOND API WEATHER 
    //SOURCE: https://openweathermap.org/api/one-call-api
    //Initial test search with OpenWeather

    // let WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    // let app_id = "2a0076487a241d1a333c9896bc072673" //OpenWeather API Key 

    // let exclude = 'minutely,hourly,daily,alerts';

    // async function searchWeather(lat, lon) {

    //     // let url = WEATHER_BASE_URL + `?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${app_id}&units=metric`
    //     // let url = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=629e361798b0ccce5466e1e70f3e4712"

    //     let url = WEATHER_BASE_URL + `?lat=${lat}&lon=${lon}&appid=${app_id}&units=metric`

    //     // console.log(url);
    //     let response = await axios.get(url)

    //     return (response.data);
    // };

    // return the test search results from the searchWeather function
    // let weatherSearch = await searchWeather(1.3521, 103.8198);
    // console.log(weatherSearch);


    let parkClusterLayer = L.markerClusterGroup();
    parkClusterLayer.addTo(map);



    //CREATE EVENT LAYER - CLICK OF SUBMIT BUTTON
    let searchPark = document.querySelector("#search-input-click");

    searchPark.addEventListener("click", async function () {
        map.flyTo([1.35, 103.81], 12)

        //Input validation 
        let isCategoriesValid = false;
        // READ THE VALUE OF SELECTED CATEGORIES BUTTON
        let categoriesName = document.querySelectorAll(".categories");
        // console.log(categoriesName);
        let selectedCategories = null;
        for (let radio of categoriesName) {
            if (radio.checked) {
                selectedCategories = radio.value;
                isCategoriesValid = true;
            }
        }
        // console.log(selectedCategories);

        displayErrors(isCategoriesValid);

        // User validation input of categories
        function displayErrors(isCategoriesValid) {
            if (!isCategoriesValid) {

                let categoriesError = document.querySelector("#categories-error");
                // console.log(categoriesError);
                categoriesError.innerHTML = `<div>Please select at least one category option.</div>`
            } else {
                let categoriesError = document.querySelector("#categories-error");
                categoriesError.innerHTML = "";
            }
        }


        //Input validation 
        let isSortValid = false;
        // READ THE VALUE OF SELECTED CATEGORIES BUTTON
        let sortStore = document.querySelectorAll(".sort-button");
        // console.log(sortStore);
        let chosenSort = null;
        for (let radio of sortStore) {
            if (radio.checked) {
                chosenSort = radio.value;
                // console.log(radio.value);
                isSortValid = true;
            }
        }
        // console.log(selectedCategories);

        displayErrors2(isSortValid);

        // User validation input of categories
        function displayErrors2(isSortValid) {
            if (!isSortValid) {
                let sortError = document.querySelector("#sort-error");
                // console.log(categoriesError);
                sortError.innerHTML = `<div>Please select at least one sort option.</div>`
            } else {
                let sortError = document.querySelector("#sort-error");
                sortError.innerHTML = "";
            }
        }




        let queryLocationName = document.querySelector("#search-park-type");
        // console.log(queryLocationName.value);


        parkClusterLayer.clearLayers();

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
        // console.log(firstSearch.results);


        //create parkClusterLayer
        // let parkClusterLayer = L.markerClusterGroup();
        // parkClusterLayer.addTo(map);

        let displaySearch = document.querySelector("#display-search");
        // console.log(displaySearch);

        displaySearch.innerHTML = "";
        //Create For Loop to create parkMarkers from park Search results
        for (let p of firstSearch.results) {

            // Display the marker
            let lat = p.geocodes.main.latitude;
            let lng = p.geocodes.main.longitude;
            // console.log(lat, lng);



            let weatherSearch = await searchWeather(lat, lng);
            console.log(weatherSearch);

            let weatherDescription = weatherSearch.weather[0].description;
            console.log(weatherDescription);

            let weatherTemp = weatherSearch.main.temp;
            console.log(weatherTemp);

            // TO CONSIDER WHETHER TO INCLUDE IMAGE OF WEATHER ICON
            let weatherIcon = weatherSearch.weather[0].description;
            console.log(weatherIcon);

            //PLACE MARKERS FOR PARK SEARCH 
            // let searchMarker = L.marker([lat, lng], { icon: parkIcon });
            // searchMarker.bindPopup(`This place is <h4>${p.name}.</h4>
            // Weather pattern: ${weatherDescription}. <div>Current Temperature: ${weatherTemp} °C.</div>`);





            //SOURCE OF TREE PHOTO: https://www.pexels.com/photo/bottom-view-of-green-leaved-tree-during-daytime-91153/

            async function getPhoto(fsq_id) {
                let response = await axios.get(FSQUARE_URL + `${fsq_id}/photos`, {
                    'headers': headers


                });

                return response.data;
            }

            let searchMarker = L.marker([lat, lng], { icon: categoriesValue[selectedCategories] });

            searchMarker.bindPopup(function () {

                let el = document.createElement('div');
                el.classList.add("popup")
                el.innerHTML = `This place is <h4>${p.name}.</h4>`
                el.style.fontFamily = 'Roboto Slab, serif';

                // el.innerHTML = `<div> Place: ${p.name}. <br> Weather pattern: ${weatherDescription}. <br> Current Temperature: ${weatherTemp} °C.</div>`
                // el.style.fontFamily='Roboto Slab, serif';

                async function getPicture() {
                    let photos = await getPhoto(p.fsq_id);
                    // console.log(photos);

                    if (photos.length) {
                        let firstPhoto = photos[0];
                        let url = firstPhoto.prefix + "300x200" + firstPhoto.suffix;
                        el.innerHTML += `<img src ="${url}"/>`
                    } else {
                        // console.log("Insert stock photo");
                        el.innerHTML += `<img src ="images/tree-when-invalid-photo.jpg" class="invalid-tree"/>`
                    }

                }

                getPicture();
                return el;

            })



            //USE THIS ONE WITHOUT OPEN WEATHER API CALL 
            // searchMarker.bindPopup(`This place is <h4>${p.name}.</h4>`);


            searchMarker.addTo(parkClusterLayer);


            //Output displaySearch of search results
            let parkDummy = document.createElement("div");
            parkDummy.innerHTML = p.name;
            parkDummy.classList.add("park-result"); // add class to parkDummy

            parkDummy.addEventListener("click", function () {
                // map.flyTo([p.geocodes.main.latitude, p.geocodes.main.longitude], 19)
                // // setTimeout((searchMarker.openPopup()),10000);

                // setTimeout(() => {
                //     searchMarker.openPopup();
                //     // console.log(`Apple`);
                // }, 3000)

                parkClusterLayer.zoomToShowLayer(searchMarker,

                    //CHANGE ZOOM TO SO THAT NOT BLOCKED BY SEARCH BAR 
                    (function () {
                        // console.log(p.geocodes.main.latitude);
                        finalLat = parseFloat(p.geocodes.main.latitude) + 0.0029
                        console.log(finalLat)

                        console.log(p.geocodes.main.longitude);
                        // finalLng= parseFloat(p.geocodes.main.longitude) - 0.0009
                        // console.log(finalLng)
                        map.flyTo([finalLat, p.geocodes.main.longitude], 17)

                        setTimeout(() => { searchMarker.openPopup() }, 1500);

                        // Collapse search list with Javascript after call 
                        var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
                        var collapseList = collapseElementList.map(function (collapseEl) {
                            return new bootstrap.Collapse(collapseEl)
                        })

                        // On Click weather tab to see weather of location in weather offcanvass
                        let weatherTab = document.getElementById("weather-tab")
                        let weatherDisplay = document.querySelector(".weather-display")

                        let lookUpWeather = {
                            "clear sky": "clear-sky.png",
                            "few clouds": "few-clouds.png",
                            "scattered clouds": "scattered-clouds.png",
                            "broken clouds": "broken-clouds.png",
                            "shower rain": "shower-rain.png",
                            "rain": "rain.png",
                            "thunderstorm": "thunderstorm.png",
                            "mist": "mist.png"
                        }

                        // console.log(weatherTab);
                        // console.log(weatherDisplay);
                        weatherTab.addEventListener("click", function () {
                            console.log(weatherIcon);
                            weatherDisplay.innerHTML = `
                            <div>Weather pattern: ${weatherDescription}.</div>
                            <img src ="images/${lookUpWeather[weatherDescription]}"/>                          
                            <div>Current Temperature: ${weatherTemp} °C.</div>
                            `


                        })

                        // when zoomed in to search park, and click on the tab to display nearby food places
                        let foodDisplay = document.querySelector(".tab-pane .btn-success")
                        console.log(foodDisplay);





                        foodDisplay.addEventListener("click", async function () {
                            //QUESTION WHY DOES THIS CLEARLAYERS ON FOODLAYER NOT WORK?
                            foodLayer.clearLayers();
                            map.removeLayer(foodLayer);
                            console.log("Clear the rubbish");



                            map.flyTo([finalLat, p.geocodes.main.longitude], 16)

                            let ll = `${p.geocodes.main.latitude},${p.geocodes.main.longitude}`
                            console.log(ll);




                            let showFood = await searchFood(ll);
                            let showFood2 = showFood.results;
                            // console.log(showFood2);

                            const foodIcon = L.icon({
                                iconUrl: 'images/food.png',

                                iconSize: [40, 45],
                                iconAnchor: [23, 45],
                                popupAnchor: [-3, -50]
                            })

                           

                            // Create bind pop up on search food place marker
                            for (let f of showFood2) {
                                let latLng = [f.geocodes.main.latitude, f.geocodes.main.longitude]
                                console.log(latLng)
                                let searchMarker = L.marker(latLng, {icon: foodIcon});
                                searchMarker.bindPopup(function () {
                                    let el = document.createElement("div");
                                    el.classList.add("popupFood");

                                    el.innerHTML = `<div>Food: ${f.name}</div>`;
                                    el.style.fontFamily = `Roboto Slab, serif`;
                                    el.style.fontSize = `medium`;

                                    return el;
                                })

                                searchMarker.addTo(foodLayer);
                                // foodLayer.addTo(map);
                                //               let el = document.createElement('div');
                                // el.classList.add("popup")
                                // el.innerHTML = `This place is <h4>${p.name}.</h4>`
                                // el.style.fontFamily = 'Roboto Slab, serif';

                            }

                            //CREATE CIRCLE CIRCUMFERENCE AROUND SEARCHED FOOD PLACES
                            // let ll = `${p.geocodes.main.latitude},${p.geocodes.main.longitude}`
                            let latLng = [p.geocodes.main.latitude, p.geocodes.main.longitude]

                            let foodCircle = L.circle(latLng, {
                                'color': 'red',
                                'fillColor': 'purple',
                                'fillOpacity': 0.4,
                                'radius': 500

                            })
                            foodCircle.addTo(foodLayer);
                            foodLayer.addTo(map);
                        })

                    }))



                // (function () {
                //     console.log(p.geocodes.main.latitude);
                //     map.flyTo([p.geocodes.main.latitude, p.geocodes.main.longitude], 17)

                //     setTimeout(() => { searchMarker.openPopup() }, 2000);
                // }))

                // parkClusterLayer.zoomToShowLayer(searchMarker, (function () {
                //     map.flyTo([p.geocodes.main.latitude, p.geocodes.main.longitude], 17)

                //     searchMarker.openPopup();
                // }))
            })

            // function close() {
            //     searchMarker.bindPopup(``)
            // }


            displaySearch.append(parkDummy);

        }


    })


})

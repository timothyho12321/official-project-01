// ALL THE DATA FUNCTIONS HERE ARE IN GLOBAL SCOPE 

// FOURSQUARE SEARCH FUNCTION 
const FSQUARE_URL = "https://api.foursquare.com/v3/places/";
const FSQUARE_KEY = "fsq3TbSfyMgtndp0pmKicwLy+rc3GDql+ihBOKh7xSLyhgU=";

const headers = {
    "Accept": "application/json",
    "Authorization": FSQUARE_KEY
}

async function search(categories, query, sort, limit = "") {

    let url = FSQUARE_URL + "search";
    let response = await axios.get(url, {
        "headers": headers,
        "params": {
            "categories": categories,// example either 16032(park),16019(hiking),16017(garden)
            "query": query,// example location name (clementi)
            "sort": sort, //sort by 
            "limit": limit, // number of search results 
            "ll": "1.3521,103.8198", // latLng of SG
            "radius": 15000,//radius of search

            "v": '20221017'  // (Unique FourSquare) YYMMDD format (its for version control). I want to use your version of API dated before this date
        }
    });
 
    return response.data;  // return the search results from the function
}



// FUNCTION TO GET DATA FOR PARK CONNECTOR AND CYCLING TRACK 
async function axiosCall(url) {
    let callResponse = await axios.get(url);
    return callResponse;
}

// Weather function using OpenWeather API 
let WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    let app_id = "2a0076487a241d1a333c9896bc072673" //OpenWeather API Key 

    let exclude = 'minutely,hourly,daily,alerts';

    async function searchWeather(lat, lon) {

        // let url = WEATHER_BASE_URL + `?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${app_id}&units=metric`
        // let url = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=629e361798b0ccce5466e1e70f3e4712"

        let url = WEATHER_BASE_URL + `?lat=${lat}&lon=${lon}&appid=${app_id}&units=metric`

        // console.log(url);
        let response = await axios.get(url)

        return (response.data);
    };



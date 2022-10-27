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

async function placeSearch() {
    try {
        const searchParams = new URLSearchParams({
          query: 'bishan',
          ll: '1.3521,103.8198',
          open_now: 'true',
          sort: 'DISTANCE'
        });
        const results = await fetch(
          `https://api.foursquare.com/v3/places/search?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'YOUR ACCESS TOKEN',
            }
          }
        );
        const data = await results.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}
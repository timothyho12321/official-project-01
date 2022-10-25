

// FUNCTION TO GET DATA FOR PARK CONNECTOR AND CYCLING TRACK 
async function axiosCall(url) {
    let callResponse = await axios.get(url);
    return callResponse;
}



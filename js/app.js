console.log(document.location);

let pathname = document.location.pathname;
let pathnamePieces = pathname.split("/")
let placeId = pathnamePieces[2];

// TODO: require scripts by building (Webstorm or other build tool?)

let userId;
if (storageAvailable('localStorage')) {
    if (undefined != localStorage.getItem("userId")) {
        userId = localStorage.getItem("userId");
    }
    else {
        localStorage.setItem("userId", spareId);
        userId = spareId;
    }
}
else {
    userId = "";
}

console.log("userId: " + userId);


// Start with getting place data
$.ajax({
    method: "GET",
    url: api_url + "?action=addcheckin&placeid=" + placeId + "&userid=" + userId
}).done(function( msg ) {
    let msgString = JSON.stringify(msg);
    console.log("Response from check-in-api: " + msgString);

    if (400 == msg.status) {
        setErrorMessage(msg);
    }
    else if (429 == msg.status || 200 == msg.status) {
        setPlaceMessage(msg);
        setObservations(msg.place.lat, msg.place.lon);
    }
});

function setErrorMessage(msg) {
    $("header").html(msg.errorUser);
}

function setPlaceMessage(msg) {
    let html = "<h1>" + msg.place.name + "</h1>";
    $("header").html(html);
}

// Get observations
function setObservations(lat, lon) {

    let boundingBoxArr = [];
        boundingBoxArr.push(parseFloat(lat) - 0.005);
        boundingBoxArr.push(parseFloat(lat) + 0.005);
        boundingBoxArr.push(parseFloat(lon) - 0.010);
        boundingBoxArr.push(parseFloat(lon) + 0.010);
    let boundingBox = boundingBoxArr.join("%3A");

    // Get aggregated observation data
    $.ajax({
        method: "GET",
        url: "https://api.laji.fi/v0/warehouse/query/aggregate?aggregateBy=unit.linkings.taxon.nameFinnish&geoJSON=false&onlyCount=true&pageSize=50&page=1&includeNonValidTaxa=false&time=2007%2F2017&coordinates=" + boundingBox + "%3AWGS84&coordinateAccuracyMax=1001&access_token=" + lajifi_access_token
    }).done(function( msg ) {
        let msgString = JSON.stringify(msg);
        console.log("Response from api.laji.fi: " + msgString);

        let html = "";
        // TODO: Generate html table and update on page
        msg.results.forEach(function(observation) {
            html += "<p>" + observation.aggregateBy["unit.linkings.taxon.nameFinnish"] + ": " + observation.count + "</p>";
        });

        $("#observations").html(html);

    });
}

// Detects whether localStorage is both supported and available
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

/*
if (storageAvailable('localStorage')) {
 // Yippee! We can use localStorage awesomeness
}
else {
 // Too bad, no localStorage for us
}
*/

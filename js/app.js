
console.log(document.location);

let pathname = document.location.pathname;
let pathnamePieces = pathname.split("/")
let placeId = pathnamePieces[2];

// TODO: Get user id from localstorage
// TODO: Create user id
// TODO: Set user id to localstorage
// TODO: Send user id to API, and handle it there

$.ajax({
    method: "GET",
    url: api_url + "?action=addcheckin&placeid=" + placeId
}).done(function( msg ) {
    let msgString = JSON.stringify(msg);
    console.log("Response from check-in-api: " + msgString);

    if (400 == msg.status) {
        setErrorMessage(msg);
    }
    else if (429 == msg.status) {
        setPlaceMessage(msg);
        setObservations(msg.place.lat, msg.place.lon);
    }
});

function setErrorMessage(msg) {
    $("#place").html(msg.errorUser);
}

function setPlaceMessage(msg) {
    let html = "<h1>" + msg.place.name + "</h1><p id='coord'>" + msg.place.lat + ", " + msg.place.lon + "</p>";
    $("#place").html(html);
}

function setObservations(lat, lon) {

    // TODO: Create bbox
    let boundingBox = "...";

    // TODO: Get aggregated data
    $.ajax({
        method: "GET",
        url: // API.LAJI.FI URL HERE...
    }).done(function( msg ) {
        let msgString = JSON.stringify(msg);
        console.log("Response from api.laji.fi: " + msgString);

        // TODO: Generate html table and update on page

    });
}


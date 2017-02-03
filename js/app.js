
console.log(document.location);

let pathname = document.location.pathname;
let pathnamePieces = pathname.split("/")
let placeId = pathnamePieces[2];

$.ajax({
    method: "GET",
    url: api_url + "?action=addcheckin&placeid=" + placeId
}).done(function( msg ) {
    let msgString = JSON.stringify(msg);
    console.log("Reply: " + msgString);

    if (400 == msg.status) {
        setErrorMessage(msg);
    }
    else if (429 == msg.status) {
        setPlaceMessage(msg);
    }
});

function setErrorMessage(msg) {
    $("#place").html(msg.errorUser);
}

function setPlaceMessage(msg) {
    let html = "<h1>" + msg.place.name + "</h1><p id='coord'>" + msg.place.lat + ", " + msg.place.lon + "</p>";
    $("#place").html(html);
}

// From A-Frame VR toolkit
// https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


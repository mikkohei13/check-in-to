console.log(document.location);

let pathname = document.location.pathname;
let pathnamePieces = pathname.split("/");
let fullId = pathnamePieces[2];
let fullIdPieces = fullId.split("-")
let placeId = fullIdPieces[0];
let trackerId = fullIdPieces[1];

// TODO: require scripts by building (Webstorm or other build tool?)

// Get/ser userid
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
    url: api_url + "?action=addcheckin&placeid=" + placeId + "&userid=" + userId + "&trackerid=" + trackerId
}).done(function( msg ) {
    // Note that done() will only be called when API doesn't return http status code indicating an error. E.g. code 400 would call fail(). Currently the API always responds with http status code 200, and includes the "real" status code in the status-field.

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
    $("header #status").html(msg.errorUser);
}

function setPlaceMessage(msg) {
    $("header #status").html("");
    $("header h1").html(msg.place.name);
    $("#description").html(msg.place.description);
    $("#checkInStatus p").html(msg.status);
}

// Get observations
function setObservations(lat, lon) {
    $("#observationsLatest").html("<span class='status'>Havaintoja haetaan...</span>");

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
//        console.log("Response from api.laji.fi: " + msgString);

        let html = "";
        let firstItemSuffix = " havaintoa";
        // TODO: Templating
        msg.results.forEach(function(observation) {
            html += "<li><strong>" + observation.aggregateBy["unit.linkings.taxon.nameFinnish"] + "</strong>: " + observation.count + firstItemSuffix + "</li>";
            firstItemSuffix = "";
        });

        html = "<h4>Yhteenveto havainnoista</h4></h4><p class='intro'>Viimeisen kymmenen vuoden aikana lähiseudulla on havaittu mm:</p><ol id='observationList'>" + html + "</ol><p class='epilog'>Havainnot tulevat <a href='https://beta.laji.fi/'>Suomen Lajitietokeskuksen</a> tietokannasta noin 500 metrin sääteeltä tästä paikasta. Havainnot voivat sisältää virheitä. Myös <a href='http://tiira.fi/'>Tiira-lintutietopalvelussa</a> on paljon tuoreita lintuavaintoja, jotka eivät näy Lajitietokeskuksen kautta.</p>";

        $("#observationsAggregate").html(html);
    });


    // Get latest observation data
    $.ajax({
        method: "GET",
        url: "https://api.laji.fi/v0/warehouse/query/list?selected=document.documentId%2Cgathering.eventDate.begin%2Cgathering.eventDate.end%2Cgathering.interpretations.finnishMunicipality%2Cgathering.locality%2Cgathering.municipality%2Cgathering.team%2Cunit.abundanceString%2Cunit.linkings.taxon.scientificName%2Cunit.linkings.taxon.vernacularName&orderBy=gathering.eventDate.begin DESC&pageSize=10&page=1&coordinates=" + boundingBox + "%3AWGS84&coordinateAccuracyMax=1000&access_token=" + lajifi_access_token
    }).done(function( msg ) {
        let msgString = JSON.stringify(msg);
//        console.log("Response from api.laji.fi: " + msgString);

        let html = "";
        // TODO: Templating

        msg.results.forEach(function(obs) {
            console.log(JSON.stringify(obs.unit));
            let datePieces = obs.gathering.eventDate.begin.split("-");
            let dateString = datePieces[2] + "." + datePieces[1] + "." + datePieces[0];
            let abundance = obs.unit.abundanceString;
            if (abundance == undefined) {
                abundance = "";
            }
            else {
                abundance = ", " + abundance;
            }

            html += "<li><strong>" + obs.unit.linkings.taxon.vernacularName.fi + "</strong>" + abundance + " <span>(" + obs.gathering.locality + " " + dateString + ")</span></li>";
        });

        html = "<h4>Uusimpia havaintoja</h4><p class='intro'>Lähiseudulla on havaittu mm:</p><ol id='observationListLatest'>" + html + "</ol>";

        $("#observationsLatest").html(html);
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

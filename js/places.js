"use strict";

let mymap;

initMap();
getTrackData();

function initMap()
{
    console.log("map initialized");
    // http://stackoverflow.com/questions/37166172/mapbox-tiles-and-leafletjs
    mymap = L.map('mymap').setView([60.2, 24.6], 10);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'outdoors-v9', // streets-v9 satellite-streets-v9 light-v9 dark-v9 outdoors-v9
        accessToken: mapboxAccessToken
    }).addTo(mymap);
}

function getTrackData() {
    $.ajax({
        url: api_url + "?action=getallplaces",
        cache: false
    })
    .done(function(placeData) {
        drawMarkerGroup(placeData.places);
    });
}

function drawMarkerGroup(placeArray) {
    let markers = placeArray.map(function createMarkerCaller(placeObj) {
        return createMarker(placeObj);
    });

//    console.log(coordinatePairArray);

    let markerGroup = L.featureGroup(markers);
    markerGroup.addTo(mymap);

    mymap.fitBounds(markerGroup.getBounds());
}

function createMarker(placeObj)
{
    let lat = placeObj.lat;
    let lon = placeObj.lon;
    let text = placeObj.placeid + " " + placeObj.name;

    let marker = L.marker([lat, lon], {

    });
    marker.bindPopup(text);
    return marker;
}

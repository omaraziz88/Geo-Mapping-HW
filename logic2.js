// Store our API endpoint inside queryUrl
var main_Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    // console.log (main_Url)
// Perform a GET request to the query URL
d3.json(main_Url, function (data) {
  
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + feature.properties.mag + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  function color(mag) {
    if (mag < 1) { return "#12ed24" }
    else if (mag < 2) { return "#27e718" }
    else if (mag < 3) { return "#6adf20" }
    else if (mag < 4) { return "#a9e51a" }
    else if (mag < 5) { return "#ece913" }
    else if (mag < 6) { return "#ee7b11" }
    else { return "#fa050f" }
  };
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, loc) {
      var geojsonMarkerOptions = {
        radius: 4 * feature.properties.mag,
        fillColor: color(feature.properties.mag),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(loc, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
  });
  createMap(earthquakes);
}

// Creating map object
var myMap = L.map("map", {
    center: [39.1, -94.6],
    zoom: 5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);




  // object to hold our base layers
  earthquakes.addTo(myMap);
}

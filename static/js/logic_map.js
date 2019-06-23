

// Store API query variables
var link = "../static/data/summarygeojson.json"


// Perform a GET request to the query URL
d3.json(link, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log("inside d3.json")
  console.log(data)
  createFeatures(data.features);
console.log("inside features")
console.log(data.features)
});


function createFeatures(injuryData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the injury
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.acc_state +
      "</h3><hr><p>" + new Injury_total(feature.properties.Injury_total) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the injuryData object
  // Run the onEachFeature function once for each piece of data in the array
  var injurys = L.geoJSON(injuryData, {
    pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, {
        // radius: markerSize(feature.properties.Injury_total*0.04),
        radius: markerSize(15.0),
        fillColor: fillColor(feature.properties.Injury_total),
        color: "black",
        weight: 0.4,
        opacity: 0.4,
        fillOpacity: 0.5
      });
      },
  
      onEachFeature: function (feature, layer) {
        return layer.bindPopup(`<strong>Place:</strong> ${feature.properties.acc_state}<br><strong>Injury_total:</strong> ${feature.properties.Injury_total}`);
      }
    });

  // Sending our injurys layer to the createMap function
  createMap(injurys);
}

function createMap(injurys) {

  console.log("inside create map")
  console.log(injurys)

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
console.log(baseMaps)
console.log("logging basemaps")

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    injurys: injurys
  };
  console.log(overlayMaps)

  // Create the map, giving it the streetmap and injurys layers to display on load- not sure if these are good coordinates
  var myMap = L.map("map", {
    center: [
      40.0583, -74.4057
    ],
    zoom: 5,
    layers: [streetmap, injurys]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


// Create the legend and position it
var legend = L.control({ position: 'bottomleft'});

//Injury_total of density
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'Legend'),
        Injury_total = [0, 5, 20, 50, 100, 300, 1000, 3000, 5000],
        labels = ["pink", "pink", "purple", "blue", "green", "greenyellow", "yellow", "orange", "red", "red"];

    // iterate through the created intervals for a label and coloration.
    for (var i = 0; i < Injury_total.length; i++) {
        div.innerHTML +=
            '<i style="background:' + fillColor(Injury_total[i] + 1) + '"></i> ' +
            Injury_total[i] + (Injury_total[i + 1] ? '&ndash;' + Injury_total[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


};

// set up color fills
function fillColor(Injury_total) {

  // console.log("inside fillColor")


  switch (true) {
    case Injury_total >= 5000:
      return 'red';
      break;

    case Injury_total >= 3000:
      return 'red';
      break;

    case Injury_total >= 1000:
      return 'orange';
      break;
    
    case Injury_total >= 300:
      return 'yellow';
      break;

    case Injury_total >= 100:
      return 'greenyellow';
      break;

    case Injury_total >= 50:
      return 'green';
      break;

    case Injury_total >= 50:
      return 'blue';
      break;   

    case Injury_total >= 20:
      return 'purple';
      break;

    case Injury_total >= 5:
      return 'pink';
      break;

    default:
      return 'pink';    
    
  };
};


function markerSize(Injury_total) {
  // console.log("inside marker size")
return Injury_total;
}












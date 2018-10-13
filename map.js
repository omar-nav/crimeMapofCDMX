var mymap = L.map('mapid').setView([19.380142, -99.142966], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);

// COLORES
function choroplethizHomicidios2015(d) {
    return d > 245 ? '#b30000' :
        d > 108 ? '#e34a33' :
        d > 58 ? '#fc8d59' :
        d > 14 ? '#fdcc8a' :
            '#fef0d9';
}

// PINTAR LAS FIGURAS CON LOS COLORES
function styleHomicidios2015(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizHomicidios2015(feature.properties.homicidios2015_Grand_Total)
    }
}

// CREAR VARIABLES PARA LAS CAPAS
var Homicidios2015Layer = L.geoJSON([homicidios2015], {
    style: styleHomicidios2015,
    onEachFeature: geojsonPopupHomicidios2015,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});

// CREAR CAJAS AL MOMENTO DE HACER CLIC
function geojsonPopupHomicidios2015(feature, layer) {
    if (feature.properties.NOMGEO != null) {
        layer.bindPopup('Estado:   ' + feature.properties.NOMLOC + '<br>Homicidios en 2015:   ' + feature.properties.homicidios2015_Grand_Total);
    }
}

Homicidios2015Layer.addTo(mymap);
var featureLayers = {
    "Homicidios 2015": Homicidios2015Layer,
};
var geojson = L.control.layers(featureLayers, null, {
    collapsed: false
}).addTo(mymap);

// LEGEND STARTS HERE
var Homicidios2015Legend = L.control({ position: 'bottomright' });



Homicidios2015Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 14, 58, 108, 245],
        labels = ['Homicidios por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizHomicidios2015(from + 1) + '"></i> ' +
            from + (to ? ' a ' + to : ' o más'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};

Homicidios2015Legend.addTo(mymap);
let currentLegend = Homicidios2015Legend;

mymap.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Homicidios 2015') {
        mymap.removeControl(currentLegend);
        currentLegend = Homicidios2015Legend;
        Homicidios2015Legend.addTo(mymap);
    }
    // else if (eventLayer.name === 'Homicidios 2015') {
    //     mymap.removeControl(currentLegend);
    //     currentLegend = Homicidios2015Legend;
    //     Homicidios2015Legend.addTo(mymap);
    // }
});
// LEGEND ENDS HERE
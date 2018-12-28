var mymap = L.map('mapid').setView([19.380142, -99.142966], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);

// COLORES
function choroplethizeHomicidios2015(d) {
    return d > 245 ? '#b30000' :
        d > 108 ? '#e34a33' :
            d > 58 ? '#fc8d59' :
                d > 14 ? '#fdcc8a' :
                    '#fef0d9';
}
function choroplethizeHomicidios2016(d) {
    return d > 238 ? '#b30000' :
        d > 95 ? '#e34a33' :
            d > 66 ? '#fc8d59' :
                d > 22 ? '#fdcc8a' :
                    '#fef0d9';
}
function choroplethizeHomicidios2017(d) {
    return d > 192 ? '#b30000' :
        d > 123 ? '#e34a33' :
            d > 72 ? '#fc8d59' :
                d > 31 ? '#fdcc8a' :
                    '#fef0d9';
}
function choroplethizeRobos2015(d) {
    return d > 8783 ? '#7a0177' :
        d > 4726 ? '#c51b8a' :
            d > 3001 ? '#f768a1' :
                d > 1435 ? '#fbb4b9' :
                    '#feebe2';
}
function choroplethizeRobos2016(d) {
    return d > 8303 ? '#7a0177' :
        d > 6032 ? '#c51b8a' :
            d > 3305 ? '#f768a1' :
                d > 1423 ? '#fbb4b9' :
                    '#feebe2';
}
function choroplethizeRobos2017(d) {
    return d > 10447 ? '#7a0177' :
        d > 8097 ? '#c51b8a' :
            d > 2726 ? '#f768a1' :
                d > 1026 ? '#fbb4b9' :
                    '#feebe2';
}

// PINTAR LAS FIGURAS CON LOS COLORES
function styleHomicidios2015(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeHomicidios2015(feature.properties.homicidios2015_Grand_Total)
    }
}
function styleHomicidios2016(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeHomicidios2016(feature.properties.homicidios2016_Grand_Total)
    }
}
function styleHomicidios2017(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeHomicidios2017(feature.properties.homicidios2017_Grand_Total)
    }
}
function styleRobos2015(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeRobos2015(feature.properties.robbery2015_Total)
    }
}
function styleRobos2016(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeRobos2016(feature.properties.robbery2016_Total)
    }
}
function styleRobos2017(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeRobos2017(feature.properties.robbery2017_Total)
    }
}
// CREAR CAJAS AL MOMENTO DE HACER CLIC
function geojsonPopupHomicidios2015(feature, layer) {
    if (feature.properties.NOMLOC) {
        return layer.bindPopup('alcaldía:   ' + feature.properties.NOMLOC + '<br>Homicidios en 2015:   ' + feature.properties.homicidios2015_Grand_Total)
    }
}
function geojsonPopupHomicidios2016(feature, layer) {
    if (feature.properties.NOMLOC) {
        return layer.bindPopup('alcaldía:   ' + feature.properties.NOMLOC + '<br>Homicidios en 2016:   ' + feature.properties.homicidios2016_Grand_Total)
    }
}
function geojsonPopupHomicidios2017(feature, layer) {
    if (feature.properties.NOMLOC) {
        return layer.bindPopup('alcaldía:   ' + feature.properties.NOMLOC + '<br>Homicidios en 2017:   ' + feature.properties.homicidios2017_Grand_Total)
    }
}
function geojsonPopupRobos2015(feature, layer) {
    if (feature.properties.NOMLOC) {
        return layer.bindPopup('alcaldía:   ' + feature.properties.NOMLOC + '<br>Robos en 2015:   ' + feature.properties.robbery2015_Total)
    }
}
function geojsonPopupRobos2016(feature, layer) {
    if (feature.properties.NOMLOC) {
        return layer.bindPopup('alcaldía:   ' + feature.properties.NOMLOC + '<br>Robos en 2016:   ' + feature.properties.robbery2016_Total)
    }
}
function geojsonPopupRobos2017(feature, layer) {
    if (feature.properties.NOMLOC) {
        return layer.bindPopup('alcaldía:   ' + feature.properties.NOMLOC + '<br>Robos en 2017:   ' + feature.properties.robbery2017_Total)
    }
}

// CREAR VARIABLES PARA LAS CAPAS
var Homicidios2015Layer = L.geoJSON(homicidios2015, {
    style: styleHomicidios2015,
    onEachFeature: geojsonPopupHomicidios2015,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Homicidios2016Layer = L.geoJSON(homicidios2016, {
    style: styleHomicidios2016,
    onEachFeature: geojsonPopupHomicidios2016,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Homicidios2017Layer = L.geoJSON(homicidios2017, {
    style: styleHomicidios2017,
    onEachFeature: geojsonPopupHomicidios2017,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Robos2015Layer = L.geoJSON(robos2015, {
    style: styleRobos2015,
    onEachFeature: geojsonPopupRobos2015,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Robos2016Layer = L.geoJSON(robos2016, {
    style: styleRobos2016,
    onEachFeature: geojsonPopupRobos2016,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var Robos2017Layer = L.geoJSON(robos2017, {
    style: styleRobos2017,
    onEachFeature: geojsonPopupRobos2017,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});

// dibujar al mapa
Homicidios2015Layer.addTo(mymap);
var featureLayers = {
    "Homicidios 2015": Homicidios2015Layer,
    "Homicidios 2016": Homicidios2016Layer,
    "Homicidios 2017": Homicidios2017Layer,
    "Robos 2015": Robos2015Layer,
    "Robos 2016": Robos2016Layer,
    "Robos 2017": Robos2017Layer
};
var geojson = L.control.layers(featureLayers, null, {
    collapsed: false
}).addTo(mymap);

// LEGEND STARTS HERE
var Homicidios2015Legend = L.control({ position: 'bottomright' });
var Homicidios2016Legend = L.control({ position: 'bottomright' });
var Homicidios2017Legend = L.control({ position: 'bottomright' });
var Robos2015Legend = L.control({ position: 'bottomright' });
var Robos2016Legend = L.control({ position: 'bottomright' });
var Robos2017Legend = L.control({ position: 'bottomright' });

Homicidios2015Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 14, 58, 108, 245],
        labels = ['Homicidios por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeHomicidios2015(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 312'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Homicidios2016Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 22, 66, 95, 238],
        labels = ['Homicidios por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeHomicidios2016(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 349'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Homicidios2017Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 31, 72, 123, 192],
        labels = ['Homicidios por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeHomicidios2017(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 347'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Robos2015Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1435, 3001, 4726, 8783],
        labels = ['Robos por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeRobos2015(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 12646'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Robos2016Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1423, 3305, 6032, 8303],
        labels = ['Robos por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeRobos2016(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 12811'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Robos2017Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1026, 2726, 8097, 10447],
        labels = ['Robos por municipio'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeRobos2017(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 16633'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Homicidios2015Legend.addTo(mymap);
let currentLegend = Homicidios2015Legend;

// LEGEND Box
mymap.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Homicidios 2015') {
        mymap.removeControl(currentLegend);
        currentLegend = Homicidios2015Legend;
        Homicidios2015Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Homicidios 2016') {
        mymap.removeControl(currentLegend);
        currentLegend = Homicidios2016Legend;
        Homicidios2016Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Homicidios 2017') {
        mymap.removeControl(currentLegend);
        currentLegend = Homicidios2017Legend;
        Homicidios2017Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Robos 2015') {
        mymap.removeControl(currentLegend);
        currentLegend = Robos2015Legend;
        Robos2015Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Robos 2016') {
        mymap.removeControl(currentLegend);
        currentLegend = Robos2016Legend;
        Robos2016Legend.addTo(mymap);
    }
    else if (eventLayer.name === 'Robos 2017') {
        mymap.removeControl(currentLegend);
        currentLegend = Robos2017Legend;
        Robos2017Legend.addTo(mymap);
    }
});

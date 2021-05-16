/*PARTE DO MAPA*/

function show(){
  document.getElementById("sidebar").classList.toggle("active");
}

/*Parte PopUp*/

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/*//////////////////*/





var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  overlays: [overlay],
  view: new ol.View({
    center: ol.proj.fromLonLat([-8.65, 40.64]),
    zoom: 13
  })
});


map.on('singleclick', function (evt) {
  var coordinate = evt.coordinate;
  var hdms = "teste";
  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});


var entidadesSource = new ol.source.Vector({
  url: "./php/infocampo.php",
  format: new ol.format.GeoJSON()
});
var entidades = new ol.layer.Vector({
  title: "Equipamentos desportivos de Aveiro",
  source: entidadesSource
});
map.addLayer(entidades);
/*//////////////////////////*/



// Add Vector layer to map

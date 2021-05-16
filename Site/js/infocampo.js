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
var entidadesStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    //     size: [52, 52],
    //     offset: [52, 0],
    //     opacity: 1,
    scale: 0.05,
    src: "./icons/icone.png"
  })
});



var entidadesSource = new ol.source.Vector({
  url: "./php/infocampo.php",
  format: new ol.format.GeoJSON()
});
var entidades = new ol.layer.Vector({
  title: "Equipamentos desportivos de Aveiro",
  source: entidadesSource,
  style: entidadesStyle
});
map.addLayer(entidades);


map.on('click', function (evt) {
  var source = entidades.getSource();
  content.innerHTML = '<p>You clicked here:</p><code>testetesteteste</code>';
  overlay.setPosition(evt.coordinate);
});
/*//////////////////////////*/



// Add Vector layer to map

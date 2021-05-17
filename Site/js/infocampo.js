/*PARTE DO MAPA*/

function show() {
  document.getElementById("sidebar").classList.toggle("active");
}

/*Parte PopUp*/

var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

var overlay = new ol.Overlay.Popup({
  overlayClass: "default anim", //"tooltips", "warning" "black" "default", "tips", "shadow",
  element: container,
  closeBox: true,
  autoPan: true,
  autoPanAnimation: {
    duration: 100}
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/*//////////////////*/

var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  overlays: [overlay],
  view: new ol.View({
    center: ol.proj.fromLonLat([-8.65, 40.64]),
    zoom: 13,
  }),
});
var entidadesStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    //     size: [52, 52],
    //     offset: [52, 0],
    //     opacity: 1,
    scale: 0.05,
    src: "./icons/icone.png",
  }),
});

var entidadesSource = new ol.source.Vector({
  url: "./php/infocampo.php",
  format: new ol.format.GeoJSON(),
});
var entidades = new ol.layer.Vector({
  title: "Equipamentos desportivos de Aveiro",
  source: entidadesSource,
  style: entidadesStyle,
});
map.addLayer(entidades);

var btnVerEventos = document.getElementById("btnVerEventos");

var displayFeatureInfo = function(evt) {
  var features = [];
  map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    features.push(feature);
  });
  if (features.length > 0) {
    var info = [];
    
    for (var i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name')); 
    }
    var lonlat  = ol.proj.toLonLat(evt.coordinate);
    content.innerHTML =
    "<img src='./camposFotos/campos-futebol-aveiro3.jpg' alt='campo' class='imagensCampos'><p class='infoP'>Localização: "+
    lonlat[1] + " , " + lonlat[0]+
    "  </p><p class='infoP'>"+info[0]+"</p><br><input type='submit' value='Ver Eventos' class='btnEventos' id='btnVerEventos' onclick='infoEvento("+evt.coordinate+");'>";
    overlay.show(evt.coordinate,content);
    console.log(info.join(', ') || '(unknown)');
  } else {
    console.log('&nbsp;');
  }
};


map.on("click", function (evt) {
  var pixel = evt.pixel;
  displayFeatureInfo(evt);
  });
function infoEvento(...coordenadas) {
  let currentDate = new Date();
  content.innerHTML =
    "<img src='./camposFotos/campos-futebol-aveiro3.jpg' alt='campo' class='imagensCampos'><p class='infoP'>Localização: " +
    coordenadas +
    "</p>" + 
    "<p class='infoP'>Data e Hora: " + currentDate.toLocaleString("pt", {weekday: "long"})+"</p>" +
    "<p class='infoP'>Participantes: " + "</p>" +
    "<div id='divParticipantes'><img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>"
    +
    "<img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>"
    +
    "<img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>"
    +
    "<img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>" 
    +
    "<img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>" 
    +
    "</div>" +
    "<input type='submit' value='Entrar Evento' class='btnEventos' id='btnEntrarEvento'>"
    ;
}
/*//////////////////////////*/

// Add Vector layer to map

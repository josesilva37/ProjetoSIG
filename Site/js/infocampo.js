/*PARTE DO MAPA*/

function show() {
  document.getElementById("sidebar").classList.toggle("active");
}

/*Parte PopUp*/

var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

var overlay = new ol.Overlay.Popup({
  popupClass: "default anim", //"tooltips", "warning" "black" "default", "tips", "shadow",
  element: container,
  closeBox: true,
  positioning: "auto", 
  autoPan: true,
  autoPanAnimation: {
    duration: 100}
});

// closer.onclick = function () {
//   overlay.setPosition(undefined);
//   closer.blur();
//   return false;
// };

/*//////////////////*/

var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-8.65, 40.64]),
    zoom: 13,
  }),
  overlays: [overlay],
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


var select = new ol.interaction.Select({});
map.addInteraction(select);

select.getFeatures().on(['add'], function(evt){
  var feature = evt.element;
  var texto = "testeteste";
  var lonlat  = ol.coordinate.toStringHDMS(ol.proj.toLonLat(feature.getGeometry().getCoordinates()));
    content.innerHTML =
    "<img src='./camposFotos/campos-futebol-aveiro3.jpg' alt='campo' class='imagensCampos'><p class='infoP'>Localização: "
    + lonlat +
    "  </p><p class='infoP'>"+feature.get("name") + " " + feature.get("id") +"</p><br><input type='submit' value='Ver Eventos' class='btnEventos' id='btnVerEventos' onclick='infoEvento("+evt.coordinate+");'>";
    
    overlay.show(feature.getGeometry().getCoordinates(), content);
  })

select.getFeatures().on(['remove'], function(evt){
  overlay.hide()
});
/*
map.on("click", function (evt) {
  var pixel = evt.pixel;
  displayFeatureInfo(evt);
  });*/


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

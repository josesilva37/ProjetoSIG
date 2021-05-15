
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-8.65, 40.64]),
    zoom: 13
  })
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
// Add Vector layer to map
function show(){
  document.getElementById("sidebar").classList.toggle("active");
}
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

function show(){
    document.getElementById("sidebar").classList.toggle("active");
    console.log("teste");
}
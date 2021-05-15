var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-7.51, 39.33]),
      zoom: 7
    })
  });

function show(){
    document.getElementById("sidebar").classList.toggle("active");
    console.log("teste");
}
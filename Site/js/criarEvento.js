var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

function show(){
    document.getElementById("sidebar").classList.toggle("active");
    console.log("teste");
}

//pop up code

var btnAdd = document.getElementById("btnCriaEvento")
var span = document.getElementsByClassName("close")[0];
var popup = document.getElementById("popup");



btnAdd.onclick = function() {
    popup.style.display = "block";
}

span.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
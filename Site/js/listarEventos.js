var futEventos = document.getElementById("futEventos");
var popupListar = document.getElementById("popupListar");
var popupADD = document.getElementById("popupAdd");
futEventos.addEventListener("click", addEventoListar);


function addEventoListar(){
    popupListar.style.display = "block";
}

function closePOPLista() {
    popupListar.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popupListar) {
        popupListar.style.display = "none";
    }
    if (event.target == popupADD) {
        popupADD.style.display = "none";
    }
}
  
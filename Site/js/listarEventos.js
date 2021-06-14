var futEventos = document.getElementById("futEventos");
var popupListar = document.getElementById("popupListar");
futEventos.addEventListener("click", addEvento);


function addEvento(){
    popupListar.style.display = "block";
}

function closePOPLista() {
    popupListar.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popupListar) {
        popupListar.style.display = "none";
    }
}
  
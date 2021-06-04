
//pop up code

var btnAdd = document.getElementById("btnCriaEvento")
var closeAdd = document.getElementById("closeAdd");
var popup = document.getElementById("popupAdd");
var popupAddEvento = document.getElementById("popup-addEvento");
var popEvento = document.getElementById('popup-content');
var nome = popEvento.getElementsByTagName('p');
console.log(nome);

function addEvento(){
  popupAddEvento.innerHTML = "<div class='popup' id='popupAdd'>"+
  "<div class='popup-content'>"+
      "<span class='close' id='closeAdd' onclick='closePOP()'>&times;</span>"+
      "<img src='camposFotos/campos-futebol-aveiro3.jpg' alt='campo' id='foto'>"+
      "<h4>Localização: "+nome[1].innerText+"</h4>"+
      "<input type='date' id='data'>"+
      "<input type='time' id='hora'>"+
      "<input type='number' id='duracao' placeholder='Duração'>"+
      "<input type='number' id='numeroJogadores' placeholder='Número de Jogadores'>"+
      "<input type='submit' class='button' id='criarEvento' value='Criar Evento'>"+
  "</div>"+
"</div>"
}


function closePOP() {
  popupAddEvento.innerHTML = "";
}

window.onclick = function(event) {
  if (event.target == popup) {
      popup.style.display = "none";
  }
}
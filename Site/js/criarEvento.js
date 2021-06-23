
//pop up code

var btnAdd = document.getElementById("btnCriaEvento")
var closeAdd = document.getElementById("closeAdd");
var popupADD = document.getElementById("popupAdd");
var popEvento = document.getElementById('popup-content');
var nome = popEvento.getElementsByTagName('p');
var foto = popEvento.getElementsByTagName('img');
var fotoPOP = document.getElementById("foto");
var btnCriar = document.getElementById("criarEvento");
const data2 = document.getElementById("data");
const hora = document.getElementById("hora");
const participantes = document.getElementById("numeroJogadores");
var local = document.getElementById("localizacao");
btnCriar.addEventListener("click", gravar);
const duracao = document.getElementById("duracao");
var tipo_desporto = "";
var today = new Date().toISOString().split('T')[0];
var d = new Date();
var hours = d.getHours()+":"+d.getMinutes();
hora.setAttribute('min', hours);
data2.setAttribute('min', today);
var campo = "";


function addEvento(feature){
  var split = nome[0].innerText.split(":");
  campo = split[1];
  popupADD.style.display = "block";
  fotoPOP.src = foto[0].src;
  local.innerHTML = "<b>Localização: </b>"+campo;
  tipo_desporto = feature.get("sport");
  console.log(tipo_desporto);
  geomtria = feature.get("geom");
  console.log(geomtria)
}


function closePOP() {
  popupADD.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popupADD) {
      popupADD.style.display = "none";
  }
}


function gravar(){
  var data = {
      campoGeom: geomtria,
      data_hora : data2.value + " " + hora.value,
      participantes : participantes.value,
      tipo_desporto : tipo_desporto,
      duracao : duracao.value,
      nome_campo :  campo
  }
  console.log(data);
  url = "./php/criarEvento.php";
  $.ajax({
      type: 'POST',
      url: url,
      data: {json: JSON.stringify(data)},
      dataType: 'json'
  })
}

function redireciona(){
  window.alert("Necessita fazer login para aceder a esta funcionalidade");
}
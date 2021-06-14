
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

function addEvento(feature){
  popupADD.style.display = "block";
  fotoPOP.src = foto[0].src;
  local.innerText = "Localização: "+nome[1].innerText;
  tipo_desporto = feature.get("sport");
  console.log(tipo_desporto);
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
      local : nome[1].innerText,
      data_hora : data2.value + " " + hora.value,
      participantes : participantes.value,
      tipo_desporto : tipo_desporto,
      duracao: duracao.value
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
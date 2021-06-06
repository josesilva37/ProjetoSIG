
//pop up code

var btnAdd = document.getElementById("btnCriaEvento")
var closeAdd = document.getElementById("closeAdd");
var popup = document.getElementById("popupAdd");
var popupAddEvento = document.getElementById("popup-addEvento");
var popEvento = document.getElementById('popup-content');
var nome = popEvento.getElementsByTagName('p');
var foto = popEvento.getElementsByTagName('img');
var btnCriar = document.getElementById("criarEvento");
btnCriar.addEventListener("click", gravar);
console.log(foto);

function addEvento(){
  popupAddEvento.innerHTML = "<div class='popup' id='popupAdd'>"+
  "<div class='popup-content'>"+
      "<span class='close' id='closeAdd' onclick='closePOP()'>&times;</span>"+
      "<img src='"+foto[0].src+"' alt='campo' id='foto'>"+
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


function gravar(){
  var data = {
      username : "teste",
      valor : valor.value,
      tipo_cripto : cripto.value,
      data_hora : data2.value,
      fonte : "coinbase"
  }
  console.log(data);
  url = "./php/inserirCripto.php";
  $.ajax({
      type: 'POST',
      url: url,
      data: {json: JSON.stringify(data)},
      dataType: 'json'
  })
  alert("Adicionado com sucesso!");
}
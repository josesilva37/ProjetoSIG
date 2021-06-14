<?php
session_start();
if (!isset($_SESSION["username"])) {
  header("Location: ./index.html");
}
?>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="./css/infocampo.css" />
  <link rel="stylesheet" href="css/criarEvento.css" />
  <!-- Openlayers -->
  <link rel="stylesheet" href="https://openlayers.org/en/latest/css/ol.css" />
  <script type="text/javascript" src="https://openlayers.org/en/latest/build/ol.js"></script>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL,Object.assign"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

  <!-- ol-ext -->
  <link rel="stylesheet" href="./css/ol-ext.css" />
  <script type="text/javascript" src="./js/ol-ext.js"></script>
  <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
  <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <title>Projeto SIG</title>

</head>

<body>
  <div id="barraMenu">
    <div id="sidebar">
      <div class="toggle-btn" onclick="show()">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="input-container">
        <i class="fa fa-search icon"></i>
        <input type="text" name="textoPesquisa" class="txtPesquisa" placeholder="Pesquise aqui" />
        <a href="#" onclick="mostrarFiltro()"><i class="fa fa-filter iconFilter"></i></a>
      </div>
      <div style="display: none;" name="filtroContent">
          <h3 style="margin-bottom: 10px; margin-top: 45px;margin-left: 10px;">Filtros</h3>
            <form style="margin-left:20px; margin-bottom: 10px;">
              <label> Campos:</label>  
              <select class="form-control" style="width: 250px;" id="selectCampos">  
                <option value="todos" selected="selected">Todos os campos</option>
                <option value="soccer">Futebol</option>  
                <option value="basketball">Basquetebol</option>  
                <option value="beachvolleyball">Voleibol</option>  
                <option value="tennis">Ténis</option>
                <option value="padel">Pádel</option>  
                <option value="multi">Multidesportivos</option>
              </select>  
              <p></p>
              <label style="margin-bottom: 10px ;margin-top: 15px;">Distância/Tempo:</label>
              <p style="margin-left:10px;"></p>
              <div style="margin-left:10px;">
                <input type="checkbox" id="filtrotempo" name="filtrotempo" checked="">
                <label for="filtrotempo">Menos que 5 minutos à pé</label>
                  <p></p><p style="margin-top: 15px;">
                  <input type="checkbox" id="filtrotempo2" name="filtrotempo2" checked="">
                <label for="filtrotempo2">Menos que 2 minutos de carro</label>
              
                  </p></div>
            </form>
       
        </div>
        <div name ="menuContent">
        <h3 class="titulo">Eventos:</h3>

      <ul>
        <li><i class="far fa-futbol iconFutebol"></i>Futebol</li>
        <li><i class='fas fa-basketball-ball iconBasket'></i>Basquetebol</li>
        <li><i class="fas fa-volleyball-ball iconVolley"></i>Voleibol</li>
        <li><span class="iconify iconTenis" data-icon="mdi-tennis-ball" data-inline="true"></span>Ténis</li>
        <li><span class="iconify iconPadel" data-icon="si-glyph:tennis-racket-ball" data-inline="true"></span>Pádel</li>
      </ul>
      </div>
      <i class="fa fa-user-circle fa-2x iconProfile"></i>
      <?php
      echo
      "<p id='logged' >Logged as: ".$_SESSION["username"]."</p>";
      ?>
    </div>
  </div>
  <div id="map" class="map"></div>
  <div id="popup-content"></div>
  <div id="popup-addEvento">
  <div class="popup" id="popupAdd">
        <div class="popup-content">
          <span class="close" id="closeAdd" onclick="closePOP()">&times;</span>
            <img src="" alt="campo" id="foto">
            <h4 id="localizacao"></h4>
            <form method="POST">
              <input type="date" id="data">
              <input type="time" id="hora">
              <select name="duracao" id="duracao">
                <option value="" disabled selected class="form-select">Selecione a duração</option>
                <option value="1">1h</option>
                <option value="2">2h</option>
                <option value="3">3h</option>
              </select>
              <input type="number" id="numeroJogadores" placeholder="Número de Jogadores">
              <input type="submit" class="button" id="criarEvento" value="Criar Evento">
          </form>
        </div>
      </div>
    </div>
  <script src="js/logged.js"></script>
  <script src="js/infocampo.js"></script>
  <script src="js/criarEvento.js"></script>
  <script src="js/login.js"></script>
  <script src="js/siema.min.js"></script>
  <script> 
      var filtroAtivo = false;
      function mostrarFiltro() {
        var filtroContent = document.getElementsByName("filtroContent")[0];
        var menuContent = document.getElementsByName("menuContent")[0];
        if(filtroAtivo){
          filtroContent.style.display = "none";
          menuContent.style.display = "inline";
          filtroAtivo = false;
        }else{
          filtroContent.style.display = "inline";
          menuContent.style.display = "none";
          filtroAtivo = true;
        }
  
  }
      </script>
</body>

</html>
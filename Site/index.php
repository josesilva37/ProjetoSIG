<html lang="en">
<?php
session_start();
?>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="css/login.css" />
  <link rel="stylesheet" href="./css/infocampo.css" />
  <link rel="stylesheet" href="css/criarEvento.css" />
  <link href="css/styles.css" rel="stylesheet" />
  <link href="css/typeahed.css" rel="stylesheet"/>


  <!-- Openlayers -->
  <link rel="stylesheet" href="https://openlayers.org/en/latest/css/ol.css" />
  <script type="text/javascript" src="https://openlayers.org/en/latest/build/ol.js"></script>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL,Object.assign"></script>
  <script src="https://unpkg.com/elm-pep"></script>
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
        <div id="multiple-datasets">
          <input type="text" name="textoPesquisa" autocomplete="on" class="txtPesquisa typeahead" placeholder="Pesquise por nome..." />
        </div>
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
          <br>
          <!-- <button id="location-button" class="">Get user Location</button> -->
          <p style="margin-left:10px;"></p>
          <div style="margin-left:10px;">
          <input type="checkbox" id="filtroRaio">
          <label for="raio">Campos a distancia de</label>
            <select name="raio" id="raio">
              <option value="1000">1km</option>
              <option value="2000">2km</option>
              <option value="3000">3km</option>
              <option value="4000">4km</option>
            </select>
            <br>
            <input type="checkbox" id="filtroTempo">
          <label for="tempo">Campos a</label>
            <select name="tempo" id="tempo">
              <option value="5">5min</option>
              <option value="10">10min</option>
              <option value="15">15min</option>
              <option value="30">30min</option>
            </select>
          </div>
          <label> Freguesias:</label>
          <select class="form-control" style="width: 250px;" id="freguesias">
            <option value="todasFreguesias" selected="selected">Todos as Freguesias</option>
            <option value="Aradas">Aradas</option>
            <option value="Cacia">Cacia</option>
            <option value="Esgueira">Esgueira</option>
            <option value="Eixo e Eirol">Eixo e Eirol</option>
            <option value="União das freguesias de Glória e Vera Cruz">União das freguesias de Glória e Vera Cruz</option>
            <option value="Oliveirinha">Oliveirinha</option>
            <option value="Requeixo, Nossa Senhora de Fátima e Nariz">Requeixo, Nossa Senhora de Fátima e Nariz</option>
            <option value="Santa Joana">Santa Joana</option>
            <option value="São Bernardo">São Bernardo</option>
            <option value="São Jacinto">São Jacinto</option>
          </select>
          <p></p>
        </form>
      </div>
      <div name="menuContent">
        <h3 class="titulo">Eventos:</h3>
        <ul>
          <li><i class="far fa-futbol iconFutebol"></i>Futebol</li>
          <li><i class='fas fa-basketball-ball iconBasket'></i>Basquetebol</li>
          <li><i class="fas fa-volleyball-ball iconVolley"></i>Voleibol</li>
          <li><span class="iconify iconTenis" data-icon="mdi-tennis-ball" data-inline="true"></span>Ténis</li>
          <li><span class="iconify iconPadel" data-icon="si-glyph:tennis-racket-ball" data-inline="true"></span>Pádel
          </li>
        </ul>
      </div>
      <i class="fa fa-user-circle fa-2x iconProfile" id="logIn"></i>
      <p id="logged"></p>
      <?php
      if (isset($_SESSION["error"])) {
        $error = $_SESSION["error"];
        echo "<span>$error</span>";
      }
      ?>
    </div>
  </div>
  <div id="map" class="map"></div>
  <div id="popup-content"></div>
  <!-- <div id="popup-addEvento">
    <div class="popup" id="popupAdd">
      <div class="popup-content">
        <span class="close" id="closeAdd" onclick="closePOP()">&times;</span>
        <img src="" alt="campo" id="foto">
        <h4 id="localizacao"></h4>
        <form method="POST">
          <input type="date" id="data">
          <input type="time" id="hora">
          <input type="number" id="duracao" placeholder="Duração">
          <input type="number" id="numeroJogadores" placeholder="Número de Jogadores">
          <input type="submit" class="button" id="criarEvento" value="Criar Evento">
        </form>
      </div>
    </div>
  </div> -->
  </div>
  <div class="login_popup" id="login_popup">
    <div class="popup-content">
      <span class="close" id="close">&times;</span>
      <div class="popup_content">
        <form action="php/login.php" method="post">

          <div class="container">
            <input id="inputUsername" type="text" placeholder="Enter Username" name="username" required>
            <br>
            <input id="inputPassword" type="password" placeholder="Enter Password" name="psw" required>
            <br>
            <button type="submit" id="loginBtn" name="submit" value="Submit">Login</button>
            <div id="btnCriarConta">Criar Conta</div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="create_popup" id="create_popup">
    <div class="popup-content">
      <span class="close" id="close2">&times;</span>
      <div class="popup_content">
        <form action="php/criarConta.php" method="POST">
          <div class="form-group">
            <input type="text" name="email" placeholder="Enter Email" id="criarContaEmail">
          </div>
          <div class="form-group">
            <input type="text" name="username" placeholder="Enter Username" id="criarContaUsername">
          </div>
          <div class="form-group">
            <input type="password" name="password" placeholder="Enter Password" id="CriarContaPass">
          </div>
          <div class="form-group">
            <input id="submitCriarConta" type="submit" class="btn btn-primary" value="Submit">
          </div>

        </form>
      </div>
    </div>
  </div>
  <script src="js/typeahead.bundle.js"></script>

  <script src="js/infocampo.js"></script>
  <script src="js/criarEvento.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  <script src="js/login.js"></script>
  <script src="js/siema.min.js"></script>
  <script>
    var filtroAtivo = false;

    function mostrarFiltro() {
      var filtroContent = document.getElementsByName("filtroContent")[0];
      var menuContent = document.getElementsByName("menuContent")[0];
      if (filtroAtivo) {
        filtroContent.style.display = "none";
        menuContent.style.display = "inline";
        filtroAtivo = false;
      } else {
        filtroContent.style.display = "inline";
        menuContent.style.display = "none";
        filtroAtivo = true;
      }

    }
  </script>
</body>

</html>
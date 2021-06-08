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
        <i class="fa fa-filter iconFilter"></i>
      </div>
      <h3 class="titulo">Eventos:</h3>

      <ul>
        <li><i class="far fa-futbol iconFutebol"></i>Futebol</li>
        <li><i class='fas fa-basketball-ball iconBasket'></i>Basquetebol</li>
        <li><i class="fas fa-volleyball-ball iconVolley"></i>Voleibol</li>
        <li><span class="iconify iconTenis" data-icon="mdi-tennis-ball" data-inline="true"></span>Ténis</li>
        <li><span class="iconify iconPadel" data-icon="si-glyph:tennis-racket-ball" data-inline="true"></span>Pádel</li>
      </ul>
      <i class="fa fa-user-circle fa-2x iconProfile"></i>
      <?php
      echo
      "<title>" + $_SESSION["username"]+"</title>";
      ?>
    </div>
  </div>
  <div id="map" class="map"></div>
  <div id="popup-content"></div>
  <div id="popup-addEvento"></div>
  </div>
  <script src="js/logged.js"></script>
  <script src="js/infocampo.js"></script>
  <script src="js/criarEvento.js"></script>
  <script src="js/login.js"></script>
</body>

</html>
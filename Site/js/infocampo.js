/*PARTE DO MAPA*/

function show() {
  document.getElementById("sidebar").classList.toggle("active");
}

/*Parte PopUp*/

var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

var selectCampos = document.getElementById("selectCampos");

var selectedRaio = document.getElementById("raio");
var isFiltroRaio = document.getElementById("filtroRaio");
var userLoc;
var filtroTempo = document.getElementById("filtroTempo");
var freguesias = document.getElementById("freguesias");
var selectTempo = document.getElementById("tempo");

var overlay = new ol.Overlay.Popup({
  popupClass: "default anim", //"tooltips", "warning" "black" "default", "tips", "shadow",
  element: container,
  closeBox: true,
  positioning: "auto",
  autoPan: true,
  autoPanAnimation: {
    duration: 100,
  },
});

// closer.onclick = function () {
//   overlay.setPosition(undefined);
//   closer.blur();
//   return false;
// };

/*//////////////////*/
/*
$('#location-button').click(function () {
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    var place = [position.coords.latitude, position.coords.longitude];
  })
})
*/
var rotaSource;
var rotas;
var primeiro_click_coords = null;
function criarRota(xOrigem,yOrigem , xDestino,yDestino){
  rotaSource.clear();
  rotaSource.setUrl("./php/criarRota.php?xOrigem="+xOrigem+"&yOrigem="+yOrigem+"&xDestino="+xDestino + "&yDestino=" + yDestino);

  rotaSource.refresh();
}
$(document).ready(function(){
rotaSource = new ol.source.Vector({     //busca os pontos das maquinas
  url: "",
  format: new ol.format.GeoJSON(),
});
 rotas = new ol.layer.Vector({
  source: rotaSource,
  title: " Rota",
  displayInLayerSwitcher: false,
  style: new ol.style.Style({

      stroke: new ol.style.Stroke({
          color: 'blue',
          width: 7
      })
  }),
});


var osm = new ol.layer.Tile({
  title: "OSM",
  baseLayer: true,
  source: new ol.source.OSM(),
});
var stamen = new ol.layer.Tile({
  title: "Watercolor",
  baseLayer: true,
  source: new ol.source.Stamen({
    layer: "watercolor",
  }),
  visible: false,
});

var satelite = new ol.layer.Tile({
  title: "Satelite",
  source: new ol.source.XYZ({
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  }),
  baseLayer: true,
  visible: false,
});
// GeoJSON layer with a preview attribute

var map = new ol.Map({
  target: "map",
  layers: [osm, stamen, satelite,rotas,],
  view: new ol.View({
    center: ol.proj.fromLonLat([-8.65, 40.64]),
    zoom: 12,
    //extent: [-8.224454, 39.399872],
  }),
  overlays: [overlay],
});



var locationDestinationSource = new ol.source.Vector();

var locationDestinationLayer = new ol.layer.Vector({
  source: locationDestinationSource,
  displayInLayerSwitcher: false,
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.2, 0.2],

      scale: 0.1,
      src: "./icons/map-marker-blue.png",
    }),
  }),
});
map.addLayer(locationDestinationLayer);

map.on("singleclick", function (evt) {
  if(primeiro_click_coords != null){
    criarRota(primeiro_click_coords[0],primeiro_click_coords[1],evt.coordinate[0],evt.coordinate[1]);
    var locationFeature = new ol.Feature({
      geometry: new ol.geom.Point([evt.coordinate[0], evt.coordinate[1]]),
      name: "User Destination",
    });
    locationDestinationSource.clear();
    locationDestinationSource.addFeature(locationFeature);
    primeiro_click_coords = null;

  }
  
  });
  function evento_ONMouseMove(evt) {
 
    if(primeiro_click_coords != null){
      // console.log(evt);

      var locationFeature = new ol.Feature({
        geometry: new ol.geom.Point([evt.coordinate[0], evt.coordinate[1]]),
        name: "User Destination",
      });
      locationDestinationSource.clear();
      locationDestinationSource.addFeature(locationFeature);

    }
    }


map.addControl(new ol.control.LayerSwitcherImage());

var campo_futebol_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.035,
      src: "./icons/football.svg",
    }),
  }),
];
var campo_futebol_highlight_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.6,
      src: "./icons/football.svg",
    }),
  }),
];
var campo_basket_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.05,
      src: "./icons/basketball.svg",
    }),
  }),
];
var campo_volei_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.05,
      src: "./icons/volleyball.svg",
    }),
  }),
];
var campo_tenis_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.09,
      src: "./icons/tennis.ico",
    }),
  }),
];
var campo_padel_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.05,
      src: "./icons/paddle.svg",
    }),
  }),
];
var entidadesStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    //size: [52, 52],
    //     offset: [52, 0],
    //     opacity: 1,
    scale: 0.13,
    src: "./icons/multisport.png",
  }),
});

function funcao_style(feature) {
  if (feature.get("sport") === "soccer") {
    return campo_futebol_Style;
  } else if (feature.get("sport") === "basketball") {
    return campo_basket_Style;
  } else if (feature.get("sport") === "beachvolleyball") {
    return campo_volei_Style;
  } else if (feature.get("sport") === "padel") {
    return campo_padel_Style;
  } else if (feature.get("sport") === "tennis") {
    return campo_tenis_Style;
  } else {
    return entidadesStyle;
  }
}
var entidadesSource = new ol.source.Vector({
  url: "./php/infocampo.php",
  format: new ol.format.GeoJSON(),
});
var entidades = new ol.layer.Vector({
  title: "Equipamentos desportivos de Aveiro",
  baseLayer: false,
  displayInLayerSwitcher: false,
  source: entidadesSource,
  style: funcao_style,
});

var futebol = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: "./php/pesquisaMenu.php?name=soccer",
});
var basketball = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: "./php/pesquisaMenu.php?name=basketball",
});
var tennis = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: "./php/pesquisaMenu.php?name=tennis",
});
var padel = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: "./php/pesquisaMenu.php?name=padel",
});
var multi = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: "./php/pesquisaMenu.php?name=multi",
});
var volei = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: "./php/pesquisaMenu.php?name=beachvolleyball",
});

$("#multiple-datasets .typeahead").typeahead(
  {
    highlight: true,
  },
  {
    name: "fut-points",
    display: "name",
    source: futebol.ttAdapter(),
    templates: {
      header: '<h3 class="type-name">Futebol:</h3>',
    },
  },
  {
    name: "basket-points",
    display: "name",
    source: basketball.ttAdapter(),
    templates: {
      header: '<h3 class="type-name">Basketball:</h3>',
    },
  },
  {
    name: "tennis-points",
    display: "name",
    source: tennis.ttAdapter(),
    templates: {
      header: '<h3 class="type-name">Ténis:</h3>',
    },
  },
  {
    name: "multi-points",
    display: "name",
    source: multi.ttAdapter(),
    templates: {
      header: '<h3 class="type-name">MultiDesportivo:</h3>',
    },
  },
  {
    name: "padel-points",
    display: "name",
    source: padel.ttAdapter(),
    templates: {
      header: '<h3 class="type-name">Pádel:</h3>',
    },
  },
  {
    name: "volei-points",
    display: "name",
    source: volei.ttAdapter(),
    templates: {
      header: '<h3 class="type-name">Voleyball:</h3>',
    },
  }
);

var select = new ol.interaction.Select({});
map.addInteraction(select);

$("#multiple-datasets .typeahead").on(
  "typeahead:selected",
  function (e, datum) {
    select.getFeatures().clear();
    var nome = datum.name;
    entidades.getSource().forEachFeature(function (feature) {
      var att = feature.get("name");
      if (att == nome) {
        var features = select.getFeatures();
        features.push(feature);
      }
    });

    select.getFeatures().forEach(function (feature) {
      var ext = feature.getGeometry().getExtent();
      var center = ol.extent.getCenter(ext);
      map.setView(
        new ol.View({
          projection: "EPSG:3857", //or any projection you are using
          center: [center[0], center[1]], //zoom to the center of your feature
          zoom: 15, //here you define the levelof zoom
        })
      );
    });

    $("#multiple-datasets .typeahead").typeahead("val", "");
  }
);

map.addLayer(entidades);

selectCampos.onchange = function () {
  var data = {
    tipoCampo: selectCampos.value,
    freg: freguesias.value,
  };
  entidadesSource.clear();
  $.ajax({
    type: "POST",
    url: "./php/infocampo.php",
    data: { json: JSON.stringify(data) },
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      var styleFeature;
      if (data.features[0].properties.sport === "soccer") {
        styleFeature = campo_futebol_Style;
      } else if (data.features[0].properties.sport === "basketball") {
        styleFeature = campo_basket_Style;
      } else if (data.features[0].properties.sport === "beachvolleyball") {
        styleFeature = campo_volei_Style;
      } else if (data.features[0].properties.sport === "padel") {
        styleFeature = campo_padel_Style;
      } else if (data.features[0].properties.sport === "tennis") {
        styleFeature = campo_tenis_Style;
      } else {
        styleFeature = entidadesStyle;
      }
      var features = new ol.format.GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857",
        style: styleFeature,
      });
      console.log(features);
      entidadesSource.addFeatures(features);
      entidades.setVisible(true);
    },
  });
};

var btnVerEventos = document.getElementById("btnVerEventos");

function imagemCampo(feature) {
  if (feature.get("sport") === "soccer") {
    return "./camposFotos/campos-futebol-aveiro3.jpg";
  } else if (feature.get("sport") === "basketball") {
    return "./camposFotos/campoBasket.jpg";
  } else if (feature.get("sport") === "beachvolleyball") {
    return "./camposFotos/beachvolei.jpeg";
  } else if (feature.get("sport") === "padel") {
    return "./camposFotos/campoPadel.jpg";
  } else if (feature.get("sport") === "tennis") {
    return "./camposFotos/campoTenis.jpg";
  } else {
    return "./camposFotos/campoMultiDesporto.jpg";
  }
}

select.getFeatures().on(["add"], function (evt) {
  var feature = evt.element;
  
  var texto = "testeteste";
  var lonlat = ol.coordinate.toStringHDMS(
    ol.proj.toLonLat(feature.getGeometry().getCoordinates())
  );
  let arrayCoordenadas = ol.proj.toLonLat(
    feature.getGeometry().getCoordinates()
  );
  let latitude = arrayCoordenadas[1];
  let longitude = arrayCoordenadas[0];
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://eu1.locationiq.com/v1/reverse.php?key=pk.cfb7c951db9623604df048d01960437e&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&format=json",
    method: "GET",
  };
  var nomeCampo;
  $.ajax(settings).done(function (response) {
    nomeCampo = response.display_name;
    content.innerHTML =
      "<img src='' id=imgsCampos alt='campo' class='imagensCampos'><p class='infoP'><span class='infoSpan'>Localização:</span> " +
      nomeCampo +
      "</p><br>";
    if (document.getElementById("logged").innerText != "") {
      content.innerHTML +=
        "<input type='submit' value='Criar Evento' class='btnAddEventos' id='btnAddEventos'><br><input type='submit' value='Ver Eventos' class='btnEventos' id='btnVerEventos'>";
      document
        .getElementById("btnAddEventos")
        .addEventListener("click", function () {
          addEvento(feature);
        });
      document.getElementById("btnVerEventos").addEventListener(
        "click",
        function () {
          infoEvento(evt, feature, nomeCampo);
        },
        false
      );
    }

    document.getElementById("imgsCampos").src = imagemCampo(feature);

    overlay.show(feature.getGeometry().getCoordinates(), content);
  });
});

select.getFeatures().on(["remove"], function (evt) {
  overlay.hide();
});
/*
map.on("click", function (evt) {
  var pixel = evt.pixel;
  displayFeatureInfo(evt);
  });*/

function voltarAtras(evt) {
  var feature = evt.element;
  var texto = "testeteste";
  var lonlat = ol.proj.toLonLat(feature.getGeometry().getCoordinates());
  let latitude = lonlat[1];
  let longitude = lonlat[0];
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://eu1.locationiq.com/v1/reverse.php?key=pk.cfb7c951db9623604df048d01960437e&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&format=json",
    method: "GET",
  };
  var nomeCampo;
  $.ajax(settings).done(function (response) {
    nomeCampo = response.display_name;
    console.log(nomeCampo);
    content.innerHTML =
      "<img src='' id=imgsCampos alt='campo' class='imagensCampos'><p class='infoP'><span class='infoSpan'>Localização:</span> " +
      nomeCampo +
      "</p><br>";
    if (document.getElementById("logged").innerText != "") {
      content.innerHTML +=
        "<input type='submit' value='Criar Evento' class='btnAddEventos' id='btnAddEventos'><br><input type='submit' value='Ver Eventos' class='btnEventos' id='btnVerEventos'>";
      document
        .getElementById("btnAddEventos")
        .addEventListener("click", function () {
          addEvento(feature);
        });
      document.getElementById("btnVerEventos").addEventListener(
        "click",
        function () {
          infoEvento(evt, feature, nomeCampo);
        },
        false
      );
    }

    document.getElementById("imgsCampos").src = imagemCampo(feature);

    overlay.show(feature.getGeometry().getCoordinates(), content);
  });
}

function infoEvento(evt, feature, nomeCampo) {
  var count = 0;
  var info = {
    campoGeom: feature.get("geom"),
  };
  content.innerHTML = "<div class='siema' id='caixaSiema'>";
  $.ajax({
    type: "POST",
    url: "./php/verEventos.php",
    data: { json: JSON.stringify(info) },
    dataType: "JSON",
    success: function (data) {
      caixaSiema = document.getElementById("caixaSiema");
      if (data.eventos.length <= 0) {
        caixaSiema.innerHTML =
          "<div id='divVoltar'><button id='btnVoltarAtras' class='voltarAtras'><i class='fas fa-arrow-circle-left'></i></button>Não existem eventos!</div></div>";
        let botoesVolAtrasSemEvt =
          document.getElementsByClassName("voltarAtras");
        for (let i = 0; i < botoesVolAtrasSemEvt.length; i++) {
          botoesVolAtrasSemEvt[i].addEventListener("click", function () {
            voltarAtras(evt);
          });
        }
        const mySiema = new Siema();
      } else {
        data.eventos.forEach(function (evento) {
          console.log(nomeCampo);
          var dhora = evento.data_hora;
          console.log(dhora);
          caixaSiema.innerHTML +=
            "<div><button id='btnVoltarAtras' class='voltarAtras'><i class='fas fa-arrow-circle-left'></i></button>" +
            "<img src='' alt='campo' class='imagensCampos'><p class='infoP'><span class='infoSpan'>Localização:</span> " +
            nomeCampo +
            "</p>" +
            "<p class='infoP'><span class='infoSpan'>Data e Hora:</span> " +
            evento.data_hora +
            "</p><input type='submit' value='Entrar' id=" +
            evento.data_hora.replace(" ", "_") +
            " class='btnEventos btnEntrarEvento' name='"+nomeCampo.replaceAll(",", "|").replaceAll(" ",";") + "'>" +
            "<p class='infoP'><span class='infoSpan'>Participantes: </span>" +
            evento.participantes +
            "</p><p class='infoP'><span class='infoSpan'>MáxParticipantes: </span>" +
            evento.participantesmax +
            "<div class='divParticipantes' id=" +
            count +
            ">";
          // divPart = document.getElementById(count);
          // for (let i = 0; i < parseInt(evento.participantes); i++) {
          //   divPart.innerHTML += "<img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>"
          // }

          caixaSiema.innerHTML += "</div></div>";
          count++;
        });
        caixaSiema.innerHTML += "</div>";
        content.innerHTML +=
          "<button class='prev btnSetas'><i class='fas fa-arrow-left setas'></i></button>" +
          "<button class='next btnSetas' id='setaDireita'><i class='fas fa-arrow-right setas'></i></button>";
        const mySiema = new Siema();
        $(".imagensCampos").attr("src", imagemCampo(feature));
        var botoesVolAtras = document.getElementsByClassName("voltarAtras");
        for (let i = 0; i < botoesVolAtras.length; i++) {
          botoesVolAtras[i].addEventListener("click", function () {
            voltarAtras(evt);
          });
        }
        var botoesEntrar = document.getElementsByClassName("btnEntrarEvento");
        for (let i = 0; i < botoesEntrar.length; i++) {
          botoesEntrar[i].addEventListener("click", function () {
            entrarEvento(this);
          });
        }
        document
          .querySelector(".prev")
          .addEventListener("click", () => mySiema.prev());
        document
          .querySelector(".next")
          .addEventListener("click", () => mySiema.next());
      }
    },
  });
}

function entrarEvento(element) {
  let horaEv = element.getAttribute("id");
  let nomeCampo = element.name.replaceAll("|", ",").replaceAll(";"," ");
  var entrarEvento = {
    dataHora: horaEv,
    nome_campo: nomeCampo
    
  };
  $.ajax({
    type: "POST",
    url: "./php/entrarEvento.php",
    data: { json: JSON.stringify(entrarEvento) },
    dataType: "text",
    success: function (data) {
      console.log(data);
      if (data == "sucesso") {
        alert("Entrou no evento com sucesso");
        location.reload();
      } else if(data == "Já entrou neste evento"){
        alert("Já está inscrito neste evento");
        location.reload();
      }else if(data == "Máximo de participantes"){
        alert("Já existe um número máximo de participantes");
        location.reload();
      }
    },
  });
}

var locationSource = new ol.source.Vector();

var locationLayer = new ol.layer.Vector({
  source: locationSource,
  displayInLayerSwitcher: false,
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],

      scale: 0.1,
      src: "./icons/icone.png",
    }),
  }),
});
map.addLayer(locationLayer);
map.on("dblclick", function (evt) {

  locationSource.clear();
  locationDestinationSource.clear();

  userLoc = evt.coordinate;



  var locationFeature = new ol.Feature({
    geometry: new ol.geom.Point([evt.coordinate[0], evt.coordinate[1]]),
    name: "User Location",
  });

  locationSource.addFeature(locationFeature);

primeiro_click_coords = evt.coordinate;

});
map.on("pointermove", function (evt) {evento_ONMouseMove(evt);});
isFiltroRaio.addEventListener("change", function () {
  if (userLoc == null) {
    alert("Selecione a localização de partida com duplo clique no mapa");
    isFiltroRaio.checked = false;
  } else {
    if (this.checked) {
      var raioData = {
        raio: selectedRaio.value,
        lat: userLoc[0],
        long: userLoc[1],
        tipo: selectCampos.value,
      };
      $.ajax({
        type: "POST",
        url: "./php/filtrarRaio.php",
        data: { json: JSON.stringify(raioData) },
        dataType: "JSON",
        success: function (data) {
          console.log(data);
          var styleFeature;
          if (data.features[0].properties.sport === "soccer") {
            styleFeature = campo_futebol_Style;
          } else if (data.features[0].properties.sport === "basketball") {
            styleFeature = campo_basket_Style;
          } else if (data.features[0].properties.sport === "beachvolleyball") {
            styleFeature = campo_volei_Style;
          } else if (data.features[0].properties.sport === "padel") {
            styleFeature = campo_padel_Style;
          } else if (data.features[0].properties.sport === "tennis") {
            styleFeature = campo_tenis_Style;
          } else {
            styleFeature = entidadesStyle;
          }
          var features = new ol.format.GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:4326",
            style: styleFeature,
          });
          console.log(features);
          entidadesSource.clear();
          entidadesSource.addFeatures(features);
          entidades.setVisible(true);
        },
      });
    } else {
      var data = {
        tipoCampo: selectCampos.value,
      };
      $.ajax({
        type: "POST",
        url: "./php/infocampo.php",
        data: { json: JSON.stringify(data) },
        dataType: "JSON",
        success: function (data) {
          console.log(data);
          var styleFeature;
          if (data.features[0].properties.sport === "soccer") {
            styleFeature = campo_futebol_Style;
          } else if (data.features[0].properties.sport === "basketball") {
            styleFeature = campo_basket_Style;
          } else if (data.features[0].properties.sport === "beachvolleyball") {
            styleFeature = campo_volei_Style;
          } else if (data.features[0].properties.sport === "padel") {
            styleFeature = campo_padel_Style;
          } else if (data.features[0].properties.sport === "tennis") {
            styleFeature = campo_tenis_Style;
          } else {
            styleFeature = entidadesStyle;
          }
          var features = new ol.format.GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:3857",
            style: styleFeature,
          });
          console.log(features);
          entidadesSource.clear();
          entidadesSource.addFeatures(features);
          entidades.setVisible(true);
        },
      });
    }
  }
});
filtroTempo.addEventListener("change", function () {
  if (userLoc == null) {
    alert("Selecione a localização de partida com duplo clique no mapa");
    filtroTempo.checked = false;
  }else{
    if(this.checked){
      var dataTempo = {
        x: userLoc[0],
        y: userLoc[1],
        d: selectTempo.value,
      };
      $.ajax({
        type: "POST",
        url: "./php/filtrarTempo.php",
        data : { json: JSON.stringify(dataTempo) },
        dataType : 'json',
        success : function(data){
          if(data.features.length == 0){
            window.alert("Nao existem campos a " + selectTempo.value+" min do ponto selecionado")
          }else{
            var styleFeature;
          if (data.features[0].properties.sport === "soccer") {
            styleFeature = campo_futebol_Style;
          } else if (data.features[0].properties.sport === "basketball") {
            styleFeature = campo_basket_Style;
          } else if (data.features[0].properties.sport === "beachvolleyball") {
            styleFeature = campo_volei_Style;
          } else if (data.features[0].properties.sport === "padel") {
            styleFeature = campo_padel_Style;
          } else if (data.features[0].properties.sport === "tennis") {
            styleFeature = campo_tenis_Style;
          } else {
            styleFeature = entidadesStyle;
          }
          var features = new ol.format.GeoJSON().readFeatures(data, {
            featureProjection: "EPSG:3857",
            style: styleFeature
            
          });
          entidadesSource.clear();
          entidadesSource.addFeatures(features);
          entidades.setVisible(true);
          }
          
    }});
  }else{
        var data = {
          tipoCampo: selectCampos.value,
        };
        $.ajax({
          type: "POST",
          url: "./php/infocampo.php",
          data: { json: JSON.stringify(data) },
          dataType: "JSON",
          success: function (data) {
            console.log(data);
            var styleFeature;
            if (data.features[0].properties.sport === "soccer") {
              styleFeature = campo_futebol_Style;
            } else if (data.features[0].properties.sport === "basketball") {
              styleFeature = campo_basket_Style;
            } else if (data.features[0].properties.sport === "beachvolleyball") {
              styleFeature = campo_volei_Style;
            } else if (data.features[0].properties.sport === "padel") {
              styleFeature = campo_padel_Style;
            } else if (data.features[0].properties.sport === "tennis") {
              styleFeature = campo_tenis_Style;
            } else {
              styleFeature = entidadesStyle;
            }
            var features = new ol.format.GeoJSON().readFeatures(data, {
              featureProjection: "EPSG:3857",
              style: styleFeature,
            });
            console.log(features);
            entidadesSource.clear();
            entidadesSource.addFeatures(features);
            entidades.setVisible(true);
          },
        });
      }
    }
  });
/*

freguesias.addEventListener("change", function(){
  var dataFreguesia = {
    freg : freguesias.value,
    tipoCampo: selectCampos.value
  }
  $.ajax({
    type: 'POST',
    url: './php/filtrarFreguesia.php',
    data: { json: JSON.stringify(dataFreguesia) },
    dataType: 'JSON',
    success: function (data) {
      console.log(data);
      if(data.features.length == 0){
        window.alert("Não existem campos com esses parâmetros nessa freguesia");
      }else{
      var styleFeature;
      if (data.features[0].properties.sport === "soccer") {
        styleFeature = campo_futebol_Style;
      } else if (data.features[0].properties.sport === "basketball") {
        styleFeature = campo_basket_Style;
      } else if (data.features[0].properties.sport === "beachvolleyball") {
        styleFeature = campo_volei_Style;
      } else if (data.features[0].properties.sport === "padel") {
        styleFeature = campo_padel_Style;
      } else if (data.features[0].properties.sport === "tennis") {
        styleFeature = campo_tenis_Style;
      } else {
        styleFeature = entidadesStyle;
      }
      var features = new ol.format.GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857",
        style: styleFeature,
      });
      console.log(features);
      entidadesSource.clear();
      entidadesSource.addFeatures(features);
      entidades.setVisible(true);
    }
  });
});});
*/

freguesias.addEventListener("change", function () {
  if(isFiltroRaio.checked == true){
    isFiltroRaio.checked = false;
  }
  if(filtroTempo.checked == true){
    filtroTempo.checked = false;
  }
  var dataFreguesia = {
    freg: freguesias.value,
    tipoCampo: selectCampos.value,
  };
  $.ajax({
    type: "POST",
    url: "./php/filtrarFreguesia.php",
    data: { json: JSON.stringify(dataFreguesia) },
    dataType: "JSON",
    success: function (data) {
      if (data.features.length == 0) {
        window.alert("Não existem campos com esses parâmetros nessa freguesia");
      } else {
        var styleFeature;
        if (data.features[0].properties.sport === "soccer") {
          styleFeature = campo_futebol_Style;
        } else if (data.features[0].properties.sport === "basketball") {
          styleFeature = campo_basket_Style;
        } else if (data.features[0].properties.sport === "beachvolleyball") {
          styleFeature = campo_volei_Style;
        } else if (data.features[0].properties.sport === "padel") {
          styleFeature = campo_padel_Style;
        } else if (data.features[0].properties.sport === "tennis") {
          styleFeature = campo_tenis_Style;
        } else {
          styleFeature = entidadesStyle;
        }
        var features = new ol.format.GeoJSON().readFeatures(data, {
          featureProjection: "EPSG:4326",
          style: styleFeature,
        });
        entidadesSource.clear();
        entidadesSource.addFeatures(features);
        entidades.setVisible(true);
        if(freguesias.value != "todasFreguesias"){
          map.getView().fit(features[0].getGeometry(), {size:map.getSize(), maxZoom:14});
        }else{
          map.getView().fit(features[0].getGeometry(), {size:map.getSize(), maxZoom:11});
        }
      }
    },
  });
});
});
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
$(document).ready(function(){
var rotas;



var textoObj = { "type": "FeatureCollection", "features": [ {"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6584932,40.6378579],[-8.6584256,40.6378001],[-8.6583468,40.6377604],[-8.6582053,40.6376967],[-8.6579835,40.6376009]]]}, "properties": {"seq":"1","node":"230","edge":"62433","cost":"0.0010398"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6579835,40.6376009],[-8.6579019,40.6375423],[-8.6578528,40.637507],[-8.6576933,40.6373919],[-8.6575869,40.6373152]]]}, "properties": {"seq":"2","node":"47948","edge":"62432","cost":"0.0009228"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6575869,40.6373152],[-8.6569565,40.6368266],[-8.6567385,40.6366458],[-8.656655,40.6365813],[-8.6565682,40.6365143],[-8.656529,40.6364841],[-8.6563659,40.6363581]]]}, "properties": {"seq":"3","node":"15384","edge":"67993","cost":"0.0029628"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6563659,40.6363581],[-8.6561904,40.6362226]]]}, "properties": {"seq":"4","node":"19548","edge":"67994","cost":"0.0004225"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6561904,40.6362226],[-8.6559695,40.636052]]]}, "properties": {"seq":"5","node":"15380","edge":"67995","cost":"0.0005319"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6559695,40.636052],[-8.6557529,40.6358936]]]}, "properties": {"seq":"6","node":"19549","edge":"67996","cost":"0.0005077"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6557529,40.6358936],[-8.6557061,40.635819],[-8.6556899,40.6357614],[-8.655694,40.6356863]]]}, "properties": {"seq":"7","node":"14238","edge":"18770","cost":"0.0004819"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.655694,40.6356863],[-8.6557528,40.6356481],[-8.6558273,40.6355634],[-8.6559287,40.6353826]]]}, "properties": {"seq":"8","node":"192","edge":"219","cost":"0.0007941"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6559287,40.6353826],[-8.6559541,40.6352864],[-8.6559225,40.6352326],[-8.6558751,40.6351998],[-8.6558369,40.6351758]]]}, "properties": {"seq":"9","node":"25056","edge":"220","cost":"0.0005411"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6558369,40.6351758],[-8.6558767,40.6350002],[-8.6559809,40.6348907],[-8.6561655,40.6347212],[-8.6562982,40.6345929],[-8.6563625,40.6345042],[-8.6563984,40.634408],[-8.6564109,40.6342559],[-8.6563829,40.6341511],[-8.656207,40.63384],[-8.6560551,40.6336053]]]}, "properties": {"seq":"10","node":"342","edge":"384","cost":"0.003907"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6560551,40.6336053],[-8.6558006,40.6332394]]]}, "properties": {"seq":"11","node":"343","edge":"62394","cost":"0.0009201"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6558006,40.6332394],[-8.6557139,40.633259]]]}, "properties": {"seq":"12","node":"47933","edge":"62395","cost":"0.0001908"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6557139,40.633259],[-8.6555597,40.6332767]]]}, "properties": {"seq":"13","node":"14240","edge":"18773","cost":"0.000329"}},{"type": "Feature", "geometry": {"type":"MultiLineString","coordinates":[[[-8.6555597,40.6332767],[-8.6554341,40.6333046],[-8.6552001,40.6333726],[-8.6548239,40.6334819],[-8.6544667,40.6335801],[-8.6540305,40.6337111],[-8.6539015,40.6337421]]]}, "properties": {"seq":"14","node":"51441","edge":"18774","cost":"0.0037311"}} ]};

var textoJSON = textoObj;
// console.log(textoJSON.features);




var rotaSource = new ol.source.Vector({     //busca os pontos das maquinas
  //url: 'calculaRota.php',
  features: new ol.format.GeoJSON().readFeatures(textoJSON, { featureProjection: 'EPSG:3857' }),
});

console.log(rotaSource.getFeatures() + "dddd");
var rotas = new ol.layer.Vector({
  source: rotaSource,
  title: " Rota",
  style: new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: 'green',
          width: 10
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
            " class='btnEventos' onclick='entrarEvento(this)'>" +
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
  var entrarEvento = {
    dataHora: horaEv,
  };
  $.ajax({
    type: "POST",
    url: "./php/entrarEvento.php",
    data: { json: JSON.stringify(entrarEvento) },
    dataType: "text",
    success: function (data) {
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
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],

      scale: 0.1,
      src: "./icons/icone.png",
    }),
  }),
});
map.on("dblclick", function (evt) {
  console.log(evt.coordinate[0] + " , " +  evt.coordinate[1]);
  locationSource.clear();
  console.log(locationSource.getFeatures());
  userLoc = evt.coordinate;

  console.log(evt.coordinate);

  var locationFeature = new ol.Feature({
    geometry: new ol.geom.Point([evt.coordinate[0], evt.coordinate[1]]),
    name: "User Location",
  });

  locationSource.addFeature(locationFeature);

  map.addLayer(locationLayer);




console.log(rotas.getProperties());
map.addLayer(rotas);

});
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
      console.log(data);
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
        console.log(features);
        entidadesSource.clear();
        entidadesSource.addFeatures(features);
        entidades.setVisible(true);
      }
    },
  });
});
});
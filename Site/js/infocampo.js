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

var overlay = new ol.Overlay.Popup({
  popupClass: "default anim", //"tooltips", "warning" "black" "default", "tips", "shadow",
  element: container,
  closeBox: true,
  positioning: "auto",
  autoPan: true,
  autoPanAnimation: {
    duration: 100
  }
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

var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-8.65, 40.64]),
    zoom: 13,
  }),
  overlays: [overlay],
});

var campo_futebol_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.035,
      src: "./icons/football.svg"
    })
  })
];
var campo_basket_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.05,
      src: "./icons/basketball.svg"
    })
  })
];
var campo_volei_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.05,
      src: "./icons/volleyball.svg"
    })
  })
];
var campo_tenis_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.09,
      src: "./icons/tennis.ico"
    })
  })
];
var campo_padel_Style = [
  new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      //     size: [52, 52],
      //     offset: [52, 0],
      //     opacity: 1,
      scale: 0.05,
      src: "./icons/paddle.svg"
    })
  })
];
var entidadesStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    //size: [52, 52],
    //     offset: [52, 0],
    //     opacity: 1,
    scale: 0.20,
    src: "./icons/multisport.png",
  }),
});

function funcao_style(feature) {
  if (feature.get("sport") === "soccer") {
    return campo_futebol_Style;
  } else if (feature.get("sport") === "basketball") {
    return campo_basket_Style;
  } else if (feature.get("sport") === "volleyball") {
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
  url: './php/infocampo.php',
  format: new ol.format.GeoJSON()
});
var entidades = new ol.layer.Vector({
  title: "Equipamentos desportivos de Aveiro",
  source: entidadesSource,
  style: funcao_style,
});

map.addLayer(entidades);

selectCampos.onchange = function () {
  var data = {
    tipoCampo: selectCampos.value
  }
  $.ajax({
    type: 'POST',
    url: './php/infocampo.php',
    data: { json: JSON.stringify(data) },
    dataType: 'JSON',
    success: function (data) {
      console.log(data);
      var styleFeature;
      if (data.features[0].properties.sport === "soccer") {
        styleFeature = campo_futebol_Style;
      } else if (data.features[0].properties.sport === "basketball") {
        styleFeature = campo_basket_Style;
      } else if (data.features[0].properties.sport === "volleyball") {
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
      console.log(features);
      entidadesSource.clear();
      entidadesSource.addFeatures(features);
      entidades.setVisible(true);
    }

  })
};


var btnVerEventos = document.getElementById("btnVerEventos");


var select = new ol.interaction.Select({});
map.addInteraction(select);

function imagemCampo(feature) {
  if (feature.get("sport") === "soccer") {
    return "./camposFotos/campos-futebol-aveiro3.jpg";
  } else if (feature.get("sport") === "basketball") {
    return "./camposFotos/campoBasket.jpg";
  } else if (feature.get("sport") === "volleyball") {
    return "./camposFotos/campoVolei.jpg";
  } else if (feature.get("sport") === "padel") {
    return "./camposFotos/campoPadel.jpg";
  } else if (feature.get("sport") === "tennis") {
    return "./camposFotos/campoTenis.jpg";
  } else {
    return "./camposFotos/campoMultiDesporto.jpg";
  }
}

select.getFeatures().on(['add'], function (evt) {
  var feature = evt.element;
  var texto = "testeteste";
  var lonlat = ol.coordinate.toStringHDMS(ol.proj.toLonLat(feature.getGeometry().getCoordinates()));
  content.innerHTML =
    "<img src='' id=imgsCampos alt='campo' class='imagensCampos'><p class='infoP'>Localização: "
    + lonlat + feature.get("id") +
    "  </p><p id='nomeCampo' class='infoP'>" + feature.get("name") + "</p><br><input type='submit' value='+' class='btnAddEventos' id='btnAddEventos'><br><input type='submit' value='Ver Eventos' class='btnEventos' id='btnVerEventos'>";
  document.getElementById("imgsCampos").src = imagemCampo(feature);
  document.getElementById("btnAddEventos").addEventListener("click", function(){
    addEvento(feature);
  });
  document.getElementById("btnVerEventos").addEventListener("click",function(){
    infoEvento(feature);
}, false);
  overlay.show(feature.getGeometry().getCoordinates(), content);
})

select.getFeatures().on(['remove'], function (evt) {
  overlay.hide()
}); 
/*
map.on("click", function (evt) {
  var pixel = evt.pixel;
  displayFeatureInfo(evt);
  });*/



  function infoEvento(feature) {
    var count = 0;
    var info = {
      nome: feature.get("name"),
    }
    content.innerHTML = "<div class='siema' id='caixaSiema'>";
    $.ajax({
      type: 'POST',
      url: './php/verEventos.php',
      data: { json: JSON.stringify(info) },
      success: function(data){
        caixaSiema = document.getElementById("caixaSiema");
        if(data.eventos.length <= 0){
          caixaSiema.innerText = "Não existem eventos!";
        }else{
        data.eventos.forEach(function (evento){
          console.log(evento.data_hora);
          caixaSiema.innerHTML +=  "<div>"+
          "<img src='' alt='campo' class='imagensCampos'><p class='infoP'>Localização: " +
          evento.nome_local +
          "</p>" +
          "<p class='infoP'>Data e Hora: " + evento.data_hora + "</p>" +
          "<p class='infoP'>Participantes: " + evento.participantes + "</p>" +
          "<div class='divParticipantes' id="+count+">";
          divPart = document.getElementById(count);
          for(let i = 0;i<parseInt(evento.participantes);i++){
            divPart.innerHTML +="<img src='./icons/avatarParticipantes.png' alt='participante' class='imagensAvatares'>"
          }
          caixaSiema.innerHTML += "</div></div>";
          count++;
        })
        caixaSiema.innerHTML += "</div>";
        content.innerHTML += 
        "<button class='prev btnSetas'><i class='fas fa-arrow-left setas'></i></button>"+
        "<button class='next btnSetas'><i class='fas fa-arrow-right setas'></i></button>"+
        "<input type='submit' value='Entrar Evento' class='btnEventos' id='btnEntrarEvento'>"
        const mySiema = new Siema();
        $(".imagensCampos").attr("src", imagemCampo(feature));
        document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
        document.querySelector('.next').addEventListener('click', () => mySiema.next());
      }
    }
    });
   
}

if(isFiltroRaio.checked){
  if(userLoc == null){
    alert("Selecione a localização de partida com duplo clique no mapa");
  }
}

map.on('dblclick', function (evt) {
  userLoc = evt.coordinate;
  console.log(evt.coordinate)
  var place = [evt.coordinate[0], evt.coordinate[1]];

  var locationFeature = new ol.Feature({
    geometry: new ol.geom.Point(place),
    name: 'User Location',
});
 
  

var locationSource = new ol.source.Vector({
  feature:  locationFeature,
});

var locationLayer = new ol.layer.Vector({
  source: locationSource,
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],

      scale: 0.1,
      src: "../icons/icone.png"
    })
  })
});

map.addLayer(locationLayer);

});
var futEventos = document.getElementById("futEventos");
var basqueteEventos = document.getElementById("basqueteEventos");
var voleiEventos = document.getElementById("voleiEventos");
var tenisEventos = document.getElementById("tenisEventos");
var padelEventos = document.getElementById("padelEventos");

//futebol
var popupListarFutebol = document.getElementById("popupListarFutebol");
var popListarFutebolContent = document.getElementById("popListarFutebolContent");
//basquete
var popupListarBasquetebol = document.getElementById("popupListarBasquetebol");
var popListarBasquetebolContent = document.getElementById("popListarBasquetebolContent");
//volei
var popupListarVolei = document.getElementById("popupListarVolei");
var popListarVoleiContent = document.getElementById("popListarVoleiContent");
//tenis
var popupListarTenis = document.getElementById("popupListarTenis");
var popListarTenisContent = document.getElementById("popListarTenisContent");
//padel
var popupListarPadel = document.getElementById("popupListarPadel");
var popListarPadelContent = document.getElementById("popListarPadelContent");


var popupADD = document.getElementById("popupAdd");
futEventos.addEventListener("click", addEventoListarFutebol);
basqueteEventos.addEventListener("click",addEventoListarBasquete);
voleiEventos.addEventListener("click", addEventoListarVolei);
tenisEventos.addEventListener("click",addEventoListarTenis);
padelEventos.addEventListener("click", addEventoListarPadel);



function addEventoListarFutebol(){
    popupListarFutebol.style.display = "block";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "none";
}
function addEventoListarBasquete(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "block";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "none";
}
function addEventoListarVolei(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "block";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "none";
}
function addEventoListarTenis(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "block";
    popupListarPadel.style.display = "none";
}
function addEventoListarPadel(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "block";
}

function closePOPLista() {
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popupListarFutebol) {
        popupListarFutebol.style.display = "none";
    }
    if (event.target == popupADD) {
        popupADD.style.display = "none";
    }
    if (event.target == popupListarBasquetebol) {
        popupListarBasquetebol.style.display = "none";
    }
    if (event.target == popupListarVolei) {
        popupListarVolei.style.display = "none";
    }
    if (event.target == popupListarTenis) {
        popupListarTenis.style.display = "none";
    }
    if (event.target == popupListarPadel) {
        popupListarPadel.style.display = "none";
    }
}

$.ajax({
    url: "./php/listarEventos.php",
    type: 'POST',
    dataType: 'json',
    success: function(evento){
        for(let i = 0;i<evento.eventos.length;i++){
            if(evento.eventos[i].tipo_desporto === "soccer"){
                popListarFutebolContent.innerHTML += "<div class='eventoRow'>"+
                "<h5><b>Local: </b>"+ evento.eventos[i].nome_local+"</h5>"+
                "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                "</div>";
            }
            if(evento.eventos[i].tipo_desporto === "basketball"){
                popListarBasquetebolContent.innerHTML += "<div class='eventoRow'>"+
                "<h5><b>Local: </b>"+ evento.eventos[i].nome_local+"</h5>"+
                "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                "</div>";
            }
            if(evento.eventos[i].tipo_desporto === "beachvolleyball"){
                popListarVoleiContent.innerHTML += "<div class='eventoRow'>"+
                "<h5><b>Local: </b>"+ evento.eventos[i].nome_local+"</h5>"+
                "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                "</div>";
            }
            if(evento.eventos[i].tipo_desporto === "tennis"){
                popListarTenisContent.innerHTML += "<div class='eventoRow'>"+
                "<h5><b>Local: </b>"+ evento.eventos[i].nome_local+"</h5>"+
                "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                "</div>";
            }
            if(evento.eventos[i].tipo_desporto === "padel"){
                popListarPadelContent.innerHTML += "<div class='eventoRow'>"+
                "<h5><b>Local: </b>"+ evento.eventos[i].nome_local+"</h5>"+
                "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                "</div>";
            }
        }
    }
})
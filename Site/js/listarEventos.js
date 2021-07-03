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
    $.ajax({
        url: "./php/listarEventos.php",
        type: 'POST',
        dataType: 'json',
        success: function(evento){
            popListarFutebolContent.innerHTML = "<span class='close' id='closeAdd' onclick='closePOPLista()'>&times;</span>"+
            "<h2>Eventos de Futebol</h2>";
            var countF = 0;
            for(let i = 0;i<evento.eventos.length;i++){
                if(evento.eventos[i].tipo_desporto === "soccer"){
                    countF +=1;
                    popListarFutebolContent.innerHTML += "<div class='eventoRow'>"+
                    "<h5><b>Local: </b>"+ evento.eventos[i].nome_campo+"</h5>"+
                    "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                    "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                    "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                    "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                    "</div>";
                }
            }
            if(countF == 0){
                popListarFutebolContent.innerHTML += "<h3>Não existe eventos</h3>";
            }
        }
    });
}
function addEventoListarBasquete(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "block";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "none";
    $.ajax({
        url: "./php/listarEventos.php",
        type: 'POST',
        dataType: 'json',
        success: function(evento){
            popListarBasquetebolContent.innerHTML = "<span class='close' id='closeAdd' onclick='closePOPLista()'>&times;</span>"+
            "<h2>Eventos de Basquetebol</h2>";
            var countB = 0;
            for(let i = 0;i<evento.eventos.length;i++){
                if(evento.eventos[i].tipo_desporto === "basketball"){
                    count += 1;
                    popListarBasquetebolContent.innerHTML += "<div class='eventoRow'>"+
                    "<h5><b>Local: </b>"+ evento.eventos[i].nome_campo+"</h5>"+
                    "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                    "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                    "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                    "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                    "</div>";
                }
            }
            if(countB == 0){
                popListarBasquetebolContent.innerHTML += "<h3>Não existe eventos</h3>";
            }
        }
    })
}
function addEventoListarVolei(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "block";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "none";
    $.ajax({
        url: "./php/listarEventos.php",
        type: 'POST',
        dataType: 'json',
        success: function(evento){
            popListarVoleiContent.innerHTML = "<span class='close' id='closeAdd' onclick='closePOPLista()'>&times;</span>"+
            "<h2>Eventos de Voleibol</h2>";
            var countV = 0;
            for(let i = 0;i<evento.eventos.length;i++){
                if(evento.eventos[i].tipo_desporto === "beachvolleyball"){
                    countV += 1;
                    popListarVoleiContent.innerHTML += "<div class='eventoRow'>"+
                    "<h5><b>Local: </b>"+ evento.eventos[i].nome_campo+"</h5>"+
                    "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                    "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                    "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                    "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                    "</div>";
                }
            }
            if(countV == 0){
                popListarVoleiContent.innerHTML += "<h3>Não existe eventos</h3>";
            }
        }
    })
}
function addEventoListarTenis(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "block";
    popupListarPadel.style.display = "none";
    $.ajax({
        url: "./php/listarEventos.php",
        type: 'POST',
        dataType: 'json',
        success: function(evento){
            popListarTenisContent.innerHTML = "<span class='close' id='closeAdd' onclick='closePOPLista()'>&times;</span>"+
            "<h2>Eventos de Ténis</h2>";
            var countT = 0;
            for(let i = 0;i<evento.eventos.length;i++){
                if(evento.eventos[i].tipo_desporto === "tennis"){
                    countT += 1;
                    popListarTenisContent.innerHTML += "<div class='eventoRow'>"+
                    "<h5><b>Local: </b>"+ evento.eventos[i].nome_campo+"</h5>"+
                    "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                    "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                    "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                    "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                    "</div>";
                }
            }
            if(countT == 0){
                popListarTenisContent.innerHTML += "<h3>Não existe eventos</h3>";
            }
        }
    })
}
function addEventoListarPadel(){
    popupListarFutebol.style.display = "none";
    popupListarBasquetebol.style.display = "none";
    popupListarVolei.style.display = "none";
    popupListarTenis.style.display = "none";
    popupListarPadel.style.display = "block";
    $.ajax({
        url: "./php/listarEventos.php",
        type: 'POST',
        dataType: 'json',
        success: function(evento){
            popListarPadelContent.innerHTML = "<span class='close' id='closeAdd' onclick='closePOPLista()'>&times;</span>"+
            "<h2>Eventos de Pádel</h2>";
            var countP = 0;
            for(let i = 0;i<evento.eventos.length;i++){
                if(evento.eventos[i].tipo_desporto === "padel"){
                    countP += 1;
                    popListarPadelContent.innerHTML += "<div class='eventoRow'>"+
                    "<h5><b>Local: </b>"+ evento.eventos[i].nome_campo+"</h5>"+
                    "<h5><b>Data e Hora: </b>"+ evento.eventos[i].data_hora+"</h5>"+
                    "<h5><b>Número máximo de participantes: </b>"+ evento.eventos[i].participantesmax+"</h5>"+
                    "<h5><b>Participantes atuais: </b>"+evento.eventos[i].participantes+"</h5>"+
                    "<h5><b>Duração: </b>"+ evento.eventos[i].duracao+"h</h5>"+
                    "</div>";
                }
            }
            if(countP == 0){
                popListarPadelContent.innerHTML += "<h3>Não existe eventos</h3>";
            }
        }
    })
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

var btnOpenLogIn = document.getElementById("logIn");
var btnLogIn2 = document.getElementById("logIn");
var popup = document.getElementById("login_popup");
var span = document.getElementsByClassName("close")[1];
var btnCriarConta = document.getElementById("btnCriarConta");
var popup2 = document.getElementById("create_popup");
var span2 = document.getElementById("close2");

var btnLogIn = document.getElementById("btnLogIn");

btnOpenLogIn.addEventListener("click", login);
btnLogIn2.addEventListener("click", login);


btnCriarConta.onclick = function(){
    popup2.style.display="block";    
    popup.style.display = "none";
}
span2.onclick = function() {
    popup2.style.display = "none";
}
span.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
    if(event.target == popup2){
        popup2.style.display="none";
    }
}

function login(){
    popup.style.display = "block";
    console.log("tst");
}


var btnLogIn = document.getElementById("logIn");
var btnLogIn2 = document.getElementById("logIn");
var popup = document.getElementById("login_popup");
var span = document.getElementsByClassName("close")[0];
var btnCriarConta = document.getElementsByClassName("btnCriarConta")[0];
var popup2 = document.getElementById("create_popup");
var span2 = document.getElementById("close2");

btnLogIn.addEventListener("click", login);
btnLogIn2.addEventListener("click", login);


btnCriarConta.onclick = function(){
    popup2.style.display="block";    
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
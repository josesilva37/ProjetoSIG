var btnLogIn = document.getElementById("logIn");
var btnLogIn2 = document.getElementById("logIn");
var popup = document.getElementById("login_popup");
var span = document.getElementsByClassName("close")[0];


btnLogIn.addEventListener("click", login);
btnLogIn2.addEventListener("click", login);



span.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

function login(){
    popup.style.display = "block";
    console.log("tst");
}
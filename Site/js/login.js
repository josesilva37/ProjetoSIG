var btnOpenLogIn = document.getElementById("logIn");
var btnLogIn2 = document.getElementById("logIn");
var popup = document.getElementById("login_popup");
var span = document.getElementById("close");
var btnCriarConta = document.getElementById("btnCriarConta");
var popup2 = document.getElementById("create_popup");
var span2 = document.getElementById("close2");
var popupADD = document.getElementById("popupAdd");

var btnLogIn = document.getElementById("btnLogIn");


//log in
var username = document.getElementById("inputUsername");
var password = document.getElementById("inputPassword");
var login = document.getElementById("loginBtn");

login.onclick = function(){
    user = username.value;
    pass = password.value;
    if(user != "" && pass!= ""){
        var dataLogin = {
            username : user,
            password :  pass
        }
        $.ajax({
            type:"POST",
            url:"./php/login.php",
            data: {json: JSON.stringify(dataLogin)},
            dataType: "JSON",
            complete: function(response){
                
                if(response.responseJSON == "Username ou Password incorretos"){
                    alert(response.responseJSON);
                }else{
                    window.location.href = "infocampoLogIn.php";

                }
            }
        })
    }else{
        alert("Preencha os campos");
    }
    
}

btnOpenLogIn.addEventListener("click", loginP);
btnLogIn2.addEventListener("click", loginP);



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
    if(event.target == popupADD){
        popupADD.style.display="none";
    }
}

function loginP(){
    popup.style.display = "block";
    console.log("tst");
}


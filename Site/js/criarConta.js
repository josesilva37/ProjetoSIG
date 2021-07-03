var email = document.getElementById("criarContaEmail");
var user = document.getElementById("criarContaUserName");
var pass = document.getElementById("criarContaPass");
var btnCriarConta = document.getElementById("submitCriarConta");

btnCriarConta.onclick = function(){
    
    emailV = email.value;
    usernameV = user.value;
    passV = pass.value;
    var data = {
        email : emailV,
        username: usernameV,
        pass : passV
    }
    $.ajax({
        type:"POST",
        url: "./php/criarConta.php",
        data: {json: JSON.stringify(data)},
        dataType: "JSON",
        complete: function(data){
            if(data.responseJSON == "Sucesso"){
                window.location.href = "index.php";
            }else{
                alert("Este utilizador já se encontra em utilização");
            }
        }
    })
    /*if(email != "" && username != "" && pass != ""){
        
    }else{
        alert("Preencha os campos");
    }
    */
}
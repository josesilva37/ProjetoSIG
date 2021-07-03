var email = document.getElementById("criarContaEmail");
var username = document.getElementById("criarContaUsername");
var pass = document.getElementById("criarContaPass");
var btnCriarConta = document.getElementById("submitCriarConta");

btnCriarConta.onclick = function(){
    console.log(username.value);
    var data = {
        email : email.value,
        username: username.value,
        pass : pass.value
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

var btnPopup = document.getElementById("logOut");
var popupLogOut = document.getElementById("popupLogOut");
var logoutBtn = document.getElementById("logoutClick");

btnPopup.onclick = function(){
    if(popupLogOut.style.display == "none"){
        popupLogOut.style.display = "block";

    }else{
        popupLogOut.style.display = "none";

    }
}
logoutBtn.onclick = function(){
    console.log("clicou");
    $.ajax({
        url: "./php/logout.php",
        sucess: function(){
            console.log("entrou com sucesso");
            location.reload();
        }
    })
}

window.onclick = function(){
    popupLogOut.style.display = "none";

}


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
    $.ajax({
        url: "./php/logout.php",
        complete: function(xhr){
            if(xhr.status == 200){
                location.reload();

            }
        }
    })
}

window.onclick = function(){
    popupLogOut.style.display = "none";

}

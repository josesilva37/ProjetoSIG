
var btnPopup = document.getElementById("logOut");
var popupLogOut = document.getElementById("popupLogOut");


btnPopup.onclick = function(){
    if(popupLogOut.style.display == "none"){
        popupLogOut.style.display = "block";

    }else{
        popupLogOut.style.display = "none";

    }
}

window.onclick = function(){
    popupLogOut.style.display = "none";

}

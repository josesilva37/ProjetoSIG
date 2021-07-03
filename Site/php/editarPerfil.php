<?php 

if(isset($_GET['editarPerfilSubmit'])){
    session_start();
    require_once "sql_query.php";
    $username= $_SESSION["username"];
    
    $sql = "UPDATE public.utilizador Set  nome = ? ,descricao = ? where username = ?;";
    $query_resultado = SQL_Query::_select($sql,[$_GET['edit-name'],$_GET['edit-descricao'],$username]);
    header('Location: ../infocampoLogIn.php');

}

?>

<div class="popup"  style="display:none" id="popupEditarPerfil">
    <div class="popup-content" id="popupEditarPerfilContent" >
      <form action= "php/editarPerfil.php" id="contactForm" name="contact" role="form">
          <div class="modal-body">				
            <div class="form-group">
              <label for="name">Nome</label>
              <input type="text" name="edit-name" class="form-control">
            </div>
            <div class="form-group">
              <label for="message">Descrição</label>
              <textarea name="edit-descricao" class="form-control"></textarea>
            </div>					
          </div>
          <div class="modal-footer">					
            <button type="button"  class="botaoDefaultInverse" onclick="document.getElementById('popupPerfil').style.display ='block';document.getElementById('popupEditarPerfil').style.display ='none';">Cancelar</button>
            <input type="submit" name="editarPerfilSubmit" class="botaoDefault"></input>
          </div>
        </form>
    </div>

  </div>
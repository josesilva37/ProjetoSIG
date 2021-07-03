<?php 
require_once "sql_query.php";
$username= $_SESSION["username"];



$sql = "SELECT nome,descricao FROM public.utilizador
where username = ? LIMIT 100;";
$query_resultado = SQL_Query::_select($sql,[$username]);
$sql = "SELECT * FROM public.evento_utilizador
where username = ? order by data_hora;";
$eventos_query = SQL_Query::_select($sql,[$username]);

?>


<div class="popup"  style="display:block" id="popupPerfil">
    <div class="popup-content" id="popupPerfilContent" >
    <div class="card shadow  p-4 mt-3 ">
        <div class="second d-flex flex-row mt-2">
            <div class="image mr-3"> <img src="./icons/avataGrey.png" class="rounded-circle" width="60" /> </div>
            <div class="">
              <h4 style="padding-top:0px;"><?php echo $query_resultado[0]['nome'];?></h4>
                <div class="d-flex flex-row mb-1">
                    <div class="ratings ml-3"> <i class="fa fa-star"></i> <i  class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                </div>
                
            </div>
            <a  class="ml-auto" onclick="document.getElementById('popupPerfil').style.display ='none';document.getElementById('popupEditarPerfil').style.display ='block';" href="#"><i class="fa fa-edit ml-auto"></i></a>
        </div>
        <hr class="line-color">
        <h5 class="heading"><?php echo $query_resultado[0]['descricao'];?></h5>

    </div>

    <div class="row justify-content-center p-4 mt-3 ">

        <div class="card shadow">
            <div class="card-body text-center">
                <h4 class="card-title m-b-0">Eventos</h4>
            </div>
            
            <ul class="list-style-none">

            <?php 
                $border_top="";
                foreach ($eventos_query as $linha) {
                    $dia =  date('d', strtotime($linha['data_hora']));
                    $mes = date('M', strtotime($linha['data_hora']));
                    $campo = $linha["nome_campo"];
                    
                echo '<li class="d-flex no-block card-body '.$border_top .'">
                    <div>' .$campo. ' </div>
                    <div class="ml-auto">
                        <div class="tetx-right">
                            <h5 class="text-muted m-b-0">'.$dia .'</h5> <span class="text-muted font-16">'.$mes.'</span>
                        </div>
                    </div>
                </li>';
                    $border_top = " border-top";
                }
            ?>
                
            </ul>

    </div>
    </div>
    <div class=" p-4 mt-3 row justify-content-center">
    <div class="">
    <input type="button" class="botaoDefault" id="botaoVerPerfilFechar" onclick="document.getElementById('popupPerfil').style.display ='none';" value="Fechar"></input>
    </div>
    </div>
    </div>
  </div>
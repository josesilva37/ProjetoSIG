<?php
header('Content-type: application/json');
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');


$data = json_decode($_POST['json']);
$data_hora = $data->data_hora;
$participantes = $data->participantes;
$duracao = $data->duracao;
$tipo_desporto = $data->tipo_desporto;
$geom = $data->campoGeom;
$nome_campo = $data->nome_campo;

try{
    global $pdo;
    $q = "INSERT INTO evento(data_hora,tipo_desporto,duracao,participantes,participantesmax, geom,nome_campo) VALUES (?,?,?,?,?,?,?)";
    $stmt = $pdo->prepare($q);
    $stmt->execute([$data_hora,$tipo_desporto,$duracao,0,$participantes, $geom,$nome_campo]);
}catch(PDOException $e){
    echo $e->getMessage();
}

?>

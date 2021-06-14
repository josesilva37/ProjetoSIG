<?php
header('Content-type: application/json');
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');


$data = json_decode($_POST['json']);
$local = $data->local;
$data_hora = $data->data_hora;
$participantes = $data->participantes;
$duracao = $data->duracao;
$tipo_desporto = $data->tipo_desporto;

try{
    global $pdo;
    $q = "INSERT INTO evento(nome_local, data_hora,participantes,tipo_desporto,duracao) VALUES (?,?,?,?,?)";
    $stmt = $pdo->prepare($q);
    $stmt->execute([$local, $data_hora, $participantes,$tipo_desporto,$duracao]);
}catch(PDOException $e){
    echo $e->getMessage();
}

?>

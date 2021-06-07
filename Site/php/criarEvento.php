<?php
header('Content-type: application/json');
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');


$data = json_decode($_POST['json']);
$local = $data->local;
$data_hora = $data->data_hora;
$participantes = $data->participantes;

try{
    global $pdo;
    $q = "INSERT INTO evento(nome_local, data_hora,participantes) VALUES (?,?,?)";
    $stmt = $pdo->prepare($q);
    $stmt->execute([$local, $data_hora, $participantes]);
}catch(PDOException $e){
    echo $e->getMessage();
}

?>

<?php
header('Content-type: application/json');
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');
$data = json_decode($_POST['json']);
$nomeCampo = $data->nome;
try{
    $q = "SELECT * FROM evento WHERE nome_local = '$nomeCampo'";
    $stmt = $pdo->prepare($q);
    $stmt->execute();
    $json['eventos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($json);
    
}catch(PDOException $e){
    echo $e->getMessage();
}
?>
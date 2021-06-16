<?php
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

try{
    $q = "SELECT * FROM fields";
    $stmt = $pdo->prepare($q);
    $stmt->execute();
    $json['eventos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($json);
    
}catch(PDOException $e){
    echo $e->getMessage();
}



?>
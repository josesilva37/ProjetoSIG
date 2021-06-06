<?php
header('Content-type: application/json');
$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');


$data = json_decode($_POST['json']);
$local = $data->local;
$data_hora = $data->data_hora;
$participantes = $data->participantes;

try{
    global $pdo;
    $q = "INSERT INTO investimento_cripto(username, valor,tipo_cripto,data_hora,fonte) VALUES (?,?,?,?,?)";
    $stmt = $pdo->prepare($q);
    $stmt->execute([$username, $valor, $tipo_cripto, $data_hora, $fonte]);
}catch(PDOException $e){
    echo $e->getMessage();
}

?>

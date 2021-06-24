<?php
session_start();
header('Content-type: application/json');
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

$username = $_SESSION["username"];

$data = json_decode($_POST['json']);
$datahora = $data->dataHora;
$dh = str_replace("_", " ", $datahora);

try{
    global $pdo;
    $q = "INSERT INTO evento_utilizador(username,data_hora) values (?,?)";
    $stmt = $pdo->prepare($q);
    if ($stmt->execute([$username, $dh])) { 
        $q2 = "UPDATE evento SET participantes = participantes + 1 WHERE  data_hora = '".$dh."'";
        $stmt2 = $pdo->prepare($q2);
        if($stmt2->execute()){
            echo "sucesso";
        }else{
            echo "Máximo de participantes";
        }
    }else{
        echo "Já entrou neste evento";
    }
    
}catch(PDOException $e){
    echo $e->getMessage();
}
?>
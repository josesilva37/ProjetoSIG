<?php
ini_set('display_errors', 1);
include('conexao.php');
header('Content-Type: application/json');

$data = json_decode($_POST['json']);
$username = $data->username;
$email = $data->email;
$pass = $data->pass;

try{
        global $pdo;
        $q = "INSERT INTO utilizador(username,email,pass)values('" . $username . "','" . $email . "','" . md5($pass) . "')";
        $stmt = $pdo->prepare($q);
        $stmt->execute();
        echo json_encode("Sucesso");
        //header("Location: ../index.php");
        
    }catch(PDOException $e){
        echo json_encode($e->getMessage());
    }
?>

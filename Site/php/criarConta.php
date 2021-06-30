<?php
ini_set('display_errors', 1);
include('conexao.php');
try{
        global $pdo;
        $q = "INSERT INTO utilizador(username,email,pass)values('" . $_POST['username'] . "','" . $_POST['email'] . "','" . md5($_POST['password']) . "')";
        $stmt = $pdo->prepare($q);
        $stmt->execute();

        header("Location: ../index.php");
        
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>

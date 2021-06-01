<?php
  ini_set('display_errors', 1);
  //$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');
  $host = "gis4cloud.com";
  $port = "5432";
  $dbname = "ptas2021_grupo1";
  $user = "ptas2021_grupo1";
  $password = "ptas2021_grupo1"; 
  $connection_string = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password} ";
  $dbconn = pg_connect($connection_string);
  
if(isset($_POST['submit'])&&!empty($_POST['submit'])){
    
    $sql = "insert into public.utilizador(username,email,pass)values('".$_POST['username']."','".$_POST['email']."','".md5($_POST['password'])."')";
    $ret = pg_query($dbconn, $sql);
    if($ret){
        
            echo "Data saved Successfully";
    }else{
        
            echo "Something Went Wrong";
    }
}
?>
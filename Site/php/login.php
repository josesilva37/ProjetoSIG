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
    $hashpassword = md5($_POST['pwd']);
    $sql ="select *from public.utilizador where email = '".pg_escape_string($_POST['email'])."' and pass ='".$hashpassword."'";
    $data = pg_query($dbconn,$sql);
    $login_check = pg_num_rows($data);
    if($login_check > 0){ 
        
        echo "Login Successfully";    
    }else{
        
        echo "Invalid Details";
    }
}
?>
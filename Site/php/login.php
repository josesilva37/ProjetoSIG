<?php
ini_set('display_errors', 1);
header('Content-Type: application/json');
//$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');
$host = "gis4cloud.com";
$port = "5432";
$dbname = "ptas2021_grupo1";
$user = "ptas2021_grupo1";
$password = "ptas2021_grupo1";
$connection_string = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password} ";
$dbconn = pg_connect($connection_string);

$data = json_decode($_POST['json']);
$username = $data->username;
$password = $data->password;

$hashpassword = md5($password);
$sql = "select *from public.utilizador where username = '" . pg_escape_string($username) . "' and pass ='" . $hashpassword . "'";
$data = pg_query($dbconn, $sql);
$login_check = pg_num_rows($data);
if ($login_check > 0) {
    session_start();
    $_SESSION["username"] = ($username);
    echo json_encode("Sucess");
    //sheader("Location: ../infocampoLogIn.php");
    exit();
} else {
    $_SESSION['error'] = array("Your username or password was incorrect.");
    echo json_encode("Username ou Password incorretos");
    //header("location: ../index.php");
}
?>

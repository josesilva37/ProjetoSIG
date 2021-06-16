<?php
header('content-type: application/json; charset=utf-8');
try {
    $dbconn = pg_connect("host=gis4cloud.com port=5432 dbname=ptas2021_grupo1 user=ptas2021_grupo1 password=ptas2021_grupo1");

    $name = filter_input(INPUT_GET, "name");
    if ($name) {
        $query = "SELECT name FROM fields WHERE sport ILIKE '$name' AND name <> ''";
        $result = pg_query($dbconn, $query) or die('Query failed: ' . pg_last_error());
        $myarray = pg_fetch_all($result);
        echo json_encode($myarray);
        pg_close($dbconn);
    }
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>
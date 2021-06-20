<?php
header('Content-Type: application/json');

# Connect to PostgreSQL database
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

$data = json_decode($_POST['json']);
$freguesia = $data->freg;
#$tipo = $data->tipo;

if($tipo == 'todos' || $tipo == ""){
    $stmt = $pdo->prepare( "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((f.geom),3857),6) FROM freguesias f2 JOIN fields f ON (ST_Within(st_transform(f.geom, 3857), f2.geom)) WHERE f2.freguesia = freg;");
    $stmt->execute(['freg' => $freguesia]);   
}else{
    $stmt = $pdo->prepare( "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((f.geom),3857),6) FROM freguesias f2 JOIN fields f ON (ST_Within(st_transform(f.geom, 3857), f2.geom)) WHERE f2.freguesia = freg;");
    $stmt->execute(['freg' => $freguesia]);   
}


# Build GeoJSON feature collection array
$geojson = array(
    'type'      => 'FeatureCollection',
    'features'  => array()
 );
 
 # Loop through rows to build feature arrays
 while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
     $properties = $row;
     # Remove geojson and geometry fields from properties
     unset($properties['geojson']);
     unset($properties['the_geom']);
     $feature = array(
          'type' => 'Feature',
          'geometry' => json_decode($row['geojson'], true),
          'properties' => $properties
     );
     # Add feature arrays to feature collection array
     array_push($geojson['features'], $feature);
 }
 
 header('Content-type: application/json');
 echo json_encode($geojson, JSON_NUMERIC_CHECK);
 $conn = NULL;

?>
<?php
header('Content-Type: application/json');

# Connect to PostgreSQL database
$pdo = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

$data = json_decode($_POST['json']);
$freguesia = $data->freguesia;
$tipo = $data->tipo;

if($tipo == 'todos' || $tipo == ""){
    
    $stmt = $pdo->prepare( "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),3857),6) AS geojson from fields p WHERE ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point(:lat,:lon),3857), :raio)");
    $stmt->execute(['lat' => $lat, 'lon'=>$lon,'raio'=>$raio]);   
}else{

    $stmt = $pdo->prepare( "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),3857),6) AS geojson from fields p WHERE sport = :tipo and ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point(:lat,:lon),3857), :raio)");
    $stmt->execute(['lat' => $lat, 'lon'=>$lon,'raio'=>$raio,'tipo'=>$tipo]);   
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
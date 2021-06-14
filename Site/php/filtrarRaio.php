<?php

header('Content-Type: application/json');

$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

$data = json_decode($_POST['json']);

$lon = $data->lon;
$lat = $data->lat;
$raio = $data->raio;
$tipo = $data->tipo;

$sql_eh = "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson from fields WHERE  sport ='.$tipo.' AND ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point($lat, $lon),3857), $raio)";

$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
    unset($properties['geojson']);
    unset($properties['the_geom']);
    $feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($row['geojson'], true),
         'properties' => $properties
    );

    array_push($geojson['features'], $feature);
}

echo json_encode($geojson, JSON_NUMERIC_CHECK);
?>

<?php

//$dbconn = pg_connect("host=gis4cloud.com  port=5432 dbname=ptas2021_grupo1 user=ptas2021_grupo1 password=ptas2021_grupo1")
  //    or die('Could not connect: ' . pg_last_error());
$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

$data = json_decode($_POST['json']);

$lon = $data->lon;
$lat = $data->lat;
$raio = $data->raio;
$tipo = $data->tipo;
$sql = " SELECT jsonb_build_object(
    'type', 'FeatureCollection',
    'features', jsonb_agg(feature)
    )
    FROM (
    SELECT jsonb_build_object(
    'type', 'Feature',
    'id', id,
    'geometry', ST_AsGeoJSON(geom)::jsonb,
    'properties', to_jsonb(row) - 'id' - 'geom'
    ) AS feature
    FROM (SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),3857),6) AS geojson from fields p WHERE ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point(-969565,4964559),3857), 4000)
    ) row) features; ";
/*
if($tipo == "todos"){
}else{
    $sql_eh = "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),3857),6) AS geojson from fields p WHERE sport = ".$tipo." ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point(".$lat.", ".$lon."),3857), ".$raio.")";

}
*/

$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}
$row = $rs->fetch(PDO::FETCH_ASSOC);
echo json_encode($row);

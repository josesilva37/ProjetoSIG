<?php

$dbconn = pg_connect("host=gis4cloud.com  port=5432 dbname=ptas2021_grupo1 user=ptas2021_grupo1 password=ptas2021_grupo1")
      or die('Could not connect: ' . pg_last_error());
    //$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');

$data = json_decode($_POST['json']);

$lon = $data->lon;
$lat = $data->lat;
$raio = $data->raio;
$tipo = $data->tipo;
if($tipo == "todos"){
    $sql_eh = 'SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson from fields p WHERE ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point('.$lat.', '.$lon.'),3857), '.$raio.')';
}else{
    $sql_eh = "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson from fields p WHERE sport = ".$tipo." ST_DWithin(st_transform(p.geom,3857), ST_SetSRID(ST_Point(".$lat.", ".$lon."),3857), ".$raio.")";

}


$results = pg_query($sql_eh);



# Build GeoJSON
$output    = '';
$rowOutput = '';

while ($row = pg_fetch_assoc($results)) {
    $rowOutput = (strlen($rowOutput) > 0 ? ',' : '') . '{"type": "Feature", "geometry": ' . $row['geojson'] . ', "properties": {';
    $props = '';
    $id    = '';
    foreach ($row as $key => $val) {
        if ($key != "geojson") {
            $props .= (strlen($props) > 0 ? ',' : '') . '"' . $key . '":"' . $val . '"';
        }
        if ($key == "id") {
            $id .= ',"id":"' . escapeJsonString($val) . '"';
        }
    }
    
    $rowOutput .= $props . '}';
    $rowOutput .= $id;
    $rowOutput .= '}';
    $output .= $rowOutput;
}

$output = '{ "type": "FeatureCollection", "features": [ ' . $output . ' ]}';
echo $output;



pg_free_result($results);
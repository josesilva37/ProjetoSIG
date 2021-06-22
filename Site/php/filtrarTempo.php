<?php

// Connecting, selecting database


    // Connecting, selecting database
$dbconn = pg_connect("host=gis4cloud.com  port=5432 dbname=ptas2021_grupo1 user=ptas2021_grupo1 password=ptas2021_grupo1")
        or die('Could not connect: ' . pg_last_error());



$sql_del = "delete from hull;";
$result_del = pg_query($sql_del);
pg_free_result($result_del);

$data = json_decode($_POST['json']);

//ponto do percurso
$x = $data->x;
$y = $data->y;

//distancia em tempo???
/*
$d = $data->d; //distancia
$d = (float) $d / 60;
*/
$d = 1800;
//categoria do ponto
$c = null;



#Calcular o nó mais próximo
$sql = "SELECT n.id, st_x(n.geom), st_y(n.geom)
FROM (SELECT ST_SetSRID(ST_Point(-963267.11661764, 4958879.4907719),3857) As geom) As b 
LEFT JOIN vias_vertex_aveiro As n
ON ST_DWithin(ST_Transform(n.geom,3857),b.geom, 1000)
ORDER BY ST_Distance((ST_Transform(n.geom,3857)), b.geom)
LIMIT 1;";
echo $x." ".$y;
$sql_result = pg_query($sql);
$num_rows = pg_num_rows($sql_result);
if ($num_rows > 0) {
    $row = pg_fetch_all($sql_result);
    $longM = $row[0]['st_x'];
    $latM = $row[0]['st_y'];
    $idM = $row[0]['id'];
} else {
    $longM = null;
    $latM = null;
    $idM = null;
}
$sql_ih = "INSERT INTO hull SELECT ST_ConcaveHull(ST_Collect(ST_Transform(geom,3857)), 0.95) as geom
FROM (SELECT vias_vertex_aveiro.geom
FROM pgr_drivingDistance('
SELECT id, source, target, st_astext(geom), cost as cost
FROM vias_aveiro', 861, 300, false) dd
INNER JOIN vias_aveiro on (vias_aveiro.id = dd.node)
INNER JOIN vias_vertex_aveiro on
(vias_vertex_aveiro.id = dd.node)) as t;";

$resultado = pg_query($sql_ih);
pg_free_result($resultado);

$sql_eh = "SELECT *, st_asgeojson(st_transform(p.geom,4326)) as geojson
from fields p, hull as h where ST_Within(p.geom, st_transform(h.geom,4326));";
/*
//se este parâmetro veio a zero é porque foram selecionadas todas as categorias e altera-se a query
if ($c != 0) {
    $sql_eh = "SELECT *,st_asgeojson(st_transform(p.geom,4326)) as geojson
from fields p join categorias c on p.categoria=c.id, hull as h where ST_Within(p.geom, st_transform(h.geom,4326));";
}*/

$results = pg_query($sql_eh);

$geojson = array(
    'type'      => 'FeatureCollection',
    'features'  => array()
 );
 
 # Loop through rows to build feature arrays
 echo pg_fetch_assoc($results);
 while ($row = pg_fetch_assoc($results)) {
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
 

$output = '{ "type": "FeatureCollection", "features": [ ' . $output . ' ]}';
echo $output;



pg_free_result($results);

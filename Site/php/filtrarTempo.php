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
$d = $data->d; //distancia
$d = (float) $d / 60;

//categoria do ponto
$c = null;



#Calcular o nó mais próximo
$sql = "SELECT n.id, st_x(n.geom), st_y(n.geom)
FROM (SELECT ST_SetSRID(ST_Point(".$x.",".$y." ),3857) As geom) As b 
LEFT JOIN vias_vertex_aveiro As n
ON ST_DWithin(ST_Transform(n.geom,3857),b.geom, 1000)
ORDER BY ST_Distance((ST_Transform(n.geom,3857)), b.geom)
LIMIT 1;";

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

$sql = "SELECT st_x(ST_Transform(geom,4326)), st_y(ST_Transform(geom,4326)) 
from ST_SetSRID( ST_Point( $x+10000, $y-10000), 3857) as geom;";

$sql_result = pg_query($sql);
$num_rows = pg_num_rows($sql_result);
if ($num_rows > 0) {
    $row = pg_fetch_all($sql_result);
    $long1 = $row[0]['st_x'];
    $lat1 = $row[0]['st_y'];
} else {
    $long1 = null;
    $lat1 = null;
}

$sql = "SELECT st_x(ST_Transform(geom,4326)), st_y(ST_Transform(geom,4326)) 
from ST_SetSRID( ST_Point( $x-10000, $y+10000), 3857) as geom;";

$sql_result = pg_query($sql);
$num_rows = pg_num_rows($sql_result);
if ($num_rows > 0) {
    $row = pg_fetch_all($sql_result);
    $long2 = $row[0]['st_x'];
    $lat2 = $row[0]['st_y'];
} else {
    $long2 = null;
    $lat2 = null;
}


$sql_ih = "INSERT INTO hull SELECT ST_ConcaveHull(ST_Collect(ST_Transform(geom_vertex,3857)), 0.95) as geom
FROM (SELECT vias_vertex_aveiro.geom
FROM pgr_drivingDistance('
SELECT id, source, target, st_astext(geom_way), km/5 as cost
FROM vias_aveiro WHERE geom_way && ST_Expand(ST_SetSRID(ST_MakeEnvelope( ".$long1.",".$lat1.", ".$long2." , ".$lat2."), 4326),
0.5)', $idM, $d, false) dd
INNER JOIN vias_aveiro on (vias_aveiro.id = dd.node)
INNER JOIN vias_vertex_aveiro on
(vias_vertex_aveiro.id = dd.node)) as t";


$resultado = pg_query($sql_ih);
pg_free_result($resultado);

$sql_eh = "SELECT *,st_asgeojson(st_transform(p.geom,4326)) as geojson
from fields p join categorias c on p.categoria=c.id, hull as h where ST_Within(p.geom, st_transform(h.geom,4326));";

//se este parâmetro veio a zero é porque foram selecionadas todas as categorias e altera-se a query
if ($c != 0) {
    $sql_eh = "SELECT name, descriptio, p.categoria as id_cat, c.categoria, st_asgeojson(st_transform(p.geom,4326)) as geojson
    from pontos_interesse p join categorias c on p.categoria=c.id, hull as h where ST_Within(p.geom, st_transform(h.geom,4326))
    AND p.categoria =$c";
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

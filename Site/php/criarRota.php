<?php
require "sql_query.php";

$xMarcador = $_GET["xOrigem"]; //  "-963965.3702419729"; //$_GET["xOrigem"];
$yMarcador = $_GET["yOrigem"]; // "4958857.895348617" ;//$_GET["yMarcador"];
$custo ="cost";
if(isset($_GET["reverse"]) && $_GET["reverse"] == "true")
    $custo = "reverse_co";


//pontos de interesse
$xPontosInteresse = $_GET["xDestino"]; // "-963348.482191776";//$_GET["xDestino"];
$yPontosInteresse = $_GET["yDestino"]; //"4958470.241593376";//$_GET["yDestino"];

$sql="SELECT id, st_x(n.geom), st_y(n.geom)
FROM (SELECT ST_SetSRID(ST_Point(?,?),3857) As geom) As b
LEFT JOIN vias_vertex_aveiro As n
ON ST_DWithin(ST_Transform(n.geom,3857),b.geom, 10000)
ORDER BY ST_Distance((ST_Transform(n.geom,3857)), b.geom)
LIMIT 1";

$sql_result = SQL_Query::_select($sql,[$xMarcador, $yMarcador]);
$num_rows = sizeof($sql_result);
if ($num_rows > 0) {
    $row = $sql_result;
    $longM = $row[0]['st_x'];
    $latM = $row[0]['st_y'];
    $idM = $row[0]['id'];
} else {
    $longM = null;
    $latM = null;
    $idM = null;
}

$sql="SELECT id, st_x(n.geom), st_y(n.geom)
FROM (SELECT ST_SetSRID(ST_Point(?,?),3857) As geom) As b
LEFT JOIN vias_vertex_aveiro As n
ON ST_DWithin(ST_Transform(n.geom,3857),b.geom, 10000)
ORDER BY ST_Distance((ST_Transform(n.geom,3857)), b.geom)
LIMIT 1";

$sql_result = SQL_Query::_select($sql,[$xPontosInteresse, $yPontosInteresse]);
$num_rows = sizeof($sql_result);
if ($num_rows > 0) {
    $row = $sql_result ;
    $longP = $row[0]['st_x'];
    $latP = $row[0]['st_y'];
    $idP = $row[0]['id'];
} else {
    $longP = null;
    $latP = null;
    $idP = null;
}


 $sql_eh = "SELECT seq,node,edge,p.cost,  ST_AsGeoJSON(geom) as geojson FROM pgr_dijkstra('SELECT
 id, source::integer,
 target::integer,
 $custo as cost
 FROM vias_aveiro WHERE geom && ST_Expand(ST_SetSRID(ST_MakeEnvelope( $longM ,$latM, $longP , $latP), 4326),
 1)',$idM,$idP, false)p
 inner join vias_aveiro r on p.edge=r.id";

$results =  SQL_Query::_select($sql_eh,[]); 



# Build GeoJSON
$output    = '';
$rowOutput = '';

foreach ($results as $row ) {
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
header('Content-Type: application/json');
echo  ($output);


?>
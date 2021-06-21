<?php
/*
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */
header('Content-Type: application/json');

# Connect to PostgreSQL database
$conn = new PDO('pgsql:host=gis4cloud.com;dbname=ptas2021_grupo1','ptas2021_grupo1','ptas2021_grupo1');
$data = json_decode($_POST['json']);

$tipoCampo = $data->tipoCampo;
$freguesia = $data->freg;
if($freguesia == "todasFreguesias" || $freguesia == ""){
    if($tipoCampo == 'todos' || $tipoCampo == ""){
        $sql = 'SELECT *, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM fields';
    }else{
        $sql = "SELECT *, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM fields WHERE
        sport ='".$tipoCampo."'";
    }
}else{
    if($tipoCampo == 'todos'){
        $sql = "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((f.geom),4326),6) AS geojson 
        FROM freguesias f2 JOIN fields f ON (ST_Within(st_transform(f.geom, 4326), f2.geom)) 
        WHERE f2.freguesia = '".$freguesia."';";
    }else{
        $sql = "SELECT *,public.ST_AsGeoJSON(public.ST_Transform((f.geom),4326),6) AS geojson 
        FROM freguesias f2 JOIN fields f ON (ST_Within(st_transform((f.geom), 3857), f2.geom)) 
        WHERE f2.freguesia = '".$freguesia."' AND sport ilike '".$tipoCampo."'";
    }
}
# Build SQL SELECT statement and return the geometry as a GeoJSON element
//$sql = 'SELECT *, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM fields';
    
/*
* If bbox variable is set, only return records that are within the bounding box
* bbox should be a string in the form of 'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
* Leaflet: map.getBounds().toBBoxString()
*/
if (isset($_GET['bbox'])) {
    $bbox = explode(',', $_GET['bbox']);
    $sql = $sql . ' WHERE public.ST_Transform(the_geom, 4326) && public.ST_SetSRID(public.ST_MakeBox2D(public.ST_Point('.$bbox[0].', '.$bbox[1].'), public.ST_Point('.$bbox[2].', '.$bbox[3].')),4326);';
}

# Try query or error
$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
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
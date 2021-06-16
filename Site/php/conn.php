<?php


function OpenCon()
{
    // Connecting, selecting database
    $dbconn = pg_connect("host=gis4cloud.com  port=5432 dbname=ptas2021_grupo1 user=ptas2021_grupo1 password=ptas2021_grupo1")
        or die('Could not connect: ' . pg_last_error());

    return $dbconn;
}

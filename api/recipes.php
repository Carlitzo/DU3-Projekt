<?php

require_once("helpers.php");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$filename = file_get_contents("./database.json");
$json = json_decode($filename, true);

if ($requestMethod == "GET") {
    send(200, $json["RECIPES"]);
}
?>
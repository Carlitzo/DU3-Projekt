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
$requestData = getRequestData();
$filename = file_get_contents("./database.json");
$json = json_decode($filename, true);

if ($requestMethod == "POST") // Register a new user
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $userKeys = ["name", "password", "liked_recipes"];

    if (requestContainsAllKeys($requestData, $userKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $name = $requestData["name"];
    $user = findItemByKey("USERS", "name", $name);

    
    if ($user != false) {
        abort(400, "Bad Request (user already exists)");
    }

    $newUser = insertItemByType("USERS", $userKeys, $requestData);
    unset($newUser["password"]);
    send(201, $newUser);
}
if ($requestMethod == "GET") {
    send(200, $json["USERS"]);
}
?>
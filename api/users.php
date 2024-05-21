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

$filename = "database.json";
$users = [];
$data = [];

if(file_exists($filename)){
    $json = file_get_contents($filename);
    $data = json_decode($json, true);

    if (isset($data['USERS'])) {
        $users = $data['USERS'];
    }
}

if ($requestMethod == "GET") {
    send(200, $users);
}

if ($requestMethod == "POST") { // Register a new user
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $userKeys = ["name", "password"];

    if (!requestContainsAllKeys($requestData, $userKeys)) {
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

if ($requestMethod == "PATCH") {
    if (!isset($requestData["id"]) || !isset($requestData["recipe_id"])) {
        $message = ["error" => "Bad Request"];
        send(400, $message);
    }

    $id = $requestData["id"];
    $recipe_id = $requestData["recipe_id"];
    $userFound = false;

    foreach($users as $index => $user){
        if ($user["id"] == $id) {

            $userFound = true;
            
            $liked_recipes = $users[$index]["liked_recipes"];
            $recipeIndex = array_search($recipe_id, $liked_recipes);
            if ($recipeIndex !== false) {

                array_splice($users[$index]["liked_recipes"], $recipeIndex, 1);
            } else {
                
                $users[$index]["liked_recipes"][] = $recipe_id;
            }

            $data["USERS"] = $users;
            $json = json_encode($data, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            send(200, $users[$index]);
        }
    }

    if (!$userFound) {
        $error = ["error" => "Not Found"];
        send(404, $error); 
    }
}
?>
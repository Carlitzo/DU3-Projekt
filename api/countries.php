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

if ($requestMethod == "GET") // Get one or all COUNTRIES
{ 
    foreach("COUNTRIES" as $country){
        
    }

    if (isset($requestData["id"])) {
        $id = $requestData["id"];
        $country = findItemByKey("COUNTRIES", "id", $id);
        
        if ($country == false) {
            abort(404, "country Not Found");
        }
        
        send(200, $country);
    }

    $user = getUserFromToken($requestData["token"]);

   
    send(200, $COUNTRIES);
}
else if ($requestMethod == "POST") // Create a new country (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $countryKeys = ["token", "name", "rating", "favorite"];

    if (requestContainsAllKeys($requestData, $countryKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["token"]);

    // Make sure that the creator (user_id) is the same as the owner of the token
    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }

    $country = findItemByKey("COUNTRIES", "name", $requestData["name"]);
 
    if ($country != false) {
        abort(400, "Bad Request (country already exists)");
    }

    $countryKeys[] = "user_id";
    $requestData["user_id"] = $user["id"];
    $newcountry = insertItemByType("COUNTRIES", $countryKeys, $requestData);
    send(201, $newcountry);
}
else if ($requestMethod == "PATCH") // Like or unlike a country (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $likeKeys = ["id", "token"];

    if (requestContainsAllKeys($requestData, $likeKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["token"]);

    // Make sure that the "liker" (user_id) is the same as the owner of the token
    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }
    
    $country = findItemByKey("COUNTRIES", "id", $requestData["id"]);

    if ($country == false) {
        abort(404, "country Not Found");
    }

    // Toggle the user "favorite"
    if (isset($requestData["favorite"])) {
        if ($country["favorite"] == false) {
            $country["favorite"] = true;
        } else {
            $country["favorite"] = false;
    
        }
    }

    // Change "rating"
    if (isset($requestData["rating"])) {
        $country["rating"] = $requestData["rating"];
    }

    $updatedcountry = updateItemByType("COUNTRIES", $country);
    send(200, $updatedcountry);
}
else if ($requestMethod == "DELETE") // Delete a country (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $deleteKeys = ["id", "token"];

    if (requestContainsAllKeys($requestData, $deleteKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $country = findItemByKey("COUNTRIES", "id", $requestData["id"]);

    if ($country == false) {
        abort(404, "country Not Found");
    }

    $user = getUserFromToken($requestData["token"]);

    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }

    if ($user == false || $country["user_id"] != $user["id"]) {
        abort(400, "Bad Request (invalid token)");
    }

    $deletedcountry = deleteItemByType("COUNTRIES", $country);
    send(200, $deletedcountry);
}
else
{
    abort(405, "Method Not Allowed");
}

?>
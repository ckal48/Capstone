<?php
// Mongodb Connection Example
$con = new MongoClient();
echo "Connection to database successfully";

// select a database
$db = $con->mydatabase;
echo "Database mydatabase selected";
$collection = $db->createCollection("mycollection");
echo "Collection created succsessfully";
?>
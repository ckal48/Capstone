<?php
   session_start();
   include_once 'Connection.php';
if(isset($_POST) and $_POST['submit'] == "Submit" )
{
$Username = mysql_escape_string($_POST['Username']);
$Password = mysql_escape_string($_POST['Password']);
$error = array();
// Email Validation
if(empty($Username))
{
$error[] = "Empty or invalid email address";
}
if(empty($Password)){
$error[] = "Enter your password";
}
if(count($error) == 0){
$con = new Mongo();
if($con){
// Select Database
$db = $con->mydatabase;
// Select Collection
$mycollection = $db->mycollection;
$qry = array("user" => $Username,"password" => $Password);
$result = $mycollection->findOne($qry);
if($result){
$_SESSION['login_user'] = $Username;
header("location: Homepage.php");
}
} else {
die("Mongo DB not installed");
}
}
}
?>
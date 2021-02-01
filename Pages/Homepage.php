<?php
   session_start();
   if($_SESSION['login_user']){
      echo "Welcome user " . $_SESSION["login_user"];
   }else{
      header("location: Login.html");
   }
?>
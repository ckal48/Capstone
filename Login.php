<?php
   session_start();
   include_once 'Connection.php';
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
      $Username = mysqli_real_escape_string($conn,$_POST['Username']);
      $Password = mysqli_real_escape_string($conn,$_POST['Password']); 
      
      $sql = "SELECT Username, Password FROM users WHERE Username = '$Username' and Password = '$Password'";
      $result = mysqli_query($conn,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $active = $row['active'];
      
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
         $_SESSION['login_user'] = $Username;
         header("location: Home.php");
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>
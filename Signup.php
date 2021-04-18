<?php
   include_once 'Connection.php';
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
      $Firstname = mysqli_real_escape_string($conn,$_POST['firstname']);
      $Lastname = mysqli_real_escape_string($conn,$_POST['lastname']); 
      $Username = mysqli_real_escape_string($conn,$_POST['Username']);
      $Email = mysqli_real_escape_string($conn,$_POST['address']); 
      $Password = mysqli_real_escape_string($conn,$_POST['password1']);
      $Password2 = mysqli_real_escape_string($conn,$_POST['password2']); 
		
      if($Password == $Password2) {
         $sql = "INSERT INTO users  VALUES ('$Firstname','$Lastname','$Username','$Email','$Password')";
      }else {
         echo "Your passwords do not match";
      }
   }

   if ($conn->query($sql) === TRUE) {
      echo "You Are Signed In";
      header("location:Login.html");
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }
?>
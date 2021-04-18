<?php
   include_once 'Connection.php';
   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST") {

    $Username2 = mysql_real_escape_string($_SESSION['login_user']);
    $score = mysqli_real_escape_string($conn,$_POST['score']);
    $Age = mysqli_real_escape_string($conn,$_POST['Age']); 
    $State = mysqli_real_escape_string($conn,$_POST['State']);
    $Grade = mysqli_real_escape_string($conn,$_POST['Grade']);
    $sql = "INSERT INTO ssresults (Username2, score, Age, State, Grade) VALUES ('{$_SESSION['login_user']}','$score','$Age','$State','$Grade') ON DUPLICATE KEY UPDATE
    Age = '$Age', State = '$State', Grade = '$Grade', score = if ('$score'>score, '$score', score);"; 
    // , score = if ('$score'>score, '$score', score);

    if(isset($_POST['submit'])) {
      header("location:Leaderboard.php");
      }

    }

    if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
  $conn->close();
  ?>
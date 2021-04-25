<?php
include_once 'Connection.php';
session_start();
//require 'vendor/autoload.php';
require_once 'PHPMailer/PHPMailer.php';
require_once 'PHPMailer/SMTP.php';
require_once 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

    if(isset($_POST['Submit'])) {
        $user = $_POST['input'];
        $mail = new PHPMailer(); 
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPDebug = 3;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "tls";
        $mail->Port = 587;
        $mail->Username = "atoolforschool@gmail.com";
        $mail->Password = "csi4999CP";
        $mail->Subject = "Math Game Results";
        $mail->setFrom("atoolforschool@gmail.com"); 
        $mail->addAddress($user);
        $mail->isHTML(true); 

    $sql = "SELECT  AVG(score) FROM scienceresults WHERE Username2 != '{$_SESSION['login_user']}'";
    $sql2 = "SELECT score FROM scienceresults WHERE Username2 = '{$_SESSION['login_user']}'";
    $sql3 = "SELECT * FROM scienceresults WHERE Username2 = '{$_SESSION['login_user']}'";
    $result = $conn->query($sql);
    $result2 = $conn->query($sql2);
    $result3 = $conn->query($sql3);
    //display data on web page
    while($row = mysqli_fetch_array($result3)){
        $mail->Body = 'Username: '.$row['score'].'</br>'
        .'Username: '.$row['Username2'].'</br>'
        .'Age: '.$row['Age'].'</br>'
        .'Grade: '.$row['Grade'].'</br>'
        .'State: '.$row['State'].'</br>';
        }
        while($row = mysqli_fetch_array($result2)){
        $mail->Body .= 'Score: '.$row['score'].'</br>';
        }
        while($row = mysqli_fetch_array($result)){
        $mail->Body .= 'Average Score: '.$row['AVG(score)'].'</br>';
        }
        //close the connection
        $conn->close();
   
    if ( $mail->send() ){
        echo "Email Sent";
    }else{
      echo "Email Not Sent";
    }
    $mail->smtpClose();
}
?>
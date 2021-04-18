<?php
   include_once 'Connection.php';
   session_start();
   if($_SESSION['login_user']){
      echo "Welcome " . $_SESSION["login_user"];
   }else{
      header("location:../Login.html");
   }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href='http://fonts.googleapis.com/css?family=Arimo:400,700' rel='stylesheet' type='text/css'>
        <!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="js/skel.min.js"></script>
		<script src="js/skel-panels.min.js"></script>
		<script src="js/init.js"></script>
        <script type="text/javascript" src="lib/jquery-1.11.1.min.js"></script>
		<script type="text/javascript" src="lib/SCORM_API_wrapper.js"></script>
		<script type="text/javascript" src="lib/ScormHelper.js"></script>
		<script type="text/javascript" src="src/createjs.min.js"></script>
		<script type="text/javascript" src="src/gameData.js"></script>
		<script type="text/javascript" src="src/game.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel-noscript.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
		</noscript>
        <!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
        <!--[if lte IE 9]><link rel="stylesheet" href="css/ie/v9.css" /><![endif]-->
        <link rel="stylesheet" href="css/LB.css"/>
    <title>Leaderboard</title>
    <style>
    .main{
text-align: center;
color: rgb(6, 0, 78);
}
/*  #board {
background:lightskyblue;
text-align: center;
font-size: large;
border-style: double;
width:35%;
margin:auto;
border-width:thick;
border-radius: 20px;
padding:30px 30px 30px 30px;
} */
    </style>
    </head>

    <body class="homepage">

      <!-- Header -->
      <div id="header">
        <div class="container"> 
          
          <!-- Logo -->
          <div id="logo">
            <h1><a href="../Home.php">
              A Tool for School
              </a></h1>
            <span><img src="https://www.clipartmax.com/png/full/256-2569699_building-computer-hand-cartoon-tools-tool-tools-clipart.png" alt="Picture of tools" width="70" height="70">
            </div></span>
          </div>
        </div>

        <!-- Main -->
<div id="main">
  <div class="container">
    <div class="row"> 
      
      <!-- Content -->
      <div id="content" class="12u skel-cell-important">
        <section>
          <div class="main">  
    <div id="board">
<h2>Scores</h2></br>
<input type=button class="button" onClick="location.href='ScienceAverage.php'" value='Average'>
<div class="wrapper">
	<div class="lboard_section">
		<div class="lboard_tabs">
			<div class="tabs">
				<ul>
					<li class="active" data-li="username">Username</li>
					<li data-li="score">Score</li>
                    <li data-li="grade">Grade</li>
                    <li data-li="age">Age</li>
                    <li data-li="state">State</li>
				</ul>
			</div>
		</div>
    <div class="lboard_wrap">
    <div class="lboard_item username" style="display: none;">
    <?php

include_once 'Connection.php';
$sql = "SELECT * FROM `scienceresults` ORDER BY score DESC, Username2";
$result = mysqli_query($conn, $sql);
$sql2 = "SELECT * FROM `scienceresults` ORDER BY score DESC, Grade";
$result2 = mysqli_query($conn, $sql2);
$sql3 = "SELECT * FROM `scienceresults` ORDER BY score DESC, Age";
$result3 = mysqli_query($conn, $sql3);
$sql4 = "SELECT * FROM `scienceresults` ORDER BY score DESC, State";
$result4 = mysqli_query($conn, $sql4);
while($data = mysqli_fetch_array($result))
{
?>
          <div class="lboard_mem">
					<div class="name_bar">
						<p><?php echo $data['Username2']; ?></p>
					</div>
					<div class="points">
						<?php echo $data['score']; ?>
					</div>
          <div class="grade">
						<?php echo $data['Grade']; ?>
					</div>
            <div class="age">
						<?php echo $data['Age']; ?>
					</div>
          <div class="state">
						<?php echo $data['State']; ?>
					</div>
          </div>
<?php
}
?>
    </div>

    <div class="lboard_item grade" style="display: none;">
    <?php
while($data = mysqli_fetch_array($result2))
{
?>
          <div class="lboard_mem">
					<div class="name_bar">
						<p><?php echo $data['Username2']; ?></p>
					</div>
					<div class="points">
						<?php echo $data['score']; ?>
					</div>
          <div class="grade">
						<?php echo $data['Grade']; ?>
					</div>
            <div class="age">
						<?php echo $data['Age']; ?>
					</div>
          <div class="state">
						<?php echo $data['State']; ?>
					</div>
          </div>
<?php
}
?>
    </div>

    <div class="lboard_item age" style="display: none;">
    <?php
while($data = mysqli_fetch_array($result3))
{
?>
          <div class="lboard_mem">
					<div class="name_bar">
						<p><?php echo $data['Username2']; ?></p>
					</div>
					<div class="points">
						<?php echo $data['score']; ?>
					</div>
          <div class="grade">
						<?php echo $data['Grade']; ?>
					</div>
            <div class="age">
						<?php echo $data['Age']; ?>
					</div>
          <div class="state">
						<?php echo $data['State']; ?>
					</div>
          </div>
<?php
}
?>
    </div>

    <div class="lboard_item state" style="display: none;">
    <?php
while($data = mysqli_fetch_array($result4))
{
?>
          <div class="lboard_mem">
					<div class="name_bar">
						<p><?php echo $data['Username2']; ?></p>
					</div>
					<div class="points">
						<?php echo $data['score']; ?>
					</div>
          <div class="grade">
						<?php echo $data['Grade']; ?>
					</div>
            <div class="age">
						<?php echo $data['Age']; ?>
					</div>
          <div class="state">
						<?php echo $data['State']; ?>
					</div>
          </div>
<?php
}
?>
    </div>

        </div>
    </div>  
</div> 

        <script src="leaderboard.js"></script>

<?php mysqli_close($conn); // Close connection ?>

</div>
    </div>
        </section>
      </div>
      
    </div>
  </div>
</div>
    </body>
    </html>
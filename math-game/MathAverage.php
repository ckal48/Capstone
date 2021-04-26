<?php
   include_once 'Connection.php';
   session_start();
   if($_SESSION['login_user']){
      echo "Welcome " . $_SESSION["login_user"];
   }else{
      header("location:../Login.html");
   }
?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Math Average Page</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<script src="js/skel.min.js"></script>
		<script src="js/skel-panels.min.js"></script>
		<script src="js/init.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel-noscript.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
		</noscript>
		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
		<!--[if lte IE 9]><link rel="stylesheet" href="css/ie/v9.css" /><![endif]-->
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
				
				<!-- Nav -->
				<nav id="nav">
					<ul>
                            <li class="active"><a href="MathAverage.php">Average</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contacts</a></li>
                            <li><a href="../Feedback.html">Feedback</a></li>
                            <li><a href="../Logout.php">Logout</a></li>
					</ul>
				</nav>
			</div>
		</div>

		<!-- Main -->
		<div id="main">
			<div class="container">
				<div class="row"> 
					
					<!-- Content -->
					<div id="content" class="12u skel-cell-important">
						<section>
							<header>
								<h2 style = "text-align: center;">Visual Results</h2>
							</header>
							<h2>
							<?php
							$sql = "SELECT  AVG(score) FROM mathresults WHERE Username2 != '{$_SESSION['login_user']}'";
							$sql2 = "SELECT score FROM mathresults WHERE Username2 = '{$_SESSION['login_user']}'";
							$sql3 = "SELECT * FROM mathresults WHERE Username2 = '{$_SESSION['login_user']}'";
                            $result = $conn->query($sql);
							$result2 = $conn->query($sql2);
							$result3 = $conn->query($sql3);
                            //display data on web page
							while($row = mysqli_fetch_array($result3)){
								echo 'Report'.'</br>'
								.'Username: '.$row['Username2'].'</br>'
								.'Age: '.$row['Age'].'</br>'
								.'Grade: '.$row['Grade'].'</br>'
								.'State: '.$row['State'].'</br>';
								}
                             while($row = mysqli_fetch_array($result2)){
                             echo "Your score is ". $row['score'] ." ";
							 }
							 while($row = mysqli_fetch_array($result)){
								echo "compared to a user average of ". $row['AVG(score)'];
								}
                               //close the connection
                             $conn->close();
                             ?>
                            </h2></br></br>

                        <p>
							Visual Data:
						</p></br></br>
                        <iframe width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiOWIzNDcwZGEtMWViOS00ODkwLWI0YTgtYTE4ODM0ZTMwODA2IiwidCI6Ijk2NWRlODFjLWZjOTgtNGM1My05OTAxLTQxYmQ5M2UyNmUwNiIsImMiOjN9" frameborder="0" allowFullScreen="true"></iframe>
						<p>
						Go Ahead and Take A Screenshot to Send!
						</p></br>
						<p>
						Windows: Windows key + PrtScn
						</p></br>
						<p>
						Mac: Shift-Command-3
						</p></br>

						</section>
					</div>
					
				</div>
			</div>
		</div>
					
		
	</body>
</html>
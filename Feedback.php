<?php
session_start();
if($_SESSION['login_user']){
   echo "Welcome user " . $_SESSION["login_user"];
}else{
   header("location:../Login.html");
   }
mysql_select_db("Toolforschool", $con);

 

$sql="INSERT INTO feedback (firstname, user, suggestion, feed_back)

VALUES

('$_POST[firstname]','$_POST[user]','$_POST[suggestion],'$_POST[feed_back])";

 

if (!mysql_query($sql,$con))

  {

  die('Error: ' . mysql_error());

  }

echo "1 record added";

 

mysql_close($con)
?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<!-- style for textfield -->
		<title>English Average Page</title>
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
					<h1><a href="Home.php">
						A Tool for School
						</a></h1>
					<span><img src="https://www.clipartmax.com/png/full/256-2569699_building-computer-hand-cartoon-tools-tool-tools-clipart.png" alt="Picture of tools" width="70" height="70">
					</div></span>
				</div>
				
				<!-- Nav -->
				<nav id="nav">
					<ul>
                            
							<li><a href="Home.php">Home</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="#">Contacts</a></li>
                            <li class="active"><a href="Feedback.php">Feedback</a></li>
                            <li><a href="Logout.php">Logout</a></li>
					</ul>
				</nav>
			</div>
		</div>
		<!-- Main -->
		<div style="background:url(images/pics08.jpg);" id="main">
			<div class="container">
				<div class="row"> 
					
					<!-- Content -->
					<div id="content" class="12u skel-cell-important">
						<section>
							<header>
								<br>
								<h2 style="text-align:center;">Please Enter Any Sugguestions Below</h2>
							</header>
							<div style="text-align:center;display:block;" class="container">    
								<form style="color:skyblue;display: inline-block;margin-left: auto;margin-right: auto;text-align: left;">    
								  <div class="row">    
									<div class="col-25">    
									  <label for="fname">First Name</label>    
									</div>    
									<div class="col-75">    
									  <input type="text" id="firstname" name="firstname" placeholder="Your name.."  style="border: 1px solid #555555;box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);">    
									</div>    
								  </div>    
								  <div class="row">    
									<div class="col-25">    
									  <label for="user">Identification</label>    
									</div>    
									<div class="col-75">    
									  <select id="user" name="user"  style="border: 1px solid #555555;box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);">    
										<option value="none">Select User</option>    
										<option value="parent">Parent</option>    
										<option value="teacher">Teacher</option>    
										<option value="student">Student</option>    
										<option value="someone">Someone else</option>    
									  </select>    
									</div>    
								  </div>    
								  <div class="row">    
									<div class="col-25">    
									  <label for="suggestion">Suggestion</label>    
									</div>    
									<div class="col-75">    
									  <select id="suggestion" name="suggestion"  style="border: 1px solid #555555;box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);">    
										<option value="none">Select Suggestion</option>    
										<option value="math">Math</option>    
										<option value="science">Science</option>    
										<option value="socialstudies">Social Studies</option>    
										<option value="english">English</option>    
										<option value="design">Design</option>    
										<option value="other">Other</option>     
									  </select>    
									</div>    
								  </div>    
								  <div class="row">    
									<div class="col-25">    
									  <label for="feed_back">Feedback</label>    
									</div>    
									<div class="col-75">    
									  <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px; border: 1px solid #555555;box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);"></textarea>    
									</div>    
								  </div>    
									<br><input type="submit" value="Submit" style="box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19); border: 1px solid #555555;"><br>     
								</form>    
							  </div> 		
						</section>
					</div>
					
				</div>
			</div>
		</div>

<!-- Copyright -->
<div id="copyright">
	<div class="container">
		Design: <a href="http://templated.co">TEMPLATED</a> Images: <a href="http://unsplash.com">Unsplash</a> (<a href="http://unsplash.com/cc0">CC0</a>)
	</div>
</div>

</body>
</html>	
	</body>
</html>
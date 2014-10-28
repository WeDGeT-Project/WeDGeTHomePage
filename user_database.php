<!DOCTYPE html>
<html lang="en">
<head>
	<title>WeDGeT-YourHome</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
	<?php 
	if (! empty ( $_POST )) {
		$nickname = $_POST['nickname'];
		$password = $_POST['password'];
	}
	$dbc = mysqli_connect("localhost","root","","wedget_info")
		or die("cannot connect database：" . mysqli_error());
	$flag = false;

	$check_query_nickname = mysqli_query($dbc,"select uid from user where nickname='$nickname' limit 1");
	if(!mysqli_fetch_array($check_query_nickname)){
		echo '<h3>No such Nickname!</h3>
	    	<a class="btn" href="login.php">back login</a>';
		exit();
	}
	else{
		$password_MD5 = MD5($_POST['password']);
		$check_query_password = mysqli_query($dbc,"select uid from user where nickname='$nickname' and password='$password_MD5' limit 1");
		if(mysqli_fetch_array($check_query_password)){
			$flag = true;
		}
		else {
			echo '<h3>Wrong Password!<h3>
		    	<a class="btn" href="login.php">back login</a>';
			exit();
		}
	}
	mysqli_close($dbc);
	?>
</head>
<body>
	<div class="container">

		<div class="span10 offset1">
			<div class="row">
				<h1>WedGeT-Welcome!</h1>
				<h2>look! here is your tables!</h2>
			</div>
			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Table Name</th>
						<th>Action With Table</th>
					</tr>
				</thead>
				<tbody>
	               	<?php
						$user_dbc = mysqli_connect("localhost", "root", "", "wedget_user_" . $nickname);
						$sql = 'show tables';
						$result = mysqli_query($user_dbc, $sql);
						
						while($row = mysqli_fetch_array($result))
						{
							echo '<tr>';
							echo '<td>' . $row[0] . '</td>';
							echo '<td width=250>';
							echo '<a class="btn btn-success" href="read_table.php?database=wedget_user_' . $nickname. '&table='. $row[0] .'">Read & Edit</a>';
							echo ' ';
							echo '<a class="btn btn-danger">Delete</a>';
							echo '</td>';
							echo '</tr>';
						}
						mysqli_close($user_dbc);
					?>
	            </tbody>
			</table>
			<div class="row"> 
				<a class="btn" href="index.php">back home</a>
			</div>
		</div>
	</div>
	
	
</body>
</html>
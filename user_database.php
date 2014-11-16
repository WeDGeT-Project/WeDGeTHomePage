<!DOCTYPE html>
<html>
<head>
	<title>个人Web网页数据抽取：您的表格</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
	<?php 
	$database = null;
	if (! empty ( $_POST )) {
		$nickname = $_POST['nickname'];
		$password = $_POST['password'];
		$database = "wedget_info";
		$dbc = mysqli_connect("localhost", "root", "", "wedget_info")
			or die("cannot connect database：" . mysqli_error());
		$flag = false;

		$check_query_nickname = mysqli_query($dbc,"select uid from user where nickname='$nickname' limit 1");
		if(!mysqli_fetch_array($check_query_nickname)){
			echo '<h3>昵称不存在</h3>
				<a class="btn" href="login.php">返回登录界面</a>';
			exit();
		}
		else{
			$password_MD5 = MD5($_POST['password']);
			$check_query_password = mysqli_query($dbc,"select uid from user where nickname='$nickname' and password='$password_MD5' limit 1");
			if(mysqli_fetch_array($check_query_password)){
				$flag = true;
			}
			else {
				echo '<h3>密码错误<h3>
					<a class="btn" href="login.php">返回登录界面</a>';
				exit();
			}
		}
		mysqli_close($dbc);
	}else{
		if (! empty ( $_GET)) {
			$database = $_REQUEST ['database'];
			$nickname = $_REQUEST ['nickname'];
		}
	}
	
	?>
</head>
<body>
	<div class="container">

		<div class="span10 offset1">
			<div class="row">
				<h1>个人Web网页数据抽取：您的表格</h1>
				<p class="text-info">以下是您曾抽取过的表单，您可以对它们进行一些操作。如果您没有发现任何表单，说明您未抽取表单并存入数据库。</p>
				<?php 
					echo '<a class="btn btn-success" href="extract_table.php?database=' . $database. '&nickname='.$nickname.'">抽取数据</a>';
				?>
				<br>
				<br>
			</div>
			<div class="row">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>表单名称</th>
							<th>对表单的操作</th>
						</tr>
					</thead>
					<tbody>
						<?php
							$user_dbc = mysqli_connect("localhost", "root", "", $database);
							$sql = "show tables like '".$nickname."_%';";
							$result = mysqli_query($user_dbc, $sql);
							
							while($row = mysqli_fetch_array($result))
							{
								echo '<tr>';
								echo '<td>' . $row[0] . '</td>';
								echo '<td width=350>';
								echo '<a class="btn btn-success" href="read_table.php?database=' . $database. '&table='. $row[0] .'&nickname='. $nickname .'">读取表单&对表单内容进行操作</a>';
								echo ' ';
								echo '<a class="btn btn-danger" href="delete_table.php?database=' . $database. '&table='. $row[0] .'&nickname='. $nickname .'">删除该项表单</a>';
								echo '</td>';
								echo '</tr>';
							}
							mysqli_close($user_dbc);
						?>
					</tbody>
				</table>
			</div>
			<div class="row"> 
				<a class="btn" href="login.php">返回登录界面</a>
			</div>
		</div>
	</div>
	
	
</body>
</html>
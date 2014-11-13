<?php
$valid = false;
if (! empty ( $_POST )) {
	// keep track validation errors
	$nickname_error = null;
	$password_error = null;
	$confirm_password_error = null;
	$email_account_error = null;
	
	// keep track post values
	$nickname = $_POST['nickname'];
	$password = $_POST['password'];
	$confirm_password = $_POST['confirm_password'];
	$email_account = $_POST['email_account'];
	
	// validate input
	$valid = true;
	
	if (empty ( $nickname )) {
		$nickname_error = '您忘记输入昵称了';
		$valid = false;
	}
	
	if (empty ( $password )) {
		$password_error = '您忘记输入密码了';
		$valid = false;
	}
	
	if (empty ( $confirm_password )) {
		$confirm_password_error = '请再次输入密码';
		$valid = false;
	}
	
	if (empty ( $email_account )) {
		$email_account_error = '您忘记输入电子邮箱了';
		$valid = false;
	}
	
	if (!empty( $confirm_password ) && ($confirm_password != $password)){
		$confirm_password_error = '密码不同，请重新输入';
		$valid = false;
	}
	
	if ($valid){
		$dbc = mysqli_connect("localhost", "root", "", "wedget_info")
			or die("cannot connect database：" . mysqli_error());
	
		$check_query = mysqli_query($dbc, "select uid from user where nickname='$nickname' limit 1");
		if(mysqli_fetch_array($check_query)){
			$nickname_error = '昵称已存在';
		}
	}
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>欢迎注册</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
</head>

<body>
	<div class="container">

		<div class="span10 offset1">
			<div class="row">
				<h1>欢迎注册</h1>
			</div>
			<form class="form-horizontal" method="post">
				
				<div
					class="control-group <?php echo !empty($nickname_error)?'error':'';?>">
					<label class="control-label">昵称（英文）:</label>
					<div class="controls">
						<input name="nickname" type="text" placeholder="昵称（英文）"
							value="<?php echo !empty($nickname)?$nickname:'';?>">
                            <?php if (!empty($nickname_error)): ?>
                                <span class="help-inline"><?php echo $nickname_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div 
					class="control-group <?php echo !empty($password_error)?'error':'';?>">
					<label class="control-label">密码:</label>
					<div class="controls">
						<input name="password" type="password" placeholder="密码"
							value="<?php echo !empty($password)?$password:'';?>">
                            <?php if (!empty($password_error)): ?>
                                <span class="help-inline"><?php echo $password_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div 
					class="control-group <?php echo !empty($confirm_password_error)?'error':'';?>">
					<label class="control-label">再次输入密码:</label>
					<div class="controls">
						<input name="confirm_password" type="password" placeholder="再次输入密码"
							value="<?php echo !empty($confirm_password)?$confirm_password:'';?>">
                            <?php if (!empty($confirm_password_error)): ?>
                                <span class="help-inline"><?php echo $confirm_password_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div 
					class="control-group <?php echo !empty($email_account_error)?'error':'';?>">
					<label class="control-label">电子邮箱:</label>
					<div class="controls">
						<input name="email_account" type="text" placeholder="电子邮箱"
							value="<?php echo !empty($email_account)?$email_account:'';?>">
                            <?php if (!empty($email_account_error)): ?>
                                <span class="help-inline"><?php echo $email_account_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div class="form-actions">
					<button type="submit" class="btn btn-success">确认</button>
					<a class="btn" href="index.php">返回主页</a>
					<?php 
					if($valid){
						$check_query = mysqli_query($dbc, "select uid from user where nickname='$nickname' limit 1");
						if(!mysqli_fetch_array($check_query)){
							$password_MD5 = MD5($password);
							$regdate = time();
							$sql = "INSERT INTO user(nickname,password,email_account,regdate)VALUES('$nickname','$password_MD5','$email_account',$regdate)";
							
							if(mysqli_query($dbc, $sql)){
								echo '<h3>注册成功</h3>';
								echo  '<a class="btn btn-success" href="login.php">进入登录界面</a>';
							} 
							else {
								echo '对不起服务器发生错误：',mysql_error(),'<br />';
							}
						}
						mysqli_close($dbc);
					}
					?>
				</div>
			</form>
		</div>

	</div>
</body>
</html>
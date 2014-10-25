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
		$nickname_error = 'Please enter Nickname!';
		$valid = false;
	}
	
	if (empty ( $password )) {
		$password_error = 'Please enter Password!';
		$valid = false;
	}
	
	if (empty ( $confirm_password )) {
		$confirm_password_error = 'Please confirm Password!';
		$valid = false;
	}
	
	if (empty ( $email_account )) {
		$email_account_error = 'Please enter Email Account!';
		$valid = false;
	}
	
	if (!empty( $confirm_password ) && ($confirm_password != $password)){
		$confirm_password_error = 'Not same as password!';
		$valid = false;
	}
	
	if ($valid){
		$dbc = mysqli_connect("localhost", "root", "", "wedget_info")
			or die("cannot connect database：" . mysqli_error());
	
		$check_query = mysqli_query($dbc, "select uid from user where nickname='$nickname' limit 1");
		if(mysqli_fetch_array($check_query)){
			$nickname_error = 'there already exitence!';
		}
	}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>WeDGeT-Register</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
</head>

<body>
	<div class="container">

		<div class="span10 offset1">
			<div class="row">
				<h1>WeDGeT-Register</h1>
			</div>
			<form class="form-horizontal" method="post">
				
				<div
					class="control-group <?php echo !empty($nickname_error)?'error':'';?>">
					<label class="control-label">Nickname:</label>
					<div class="controls">
						<input name="nickname" type="text" placeholder="Nickname"
							value="<?php echo !empty($nickname)?$nickname:'';?>">
                            <?php if (!empty($nickname_error)): ?>
                                <span class="help-inline"><?php echo $nickname_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div 
					class="control-group <?php echo !empty($password_error)?'error':'';?>">
					<label class="control-label">Password:</label>
					<div class="controls">
						<input name="password" type="password" placeholder="Password"
							value="<?php echo !empty($password)?$password:'';?>">
                            <?php if (!empty($password_error)): ?>
                                <span class="help-inline"><?php echo $password_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div 
					class="control-group <?php echo !empty($confirm_password_error)?'error':'';?>">
					<label class="control-label">Confirm Password:</label>
					<div class="controls">
						<input name="confirm_password" type="password" placeholder="Confirm Password"
							value="<?php echo !empty($confirm_password)?$confirm_password:'';?>">
                            <?php if (!empty($confirm_password_error)): ?>
                                <span class="help-inline"><?php echo $confirm_password_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div 
					class="control-group <?php echo !empty($email_account_error)?'error':'';?>">
					<label class="control-label">Email Account:</label>
					<div class="controls">
						<input name="email_account" type="text" placeholder="Email Account"
							value="<?php echo !empty($email_account)?$email_account:'';?>">
                            <?php if (!empty($email_account_error)): ?>
                                <span class="help-inline"><?php echo $email_account_error;?></span>
                            <?php endif;?>
                        </div>
				</div>
				
				<div class="form-actions">
					<button type="submit" class="btn btn-success">register</button>
					<a class="btn" href="index.php">back home</a>
					<?php 
					if($valid){
						$check_query = mysqli_query($dbc, "select uid from user where nickname='$nickname' limit 1");
						if(!mysqli_fetch_array($check_query)){
							$password_MD5 = MD5($password);
							$regdate = time();
							$sql = "INSERT INTO user(nickname,password,email_account,regdate)VALUES('$nickname','$password_MD5','$email_account',
							$regdate)";
							$cnnt = mysqli_connect("localhost", "root", "");
							$sql_create_db = "CREATE DATABASE wedget_user_" . $nickname;
							
							if(mysqli_query($dbc, $sql)){
								echo '<h3>register sucessfully!</h3>';
								if(mysqli_query($cnnt, $sql_create_db)){
									echo '<h3>your own database created sucessfully!</h3>';
								}
								echo  '<a class="btn btn-success" href="login.php">go to login</a>';
							} 
							else {
								echo 'sorry, something wrong：',mysql_error(),'<br />';
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
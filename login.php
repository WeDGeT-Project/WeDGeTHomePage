<!DOCTYPE html>
<html>
<head>
	<title>个人Web网页数据抽取-登录界面</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
	<script language=JavaScript>
	function InputCheck(loginForm)
	{
	  if (loginForm.nickname.value == "")
	  {
	    alert("您忘记输入昵称了");
	    loginForm.nickname.focus();
	    return (false);
	  }
	  if (loginForm.password.value == "")
	  {
	    alert("您忘记输入密码了");
	    loginForm.password.focus();
	    return (false);
	  }
	}
	</script>
</head>

<body>
	<div class="container">

		<div class="span10 offset1">
			<div class="row">
				<h1>个人Web网页数据抽取-登录界面</h1>
			</div>
			<form name="loginForm" class="form-horizontal" action="user_database.php" method="post" onSubmit="return InputCheck(this)">
				
				<div class="control-group">
					<label class="control-label">昵称:</label>
					<div class="controls">
						<input name="nickname" type="text" placeholder="昵称">
                    </div>
				</div>
				
				<div class="control-group">
					<label class="control-label">密码:</label>
					<div class="controls">
						<input name="password" type="password" placeholder="密码">
                    </div>
				</div>
				
				<div class="form-actions">
					<button type="submit" class="btn btn-success">确认</button>
					<a class="btn" href="index.php">返回主页</a>
				</div>
			</form>
		</div>

	</div>
</body>
</html>
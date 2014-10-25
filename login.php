<!DOCTYPE html>
<html lang="en">
<head>
	<title>WeDGeT-Login</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
	<script language=JavaScript>
	function InputCheck(loginForm)
	{
	  if (loginForm.nickname.value == "")
	  {
	    alert("please input you nickname!");
	    loginForm.nickname.focus();
	    return (false);
	  }
	  if (loginForm.password.value == "")
	  {
	    alert("please input your password!");
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
				<h1>WeDGeT-Login</h1>
			</div>
			<form name="loginForm" class="form-horizontal" action="user_database.php" method="post" onSubmit="return InputCheck(this)">
				
				<div class="control-group">
					<label class="control-label">Nickname:</label>
					<div class="controls">
						<input name="nickname" type="text" placeholder="Nickname">
                    </div>
				</div>
				
				<div class="control-group">
					<label class="control-label">Password:</label>
					<div class="controls">
						<input name="password" type="password" placeholder="Password">
                    </div>
				</div>
				
				<div class="form-actions">
					<button type="submit" class="btn btn-success">login</button>
					<a class="btn" href="index.php">back home</a>
				</div>
			</form>
		</div>

	</div>
</body>
</html>
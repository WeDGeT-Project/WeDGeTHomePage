<?php
	$database = null;
	$table = null;
	$head = null;
	$nickname = null;
	$flag = false;
	
	if (! empty ( $_GET )) {
		$database = $_REQUEST ['database'];
		$table = $_REQUEST ['table'];
		$head = $_REQUEST ['head'];
		$nickname = $_REQUEST ['nickname'];
	}
	
	if (! empty ( $_POST )) {
		$database = $_POST ['database'];
		$table = $_POST ['table'];
		$head = $_POST ['head'];
		$nickname = $_POST ['nickname'];
		
		$dbc = mysqli_connect("localhost", "root", "", $database)
			or die('error happend whien connect database');

		$sql =  "alter table ".$table." drop column ".$head;
		mysqli_query($dbc, $sql)
			or die('error happened when delete!');
		
		mysqli_close($dbc);
		$flag = true;
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<script src="js/bootstrap.min.js"></script>
</head>

<body>
	<div class="container">

		<div class="span10 offset1">
			<div class="row">
				<h3>删除该列</h3>
			</div>

			<form class="form-horizontal" action="delete_column.php" method="post">
				<input type="hidden" name="database" value="<?php echo $database;?>" />
				<input type="hidden" name="table" value="<?php echo $table;?>" />
				<input type="hidden" name="head" value="<?php echo $head;?>" />
				<input type="hidden" name="nickname" value="<?php echo $nickname;?>" />
					<?php
						if(!$flag)
						{
							echo '<p class="alert alert-error">您真的要删除改列吗？</p>';
						}
					?>
				<div class="form-actions">
					<?php
						if(!$flag)
						{
							echo '<button type="submit" class="btn btn-danger">是</button>';
							echo '<a class="btn" href="read_table.php?database=' . $database. '&table='. $table .'&nickname='.$nickname.'">否</a>';
						}
						else
						{
							echo '<h3>成功删除该列</h3>';
							echo '<a class="btn btn-success" href="read_table.php?database=' . $database. '&table='. $table .'&nickname='.$nickname.'">返回</a>';
						}
					?>			
				</div>
			</form>
		</div>

	</div>
	<!-- /container -->
</body>
</html>
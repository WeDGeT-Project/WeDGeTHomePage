<?php
	$database = null;
	$table = null;
	$id = null;
	$flag = false;
	
	if (! empty ( $_GET ['id'] )) {
		$database = $_REQUEST ['database'];
		$table = $_REQUEST ['table'];
		$id = $_REQUEST ['id'];
	}
	
	if (! empty ( $_POST )) {
		$database = $_POST ['database'];
		$table = $_POST ['table'];
		$id = $_POST ['id'];
		
		$dbc = mysqli_connect("localhost", "root", "", $database)
			or die('error happend whien connect database');

		$sql =  "DELETE FROM ". $table. " WHERE id = ".$id;
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
				<h3>Delete a Data</h3>
			</div>

			<form class="form-horizontal" action="delete_row.php" method="post">
				<input type="hidden" name="database" value="<?php echo $database;?>" />
				<input type="hidden" name="table" value="<?php echo $table;?>" />
				<input type="hidden" name="id" value="<?php echo $id;?>" />
					<?php
						if(!$flag)
						{
							echo '<p class="alert alert-error">Are you sure to delete ?</p>';
						}
					?>
				<div class="form-actions">
					<?php
						if(!$flag)
						{
							echo '<button type="submit" class="btn btn-danger">Yes</button>';
							echo '<a class="btn" href="index.php">No</a>';
						}
						else
						{
							echo '<h3>delete successfully!</h3>';
							echo '<a class="btn btn-success" href="read_table.php?database=' . $database. '&table='. $table .'">go to see your '. $table .' table!</a>';
						}
					?>			
				</div>
			</form>
		</div>

	</div>
	<!-- /container -->
</body>
</html>
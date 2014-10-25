<!DOCTYPE html>
<html lang="en">
<head>
<title>WeDGeT-ReadTable</title>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<script src="js/bootstrap.min.js"></script>
<?php
	$database = null;
	$table = null;
	if (! empty ( $_GET ['database'] )) {
		$database = $_REQUEST ['database'];
		$table = $_REQUEST ['table'];
	}
	
	$dbc = mysqli_connect("localhost", "root", "", $database)
		or die("cannot connect database: " . mysqli_error());
	mysqli_query($dbc, "set names utf8");
?>
</head>

<body>
	<div class="container">
		<div class="row">
			<h3><?php echo $table;?></h3>
		</div>
		<div class="row">
			<?php			
				$query = "SELECT * FROM ". $table;
				$result = mysqli_query($dbc, $query);
				
				echo '<table class="table table-striped table-bordered" >';

				while($field_infor=mysqli_fetch_field($result)){
					echo "<th>".$field_infor->name."</th>";
				}
				while ($row=mysqli_fetch_row($result)){
					echo "<tr>";
					foreach ($row as $key=>$val){
						echo "<td>$val</td>";
					}
					echo "</tr>";
				}
				echo "</table>";
				mysqli_free_result($result);
				mysqli_close($dbc);
			?>
		</div>
	</div>
</body>
</html>
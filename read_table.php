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
		$nickname = $_REQUEST ['nickname'];
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
			<?php
				echo '<a class="btn btn-success" href="user_database.php?database=' . $database. '&table='. $table .'&nickname='. $nickname .'">返回查看所有表单</a>';
				echo '<br><br>';
			?>
		</div>
		<div class="row">
			<?php			
				$query = "SELECT * FROM ". $table;
				$result = mysqli_query($dbc, $query)  or die(mysqli_error($dbc));
				
				echo '<table class="table table-striped table-bordered" >';

				while($field_infor=mysqli_fetch_field($result)){
					if($field_infor->name!="id")
						echo '<th>'.$field_infor->name.'<br><a class="btn btn-danger" >删除</a></th>';
					else
						echo '<th>'.$field_infor->name.'</th>';
					//echo '<tr><td></td>';
				}
				echo "<th>action</th>";
				while ($row=mysqli_fetch_row($result)){
					echo "<tr>";
					foreach ($row as $key=>$val){
						echo "<td>$val</td>";
					}
					echo '<td width=100>';
					echo '<a class="btn btn-danger" href="delete_row.php?database='. $database .'&table='. $table .'&id='.$row[0].'&nickname='.$nickname.'">删除</a>';
					echo '</td>';
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
<!DOCTYPE html>
<html lang="en">
<HEAD>
<title>WeDGeT-ReadTable</title>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<script src="js/bootstrap.min.js"></script>
<script>
function f_SaveAsExcel( _sHtml , _sFileName ){
	var oWin=window.open("about:blank","Excel","top=2000,left=2000");

	oWin.document.write( _sHtml);
	oWin.document.execCommand('Saveas',false , _sFileName );
	oWin.close();
}
</script>
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
</HEAD>

<BODY>
<div class="container">
		<div class="row">
			<h3><?php echo $table;?></h3>
			<?php
				echo '<a class="btn btn-success" href="user_database.php?database=' . $database. '&table='. $table .'&nickname='. $nickname .'">返回查看所有表单</a>';
			?>
			<input class="btn btn-success" name="" type="button" onClick="f_SaveAsExcel(document.all.content.innerHTML,'test.xls');" value="导出表单到本地">
			<p>注意：导出功能暂时只支持IE内核浏览器</p>
			<br>
		</div>
		<div id="content" class="row">
			<?php			
				$query = "SELECT * FROM ". $table;
				$result = mysqli_query($dbc, $query)  or die(mysqli_error($dbc));
				
				echo '<table class="table table-striped table-bordered" >';

				while($field_infor=mysqli_fetch_field($result)){
					if($field_infor->name!="id")
					{
						$head = $field_infor->name;
						echo '<th>'. $head .'<br><a class="btn btn-danger" href="delete_column.php?database='. $database .'&table='. $table .'&head='.$head.'&nickname='.$nickname.'">删除</a></th>';
					}
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
</BODY>
</HTML>
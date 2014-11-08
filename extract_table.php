<!DOCTYPE html>
<html>
<head>
	<title>提取Web页面中的表单数据</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
</head>

<body>
	<?php
		header("Content-Type: text/html; charset=utf-8");
		include('simple_html_dom.php');
		
		$valid = false;
		if (! empty ( $_POST )) {
			$myhtml = $_POST['myhtml'];
			$myhtml_error = null;
			$valid = true;
			
			if (empty ( $myhtml )) {
				$myhtml_error = 'Please enter HTML File Path!';
				$valid = false;
			}
		}

		echo '<div class="container">';	
	?>
	<div class="row">
		<h1>提取Web页面中的表单数据</h1>
	</div>
	<form class="form-horizontal" method="post">
		<div
			class="control-group <?php echo !empty($myhtml_error)?'error':'';?>">
			<label class="control-label">HTML文件路径:</label>
			<div class="controls">
				<input name="myhtml" type="text" placeholder="HTML File Path"
					value="<?php echo !empty($myhtml)?$myhtml:'';?>">
					<?php if (!empty($myhtml_error)): ?>
						<span class="help-inline"><?php echo $myhtml_error;?></span>
					<?php endif;?>
			</div>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-success">从选中的HTML文件中提取表单数据</button>
		</div>
	</form>
	<?php
		if($valid){
			//数据库准备
			$database = "testdatabase";
			/*$dbc = mysqli_connect("localhost", "root", "", $database)
				or die("connect fail!");*/
			
			$html = new simple_html_dom(); //实例化一个simple_html_dom对象
			$html->load_file($myhtml);

			$element = $html->find('table');
			$id = 0;
			foreach($element as $table){	
				$flag =true;
				$table->setAttribute('class', 'table table-striped table-bordered');
							
				echo $table;
				echo '<a class="btn btn-success" href="write_to_database.php?database='.$database.'&myhtml='.$myhtml.'&tableid='.$id.'">将此表单写入您的数据库</a>';
				echo '<br>';
				echo '<br>';
				echo '<br>';
				$id = $id + 1;
			}
		}
		echo '</div>';
	?>
</body>
</html>
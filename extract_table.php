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
		
		$database = null;
		if (! empty ( $_GET)) {
			$database = $_REQUEST ['database'];
		}
		
		$valid = false;
		if (! empty ( $_POST )) {
			$myhtml = $_POST['myhtml'];
			$myhtml_error = null;
			$valid = true;
			
			if (empty ( $myhtml )) {
				$myhtml_error = '请输入HTML文件路径';
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
			//$database = "testdatabase";
			//echo $database;
			/*$dbc = mysqli_connect("localhost", "root", "", $database)
				or die("connect fail!");*/
			
			$html = new simple_html_dom(); //实例化一个simple_html_dom对象
			$html->load_file($myhtml);

			$element = $html->find('table');
			$id = 0;
			foreach($element as $table){	
				$flag =true;
				$table->setAttribute('class', 'table table-striped table-bordered');
				echo '<form class="form-horizontal" action="write_to_database.php" method="post" onSubmit="return InputCheck(this)">';	
				echo $table;
				echo '<p class="text-info">当您需要提取该表格时需要填写表格名称，名称只支持字母和下划线，不要含有空格</p>';
				echo '<label class="control-label">表格名称:</label><input name="tablename" type="text" placeholder="表格名称">';
				echo '<input name="database" type="hidden" value='. $database .' >';
				echo '<input name="myhtml" type="hidden" value='. $myhtml .' >';
				echo '<input name="tableid" type="hidden" value='. $id .' >';
				echo '<button type="submit" class="btn btn-success">将此表单写入您的数据库</button>';
				//echo '<a class="btn btn-success" href="write_to_database.php?database='.$database.'&myhtml='.$myhtml.'&tableid='.$id.'">将此表单写入您的数据库</a>';
				echo '<br>';
				echo '<br>';
				echo '<br>';
				echo '</form>';
				$id = $id + 1;
			}
		}
		echo '</div>';
	?>
</body>
</html>
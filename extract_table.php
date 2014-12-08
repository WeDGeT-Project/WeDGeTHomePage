
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
		//error_reporting(0);
		include('simple_html_dom.php');
		
		$database = null;
		$nickname = "admin";
		if (! empty ( $_GET)) {
			$database = $_REQUEST ['database'];
			$nickname = $_REQUEST ['nickname'];
		}
		
		$valid = false;
		if (! empty ( $_FILES )) {
			move_uploaded_file($_FILES['htmlfile']['tmp_name'] , "html/source.html");
			$html = new simple_html_dom(); //实例化一个simple_html_dom对象
			$myhtml = "html/source.html";
			$html->load_file($myhtml);
			$element = $html->find('table');
			$valid = true;
		}
		echo '<div class="container">';	
	?>
	<div class="row">
		<h1>提取Web页面中的表单数据</h1>
	</div>
	<form class="form-horizontal" method="post" enctype="multipart/form-data">

		<div class="control-group ">
			<label class="control-label">HTML文件:</label>
			<div class="controls">
				<input name="htmlfile" type="file" >
			</div>
		</div>
		<div class="form-actions">
			<p class="text-info">注意：由于编码问题，对于英文网站直接将网址输入即可；对于中文网站必须将源代码存到本地，路径和文件名不可包含中文和空格</P>
			<button type="submit" class="btn btn-success">从选中的HTML文件中提取表单数据</button>
		</div>
	</form>
	<?php
		if($valid){	
			//$html = new simple_html_dom(); //实例化一个simple_html_dom对象
			//$html->load_file($myhtml);
			//$element = $html->find('table');
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
				echo '<input name="nickname" type="hidden" value='. $nickname .' >';
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
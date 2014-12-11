
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
		<p class="text-info">使用指南：该页面是网页表单抽取界面，所以需要目标网页的HTML文件。</P>
    	<p class="text-info">您可以使用以下方法获取目标网页的HTML文件：进入目标网页，保存网页源代码（Ctrl+s）到您的计算机任意位置（html文件），命名请使用英文，并且名称中不能有空格。</P>
		<p class="text-info">然后您便可以抽取目标网页的表单数据了：点击下面的“选择文件”，选择您刚刚保存的HTML，确定之后，点击“从选中的HTML文件中提取表单数据”。</P
	</div>
	<form class="form-horizontal" method="post" enctype="multipart/form-data">

		<div class="control-group ">
			<label class="control-label">HTML文件:</label>
			<div class="controls">
				<input name="htmlfile" type="file" >
			</div>
		</div>
		<div class="form-actions">
			<p>注意：该页面展示的是网页中所有表单的抽取结果，并意味着已经存到您的数据库中哦。在您中意的表单下，填写表单名字，并点击“将此表单写入您的数据库”，便可加入您的数据库中。</P>
			<p>注意：如果抽取结果是乱码，这是由于原网页编码造成的，你只需把html文件在保存时选择“UTF-8”编码方式即可(放心，您一定会找到的，并不高端~)。</P>
			<p>任何疑问，请加QQ群，我们会第一时间回答您：个人Web网页数据抽取 20541685</p>
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
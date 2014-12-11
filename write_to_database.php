<!DOCTYPE html>
<html>
<head>
	<title>写入数据库</title>
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
	$myhtml = null;
	$tableid = null;
	$tablename = "wedgettable";
	if (! empty ( $_POST)) {
		
		$database = $_POST ['database'];
		$myhtml = $_POST ['myhtml'];
		$tableid = $_POST ['tableid'];
		$tablename = $_POST ['tablename'];
		$nickname = $_POST ['nickname'];
		/*echo $database.'<br>';
		echo $myhtml.'<br>';
		echo $tableid.'<br>';
		echo $tablename.'<br>';
		echo $nickname.'<br>';*/
	}
	
	$dbc = mysqli_connect("localhost", "root", "", $database)
				or die("connect fail!");
	
	$html = new simple_html_dom(); //实例化一个simple_html_dom对象
	$html->load_file($myhtml);

	$element = $html->find('table');
	$all_tr = $element[$tableid]->find('tr');   //获取选中表格中的所有tr
	
	//确定表头并建立表格
	$columns = 0;
	$hava_th = false;
	$tablename = $nickname.'_'. $tablename;
	$sql_create_table = "create table ". $tablename ."(id int auto_increment,";
	foreach($all_tr as $every_tr)
	{
		if($every_tr->find('th'))
		{
			$hava_th = true;
			$all_th = $every_tr->find('th');
			$count_th = 0;
			foreach($all_th as $every_th)
			{
				$count_th++;
				$every_th = strip_tags($every_th);  //去除标签干扰
				if(strip_tags($every_th) == '')
				{
					$sql_create_table = $sql_create_table . "`tablehead`" . " varchar(45),";
				}
				else
				{
					$every_th = trim($every_th);    //去除两边空格
					$sql_create_table = $sql_create_table . "`" .$every_th . "` varchar(45),";
				}
			}
			$columns += $count_th;
			//echo '该行表头数量（正常获取）:'.$columns.'<br>';
		}
		else
		{
			if($hava_th == false)
			{
				$all_td = $every_tr->find('td');
				$count_td = 0;
				foreach($all_td as $every_td)
				{
					$count_td++;
					$every_th = strip_tags($every_td);  //去除标签干扰
					$sql_create_table = $sql_create_table . "thead" . $count_td . " varchar(45),";
				}
				$columns = $count_td;
				//echo '该行表头数量（从表体获取）:'.$columns.'<br>';
				break;
			}
		}
		break;
	}
	//echo '该行表头数量:'.$columns.'<br>';
	$sql_create_table = $sql_create_table . "primary key (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
	$sql_create_table = strip_tags($sql_create_table);
	//echo $sql_create_table.'<br>';
	mysqli_query($dbc, $sql_create_table)
			or die('<h2>已存在同名表单（返回您的首页查看是否同名）或是我们无法处理该表单（点击浏览器后退）</h2>
			<a class="btn btn-success" href="user_database.php?database='. $database .'&nickname='.$nickname.'">查看您的数据库</a>');
			
	//向表格中添加元素
	foreach($all_tr as $every_tr)
	{
		$all_td = $every_tr->find('td');
		$count_td = 0;
		$sql_insert_row = "insert into ". $tablename ." values(''";
		foreach($all_td as $every_td)
		{
			$count_td++;
		}
		if($count_td == $columns)
		{
			//echo 'same: '.$count_td.'<br>';
			foreach($all_td as $every_td)
			{
				$sql_insert_row = $sql_insert_row . ",'" . strip_tags($every_td) . "'";
			}
			//echo 'insert a row<br>';
			$sql_insert_row = $sql_insert_row . ");";
			$sql_insert_row = strip_tags($sql_insert_row);
			//echo $sql_insert_row.'<br>';
			mysqli_query($dbc, $sql_insert_row)
				or die('<h2>很抱歉，填充表单时出现错误（但表单已经建立，您可以在您的数据库中删除它）</h2>
				<a class="btn btn-success" href="user_database.php?database='. $database .'&nickname='.$nickname.'">查看您的数据库</a>');
		}
		else
		{
			//echo 'delete a row<br>';
		}
	}
	echo "<h2>表格填充数据完毕，可返回上一页（点击浏览器后退）。</h2>";
	echo '<a class="btn btn-success" href="user_database.php?database='. $database .'&nickname='.$nickname.'">查看您的数据库</a>';
?>
	
</body>
</html>
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
	include('simple_html_dom.php');
	$database = null;
	$myhtml = null;
	$tableid = null;
	if (! empty ( $_GET)) {
		$database = $_REQUEST ['database'];
		$myhtml = $_REQUEST ['myhtml'];
		$tableid = $_REQUEST ['tableid'];
	}
	//echo $database.'<br>';
	//echo $myhtml.'<br>';
	//echo $tableid.'<br>';
	
	$dbc = mysqli_connect("localhost", "root", "", $database)
				or die("connect fail!");
	
	$html = new simple_html_dom(); //实例化一个simple_html_dom对象
	$html->load_file($myhtml);

	$element = $html->find('table');
	//$element[$tableid]->setAttribute('class', 'table table-striped table-bordered');
	//echo $element[$tableid];
	$sql = "create table trry". $tableid ."(id int auto_increment,";
	$tr = $element[$tableid]->find('tr');
	$columns = 0;
	$ishaveth = false;
	foreach($tr as $row){
		$th = $row->find('th');
		foreach($th as $throw){
			//echo "Hello";
			$ishaveth = true;
			$throw = strip_tags($throw);
			if(strip_tags($throw) == " ")
			{
				$sql = $sql . "xixi" . " varchar(45),";
				$columns = $columns + 1;
			}
			else
			{
				$throw = trim($throw);
				$sql = $sql . "`" .$throw . "` varchar(45),";
				$columns = $columns + 1;
			}	
		}
	}
	if($ishaveth == false)
	{
		echo '<h3>该表格不含有表头，我们想办法努力获取……</h3>';
		$pretr = $element[$tableid-1]->find('tr');
		$columns = 0;
		$ishaveth = false;
		foreach($pretr as $row){
			$th = $row->find('th');
			foreach($th as $throw){
				//echo "Hello";
				$ishaveth = true;
				$throw = strip_tags($throw);
				if(strip_tags($throw) == " ")
				{
					$sql = $sql . "xixi" . " varchar(45),";
					$columns = $columns + 1;
				}
				else
				{
					$throw = trim($throw);
					$sql = $sql . "`" .$throw . "` varchar(45),";
					$columns = $columns + 1;
				}	
			}
		}
	}
	if($ishaveth == true)
	{
		echo '<h3>成功获取表头。</h3>';
	}else{
		echo '<h3>第一次获取表头失败。</h3>';
		echo '<h3>额……我再努努力吧……</h3>';
		$columns = 0;
		$ishaveth = false;
		foreach($tr as $row){
			$th = $row->find('td');
			$ishaveth = true;
			//echo "row".'<br>';
			//$throw = strip_tags($throw);
			foreach($th as $throw){
				$throw = strip_tags($throw);
				//echo $throw.'<br>';
				if(strip_tags($throw) == " ")
				{
					$sql = $sql . "xixi" . " varchar(45),";
					$columns = $columns + 1;
				}
				else
				{
					$throw = trim($throw);
					$sql = $sql . "`" .$throw . "` varchar(45),";
					$columns = $columns + 1;
				}
			}
			break;	
		}
	}
	$sql = $sql . "primary key (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
	$sql = strip_tags($sql);
	mysqli_query($dbc, $sql)
		or die(mysqli_error($dbc));
	echo "<h2>在数据库中成功建表！</h2>";
	echo "<h3>正在将数据写入表格……</h3>";
	$cells = 0;
	foreach($tr as $row){
		$td = $row->find('td');
		if($cells%$columns == 0){
			$sqld = "insert into trry". $tableid ." values(''";
		}
		foreach($td as $tdrow){
			//echo $tdrow.'<br>';
			$throw = strip_tags($tdrow);
			if($throw != "&nbsp;"){
				//$throw = trim($throw);
				$sqld = $sqld . ",'" . strip_tags($tdrow) . "'";
				$cells = $cells + 1;
				if($cells%$columns == 0){
					$sqld = $sqld . ");";
					$sqld = strip_tags($sqld);
					//echo $sqld.'<br>';
					mysqli_query($dbc, $sqld)
						or die(mysqli_error($dbc));
				}
			}else{
				echo "find &nbsp;";
			}
		}
	}
	echo "<h2>表格填充数据完毕，可返回上一页。</h2>";
	/*$flag = true;
	foreach($tr as $row){
		//echo $row.'<br>';
		
		$th = $row->find('th');
		foreach($th as $throw){
			//echo "Hello";
			$throw = strip_tags($throw);
			if(strip_tags($throw) == " ")
				$sql = $sql . "xixi" . " varchar(45),";
			else
			{
				$throw = trim($throw);
				$sql = $sql . "`" .$throw . "` varchar(45),";
			}	
		}
		if($flag)
		{
			$sql = $sql . "primary key (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
			$sql = strip_tags($sql);
			//echo $sql.'<br>';
			mysqli_query($dbc, $sql)
				or die(mysqli_error($dbc));
			echo "<h1>write to your database successfully!</h1>";
			//$flag == false;
		}
		if($flag == false)
		{
			$td = $row->find('td');
			$sqld = "insert into trry". $tableid ." values(''";
			foreach($td as $tdrow){
				//echo $tdrow.'<br>';
				$sqld = $sqld . ",'" . strip_tags($tdrow) . "'";
			}
			$sqld = $sqld . ");";
			$sqld = strip_tags($sqld);
			//echo $sqld.'<br>';
			mysqli_query($dbc, $sqld)
					or die(mysqli_error($dbc));
		}
		$flag = false;
	}*/
?>
</body>
</html>
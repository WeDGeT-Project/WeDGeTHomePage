<?php	
	$database = null;
	$table = null;
	$id = null;
	if (! empty ( $_GET ['id'] )) {
		$database = $_REQUEST ['database'];
		$table = $_REQUEST ['table'];
		$id = $_REQUEST ['id'];
	}
	
?>
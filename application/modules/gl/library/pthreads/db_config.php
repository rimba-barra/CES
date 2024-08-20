<?php

	require_once dirname(__DIR__) . '../Medoo/Medoo.php';
	// Using Medoo namespace
	use Medoo\Medoo;

	$inipath = dirname(__DIR__) ."../../../main/configs/main.ini";
	$ini_array = parse_ini_file($inipath);

	$database = new Medoo([
		// required
		'database_type' => 'mssql',
		'database_name' => $ini_array['resources.db.params.dbname'],
		'server' => $ini_array['resources.db.params.host'],
		'username' => $ini_array['resources.db.params.username'],
		'password' => $ini_array['resources.db.params.password'],
	]);
	
?>	
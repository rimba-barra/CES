<?php
session_start();
// $check = end(explode('/', $_SERVER['REQUEST_URI']));
$exp = explode('/', $_SERVER['REQUEST_URI']);
$indx = count($exp) > 0 ? count($exp)-1 : 0;
$check = $exp[$indx];
$queryString = explode('&',base64_decode($check));
if(count($queryString) > 1){
	$param = array();
	foreach ($queryString as $key => $value) {
	    list($k,$v) = explode('=',$value);
	    $param[$k] = $v;
	}

	//// settingan add by Erwin.S 20042021
	$uri_path = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME']) . '/');
	$uri_path = parse_url($uri_path, PHP_URL_PATH);
	$uri_path = rtrim($uri_path, '/');

	$search = 'public';
	if(preg_match("/" . $search . "/i", $uri_path) == false){
		$uri_path = $uri_path . '/' . $search;
	}

	// if(isset($_SESSION['Ciputra'])){
	// 	// $link = 'Location: http://'.$_SERVER['HTTP_HOST'].'/webapps/Ciputra/public/'.$param['modules'].$check;

	// 	//// settingan localhost add by Erwin.S 20042021
	// 	$link = 'Location: ' . $uri_path . '/' . $param['modules'] . $check;

	// 	header($link);	
	// }
	// else{
	// 	$_SESSION['Ciputra'] = array("modules" => $param['modules']);
	// 	// $link = 'Location: http://'.$_SERVER['HTTP_HOST'].'/webapps/Ciputra/public/'.$param['modules'].$check;

	// 	//// settingan localhost add by Erwin.S 20042021
	// 	$link = 'Location: ' . $uri_path . '/' . $param['modules'] . $check;

	// 	header($link);	
	// }

	if(!isset($_SESSION['Ciputra'])){
		$_SESSION['Ciputra'] = array("modules" => $param['modules']);
	}

	//// settingan localhost add by Erwin.S 20042021
	$link = 'Location: ' . $uri_path . '/' . $param['modules'] . $check;
	header($link);

	exit;
}

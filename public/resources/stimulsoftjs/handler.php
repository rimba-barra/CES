<?php
set_time_limit(3600);
require_once 'stimulsoft/helper.php';

error_reporting(0);
header("Access-Control-Allow-Origin: *");




$handler = new StiHandler();
$handler->registerErrorHandlers();


/*$handler->onBeginProcessData = function ($event) {
	$database = $event->database;
	$connectionString = $event->connectionString;
	$queryString = $event->queryString;
	return StiResult::success();
};*/

$handler->onBeginProcessData = function ($event) {        
	$database = $event->database;
	//$database = null;
	//$connectionString = $event->connectionString;
	$connectionString = null;
	$queryString = $event->queryString;
	return StiResult::success();
};

$handler->onPrintReport = function ($event) {
	return StiResult::success();
};

$handler->onBeginExportReport = function ($event) {
	$settings = $event->settings;
	$format = $event->format;
	return StiResult::success();
};

$handler->onEndExportReport = function ($event) {
	$format = $event->format; // Export format
	$data = $event->data; // Base64 export data
	$fileName = $event->fileName; // Report file name
	
	//return StiResult::success();
	return StiResult::success("Export OK. Message from server side.");
	//return StiResult::error("Export ERROR. Message from server side.");
};

$handler->onEmailReport = function ($event) {
	$event->settings->from = "******@gmail.com";
	$event->settings->host = "smtp.gmail.com";
	$event->settings->login = "******";
	$event->settings->password = "******";
};

$handler->onDesignReport = function ($event) {
	return StiResult::success();
};

$handler->onCreateReport = function ($event) {
	$fileName = $event->fileName;
	return StiResult::success();
};

$handler->onSaveReport = function ($event) {
	$report = $event->report; // Report object
	$reportJson = $event->reportJson; // Report JSON
	$fileName = $event->fileName; // Report file name
	
	file_put_contents('reports/'.$fileName.".mrt", $reportJson);
	
	//return StiResult::success();
	return StiResult::success("Save Report OK: ".$fileName);
	//return StiResult::error("Save Report ERROR. Message from server side.");
};

$handler->onSaveAsReport = function ($event) {
	return StiResult::success();
};

try{
	$handler->process();
}catch(Exception $e){
	var_dump($e->getMessage());
}

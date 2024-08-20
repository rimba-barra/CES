<?php

header('Content-Type: text/html; charset=utf-8;');
header('Pragma: no-cache');
header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');
header('Expires: '.gmdate('D, d M Y H:i:s').' GMT');

defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));
defined('APPLICATION_ENV') || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

set_include_path(implode(PATH_SEPARATOR, array(realpath(APPLICATION_PATH . '/../library'), get_include_path(), )));

require_once 'Zend/Application.php';


$application = new Zend_Application(APPLICATION_ENV, APPLICATION_PATH . '/modules/main/configs/main.ini');

$application->bootstrap()->run();
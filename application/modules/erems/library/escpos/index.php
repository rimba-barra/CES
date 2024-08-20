<?php

require_once(dirname(__FILE__) . "/Escpos.php");
$connector = new WindowsPrintConnector("Epson Share");
$printer = new Escpos($connector);
$printer -> text("Hello World!\n");
$printer -> cut();
$printer -> close();


?>


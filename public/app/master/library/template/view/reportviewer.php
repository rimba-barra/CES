<!DOCTYPE html>
<?php
$file = $_SERVER['DOCUMENT_ROOT'] . '/cipura/Ciputra/public/';
$urlsource = $_SERVER['DOCUMENT_ROOT'] . '/cipura/Ciputra/public/resources/';
$stimulsoft = $_SERVER['DOCUMENT_ROOT'] . '/cipura/Ciputra/public/resources/stimulsoftv2/';

?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Report Viewer</title>    
         <script type="text/javascript" src="<?php echo $urlsource; ?>jquery/jquery.js"></script>
    </head>
    <body>
        <form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='sample.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">
        </form>
       <iframe name="my-iframe" style="height:100%;width:100%;"></iframe>
    </body>
</html>
<?php
session_start();
if (!isset($_SESSION['Ciputra'], $_SERVER['HTTP_REFERER'])) {
    session_destroy();
    header('location: ../index.php');
    exit;
}

//RELOAD IF LOST SESSION
if(isset($_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'])){
    $db = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'];
}else{
    echo '<script language="javascript">';
    echo 'alert("Session is lost, please reload :( ");';
    echo 'window.top.location.reload();';
    echo '</script>';
    exit;
}
echo "<script>console.log('".$_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase']."');</script>";
$appsid = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['module'];
$appname = 'erems';
$reportfile = $_GET['reportfilelocation'];
require_once 'stimulsoft/helper.php';
?>

<!DOCTYPE html>
<html>
    <head>
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Stimulsoft Reports.PHP - JS Report Viewer</title>

        <!-- Report Office2013 style -->
        <link href="css/stimulsoft.viewer.office2013.whiteteal.css" rel="stylesheet">

        <!-- Stimusloft Reports.JS -->
        <script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>
        <script src="scripts/stimulsoft.viewer.js" type="text/javascript"></script>

        <?php StiHelper::initialize(); ?>
        <script type="text/javascript">
            var options = new Stimulsoft.Viewer.StiViewerOptions();
            options.appearance.fullScreenMode = true;
            options.toolbar.showSendEmailButton = true;

            var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

            // Process SQL data source
            viewer.onBeginProcessData = function (event, callback) {
				event.connectionString = "Server='';Database='';User Id='';Password=''";
				event.connection = "local";
				event.dataSource = "DataSource1";
				var str = event.queryString; 
				var newquerystring = '';
				var n = str.search("exec erems..");
				var m = str.search("exec erems.dbo.");
				if (n<0 && m<0){
					var newquerystring = str.replace("exec ", "exec erems.dbo.");
					event.queryString = newquerystring;
				}
                <?php StiHelper::createHandler(); ?>
            }
			
            viewer.onBeginExportReport = function (args) {
                //args.fileName = "MyReportName";
            }

            // Send exported report to server side
            /*viewer.onEndExportReport = function (event) {
             event.preventDefault = true; // Prevent client default event handler (save the exported report as a file)
                <?php StiHelper::createHandler(); ?>
             }*/

            // Send exported report to Email
            viewer.onEmailReport = function (event) {
                <?php StiHelper::createHandler(); ?>
            }

            // Load and show report
            var report = new Stimulsoft.Report.StiReport();
                report.loadFile("../../app/<?php echo $appname ?>/reportjs/<?php echo $reportfile; ?>?<?php echo rand();?>");
                 <?php foreach ($_POST as $key => $value) { ?>
                        if (report.dictionary.variables.getByName("<?php echo $key; ?>")) {
                            report.dictionary.variables.getByName("<?php echo $key; ?>").valueObject = "<?php echo $value; ?>";
                        }
                    <?php
                }
                ?>
            viewer.report = report;

            /*GET REPORT NAME*/

            var rptAlias = viewer.report.reportAlias;

            if(rptAlias=="Simple List"){
                //force name jangan simple list
                rptAlias = "<?php echo str_replace(".mrt","",$reportfile); ?>" ; 
            }

            <?php

               /*Jika ingin merename file, maka tambakan array report_alias pada controller */
               if(isset($_POST['report_alias'])){
                    echo 'rptAlias = "'.$_POST["report_alias"].'";';
               }

             ?>

            viewer.report.reportName = rptAlias;
            viewer.report.reportAlias = rptAlias;

            /*END REPORT NAME*/

            viewer.renderHtml("viewerContent");
			
			console.log('<?php
				echo $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'];
				?>');
        </script>
    </head>
    <body>
        <div id="viewerContent"></div>
    </body>
</html>

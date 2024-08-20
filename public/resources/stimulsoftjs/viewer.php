<?php
require_once 'stimulsoft/helper.php';
header('Content-Type: text/html; charset=utf-8;');
header('Pragma: no-cache');
header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Expires: ' . gmdate('D, d M Y H:i:s') . ' GMT');

session_start();
if (!isset($_SESSION['Ciputra'], $_SERVER['HTTP_REFERER'])) {
    session_destroy();
    header('location: ../index.php');
    exit;
}

if(!isset($_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']])){
    echo '<script language="javascript">';
    echo 'alert("Session is lost, please reload :( ");';
    echo 'window.top.location.reload();';
    echo '</script>';
    exit;
}

if(!isset($_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'])){
    echo '<script language="javascript">';
    echo 'alert("Session is lost, please reload :( ");';
    echo 'window.top.location.reload();';
    echo '</script>';
    exit;
}

$db = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'];

$appsid = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['module'];
$appname = $_SESSION['Ciputra']['common']['modules'][$appsid]['script'];

$reportfile = $_GET['reportfilelocation'];
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
                 //event.connectionString = "<?php //echo $constring; ?>";
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
            //report.loadFile("reports/SimpleList.mrt");
            //report.loadFile("../../<?php echo $reportfile; ?>");            
            report.loadFile("../../app/<?php echo $appname ?>/reportjs/<?php echo $reportfile; ?>");
            <?php
            foreach ($_POST as $key => $value) {                ?>
    			if(report.dictionary.variables.getByName("<?php echo $key; ?>")){
    				report.dictionary.variables.getByName("<?php echo $key; ?>").valueObject = "<?php echo $value; ?>";
    			}
                <?php
            }
            ?>
           // report.dictionary.variables.getByName("project_id").valueObject = "1";
            //report.dictionary.variables.getByName("pt_id").valueObject = "1";

            viewer.report = report;
            viewer.renderHtml("viewerContent");
        </script>
    </head>
    <body>
        <div id="viewerContent"></div>
    </body>
</html>

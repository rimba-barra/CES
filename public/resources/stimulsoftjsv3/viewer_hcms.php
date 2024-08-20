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
$appname = 'hrd';
$reportfile = $_GET['reportfilelocation'];
require_once 'stimulsoft/helper.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    	<title>HCMS Report</title>

        <!-- Report Office2013 style -->
        <link href="css/stimulsoft.viewer.office2013.whiteteal.css?v3" rel="stylesheet">

        <!-- Stimusloft Reports.JS -->
        <script src="scripts/stimulsoft.reports.js?v3" type="text/javascript"></script>
        <script src="scripts/stimulsoft.viewer.js?v3" type="text/javascript"></script>
        
        
        <script src="scripts/jquery.min.js?v3" type="text/javascript"></script>

        <?php StiHelper::initialize(); ?>
        <?php
//        $options = StiHelper::createOptions();
//        //$options->handler = base_url('assets/stimulsoftjs/handler.php');
//        $options->timeout = 30;
//        StiHelper::initialize($options);
        ?>
        <script type="text/javascript">			
            
		Stimulsoft.Base.StiLicense.loadFromFile("stimulsoft/license.key");
                
		var options = new Stimulsoft.Viewer.StiViewerOptions();
		
		options.appearance.fullScreenMode = true;
		options.toolbar.showSendEmailButton = false;
		options.toolbar.showOpenButton  = false;
		options.toolbar.showSaveButton   = true;
		options.exports.showExportToCsv = false;
		options.exports.showExportToText = false;
		options.exports.showExportToRtf = false;
		options.exports.showExportToWord2007 = false;
		options.exports.showExportToHtml = false;
		options.exports.showExportToHtml5 = false;
		options.exports.showExportToExcel = true;
		options.exports.showExportToExcel2007 = true;
		options.exports.showExportToDocument = false;
		options.exports.showExportToImagePng = true;
                
                
		
		var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
                
		viewer.onBeginProcessData = function (event, callback) {
			<?php StiHelper::createHandler(); ?>
		}
                
		viewer.onBeginExportReport = function (args) {
			//args.fileName = "MyReportName";
		}
				
		viewer.onEmailReport = function (event) {
			<?php StiHelper::createHandler(); ?>
		}
                                
                var report = new Stimulsoft.Report.StiReport();
                report.loadFile("../../app/<?php echo $appname ?>/reportjs/<?php echo $reportfile; ?>?<?php echo rand(); ?>");
                $.ajax({
                        type : 'POST',
                        url: '<?php echo $_SERVER['HTTP_REFERER'].'hrd/common/read' ?>',
                        data: {
                            mode_read: 'report',
                            reportfile: '<?php echo $reportfile; ?>'
                            <?php 
                            $i = 1;
                            foreach ($_POST as $key => $value) {
                                   $key = str_replace('-', '_', $key);
                                   echo PHP_EOL.','.$key.":'".$value."'";
                                   $i++;
                            }
                            ?>
                        },
                        dataType: 'json',
                        success: function(response)
                        {
                                var dataSet = new Stimulsoft.System.Data.DataSet("data"); // nama DataSet harus sama dengan report
                                dataSet.readJson(response);

                                report.dictionary.databases.clear();
                                report.reportName = '<?php echo $reportfile; ?>';
                                report.regData(dataSet.dataSetName, "", dataSet);

                                <?php 
                                foreach ($_POST as $key => $value) { 
                                    ?>
                                       if (report.dictionary.variables.getByName("<?php echo $key; ?>")) {
                                           report.dictionary.variables.getByName("<?php echo $key; ?>").valueObject = "<?php echo $value; ?>";
                                       }
                                    <?php
                                }
                                ?>
                                viewer.report = report;
                                viewer.renderHtml("viewerContent");
                        }
                });
        </script>
    </head>
    <body>
        <div id="viewerContent"></div>
    </body>
</html>

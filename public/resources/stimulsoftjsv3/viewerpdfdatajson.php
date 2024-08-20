<?php
session_start();
if (!isset($_SESSION['Ciputra'], $_SERVER['HTTP_REFERER'])) {
    session_destroy();
    header('location: ../index.php');
    exit;
}
$db = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'];
$appsid = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['module'];
$appname = $_SESSION['Ciputra']['common']['modules'][$appsid]['script'];
$reportfile = $_GET['reportfilelocation'];
require_once 'stimulsoft/helper.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <title>Stimulsoft Reports.PHP - JS Report Viewer</title>   
        <!-- Stimusloft Reports.JS -->
        <script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>

        <?php StiHelper::initialize(); ?>
        <script type="text/javascript">
            // Create a new report instance
            var report = new Stimulsoft.Report.StiReport();
            report.loadFile('reports/SimpleList.mrt');
            //Create new dataSet object
            var dataSet = new Stimulsoft.System.Data.DataSet("Demo");
            //Load Json File
            dataSet.readJsonFile('reports/Demo.json');
            report.dictionary.databases.clear();
            report.regData("Demo", "Demo", dataSet);
            report.render();

            function saveReportPdf() {
                // Create an PDF settings instance. You can change export settings.
                var settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
                // Create an PDF service instance.
                var service = new Stimulsoft.Report.Export.StiPdfExportService();
                // Create a MemoryStream object.
                var stream = new Stimulsoft.System.IO.MemoryStream();
                // Export PDF using MemoryStream.
                service.exportTo(report, stream, settings);

                // Get PDF data from MemoryStream object
                var data = stream.toArray();
                // Get report file name
                var fileName = String.isNullOrEmpty(report.reportAlias) ? report.reportName : report.reportAlias;
                // Save data to file
                Object.saveAs(data, fileName + ".pdf", "application/pdf");
                //this.win.down("#MyReportPanel").up('window').close();
            }

        </script>


    </head>
    <body>
        <div align="center" valign="top"><a href="#" onclick="saveReportPdf()">Download file</a></div>        
        <div id="htmlContainer"></div>
    </body>
</html>

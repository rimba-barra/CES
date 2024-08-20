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
            // Load report from url
            report.loadFile("../../app/<?php echo $appname ?>/reportjs/<?php echo $reportfile; ?>?<?php echo rand(); ?>");
<?php foreach ($_POST as $key => $value) { ?>
                if (report.dictionary.variables.getByName("<?php echo $key; ?>")) {
                    report.dictionary.variables.getByName("<?php echo $key; ?>").valueObject = "<?php echo $value; ?>";
                }
    <?php
}
?>
            report.render();  
            //report.print();
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
            
             setTimeout(function () {
             //alert('test');
             saveReportPdf();
             }, 2000); //1 detik
             


        </script>

        <style>
            .loader {
                border: 16px solid #f3f3f3;
                border-radius: 50%;
                border-top: 16px solid #3498db;
                width: 120px;
                height: 120px;
                margin: 0 auto;
                -webkit-animation: spin 2s linear infinite; /* Safari */
                animation: spin 2s linear infinite;
            }

            /* Safari */
            @-webkit-keyframes spin {
                0% { -webkit-transform: rotate(0deg); }
                100% { -webkit-transform: rotate(360deg); }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            html{
                display: flex;
                flex-flow: row nowrap;  
                justify-content: center;
                align-content: center;
                align-items: center;
                height:100%;
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
       <!-- <div align="center" valign="top"><a href="#" onclick="saveReportPdf()">Download file</a></div> -->        
        <div class="loader"></div>
    </body>
</html>

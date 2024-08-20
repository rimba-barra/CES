<?php
require_once 'resources/stimulsoftv2/stimulsoft/helper.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Report Viewer</title>    
       <!-- <title>Stimulsoft Reports.PHP - JS Report Viewer</title>  -->  

        <?php StiHelper::initialize(); ?>
        <script type="text/javascript">
            var optionsreport, viewerreport;
            optionsreport = new Stimulsoft.Viewer.StiViewerOptions();
            optionsreport.appearance.fullScreenMode = true;
            optionsreport.toolbar.showSendEmailButton = true;

            viewerreport = new Stimulsoft.Viewer.StiViewer(optionsreport, "StiViewer", false);

            // Process SQL data source
            viewerreport.onBeginProcessData = function (event, callback) {
                    <?php StiHelper::createHandler(); ?>
            }

            viewerreport.onBeginExportReport = function (args) {
                //args.fileName = "MyReportName";
            }

            // Send exported report to server side
            /*viewerreport.onEndExportReport = function (event) {
             event.preventDefault = true; // Prevent client default event handler (save the exported report as a file)
              <?php StiHelper::createHandler(); ?>
             }*/

            // Send exported report to Email
            viewerreport.onEmailReport = function (event) {
                <?php StiHelper::createHandler(); ?>
            }

            // Load and show report
            var reportstimulsoft = new Stimulsoft.Report.StiReport();
            reportstimulsoft.loadFile(filestimulsoft);
            viewerreport.report = reportstimulsoft;
            viewerreport.renderHtml("contentforstimulsoft");
        </script>
    </head>
    <body>
        <div id="contentforstimulsoft"></div>
    </body>
</html>

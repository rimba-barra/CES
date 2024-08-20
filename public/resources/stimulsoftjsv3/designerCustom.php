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
$reportfolder = $_GET['reportfolder'];
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
        <link href="css/stimulsoft.designer.office2013.lightgrayteal.css" rel="stylesheet">

        <!-- Stimusloft Reports.JS -->
        <script src="scripts/stimulsoft.reports.js" type="text/javascript"></script>
        <script src="scripts/stimulsoft.viewer.js" type="text/javascript"></script>
        <script src="scripts/stimulsoft.designer.js" type="text/javascript"></script>

        <script src="../jquery/jquery.js" type="text/javascript"></script>

        <?php StiHelper::initialize(); ?>
        <script type="text/javascript">
            var options = new Stimulsoft.Designer.StiDesignerOptions();
			
			Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkow6PnbfwFeqU8Gs03cz54XKaBDes35GFML0AfT7kDRDhh/H" + 
			"PZGhwMfSVfrr+rGm2ZbAbWmKrJCrF3va2X1GIzfqPy63iIwPu2iSVE0Qtu5dODgC4kapkN1E6qwo+Ava1pEtsGQDDA" + 
			"P9Jo6R85A4Qmll4ItJznRDG/yyT16gKgS0ViIL322Mr020tab4nx/Q7jBMlJlCBprfCbkHibm0z49LccXBMkS+ruaQ" + 
			"Zw2hMIueMTiAmLsFnEKV87mEefWgYX5GdRNBi3jel91GjKBuyNui9KKBj2WrOeZK2rrFOSewKufhuVMl7znRFTX/ML" + 
			"mDtjmGqupRRqzBby/11RP3TwWPCfrCMmbqr8JTaTybp4mA1a0PcwgGgEQuet4Fsk7EBC9GHtUUj4UUeI9CkVgWCvfM" + 
			"8WBx1T/CxLs+GQTKGYDqFZ9AEi85QtfuVkWXU6EZ5RcKVG5+Pt6hqTxxCSmXtYO42KV1F64+aTMSSs5PBbv2eVU01S" + 
			"EE8Q7+hTEpmRVZZSRXJWL2fC6nnLixnsfVR5";
            options.appearance.fullScreenMode = true;
            options.toolbar.showPreviewButton = true;
            options.toolbar.showFileMenu = false;
            options.components.showImage = false;
            options.components.showShape = false;
            options.components.showPanel = false;
            options.components.showCheckBox = false;
            options.components.showSubReport = false;
          //  options.showDictionary = false;
            var designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
            // Process SQL data source
            designer.onBeginProcessData = function (event, callback) {
<?php StiHelper::createHandler(); ?>

            }

            designer.onBeginExportReport = function (args) {
                //args.fileName = "MyReportName";
            }

            // Send exported report to server side
            /*viewer.onEndExportReport = function (event) {
             event.preventDefault = true; // Prevent client default event handler (save the exported report as a file)
<?php StiHelper::createHandler(); ?>
             }*/


            designer.onSaveReport = function (e) {
               
                var jsonStr = e.report.saveToJsonString();
                $.ajax({
                    url: "http://localhost:82/public/cashier/mastertemplate/read",
                    type: "post",
                    data: {
                        'template_id' : <?= str_replace('.mrt','',$reportfile); ?>,
                        'json': jsonStr,
                        'module': 'mastertemplate',
                        'mode_read': 'savetemplate'
                    },
                    success: function (response) {
                        alert('Success');
                        // you will get response from your php page (what you echo or print)                 
                        // StiMessageBox.showMessage("Success", "Successfully saving template <?php echo $reportfolder ?>.");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                         alert('Error, Please try again a second.');
                        //x  StiMessageBox.showMessage("Success", "Successfully saving template <?php echo $reportfolder ?>.");
                    }


                });


            }


            // Load and show report
            var report = new Stimulsoft.Report.StiReport();
            report.loadFile("../../app/<?php echo $appname ?>/reportjs_user/<?php echo $reportfile; ?>");
            designer.report = report;
            designer.renderHtml("viewerContent");
            
        
            
        </script>
    </head>
    <body>
        <div id="template_id"></div>
        LOADING...
        <div id="viewerContent"></div>
    </body>


    <!-- JQUERY-->

</html>

<?php
//Erems_Models_App_Controller
class Erems_StpembayaranreportController extends Erems_Box_Models_App_Controller {

    function readAction() {
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       	$ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
        
      //  $app= new Erems_Models_App_Models_ReadReport($this);
            $app= new Erems_Box_Models_App_Models_ReadReport($this);
          $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr){
            case "init":
                $st = Erems_Box_Models_App_Config::getv("SCHEDULETYPE_ID");
                $app->attachParams("kpr",$st["kpr"]);
                $app->attachParams("uangmuka",$st["uangmuka"]);
                $app->doStandartInit();
                break;
            case "cluster":
                $app->getMasterData(new Erems_Models_App_Masterdata_Cluster());
                break;
            case "productcategory":
                //Erems_Models_App_Masterdata_Table_ProductCategory
                $app->getMasterData(new Erems_Models_App_Masterdata_ProductCategory());
              
                break;
        }
         
        $app->run();
    }

    protected function selectedRequestor(\Erems_Box_Kouti_Requestor $requestor) {
        
    }

    /*
    protected function selectedRequestor(Erems_Box_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }
     
     */

}

?>

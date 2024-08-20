<?php

class Erems_TjjtreportController extends Erems_Models_App_Controller {

    function readAction() {
        $app= new Erems_Models_App_Models_ReadWorms($this);
      //$app= new Erems_Models_App_Models_ReadWorms($this,"read_type");
         $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
         $ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
          $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr){
            case "cluster":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Cluster());
                break;
            case "type":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Type());
                break;
            case "productcategory":
                $app->getMasterData(new Erems_Models_App_Masterdata_Table_ProductCategory());
                break;
            case "init":
                $appDao = new Erems_Models_Master_AppDao();
                $pt = new Erems_Models_Master_Pt();
                $project = new Erems_Models_Master_Project();
                $ptInfo = $appDao->getPt($app->getSession()->getPt()->getId());
                $pt->setArrayTable($ptInfo[0][0]);
                $projectInfo = $appDao->getProject($app->getSession()->getProject()->getId());
                $project->setArrayTable($projectInfo[0][0]);
            
                $app->setData(array("pt"=>$pt->getArrayTable(),"project"=>$project->getArrayTable()));
                break;
        }
         
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->customer();
    }

}

?>

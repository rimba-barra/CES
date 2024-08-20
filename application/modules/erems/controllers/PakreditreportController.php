<?php

//class Erems_PakreditreportController extends Erems_Models_App_Controller {
//
//    function readAction() {
//        $app= new Erems_Models_App_Models_ReadReport($this);
//      
//          $mr = $app->getModeRead();
//        $r = $app->getRequest();
//        switch ($mr){
//            case "init":
//               
//                $app->attachParams("kpr",Erems_Models_App_Config::getv("PRICETYPEID_KPR"));
//                $app->doStandartInit();
//                break;
//            case "bank":
//                $app->getMasterData(new Erems_Models_App_Masterdata_Table_Bank());
//                break;
//           
//        }
//         
//        $app->run();
//    }
//
//    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
//        return $requestor->customer();
//    }
//
//}

class Erems_PakreditreportController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
		
		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       	$ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
		
		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();
                $project_id = $this->session->getCurrentProjectId();
                $pt_id = $this->session->getCurrentPtId();
		
		$return['project_name'] = $project_name;
		$return['pt_name'] = $pt_name;
		$return['project_id'] = $project_id;
		$return['pt_id'] = $pt_id;
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }
	
}

?>

<?php

class Erems_OtherspphformController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
		
		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       	$ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
		
		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();
		
		$return['project_name'] = $project_name;
		$return['pt_name'] = $pt_name;
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }


    public function excelRead() {


    	die('tes');



        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $params = $this->getAppData();
      //  $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
        $hasil = FALSE;
        $msg = "";

        $url = FALSE;

        $variables = $this->getAppData();




        /// header info
        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);

        $variables["project"] = $project->getName();
        $variables["pt"] = $pt->getName();
        $variables["print_date"] = date("d-m-Y H:i:s");




        $dao = new Erems_Models_General_ReportDao();
        $sales = $dao->lastprice($projectId, $ptId, $variables["date_bot"], $variables["date_top"]);
        

        $fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
        $fp = fopen($jsonFile, 'w');
        
        
        fwrite($fp, json_encode($sales[0]));
        fclose($fp);
        unset($sales);
        unset($dao);


        // $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
        $jsonExcel = new Erems_Models_Library_JSON2Excel();
        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/ReportLastPriceSales.xlsx';
        $jsonExcel->fieldAwal = "salesman";
        $hasil = $jsonExcel->process($variables, $jsonFile, $excelFile);

        if ($hasil) {
            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
        } else {
            $msg = $jsonExcel->msg;
        }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }
	
}

?>

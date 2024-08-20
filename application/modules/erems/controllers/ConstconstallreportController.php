<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/spout/src/Spout/Autoloader/autoload.php';
use Box\Spout\Reader\ReaderFactory;
use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;
use Box\Spout\Writer\Style\StyleBuilder;
use Box\Spout\Writer\Style\Color;

class Erems_ConstconstallreportController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    /*function readAction() {
		
        ///begin add by tommy 2017-03-09
        $modeRead = $this->getRequest()->getPost('mode_read');
        if ($modeRead == "excel") {

            $projectId = $this->session->getCurrentProjectId();
            $ptId = $this->session->getCurrentPtId();
            $dao = new Erems_Models_General_ReportDao();
            $sales = $dao->constall($projectId,$ptId,$this->getRequest()->getPost('cluster_id'));
            
        
            
            $variables = array();
            $variables["project"] = $this->session->getCurrentProjectName();
            $variables["pt"] = $this->session->getCurrentPtName();
            $variables["print_date"] = date("d-m-Y H:i:s");
            $msg = "PROSES";
            $hasil = FALSE;
            


            $fileName = $projectId . "_" . $ptId . "_" . $this->session->getUserId() . "_" . time();
            $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
            $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
            $fp = fopen($jsonFile, 'w');


            fwrite($fp, json_encode($sales[0]));
            fclose($fp);
            unset($sales);
            unset($dao);


            $jsonExcel = new Erems_Models_Library_JSON2Excel();
            $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/KonstruksiAll.xlsx';
            $jsonExcel->fieldAwal = "purchaseletter_id";
            $hasil = $jsonExcel->process($variables, $jsonFile, $excelFile,10000);

            if ($hasil) {
                $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
                $msg = "SUCCESS";
                $hasil = TRUE;
            } else {
                $msg = $jsonExcel->msg;
            }



            $hasil = array(
                "HASIL" => $hasil,
                "URL"=>$url,
                "MSG"=>$msg);
            echo Zend_Json::encode($hasil);
            $this->_helper->viewRenderer->setNoRender(true);
            return;
        }
        /// /end add


		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       	$ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
		
		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();
		
		$return['project_name'] = $project_name;
		$return['pt_name'] = $pt_name;
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }*/
	
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
	
	function exportAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Constconstallreport();
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
			
		$result = $model->constconstallreportRead($post_data);

		$result = $result['data'];
		
		$user_id = $this->session->getUserId();
		
		$fileResult = 'KonstruksiAll_Report_'.time().'_'.$user_id.'.xlsx';
		$newFilePath = APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/'.$fileResult;

		$style = (new StyleBuilder())
           ->setShouldWrapText(false)
		   ->build();
		
		// ... and a writer to create the new file
		$writer = WriterFactory::create(Type::XLSX);
		
		$writer->openToFile($newFilePath);

		if(count($result) > 0){
			$judul = array();
			foreach($result[0] as $field => $value){
				array_push($judul, $field);
			}
			//$writer->addRow($judul);
			$writer->addRowWithStyle($judul, $style);
			
			
			
			
			foreach($result as $data){
				$isi = array();
				foreach($data as $field => $value){
					// add by tommy
					$value = $field=="payment_percentage"?number_format($value,2):$value;
					// /add by tommy
					array_push($isi, $value);
				}
				//$writer->addRow($isi);
				$writer->addRowWithStyle($isi, $style);
			}
			//$writer->addRows([[1,2,'',3,''], ['', 'A','B','A','B']]);
			
			
			$writer->close();
			
			$url = 'app/erems/downloadfile/msexcel/' . $fileResult;
			
			$result['url'] = $url;
			
			$result['success'] = true;
			
		} else {
			$result['success'] = false;
		}

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
	}
	
}

?>

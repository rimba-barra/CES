<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
class Erems_CashinpaymentreportController extends Zend_Controller_Action {

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
	
	function exportAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Cashinpaymentreport();

		$post_data['purchase_startdate'] = $this->getRequest()->getPost('purchase_startdate');
		$post_data['purchase_enddate'] = $this->getRequest()->getPost('purchase_enddate');
		$post_data['periode_startdate'] = $this->getRequest()->getPost('periode_startdate');
		$post_data['periode_enddate'] = $this->getRequest()->getPost('periode_enddate');
		$post_data['pricetype_id'] = $this->getRequest()->getPost('pricetype_id');
		
		$result = $model->cashinpaymentreportRead($post_data);

		$result = $result['data']['data'];

		// Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();  
		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0);  
		// Initialise the Excel row number 
		$rowCount = 1;  
		$column = 'A';
		
		//echo count($result);
		//exit;
		if(count($result) > 0){
			foreach($result[0] as $field => $value){
				$objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $field);
				$column++;
			}
			
			$rowCount = 2;
			foreach($result as $data){
				$column = 'A';
				foreach($data as $field => $value){
					$objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $value);
					$column++;
				}
				
				$rowCount++;
			}
			
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
			//$fileResult = 'PAYMENTSCHEME_'.str_replace('/', '', $this->purchaseLetterData['purchaseletter_no']).'_'.(time()).'.xlsx';
			$fileResult = 'Cash In Payment Report_'.time().'.xlsx';
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $fileResult);
			$url = 'app/erems/uploads/msexcel/' . $fileResult;
			
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

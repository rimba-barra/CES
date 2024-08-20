<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_MasteruploadlivestockController extends Zend_Controller_Action {

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
	
	function uploadfilesAction() {

		$upload = new Zend_File_Transfer_Adapter_Http();
		
		$files = $upload->getFileInfo('excel_filename');
	
		foreach ($files as $file => $info) 
		{
			$filename = $info['name'];
			if($filename)
			{
				$filetype = explode('.',$filename);
				$fileallowed = array('xls','xlsx','csv','XLS','XLSX','CSV');
				$new_file_name = preg_replace('/[\s]|[^A-Za-z0-9_]/','',$filetype[0]);
				$time = explode('.',microtime());
				$postfix = substr($time[1],0,5);
				$imageName = "LiveStockKoordinat_".$new_file_name."_".$postfix.".".$filetype[1];
				if(!(in_array($filetype[1],$fileallowed)))
				{	
					$msg = 'File type must Excel File';
					$imageName = '';
					$success = false;
				}	
				else 
				{
					$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/erems/uploads/livestockkoordinat/' . $imageName, 'overwrite' => true));
					$success = false;
					$msg = '';
			
					try {
						$upload->receive();
						
						$this->update_unit($imageName);
						
						$success = true;
						$msg = 'success';
					} catch (Zend_File_Transfer_Exception $e) {
						$msg = $e->message();
						$imageName = '';
						$success = false;
					}
				}
			}
		}
		
		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
		$result = array('data' => array(), 'total' => 0, 'success' => $success, 'msg' => $msg, 'imageName' => $imageName);
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
    }
	
	function update_unit($fileName){
		$objPHPExcel = new PHPExcel();  
		
		$inputFileName = APPLICATION_PATH . '/../public/app/erems/uploads/livestockkoordinat/' . $fileName;
		
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel = $objReader->load($inputFileName);
		} catch(Exception $e) {
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
		
		$sheet = $objPHPExcel->getSheet(0); 
		$highestRow = $sheet->getHighestRow(); 
		$highestColumn = $sheet->getHighestColumn();

		//  Loop through each row of the worksheet in turn
		
		$project_id = '';
		$KawasanCode = '';
		$BlockCode = '';
		$Koordinat = '';
		
		for ($row = 1; $row <= $highestRow; $row++){ 
			//  Read a row of data into an array
			$rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
											NULL,
											TRUE,
											FALSE);
			
			if($row > 1){
				$project_id .= $rowData[0][0]."~";
				$KawasanCode .= $rowData[0][1]."~";
				$BlockCode .= $rowData[0][2]."~";
				$Koordinat .= $rowData[0][3]."~";
			}
			//  Insert row data array into your database of choice here
		}
		$post_data['project_id'] = $project_id;
		$post_data['KawasanCode'] = $KawasanCode;
		$post_data['BlockCode'] = $BlockCode;
		$post_data['Koordinat'] = $Koordinat;
		
		$model = new Erems_Models_Masteruploadlivestock();
		$result = $model->masteruploadlivestockUpdate($post_data);
		
	}
	
}

?>

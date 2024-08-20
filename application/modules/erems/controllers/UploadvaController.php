<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
// require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_UploadvaController extends Zend_Controller_Action {

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

		$mode_read = ($this->getRequest()->getPost('mode_read') ? $this->getRequest()->getPost('mode_read') : '');
		if($mode_read == 'excel')
		{
		// var_dump($mode_read); die();
			$return = $this->excelRead($this->getRequest()->getPost('data'));
		}
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }
	
	function uploadfilesAction() {

		$upload = new Zend_File_Transfer_Adapter_Http();
		$bank = ($this->getRequest()->getPost('data') ? $this->getRequest()->getPost('data') : '');
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
				$imageName = "UploadVA_".$new_file_name."_".$postfix.".".$filetype[1];
				if(!(in_array($filetype[1],$fileallowed)))
				{	
					$msg = 'File type must Excel File';
					$imageName = '';
					$success = false;
				}	
				else 
				{
					$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/erems/uploads/uploadva/' . $imageName, 'overwrite' => true));
					$success = false;
					$msg = '';
			
					try {
						$upload->receive();
						$result = $this->update_unit($imageName, $bank);

						$success = $result['success'];
						$msg = $result['success'] == true ? "File Uploaded" : $result['msg'];

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
	
	function update_unit($fileName, $bank){
		require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
		$objPHPExcel = new PHPExcel();  
		
		$inputFileName = APPLICATION_PATH . '/../public/app/erems/uploads/uploadva/' . $fileName;
		
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
		
		$unit_id = '';
		$vitual_account = '';
		
		//  Loop through each row of the worksheet in turn
		for ($row = 1; $row <= $highestRow; $row++){ 
			//  Read a row of data into an array
			$rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
											NULL,
											TRUE,
											FALSE);
			
			if($row > 1){				
				$unit_id .= $rowData[0][1]."~";
				$vitual_account .= str_replace(' ', '', $rowData[0][4])."~";
			}
		}

		$post_data['unit_id'] = $unit_id;
		$post_data['vitual_account'] = $vitual_account;
		$post_data['bank_name'] = $bank;
		$post_data['admin_id'] = $this->session->getUserId();
		
		// var_dump($post_data); die();

		$model = new Erems_Models_Uploadva();
		$result = $model->uploadVAUpdate($post_data);

		// var_dump($result); die();
		return $result;
		
	}
	
	public function excelRead($paramBank) {

        $projectId = $this->session->getCurrentProjectId();
		$ptId = $this->session->getCurrentPtId();

		$hasil = FALSE;
		$msg = "";
		$url = FALSE;
		$model = new Erems_Models_Uploadva();

		$post_data['pt'] = $ptId;
		$post_data['project'] = $projectId;
		$post_data['bankName'] = $paramBank;
        // var_dump($post_data);die();
		$sales = $model->getAllByBank($post_data);

        if($sales['success'] == 'true')
        {
			if(count($sales['data']) > 0)
	        {
		        $fileName = $projectId . "_" . $ptId . "_" . $this->session->getUserId() . "" . time();
		        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
		        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
		        $fp = fopen($jsonFile, 'w');
		        
		        fwrite($fp, json_encode($sales['data']));
		        fclose($fp);
		        unset($sales);
		        unset($model);
				
		        $jsonExcel = new Erems_Models_Library_JSON2Excel();
		        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/UploadVA.xlsx';
		        $jsonExcel->fieldAwal = "uploadva";
		        $hasil = $jsonExcel->process(array(), $jsonFile, $excelFile);

		        if ($hasil) {
		            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
		        } else {
		            $msg = $jsonExcel->msg;
		        }
		    }	        
	    }

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url
        );
        return $arrayRespon;
    }
}

?>

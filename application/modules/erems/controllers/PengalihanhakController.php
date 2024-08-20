<?php

//ini_set("session.save_path", "C:\xampp\tmp");
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_PengalihanhakController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_pengalihanhak = new Erems_Models_Pengalihanhak();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['page'] = $this->getRequest()->getPost('page');

		$post_data['changeownership_id'] = $this->getRequest()->getPost('changeownership_id');
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');

		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
		// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');

		$post_data['changeownershipreason_id'] = $this->getRequest()->getPost('changeownershipreason_id');

		$post_data['changeownership_startdate'] = $this->getRequest()->getPost('changeownership_startdate');
		$post_data['changeownership_enddate'] = $this->getRequest()->getPost('changeownership_enddate');

		$post_data['description'] = $this->getRequest()->getPost('description');

		$post_data['popup_type'] = $this->getRequest()->getPost('popup_type');
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

		if ($post_data['popup_type'] == 'excelpengalihanhak') {
			$result = $this->exportdata($post_data);
		} else if ($post_data['popup_type'] == 'change_reason') {
			$generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$result = $generalConfig->getBiayaPengalihanHakSby($this->getRequest()->getPost('param_person_id'));
		} else if ($post_data['popup_type'] == 'access_bph_sby') {
			$generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$result = $generalConfig->getAccessBiayaPengalihanHakSby($this->getRequest()->getPost('param_person_id'));
		} else if ($read_type_mode == 'uploadKTP') {
			$this->uploadAction();
			return true;
		} else if ($read_type_mode == 'purposebuy') {
			$modelPurp = new Erems_Models_Masterpurposebuy();
			$result = $modelPurp->masterpurposebuyRead($post_data);
		} else {
			$result = $model_pengalihanhak->pengalihanhakRead($post_data);
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model_pengalihanhak = new Erems_Models_Pengalihanhak();
		$result = $model_pengalihanhak->pengalihanhakCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$mode_pengalihanhak = new Erems_Models_Pengalihanhak();
		$result = $mode_pengalihanhak->pengalihanhakUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$mode_pengalihanhak = new Erems_Models_Pengalihanhak();
		$result = $mode_pengalihanhak->pengalihanhakDelete($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function prinoutAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Pengalihanhak();

		$post_data['changeownership_id'] = $this->getRequest()->getPost('id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->pengalihanhakprinoutRead($post_data);
		//$resultdata = $rs['data'][0]; //comment by TB on 2020-08-24
		$resultdata = $rs['data']['data'][0]; //add by TB on 2020-08-24

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			//add by TB on on 2020-08-24
			$data["schedule_list"] = str_replace('\n ', '             ', $data["schedule_list"]);
			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);
			//end add by TB on on 2020-08-24
            $data["kuasa_direksi2"] = str_replace('\n ', '                                                                                                                                       ', $data["kuasa_direksi2"]);
			$p = new Erems_Box_Library_MyWordParser();
			//$fileSrc = 'template_ppjb.docx';
			//$fileSrc = 'sppjbprintout/'.$data["document_name"];
			$fileSrc = 'pengalihanhakprintout/' . $document_name;

			$finalFile = 'PENGALIHAN_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);

			$generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			if ($generalConfig->getFormatFileSPT() == "pdf") {
				$wpdf->convert($p->getUrl());
				$pathUrl = str_replace(".docx", ".pdf", $p->getUrl());
			} else {
				$pathUrl = $p->getUrl();
			}

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function exportdata($param) {
		$model = new Erems_Models_Pengalihanhak();

		$result = $model->exportData($param);

		$resultdata = $result['data'][0];

		$result['success'] = false;

		$data = array();

		// Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();
		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0);
		// Initialise the Excel row number 
		$rowCount = 1;
		$column = 'A';

		if (count($resultdata) > 0) {
//                foreach($resultdata[0] as $field => $value){
//                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $field);
//                        $column++;
//                }

			$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'No');
			$objPHPExcel->getActiveSheet()->setCellValue('B' . $rowCount, 'Change Ownership Date');
			$objPHPExcel->getActiveSheet()->setCellValue('C' . $rowCount, 'Change Ownership Number');
			$objPHPExcel->getActiveSheet()->setCellValue('D' . $rowCount, 'Cluster/kawasan Code');
			$objPHPExcel->getActiveSheet()->setCellValue('E' . $rowCount, 'Cluster/kawasan');
			$objPHPExcel->getActiveSheet()->setCellValue('F' . $rowCount, 'Block Code');
			$objPHPExcel->getActiveSheet()->setCellValue('G' . $rowCount, 'Unit Number');
			$objPHPExcel->getActiveSheet()->setCellValue('H' . $rowCount, 'Purchase Letter Number');
			$objPHPExcel->getActiveSheet()->setCellValue('I' . $rowCount, 'Purchase Letter Date');
//                $objPHPExcel->getActiveSheet()->setCellValue('J'.$rowCount, 'SPPJB Number');
//                $objPHPExcel->getActiveSheet()->setCellValue('K'.$rowCount, 'SPPJB Date');
			$objPHPExcel->getActiveSheet()->setCellValue('J' . $rowCount, 'Seller (Penjual)');
			$objPHPExcel->getActiveSheet()->setCellValue('K' . $rowCount, 'Buyer (Pembeli)');

			$tes = array();
			$rowCount = 2;
			foreach ($resultdata as $rs) {
				$column = 'A';
				$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, $rs['RowNum']);
				$objPHPExcel->getActiveSheet()->setCellValue('B' . $rowCount, $rs['changeownership_date']);
				$objPHPExcel->getActiveSheet()->setCellValue('C' . $rowCount, $rs['changeownership_no']);
				$objPHPExcel->getActiveSheet()->setCellValue('D' . $rowCount, $rs['code']);
				$objPHPExcel->getActiveSheet()->setCellValue('E' . $rowCount, $rs['cluster']);
				$objPHPExcel->getActiveSheet()->setCellValue('F' . $rowCount, $rs['block']);
				$objPHPExcel->getActiveSheet()->setCellValue('G' . $rowCount, $rs['unit_number']);
				$objPHPExcel->getActiveSheet()->setCellValue('H' . $rowCount, $rs['purchaseletter_no']);
				$objPHPExcel->getActiveSheet()->setCellValue('I' . $rowCount, $rs['purchase_date']);
//                        $objPHPExcel->getActiveSheet()->setCellValue('J'.$rowCount, $rs['sppjb_no']);
//                        $objPHPExcel->getActiveSheet()->setCellValue('K'.$rowCount, $rs['sppjb_date']);
				$objPHPExcel->getActiveSheet()->setCellValue('J' . $rowCount, $rs['customer_name_1']);
				$objPHPExcel->getActiveSheet()->setCellValue('K' . $rowCount, $rs['name']);

				$rowCount++;
			}

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
			$fileResult = $param['popup_type'] . '_' . time() . '.xlsx';
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
//                var_dump($objWriter);die();
			$url = 'app/erems/downloadfile/msexcel/' . $fileResult;

			$result['url'] = $url;
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}
		return $result;
	}

	function uploadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$imageUpload = NULL;

		$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customerdocuments/", "documentktp_", "jpg,bmp");
		$imageUpload->run();

		$data = [];
		$msg = "";
		if (!$imageUpload->isSuccess()) {
			$success = FALSE;
			$msg = $imageUpload->getErrorMsg();
		} else {
			$success = TRUE;
			$urlOCR = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->urlOCRKTP();
			$curl = curl_init();
			curl_setopt_array($curl, array(
				CURLOPT_URL => $urlOCR . APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => '',
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 0,
				CURLOPT_FOLLOWLOCATION => true,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => 'GET',
				CURLOPT_SSL_VERIFYPEER => false,
				CURLOPT_HTTPHEADER => array(
					'Content-Type: application/x-www-form-urlencoded'
				),
			));

			$error_msg = "";
			$response = curl_exec($curl);
			if (curl_errno($curl)) {
				$error_msg = curl_error($curl);
			}

			curl_close($curl);

			json_decode($response);
			if (json_last_error() !== JSON_ERROR_NONE) {
				$response = json_encode([0 => ['state' => 'rejected']]);
			}
			$data = [
				'path' => APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
				'imageName' => $imageUpload->getImageName(),
				'hasil' => $response,
				'error_msg' => $error_msg != "" ? "Service OCR Down, silakan hubungi IT Kantor Pusat" : ""
			];
		}

		$result = array('data' => $data, 'msg' => $msg, 'success' => $success);
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
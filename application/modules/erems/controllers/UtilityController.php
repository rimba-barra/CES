<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_UtilityController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_utility = new Erems_Models_Utility();

		//detail UTILITY
		$post_data['is_detail'] = $this->getRequest()->getPost('is_detail');
		if ($post_data['is_detail'] == 'yes') {
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['temp_utility_id'] = $this->getRequest()->getPost('temp_utility_id');

			$result = $model_utility->utilitydetailRead($post_data);
		} else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
			// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
			// $post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');

			$result = $model_utility->utilityRead($post_data);
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {



		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model_utility = new Erems_Models_Utility();
		$result = $model_utility->utilityCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$mode_utility = new Erems_Models_Utility();
		$result = $mode_utility->utilityUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$mode_utility = new Erems_Models_Utility();
		$result = $mode_utility->utilityDelete($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function uploadfilesAction() {
//		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
//		$result = array('data' => array(), 'total' => 0, 'success' => true, 'msg' => 'aaa', 'imageName' => 'aaa1212');
//		echo Zend_Json::encode($result);
//		$this->_helper->viewRenderer->setNoRender(true);
//		die;
		$upload = new Zend_File_Transfer_Adapter_Http();
		$upload->receive();

		$files = $upload->getFileInfo('excel_filename');

		foreach ($files as $file => $info) {
			$fileName = $info['name'];
			if ($fileName) {
				$filetype = explode('.', $fileName);
				$fileallowed = array('xls', 'xlsx', 'csv', 'XLS', 'XLSX', 'CSV');
				$new_file_name = preg_replace('/[\s]|[^A-Za-z0-9_]/', '', $filetype[0]);
				$time = explode('.', microtime());
				$postfix = substr($time[1], 0, 5);
				if (!(in_array($filetype[1], $fileallowed))) {
					$msg = 'File type must Excel File';
					$success = false;
				} else {
					$objPHPExcel = new PHPExcel();
					$file = $upload->getFileName('excel_filename'); //

					$load = PHPExcel_IOFactory::load($file);
					$sheets = $load->getActiveSheet()->toArray(null, true, true, true);
//					$sheets = $load->getActiveSheet()->toArray(null, true, true, false);
					$i = 1;
					$result = '';
					$msg = "";
					$randKey = "Upload" . rand();
					foreach ($sheets as $sheet) {
						if ($i > 1) {
							$model_utility = new Erems_Models_Utility();
							$checkId = $model_utility->utilityCheckId($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $sheet['A'], $sheet['B'], $sheet['C'], $sheet['I']);
							if (
									$checkId['data'][0]['clusterId'] == "" ||
									$checkId['data'][0]['statusUtilitasId'] == "" ||
									$checkId['data'][0]['tipeUtilitasId'] == "" ||
									$checkId['data'][0]['PLId'] == "" ||
									$checkId['data'][0]['unitId'] == "") {
								if ($msg != "") {
									$msg .= ", ";
								}
								$msg .= $i;
							} else {
								$param = [
									'is_detail' => 'yes',
									'unit_id' => $checkId['data'][0]['unitId'],
									'utilitytype_id' => $checkId['data'][0]['tipeUtilitasId'],
									'utilitystatus_id' => $checkId['data'][0]['statusUtilitasId'],
									'purchaseletter_id' => $checkId['data'][0]['PLId'],
									'power' => $sheet['G'],
									'request_date' => $sheet['F'],
									'installment_date' => $sheet['H'],
									'followup_date' => $sheet['J'],
									'installment_no' => $sheet['D'],
									'meter_no' => $sheet['E'],
									'note' => $sheet['K'],
									'temp_utility_id' => $randKey,
								];
								$result = $model_utility->utilityCreate($param);
							}
						}
						$i++;
					}
				}
			}
		}
		$success = true;
		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
		$result = array('total' => 0, 'success' => $success, 'msg' => $msg);
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
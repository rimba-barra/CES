<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_ReportproyeksilrpController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

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

		$model = new Erems_Models_Reportproyeksilrp();

		$post_data['period_cut_off'] = $this->getRequest()->getPost('period_cut_off');
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$result = $model->reportproyeksilrpRead($post_data);
		$result = $result['data']['data'];

		// Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();
		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0);
		// Initialise the Excel row number 
		$rowCount = 1;
		$column = 'A';
		$arrColumnSum = [];
		$fieldCustomerName = false;

		if (count($result) > 0) {
			foreach ($result[0] as $field => $value) {
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ucwords(str_replace("_", " ", $field)));
				if ((in_array($field, ['harga_netto', 'harga_total_jual', 'floor_size', 'building_size', 'land_size']) || $fieldCustomerName == true) && trim($field) != 'persen_payment') {
					$arrColumnSum[] = $column;
				}

				if ($field == 'customer_name') {
					$fieldCustomerName = true;
				}
				$column++;
			}

			$rowCount = 2;
			foreach ($result as $data) {
				$column = 'A';
				foreach ($data as $field => $value) {
					$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);
					$column++;
				}

				$rowCount++;
			}

			$highestColumm = $objPHPExcel->setActiveSheetIndex(0)->getHighestColumn();
			$objPHPExcel->getActiveSheet()->getStyle('A1' . ':' . $highestColumm . '1')->applyFromArray(['font' => ['bold' => true]]);
			// var_dump($highestColumm);

			$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'TOTAL');
			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $highestColumm . $rowCount)->applyFromArray(['font' => ['bold' => true]]);
			foreach ($arrColumnSum AS $colSum) {
				$objPHPExcel->getActiveSheet()->setCellValue($colSum . $rowCount, '=SUM(' . $colSum . '2:' . $colSum . ($rowCount - 1) . ')');
			}

			for ($column = 'A'; $column != $highestColumm; $column++) {

				$cellValue = $objPHPExcel->setActiveSheetIndex(0)->getCell($column . 1)->getValue();
				// var_dump($cellValue . "  " . $column);
				if ($cellValue == "PurchaseletterID" || $cellValue == "ID" || $cellValue == "purchaseletter_id") {
					// var_dump("deleted" . "  " . $cellValue . "  " . $column);
					$objPHPExcel->getActiveSheet()->removeColumn($column);
				}
			}
			// die();

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

			// $fileResult = 'Penerimaan Collection Report_' . time() . '.xlsx';
			$fileResult = 'Proyeksi LRP Report_' . time() . '.xlsx';
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

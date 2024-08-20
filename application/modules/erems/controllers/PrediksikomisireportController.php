<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_PrediksikomisireportController extends Zend_Controller_Action {

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

		$model = new Erems_Models_Prediksikomisireport();

		$post_data['period_cut_off'] = $this->getRequest()->getPost('period_cut_off');
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$result = $model->prediksikomisireportRead($post_data);
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

		/// added by rico 28092022
		$col_date    = array('firstpurchase_date', 'purchase_date');
		$col_decimal = array('harga_tanah','harga_bangunan','harga_netto','year_2019','year_2020','year_2021');
		/// added by rico 30092022
		$col_string  = array('No','firstpurchase_date', 'purchase_date','pricetype','sales','customer_name','purchaseletter_no','cluster','unit_number','customer_name');

		if (count($result) > 0) {
			foreach ($result[0] as $field => $value) {
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ucwords(str_replace("_", " ", $field)));
				if (!in_array($field, $col_string)) {
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
					/// Add by Erwin.S 15042021
					if(!empty($value)){
						if(in_array($field, $col_date)){
							$value = date("d/m/Y", strtotime($value));	
						}
					}
					$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);
					// added by rico 03102022
					$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->getNumberFormat()->setFormatCode('###,###,###'); 
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
				// added by rico 03102022
				$objPHPExcel->getActiveSheet()->getStyle($colSum . $rowCount)->getNumberFormat()->setFormatCode('###,###,###'); 
			}
			
			// added by rico 30092022
			$column = 'A';
			while ($column != $highestColumm) {
				$cellValue = $objPHPExcel->setActiveSheetIndex(0)->getCell($column . 1)->getValue();
				// var_dump($cellValue . "  " . $column);
				if ($cellValue == "PurchaseletterID" || $cellValue == "ID" || $cellValue == "purchaseletter_id") {
					// var_dump("deleted" . "  " . $cellValue . "  " . $column);
					$objPHPExcel->getActiveSheet()->removeColumn($column);
				}else{
					$column++;
				}
			}

			// for ($column = 'A'; $column != $highestColumm; $column++) {
			// 	$cellValue = $objPHPExcel->setActiveSheetIndex(0)->getCell($column . 1)->getValue();
			// 	// var_dump($cellValue . "  " . $column);
			// 	if ($cellValue == "PurchaseletterID" || $cellValue == "ID" || $cellValue == "purchaseletter_id") {
			// 		// var_dump("deleted" . "  " . $cellValue . "  " . $column);
			// 		$objPHPExcel->getActiveSheet()->removeColumn($column);
			// 	}
			// }
			// die();

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

			$fileResult = 'Prediksi Komisi Report_' . time() . '.xlsx';
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

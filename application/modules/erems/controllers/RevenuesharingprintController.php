<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_RevenuesharingprintController extends Zend_Controller_Action {

	function init() {
		date_default_timezone_set('Asia/Jakarta');
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Revenuesharingprint();
		if ($this->getRequest()->getPost('mode_read') == 'export_excel') {
			$result = $this->exportdata($this->getRequest()->getPost());
		} else {
			$result = $model->revenuesharingprintRead($this->getRequest()->getPost());
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function exportdata($param) {
		$model = new Erems_Models_Revenuesharingprint();

		$result['success'] = false;

		$data = array();

		// Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();

		$styleArrayBg = array(
			'fill' => array(
				'type' => PHPExcel_Style_Fill::FILL_SOLID,
				'color' => array('rgb' => 'D9D9D9')
			),
			'font' => array(
				'bold' => true
			)
		);

		$styleArrayTitle = array(
			'font' => array(
				'bold' => true,
				'size' => 14
			)
		);

		$styleArrayBorderThin = array(
			'borders' => array(
				'allborders' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		);

		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A1', 'CIPUTRA GROUP')
				->setCellValue('A2', $this->session->getCurrentPtName())
				->setCellValue('A3', 'PRINT DETAIL RS')
				->setCellValue('A4', 'PROYEK: ' . $this->session->getCurrentProjectName())
				->setCellValue('A5', 'TANGGAL CETAK: ' . date("d F Y h:i:s"))
				->setTitle('Print Detail RS'); // sheet name

		$objPHPExcel->getActiveSheet()->getStyle('A1:A5')->applyFromArray($styleArrayTitle);

		//============== sheet 1 =============//
		$param['page'] = 1;
		$param['limit'] = 10000000;
		$result = $model->revenuesharingprintRead($param);
		$arrTitle = [
			'No', 'Cluster Code', 'Unit Number', 'Type', 'Land Size', 'Building Size', 'Purchase Date', 'Customer Name',
			'Harga Netto', 'Harga Total Jual', 'Tanggal Proses', 'Penerimaan', 'RS-Partner DPP', 'RS-Partner PPN', 'RS-Partner PPH', 'RS-Ciputra DPP', 'RS-Ciputra PPN', 'RS-Ciputra PPH'
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A8');
		$objPHPExcel->getActiveSheet()->getStyle('A8:R8')->applyFromArray($styleArrayBg);
		foreach ($result['data'] as $key => $val) {
			$arrData[] = [
				$val['RowNum'],
				$val['cluster_code'],
				$val['unit_number'],
				$val['type_name'],
				$val['land_size'],
				$val['building_size'],
				date('d-m-Y',strtotime($val['purchase_date'])),
				$val['customer_name'],
				$val['harga_netto'],
				$val['harga_total_jual'],
				date('d-m-Y',strtotime($val['process_date'])),
				$val['payment'],
				$val['rs_total_partner_dpp'],
				$val['rs_total_partner_ppn'],
				$val['rs_total_partner_pph'],
				$val['rs_total_ciputra_dpp'],
				$val['rs_total_ciputra_ppn'],
				$val['rs_total_ciputra_pph']
			];
		}
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A9');
//			
//		$arrFooter = [
//			'TOTAL',
//			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
//			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
//			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
//			'=SUM(E' . $startRow . ':E' . ($rowCount - 1) . ')',
//		];
//		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
//		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':E' . $rowCount)->applyFromArray($styleArrayBg);

		foreach (range('B', 'Z') as $columnID) {
//			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setWidth(21);
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

		$fileResult = 'RevenueSharingPrint_' . time() . '.xlsx';
		$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
		$url = 'app/erems/downloadfile/msexcel/' . $fileResult;

		$result['url'] = $url;

		if ($url) {
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}

		return $result;
	}

}

?>
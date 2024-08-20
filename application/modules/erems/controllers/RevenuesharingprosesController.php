<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

//require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_RevenuesharingprosesController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

		$model = new Erems_Models_Revenuesharingproses();

		if ($read_type_mode == 'export_excel') {
			$post_data['doc_no'] = $this->getRequest()->getPost('doc_no');
			$post_data['proses_date'] = $this->getRequest()->getPost('proses_date');

			$result = $this->exportdata($post_data);
		} else if ($read_type_mode == 'print_out') {
			$post_data['revenuesharing_id'] = $this->getRequest()->getPost('revenuesharing_id');
			$post_data['process_date'] = $this->getRequest()->getPost('process_date');
			$post_data['rg_print'] = $this->getRequest()->getPost('rg_print');
			if ($this->getRequest()->getPost('rg_print') == "rekap_rs") {
				$result = $this->exportdatarekaprs($post_data);
			} else {
				$result = $this->printout($post_data);
			}
		} else if ($read_type_mode == 'th_revenuesharing') {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$result = $model->dataprosesdateRead($post_data);
		} else if ($read_type_mode == 'deleteRS') {
			$userDeleteRS = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getUserDeleteRS();
			$result['deleteRS'] = in_array($this->session->getUserId(), $userDeleteRS) ? 1 : 0;
		} else if ($read_type_mode == 'td_revenuesharing_detail') {
			$post_data['revenuesharing_id'] = $this->getRequest()->getPost('revenuesharing_id');
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$result = $model->dataprosesdetailRead($post_data);
		} else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');

			$result = $model->dataRead($post_data);
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$post_data['payment_flag'] = $genco->getPaymentFlagProsesRS();

		$model = new Erems_Models_Revenuesharingproses();
		$result = $model->dataCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	public function exportdata() {
		/// header info
		$variables["project"] = $this->session->getCurrentProjectName();
		$variables["pt"] = $this->session->getCurrentPtName();
		$variables["pre_process_date"] = date("d-m-Y H:i:s", strtotime($this->getRequest()->getPost('process_date')));
		$variables["doc_no"] = $this->getRequest()->getPost('doc_no');
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

		$model = new Erems_Models_Revenuesharingproses();
		$param = [
			'doc_no' => $this->getRequest()->getPost('doc_no'),
			'process_date' => $this->getRequest()->getPost('process_date'),
			'payment_flag' => $genco->getPaymentFlagProsesRS()
		];
		$result = $model->exportData($param);
//		print_r($result[0]);
		$fileName = $this->session->getCurrentProjectId() . "_" . $this->session->getCurrentPtId() . "_" . $this->session->getUserId() . "" . time();
		$jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
		$excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
		$fp = fopen($jsonFile, 'w');

		fwrite($fp, json_encode($result[0]));
		fclose($fp);
		unset($result);
//
//		 $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
		$jsonExcel = new Erems_Models_Library_JSON2Excel();
		$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/RevenueSharingProsesNew.xlsx';
		$jsonExcel->fieldAwal = "unit_number";
		$hasil = $jsonExcel->process($variables, $jsonFile, $excelFile, 1, 'allBorder');

		if ($hasil) {
			$url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
		} else {
			$msg = $jsonExcel->msg;
		}

		$result['url'] = $url;

		if ($url) {
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	public function printout($post_data) {
		/// header info
		$variables["project"] = $this->session->getCurrentProjectName();
		$variables["pt"] = $this->session->getCurrentPtName();
		$variables["tgl_proses"] = date("d-m-Y", strtotime($post_data['process_date']));
		$model = new Erems_Models_Revenuesharingproses();
		$param = [
			'revenuesharing_id' => $post_data['revenuesharing_id'],
			'rg_print' => $post_data['rg_print']
		];
		$result = $model->printOut($param);
		$totalData = count($result[0]);
		$fileName = $this->session->getCurrentProjectId() . "_" . $this->session->getCurrentPtId() . "_" . $this->session->getUserId() . "" . time();
		$jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
		$excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
		$fp = fopen($jsonFile, 'w');

		fwrite($fp, json_encode($result[0]));
		fclose($fp);
		unset($result);
//
//		 $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
		$jsonExcel = new Erems_Models_Library_JSON2Excel();
		if ($post_data['rg_print'] == "detail_rs") {
			$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/RevenueSharingDetailRS.xlsx';
			$jsonExcel->fieldAwal = "RowNum";
			$firstRow = 6;
			$columnSumStart[] = ['O', 'AG'];
			$columnSumStart[] = ['AI', 'AK'];
			$columnSumStart[] = ['AM', 'AO'];
			$columnSumStart[] = ['AS', 'BX'];
		} else if ($post_data['rg_print'] == "detail_terjual") {
			$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/RevenueSharingDetailTerjual.xlsx';
			$jsonExcel->fieldAwal = "RowNum";
			$firstRow = 5;
			$columnSumStart[] = ['O', 'AA'];
			$columnSumStart[] = ['AE', 'AK'];
		} else if ($post_data['rg_print'] == "rekap_terjual") {
			$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/RevenueSharingRekapTerjual.xlsx';
			$jsonExcel->fieldAwal = "RowNum";
			$firstRow = 5;
			$columnSumStart[] = ['D', 'AF'];
		}
		$hasil = $jsonExcel->process($variables, $jsonFile, $excelFile, 1, 'allBorder');

		if ($hasil) {
			$url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
			$objReader = PHPExcel_IOFactory::createReader("Excel2007");
			$objPHPExcel = $objReader->load($url);
			$highestRow = $firstRow + $totalData;
//			$highestRow++;
			$objPHPExcel->getActiveSheet()->setCellValue('B' . $highestRow, "TOTAL");
			foreach ($columnSumStart as $key => $valCol) {
				for ($colSum = $valCol[0]; $colSum != $valCol[1]; $colSum++) {
					$cell = $objPHPExcel->getActiveSheet()->getCell($colSum . $highestRow)->getValue();
					$objPHPExcel->getActiveSheet()->setCellValue($colSum . $highestRow, "=SUM(" . $colSum . $firstRow . ":" . $colSum . ($highestRow - 1) . ")");
				}
			}
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, "Excel2007");
			$objWriter->save($url);
		} else {
			$msg = $jsonExcel->msg;
		}

		$result['url'] = $url;

		if ($url) {
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Revenuesharingproses();
		$result = $model->RSDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function exportdatarekaprs($param) {
		$model = new Erems_Models_Revenuesharingproses();

		$result['success'] = false;

		$data = array();

		// Instantiate a new PHPExcel object 
		require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
		$objPHPExcel = new PHPExcel();

		$styleHeaderFooterArray = array(
			'fill' => array(
				'type' => PHPExcel_Style_Fill::FILL_SOLID,
				'color' => array('rgb' => 'FFF2CC')
			),
			'font' => array(
				'bold' => true
			),
			'borders' => array(
				'allborders' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		);

		$styleBorderArray = array(
			'borders' => array(
				'left' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				),
				'right' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		);

		$styleArrayTitle = array(
			'font' => array(
				'bold' => true,
				'size' => 14
			)
		);

//		$styleArrayTotal = array(
//			'font' => array(
//				'bold' => true
//			)
//		);

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
				->setCellValue('A3', 'REKAPITULASI TRANSAKSI')
				->setCellValue('A4', 'PROYEK: ' . $this->session->getCurrentProjectName())
				->setCellValue('A5', 'CUT OFF DATE: ' . date("d F Y", strtotime($param['process_date'])))
				->setTitle('Rekap RS'); // sheet name

		$objPHPExcel->getActiveSheet()->getStyle('A1:A5')->applyFromArray($styleArrayTitle);

		//============== sheet 1 =============//
		$result = $model->printOut($param);
		$rs_sebelum_recheck = $result[1][0]['rs_payment_before'];
		$jarakRow = 3;

		## SALES REPORT ##
		$arrTitle = ['SALES REPORT', 'Netto', 'PPN', 'ADM (AJB+BBN)', 'TOTAL SALES'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A8');
		$objPHPExcel->getActiveSheet()->getStyle('A8:E8')->applyFromArray($styleHeaderFooterArray);
		$startRow = 9;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [
				$value['cluster'],
				$value['harga_netto'],
				$value['ppn'],
				$value['adm_ajb_bbn'],
				$value['total_sales'],
			];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount);
			$rowCount++;
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('E' . $startRow . ':E' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
			'=SUM(E' . $startRow . ':E' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':E' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## COLLECTION REPORT ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['COLLECTION REPORT', 'Target A/R', 'Realisasi', 'Variance'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [
				$value['cluster'],
				$value['target_ar'],
				$value['realisasi'],
				$value['variance']
			];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount);
			$rowCount++;
		}
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## REVENUE SHARING REPORT ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['REVENUE SHARING REPORT'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $startRow . ':D' . $startRow);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster']];
			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount)->applyFromArray(['font' => array('bold' => true)]);
			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
			$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':D' . $rowCount);
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

			$arrData = [
				'Collection Per tanggal ' . date("d-m-Y", strtotime($param['process_date'])) . ' (minus adm & komisi)',
				'',
				($value['rs_payment'] + $value['rs_payment_before'])
			];
			$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

			$arrData = [
				'Telah diperhitungkan pada revenue sharing sebelumnya',
				'',
				$value['rs_payment_before']
			];
			$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

			$arrData = [
				'Sisa perhitungan (minus adm & komisi)',
				'',
				'',
				$value['rs_payment'],
//				$value['sisa_perhitungan']
			];
			$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL DASAR PERHITUNGAN REVENUE SHARING ' . date("d-m-Y", strtotime($param['process_date'])),
			'',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## PEMBAGIAN KOMPOSISI ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['PEMBAGIAN KOMPOSISI', 'Komposisi Tanah', 'Komposisi Bangunan', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['komposisi_tanah'], $value['komposisi_bangunan'], $value['total_komposisi']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## KOMPOSISI TANAH ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['KOMPOSISI TANAH', 'Partner', 'Ciputra', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['komposisi_tanah_partner'], $value['komposisi_tanah_ciputra'], $value['total_komposisi_tanah']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## KOMPOSISI BANGUNAN ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['KOMPOSISI BANGUNAN', 'Partner', 'Ciputra', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['komposisi_bangunan_partner'], $value['komposisi_bangunan_ciputra'], $value['total_komposisi_bangunan']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## TOTAL REVENUE ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['TOTAL REVENUE', 'Partner', 'Ciputra', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray(['fill' => ['type' => PHPExcel_Style_Fill::FILL_SOLID, 'color' => ['rgb' => 'D9D9D9']], 'font' => ['bold' => true], 'borders' => ['allborders' => ['style' => PHPExcel_Style_Border::BORDER_THIN]]]);
		$startRow++;
		$rowCount = $startRow;
		$rsTotalPartnerDpp = 0;
		$rsTotalPartnerPpn = 0;
		$totalRevenuePartner = 0;
		foreach ($result[0] as $key => $value) {
			$rsTotalPartnerDpp += $value['rs_total_partner'];
			$rsTotalPartnerPpn += $value['rs_total_ciputra'];
			$totalRevenuePartner += $value['rs_total'];
		}
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrData = ['', $rsTotalPartnerDpp, $rsTotalPartnerPpn, $totalRevenuePartner];
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

		$startRow = $rowCount + ($jarakRow - 1);
		$arrTitle = ['REVENUE PARTNER'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow)->applyFromArray([
			'font' => array('bold' => true),
			'borders' => array(
				'allborders' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		]);
		$startRow++;

		## REVENUE PARTNER ATAS TANAH ##
		$arrTitle = ['1. Revenue Atas Tanah', 'Tanah', 'Ppn Tanah', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['rs_tanah_partner_dpp'], $value['rs_tanah_partner_ppn'], $value['total_revenue_partner_tanah']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## REVENUE PARTNER ATAS BANGUNAN ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['2. Revenue Atas Bangunan', 'Bangunan', 'Ppn Bangunan', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['rs_bangunan_partner_dpp'], $value['rs_bangunan_partner_ppn'], $value['total_revenue_partner_bangunan']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## TOTAL REVENUE PARTNER ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['TOTAL REVENUE PARTNER', 'Tanah & Bangunan', 'Ppn (Tanah+bangunan)', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray(['fill' => ['type' => PHPExcel_Style_Fill::FILL_SOLID, 'color' => ['rgb' => 'D9D9D9']], 'font' => ['bold' => true], 'borders' => ['allborders' => ['style' => PHPExcel_Style_Border::BORDER_THIN]]]);
		$startRow++;
		$rowCount = $startRow;
		$rsTotalPartnerDpp = 0;
		$rsTotalPartnerPpn = 0;
		$totalRevenuePartner = 0;
		$rsTotalPartnerPph = 0;
		foreach ($result[0] as $key => $value) {
			$rsTotalPartnerDpp += $value['rs_total_partner_dpp'];
			$rsTotalPartnerPpn += $value['rs_total_partner_ppn'];
			$totalRevenuePartner += $value['total_revenue_partner'];
			$rsTotalPartnerPph += $value['rs_total_partner_pph'];
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrData = ['', $rsTotalPartnerDpp, $rsTotalPartnerPpn, $totalRevenuePartner];
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		$arrData = ['PPH Final yang harus dikeluarkan', '', '', $rsTotalPartnerPph];
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray([
			'font' => array('bold' => true),
			'borders' => array(
				'allborders' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		]);
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

		$startRow = $rowCount + ($jarakRow - 1);
		$arrTitle = ['REVENUE CIPUTRA'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow)->applyFromArray(['font' => array('bold' => true)]);
		$startRow++;

		## REVENUE CIPUTRA ATAS TANAH ##
		$arrTitle = ['1. Revenue Atas Tanah', 'Tanah', 'Ppn Tanah', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['rs_tanah_ciputra_dpp'], $value['rs_tanah_ciputra_ppn'], $value['total_revenue_ciputra_tanah']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## REVENUE CIPUTRA ATAS BANGUNAN ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['2. Revenue Atas Bangunan', 'Bangunan', 'Ppn Bangunan', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['rs_bangunan_ciputra_dpp'], $value['rs_bangunan_ciputra_ppn'], $value['total_revenue_ciputra_bangunan']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## TOTAL REVENUE CIPUTRA ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['TOTAL REVENUE CIPUTRA', 'Tanah & Bangunan', 'Ppn (Tanah+bangunan)', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray(['fill' => ['type' => PHPExcel_Style_Fill::FILL_SOLID, 'color' => ['rgb' => 'D9D9D9']], 'font' => ['bold' => true], 'borders' => ['allborders' => ['style' => PHPExcel_Style_Border::BORDER_THIN]]]);
		$startRow++;
		$rowCount = $startRow;
		$rsTotalPartnerDpp = 0;
		$rsTotalPartnerPpn = 0;
		$totalRevenuePartner = 0;
		$rsTotalPartnerPph = 0;
		foreach ($result[0] as $key => $value) {
			$rsTotalPartnerDpp += $value['rs_total_ciputra_dpp'];
			$rsTotalPartnerPpn += $value['rs_total_ciputra_ppn'];
			$totalRevenuePartner += $value['total_revenue_ciputra'];
			$rsTotalPartnerPph += $value['rs_total_ciputra_pph'];
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrData = ['', $rsTotalPartnerDpp, $rsTotalPartnerPpn, $totalRevenuePartner];
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		$arrData = ['PPH Final yang harus dikeluarkan', '', '', $rsTotalPartnerPph];
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray([
			'font' => array('bold' => true),
			'borders' => array(
				'allborders' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		]);
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

		## CADANGAN KOMISI ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['CADANGAN KOMISI', 'Komisi Marketing', 'Ppn Komisi Marketing', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['komisi_marketing_value'], $value['komisi_marketing_ppn'], $value['total_komisi_cadangan']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## CADANGAN BIAYA LEGAL ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['CADANGAN BIAYA LEGAL', 'BPHTB', 'AJB+BBN', ' Total'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':D' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;
		foreach ($result[0] as $key => $value) {
			$arrData = [$value['cluster'], $value['harga_bphtb'], $value['ajb_bbn'], $value['total_cadangan_biaya_legal']];
			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('D' . $startRow . ':D' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'=SUM(B' . $startRow . ':B' . ($rowCount - 1) . ')',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')',
			'=SUM(D' . $startRow . ':D' . ($rowCount - 1) . ')',
		];
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':D' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## RECHECK ##
		$startRow = $rowCount + $jarakRow;
		$arrTitle = ['RECHECK'];
		$objPHPExcel->getActiveSheet()->fromArray($arrTitle, '', 'A' . $startRow);
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $startRow . ':B' . $startRow);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':C' . $startRow)->applyFromArray($styleHeaderFooterArray);
		$startRow++;
		$rowCount = $startRow;

		$arrData = ['Revenue Sharing Sebelumnya', ''];
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		$arrData = ['Cadangan Komisi Marketing + Biaya Admin Sebelumnya', ''];
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		$arrData = ['Revenue Sharing Per ' . date("d-m-Y", strtotime($param['process_date'])), ''];
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':C' . $rowCount)->applyFromArray(['font' => array('bold' => true)]);
		$arrData = ['Cadangan Komisi Marketing + Biaya Admin', ''];
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
		$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);

		$rs_payment_before_recheck = 0;
		$cadangan_komisi_marketing_biaya_admin_sebelumnya = 0;
		$rs_payment_recheck = 0;
		$cadangan_komisi_marketing_biaya_admin = 0;

		foreach ($result[0] as $key => $value) {
			$rs_payment_before_recheck += $value['rs_payment_before_recheck'];
			$cadangan_komisi_marketing_biaya_admin_sebelumnya += $value['cadangan_komisi_marketing_biaya_admin_sebelumnya'];
			$rs_payment_recheck += $value['rs_payment_recheck'];
			$cadangan_komisi_marketing_biaya_admin += $value['cadangan_komisi_marketing_biaya_admin'];

			$arrData = [$value['cluster'] . ' yang belum diperhitungkan', '', $value['belum_diperhitungkan']];
//			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount++);
		}

		$objPHPExcel->getActiveSheet()->setCellValue('C' . $startRow, $rs_sebelum_recheck);
//		$objPHPExcel->getActiveSheet()->setCellValue('C' . $startRow, $rs_payment_before_recheck);
		$objPHPExcel->getActiveSheet()->setCellValue('C' . ($startRow + 1), $cadangan_komisi_marketing_biaya_admin_sebelumnya);
		$objPHPExcel->getActiveSheet()->setCellValue('C' . ($startRow + 2), $rs_payment_recheck);
		$objPHPExcel->getActiveSheet()->setCellValue('C' . ($startRow + 3), $cadangan_komisi_marketing_biaya_admin);

		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $startRow . ':A' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('B' . $startRow . ':B' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$objPHPExcel->getActiveSheet()->getStyle('C' . $startRow . ':C' . $rowCount)->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		$arrFooter = [
			'TOTAL',
			'',
			'=SUM(C' . $startRow . ':C' . ($rowCount - 1) . ')'
		];
		$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':B' . $rowCount);
		$objPHPExcel->getActiveSheet()->fromArray($arrFooter, '', 'A' . $rowCount);
		$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':C' . $rowCount)->applyFromArray($styleHeaderFooterArray);

		## TTD ##
		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$configTtd = $genco->getTtdPrintoutRSProsesRekapRS();
		$startRow = $rowCount + $jarakRow;
		$rowCount = $startRow;
		$arrAZ = range('A', 'Z');
		foreach ($configTtd AS $row => $arrTtd) {
			$startCol = 'A';
			$startColBawah = 'A';
			foreach ($arrTtd AS $header => $valName) {
				$jarakHeaderTtd = 5;
				$headerEx = explode('|', $header);
				$mergeCells = 0;
				if (isset($headerEx[1])) {
					preg_match('/(.*?)\[/s', $headerEx[1], $opt);
					preg_match('/\[(.*?)\]/s', $headerEx[1], $valOpt);
					if ($opt[1] == "mergecells") {
						$mergeCells = $valOpt[1];
					}
				}

				$objPHPExcel->getActiveSheet()->setCellValue($startCol . $rowCount, $headerEx[0]);
				$objPHPExcel->getActiveSheet()->getStyle($startCol . $rowCount)->applyFromArray(['fill' => ['type' => PHPExcel_Style_Fill::FILL_SOLID, 'color' => ['rgb' => 'D9D9D9']]]);
				$nextColumn = 1;
				if ($mergeCells > 0) {
					$endColMerge = $arrAZ[array_search($startCol, $arrAZ, true) + $mergeCells - 1];
					$objPHPExcel->getActiveSheet()->mergeCells($startCol . $rowCount . ':' . $endColMerge . $rowCount);
					$nextColumn = $mergeCells;
				}
				$startCol = $arrAZ[array_search($startCol, $arrAZ, true) + $nextColumn];

				foreach ($valName AS $idxName => $name) {
					$valueEx = explode('|', $name);
					$mergeCells = 0;
					if (isset($valueEx[1])) {
						preg_match('/(.*?)\[/s', $valueEx[1], $optVal);
						preg_match('/\[(.*?)\]/s', $valueEx[1], $valOptVal);
						if ($optVal[1] == "mergecells") {
							$mergeCells = $valOptVal[1];
						}
					}

					$objPHPExcel->getActiveSheet()->setCellValue($startColBawah . ($rowCount + $jarakHeaderTtd), $valueEx[0]);
					$objPHPExcel->getActiveSheet()->getStyle($startColBawah . ($rowCount + $jarakHeaderTtd))->applyFromArray(['fill' => ['type' => PHPExcel_Style_Fill::FILL_SOLID, 'color' => ['rgb' => 'D9D9D9']]]);
					$endColMerge = $startColBawah;
					$nextColumn = 1;
					if ($mergeCells > 0) {
						$endColMerge = $arrAZ[array_search($startColBawah, $arrAZ, true) + $mergeCells - 1];
						$objPHPExcel->getActiveSheet()->mergeCells($startColBawah . ($rowCount + $jarakHeaderTtd) . ':' . $endColMerge . ($rowCount + $jarakHeaderTtd));
						$nextColumn = $mergeCells;
					}
					$objPHPExcel->getActiveSheet()->mergeCells($startColBawah . ($rowCount + 1) . ':' . $endColMerge . ($rowCount + $jarakHeaderTtd - 1));
					$startColBawah = $arrAZ[array_search($startColBawah, $arrAZ, true) + $nextColumn];
				}
//				$rowCount += 2;
			}
			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $arrAZ[array_search($startColBawah, $arrAZ, true) - 1] . ($rowCount + $jarakHeaderTtd))->applyFromArray([
				'font' => array('bold' => true),
				'borders' => array(
					'allborders' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				),
				'alignment' => array(
					'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
				)
			]);
			$rowCount += $jarakHeaderTtd + 2;
		}

		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(32);
		foreach (range('B', 'V') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setWidth(21);
//			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

		$fileResult = 'RevenueSharingProsesRekapRS_' . time() . '.xlsx';
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
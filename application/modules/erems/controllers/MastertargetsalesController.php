<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_MastertargetsalesController extends Zend_Controller_Action {

	protected $model;
	protected $result = array('total' => 0, 'success' => false, 'data' => array());

	function init() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$this->model = new Erems_Models_Mastertargetsales();
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {
		if ($this->getRequest()->getPost('mode_read') == 'allParameter') {
			$this->result['listPurpose']    = $this->model->dataPurpose();
			$this->result['listProject']    = $this->model->dataProjectSplit();
			$this->result['toleransi_edit'] = $this->model->getParameter('TOLERANSI_UPDATE_TARGET_SALES');
			$this->result['bod_meeting']    = $this->model->getParameter('BOD_MEETING');
		} 
		else if ($this->getRequest()->getPost('mode_read') == 'generateTarget') {
			$this->result = $this->model->generateTargetRead($this->getRequest()->getPost());
		} 
		else {
			$this->result = $this->model->dataRead($this->getRequest()->getPost());
		}
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {
		$this->result = $this->model->dataCreate($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->result = $this->model->dataUpdate($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->result = $this->model->dataDelete($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function printAction() {
		$report_fn = 'report_master_mastertargetsales.mrt';
		echo $report_fn && (file_exists($this->_helper->session->report_path . $report_fn) || file_exists($this->_helper->session->report_path . $this->_helper->session->getCurrentProjectId() . '-' . $this->_helper->session->getCurrentPtId() . '/' . $report_fn)) ? $report_fn : 'ERROR';
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function exportAction() {
		$this->result = $this->model->dataRead($this->getRequest()->getPost(), 1);
		$resultdata = $this->result['data'];
		$result['success'] = false;

		$data = array();
		// Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();
		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0);
		// Initialise the Excel row number 

		$styleArrayTitle = array(
			'font' => array(
				'bold' => true,
				'size' => 14
			)
		);

		if (count($resultdata) > 0) {
			$objPHPExcel->setActiveSheetIndex(0)
					->setCellValue('A2', 'PROJECT: ' . $resultdata[0]['project_name'])
					->setCellValue('A3', 'TARGET SALES')
					->setCellValue('A4', $this->getRequest()->getPost()['tahun'])
					->setTitle('TARGET SALES '); // sheet name

			$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A3')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A4')->applyFromArray($styleArrayTitle);

			$rowCount = 6;
			$rowHeader = $rowCount;

			$styleHeader = array(
				'alignment' => array(
					'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
				),
				'fill' => array(
					'type' => PHPExcel_Style_Fill::FILL_SOLID,
					'color' => array('rgb' => 'd3d3d3')
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

			$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':A' . ($rowCount + 1));
			$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'No');
			$objPHPExcel->getActiveSheet()->mergeCells('B' . $rowCount . ':B' . ($rowCount + 1));
			$objPHPExcel->getActiveSheet()->setCellValue('B' . $rowCount, 'Tahun');
			$objPHPExcel->getActiveSheet()->mergeCells('C' . $rowCount . ':C' . ($rowCount + 1));
			$objPHPExcel->getActiveSheet()->setCellValue('C' . $rowCount, 'Bulan');

			$startColumnDynamic = 'D';
			$endColumnDynamic = $startColumnDynamic;
			$listPurpose = $this->model->dataPurpose();
			$arrPurposeHeader = [];
			$arrPurpose = [];
			$listPurpose['data'][] = ['purpose' => 'Total', 'purpose_target_fieldname' => 'total'];
			foreach ($listPurpose['data'] as $key => $value) {
				$endColumnDynamic++;
				$endColumnDynamic++;
				$endColumnDynamic++;
				if($value['purpose_target_fieldname'] != 'total'){
					$endColumnDynamic++;
					$endColumnDynamic++;
				}
				$objPHPExcel->getActiveSheet()->mergeCells($startColumnDynamic . $rowCount . ':' . $endColumnDynamic . $rowCount);
				$endColumnDynamic++;
				$startColumnDynamic = $endColumnDynamic;

				$arrPurposeHeader[] = ucwords(strtolower($value['purpose']));
				$arrPurposeHeader[] = '';
				$arrPurposeHeader[] = '';
				if($value['purpose_target_fieldname'] != 'total'){
					$arrPurposeHeader[] = '';
					$arrPurposeHeader[] = '';
				}
				$arrPurposeHeader[] = '';

				$arrPurpose[] = "Target\nTanah (m2)";
				$arrPurpose[] = "Target\nBangunan (m2)";
				$arrPurpose[] = "Target\nUnit";
				if($value['purpose_target_fieldname'] != 'total'){
					$arrPurpose[] = "Target\nTanah (Rp)";
					$arrPurpose[] = "Target\nBangunan (Rp)";
				}
				$arrPurpose[] = "Target (Rp)";
			}
//			echo $startColumnDynamic;
			// $arrPurposeHeader[] = 'Collection Target CASH (Rp)';
			// $arrPurposeHeader[] = 'Collection Target INHOUSE (Rp)';
			// $arrPurposeHeader[] = 'Collection Target KPR (Rp)';
			$arrPurposeHeader[] = 'Collection Target (Rp)';
			$objPHPExcel->getActiveSheet()->fromArray($arrPurposeHeader, '', 'D' . $rowCount);
			$objPHPExcel->getActiveSheet()->fromArray($arrPurpose, '', 'D' . ($rowCount + 1));
			$objPHPExcel->getActiveSheet()->mergeCells($startColumnDynamic . $rowCount . ':' . $startColumnDynamic . ($rowCount + 1));

			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $startColumnDynamic . ($rowCount + 1))->applyFromArray($styleHeader);
//			$objPHPExcel->getActiveSheet()->getStyle('A1:' . $startColumnDynamic . '2')->getAlignment()->setWrapText(true);


			$rowCount += 2;
			$arrData = [];
			foreach ($resultdata as $key => $rs) {
				$arrData[$key][] = $key + 1;
				$arrData[$key][] = $rs['tahun'];
				$arrData[$key][] = $rs['bulan'];
				foreach ($listPurpose['data'] as $keyPurpose => $value) {
					$arrData[$key][] = $rs[$value['purpose_target_fieldname'] . '_target_tanah_m'];
					$arrData[$key][] = $rs[$value['purpose_target_fieldname'] . '_target_bangunan_m'];
					$arrData[$key][] = $rs[$value['purpose_target_fieldname'] . '_target_unit'];
					if($value['purpose_target_fieldname'] != 'total'){
						$arrData[$key][] = isset($rs[$value['purpose_target_fieldname'] . '_target_tanah_v']) ? $rs[$value['purpose_target_fieldname'] . '_target_tanah_v'] : 0;
						$arrData[$key][] = isset($rs[$value['purpose_target_fieldname'] . '_target_bangunan_v']) ? $rs[$value['purpose_target_fieldname'] . '_target_bangunan_v'] : 0;
					}
					$arrData[$key][] = $rs[$value['purpose_target_fieldname'] . '_target_v'];
				}
				// $arrData[$key][] = $rs['collection_target_cash_v'];
				// $arrData[$key][] = $rs['collection_target_inhouse_v'];
				// $arrData[$key][] = $rs['collection_target_kpr_v'];
				$arrData[$key][] = $rs['collection_target_v'];
			}

			$objPHPExcel->getActiveSheet()->fromArray($arrData, '', 'A' . $rowCount, true);
			$rowCount += count($resultdata) - 1;
			$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'TOTAL');
			$objPHPExcel->getActiveSheet()->mergeCells('A' . $rowCount . ':' . 'C' . $rowCount);
			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $startColumnDynamic . $rowCount)->applyFromArray(['font' => array(
					'bold' => true
			)]);

			$columnx = 'D';
			while ($columnx != $startColumnDynamic) {
				$columnName = $objPHPExcel->getActiveSheet()->getCell($columnx . ($rowHeader + 1), 'Kavling');
				if (strpos($columnName, 'm2') !== false || strpos($columnName, 'Unit') !== false) {
					$objPHPExcel->getActiveSheet()->getStyle($columnx . ($rowHeader + 1))->getAlignment()->setWrapText(true);
				} else {
					$objPHPExcel->getActiveSheet()->getColumnDimension($columnx)->setAutoSize(true);
				}
				$columnx++;
			}
			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

			$fileResult = 'List_targetsales_' . time() . '.xlsx';
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
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

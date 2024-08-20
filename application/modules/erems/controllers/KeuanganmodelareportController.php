<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_KeuanganmodelareportController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

		if ($read_type_mode == 'export_excel') {
			$post_data['purchase_startdate'] = $this->getRequest()->getPost('purchase_startdate');
			$post_data['status'] = $this->getRequest()->getPost('status');
			$post_data['pt_id'] = $this->getRequest()->getPost('pt_id') ? $this->getRequest()->getPost('pt_id') : 0;
			$post_data['version'] = $this->getRequest()->getPost('version') ? $this->getRequest()->getPost('version') : 1;

			$return = $this->exportdata($post_data);
		} else {
			$return['project_name'] = $project_name;
			$return['pt_name'] = $pt_name;
		}
		echo Zend_Json::encode($return);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function exportdata($param) {
		if ($param['version'] == 2) {
			$param['status'] = 1;
			$initialExcel = $this->createSheet($param);
			$param['status'] = 2;
			$createExcel = $this->createSheet($param, 1, $initialExcel['url'], $initialExcel['fileName']);
		} else {
			$initialExcel = $this->createSheet($param);
		}
		return $initialExcel;
	}

	private function createSheet($param, $sheetIdx = 0, $urlFile = '', $fileName = '') {
		$model = new Erems_Models_Keuanganmodelareport();
		$result = $model->keuanganmodelareportRead($param);
		$result = isset($result['data']['data']) ? $result['data']['data'] : [];
		// echo json_encode($result[0]);
		// die;

		$projectpt_name = isset($result[0]["projectpt_name"]) ? $result[0]["projectpt_name"] : "";

		//STYLE
		$styleArrayTitle = array(
			'font' => array(
				'bold' => true,
				'size' => 24
			)
		);
		$styleArrayBold = array(
			'font' => array(
				'bold' => true
			)
		);
		$styleArrayBorderThin = array(
			'borders' => array(
				'allborders' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		);
		$styleArrayOutlineBorderThin = array(
			'borders' => array(
				'outline' => array(
					'style' => PHPExcel_Style_Border::BORDER_THIN
				)
			)
		);
		$styleArrayOutlineBorderThick = array(
			'borders' => array(
				'outline' => array(
					'style' => PHPExcel_Style_Border::BORDER_THICK
				)
			)
		);
		$styleCenter = array(
			'alignment' => array(
				'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
				'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
			)
		);

		$proses_date_text = date("F Y", strtotime($param['purchase_startdate']));

		if ($sheetIdx == 0) {
			$objPHPExcel = new PHPExcel();
			$objPHPExcel->getActiveSheet(0)->setTitle(($param['status'] == 1 ? 'Gross' : 'Netto'));
		} else {
			$objReader = PHPExcel_IOFactory::createReader('Excel2007');
			$objPHPExcel = $objReader->load($urlFile);
			$objPHPExcel->getActiveSheet(0)->setTitle('Gross');
			$objPHPExcel->createSheet($sheetIdx)->setTitle('Netto');
			$objPHPExcel->setActiveSheetIndex($sheetIdx);
		}

		$objPHPExcel->setActiveSheetIndex($sheetIdx)->setCellValue('A1', 'DATA COLLECTION ' . $projectpt_name)->setCellValue('A2', $proses_date_text);
		$objPHPExcel->getActiveSheet()->getStyle('A1')->applyFromArray($styleArrayTitle);
		$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);

		// $result[0] = json_decode('{"NO":"1","projectpt_name":"CITRA - TEST","pt_name":"PT. CIPUTRA RESIDENCE - TEST","customer_name":"P.T CENTRAL SATRYA PERDANA.","unit_number":"A.00\/01","cluster_unit_id":"MA1-A.00\/01","kode_kawasan":"MA1","type":"GRIYA MEKAR","purchaseletter_id":null,"purpose_id":1670,"purpose":"RUMAH","purpose_pricetype":"RUMAH - CASH","kpp":"1","no_telp":"","first_purchasedate":"14-10-2019","purchase_date":"14-10-2019","tahun_beli":2019,"progress_bangunan":10,"harga_gross":"247250000.0000","PPNDTP":".0000","tgl_jatuh_tempo":"14-01","tgl_bayar":null,"rencana_lunas":"14-01-2020","jumlah_dibayar_sd_bulan_lalu":null,"outstanding_AR_sampai_bulan_lalu":"247250000.0000","cash_in_bulan_ini":null,"outstanding_AR_bulan_ini":"247250000.0000","outstanding_AR_bulan_ini_sudah_jatuh_tempo":"247250000.0000","outstanding_AR_bulan_ini_belum_jatuh_tempo":null,"denda":0,"penjualan_bulan_ini":".0000","penjualan_bulan_ini_gross":".0000","_30_hari":".0000","_60_hari":".0000","_90_hari":".0000","_90p_hari":"247250000.0000","_":null}', TRUE);
		if (count($result) > 0) {
			// Initialise the Excel row number
			$rowCount = 3;
			$column = 'A';

			$columnStartDynamic = '';
			$totalColumnDynamic = 0;
			$startDynamic = false;
			$fieldDynamic = [];
			$columnFieldDynamic = [];
			foreach ($result[0] as $field => $value) {
				if (trim($field) != '_' && $field != 'purchaseletter_id' && $field != 'purpose_pricetype' && $field != 'purpose' && $field != 'projectpt_name') {
					$fieldOri = $field;
					if ($field == '_30_hari') {
						$field = date('F', strtotime('-1 month', strtotime($param['purchase_startdate']))) . " \n30 Hari";
					} else if ($field == '_60_hari') {
						$field = date('F', strtotime('-2 month', strtotime($param['purchase_startdate']))) . " \n60 Hari";
					} else if ($field == '_90_hari') {
						$field = date('F', strtotime('-3 month', strtotime($param['purchase_startdate']))) . " \n90 Hari";
					} else if ($field == '_90p_hari') {
						$field = date('F', strtotime('-4 month', strtotime($param['purchase_startdate']))) . " \n>90 Hari";
					}

					if ($startDynamic) {
						if ($columnStartDynamic == '') {
							$columnStartDynamic = $column;
						}
						$exp = explode('_', $field);
						$fieldDynamic[$exp[0] . '_' . $exp[1]][] = $exp[2];
						$totalColumnDynamic++;
						if (!isset($columnFieldDynamic[$exp[0] . '_' . $exp[1]]['start'])) {
							$columnFieldDynamic[$exp[0] . '_' . $exp[1]]['start'] = $column;
						}
						$columnFieldDynamic[$exp[0] . '_' . $exp[1]]['end'] = $column;

						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $this->modifyStr($exp[0] . '_' . $exp[1]));
					} else {
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $this->modifyStr($field));
						$objPHPExcel->getActiveSheet()->mergeCells($column . $rowCount . ':' . $column . ($rowCount + 1));
					}

					if ($fieldOri == '_90p_hari') {
						$startDynamic = true;
					}

					$column++;
				}
			}
			foreach ($columnFieldDynamic AS $field => $valCol) {
				$objPHPExcel->getActiveSheet()->mergeCells($valCol['start'] . $rowCount . ':' . $valCol['end'] . $rowCount);
				$objPHPExcel->getActiveSheet()->fromArray($fieldDynamic[$field], null, $valCol['start'] . ($rowCount + 1));
			}

			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $objPHPExcel->getActiveSheet()->getHighestColumn() . ($rowCount + 1))->applyFromArray(array_merge($styleArrayBorderThin, $styleArrayBold, $styleCenter));
			// $objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $objPHPExcel->getActiveSheet()->getHighestColumn() . ($rowCount + 1))
			// 		->getAlignment()->setWrapText(TRUE);
			// $arrColumnSum = ['H', 'I', 'R', 'S', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF'];
			$arrColumnSum = ['M', 'N', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE'];
			$columnSubTotalStartDynamic = $columnStartDynamic;
			for ($i = 0; $i < $totalColumnDynamic; $i++) {
				$arrColumnSum[] = $columnSubTotalStartDynamic;
				$columnSubTotalStartDynamic++;
			}

			$rowCount += 2;
			$purpose = '';
			$purpose_pricetype = '';
			foreach ($result AS $key => $valResult) {
				if (trim($valResult['purpose']) != $purpose) {
					$purpose = trim($valResult['purpose']);
				}

				if ($valResult['purpose_pricetype'] != $purpose_pricetype) {
					$purpose_pricetype = $valResult['purpose_pricetype'];
					$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, $purpose_pricetype);
					$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount)->applyFromArray($styleArrayBold);
					$rowCount++;
					$rowStartPurpose = $rowCount;
				}
				$valArr = $valResult;
				unset($valArr['purchaseletter_id']);
				unset($valArr['purpose_pricetype']);
				unset($valArr['purpose']);
				unset($valArr['projectpt_name']);
				$objPHPExcel->getActiveSheet()->fromArray($valArr, null, 'A' . $rowCount);
				$rowCount++;

				## TOTAL SUB PURPOSE PRICETYPE ##
				if (!isset($result[$key + 1]['purpose_pricetype']) || $result[$key + 1]['purpose_pricetype'] != $purpose_pricetype) {
					$arrRowSubtotalPurposePricetype[] = $rowCount;

					$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'TOTAL ' . $purpose_pricetype);
					foreach ($arrColumnSum AS $keyCol => $valColSum) {
						$objPHPExcel->getActiveSheet()->setCellValue($valColSum . $rowCount, '=SUM(' . $valColSum . $rowStartPurpose . ':' . $valColSum . ($rowCount - 1 ) . ')');
					}

					$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $objPHPExcel->getActiveSheet()->getHighestColumn() . $rowCount)->applyFromArray(array_merge($styleArrayOutlineBorderThin, $styleArrayBold));
					$rowCount += 2;
				}
				## TOTAL SUB PURPOSE PRICETYPE ##
				#
				## TOTAL SUB PURPOSE ##
				if (!isset($result[$key + 1]['purpose']) || $result[$key + 1]['purpose'] != $purpose) {
					$arrRowSubtotalPurpose[] = $rowCount;

					$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'TOTAL ' . $purpose);
					foreach ($arrColumnSum AS $keyCol => $valColSum) {
						$formula = '=';
						foreach ($arrRowSubtotalPurposePricetype AS $rowSubTotal) {
							if ($formula != '=') {
								$formula .= '+';
							}
							$formula .= $valColSum . $rowSubTotal;
						}
						$objPHPExcel->getActiveSheet()->setCellValue($valColSum . $rowCount, $formula);
					}
					$arrRowSubtotalPurposePricetype = [];

					$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $objPHPExcel->getActiveSheet()->getHighestColumn() . $rowCount)->applyFromArray(array_merge($styleArrayOutlineBorderThin, $styleArrayBold));
					$rowCount += 2;
				}
				## TOTAL SUB PURPOSE ##
			}

			## GRAND TOTAL ##
			$rowCount++;
			$objPHPExcel->getActiveSheet()->setCellValue('A' . $rowCount, 'TOTAL ALL ');
			foreach ($arrColumnSum AS $keyCol => $valColSum) {
				$formula = '=';
				foreach ($arrRowSubtotalPurpose AS $rowSubTotalPurpose) {
					if ($formula != '=') {
						$formula .= '+';
					}
					$formula .= $valColSum . $rowSubTotalPurpose;
				}
				$objPHPExcel->getActiveSheet()->setCellValue($valColSum . $rowCount, $formula);
			}

			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $objPHPExcel->getActiveSheet()->getHighestColumn() . $rowCount)->applyFromArray(array_merge($styleArrayOutlineBorderThin, $styleArrayBold));
			## GRAND TOTAL ##
			// $indexColumn = 1;
			// $columnDimension = '';
			// $maxColumn = $objPHPExcel->getActiveSheet()->getHighestColumn();
			// while ($columnDimension != $maxColumn) {
			// 	$columnDimension = $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($indexColumn)->getColumnIndex();
			// 	$objPHPExcel->getActiveSheet()->getColumnDimension($columnDimension)->setAutoSize(TRUE);
			// 	$indexColumn++;
			// }
			// foreach (range('B', $objPHPExcel->getActiveSheet()->getHighestColumn(6)) as $columnID) {
			// 	echo $columnID;
			// 	$objPHPExcel->getActiveSheet()->getColumnIterator('B');
			// }

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
			$fileResult = 'Keuangan Model 1 Report_' . time() . '.xlsx';
			if ($fileName != '') {
				$fileResult = $fileName;
			}
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
			$url = 'app/erems/downloadfile/msexcel/' . $fileResult;

			$result['url'] = $url;
			$result['fileName'] = $fileResult;
			$result['success'] = true;
		} else {
			if ($sheetIdx > 0) {
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
				$fileResult = 'Keuangan Model 1 Report_' . time() . '.xlsx';
				if ($fileName != '') {
					$fileResult = $fileName;
				}

				$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
				$url = 'app/erems/downloadfile/msexcel/' . $fileResult;
				$result['url'] = $url;
				$result['fileName'] = $fileResult;
				$result['success'] = true;
			} else {
				$result['success'] = false;
			}
		}


		return $result;
	}

	function modifyStr($str) {
		return ucwords(str_replace("_", " ", $str));
	}

}

?>

<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
require_once dirname(__DIR__) . '../library/dompdf2/autoload.inc.php';

use Dompdf\Dompdf;
use Dompdf\Options;

class Erems_BagihasilprosesController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

		$model = new Erems_Models_Bagihasilproses();

		if ($read_type_mode == 'report') {
			$project_name = $this->session->getCurrentProjectName();
			$pt_name = $this->session->getCurrentPtName();

			$result['project_name'] = $project_name;
			$result['pt_name'] = $pt_name;
		} else if ($read_type_mode == 'export_excel') {
			$post_data['lrp_id'] = $this->getRequest()->getPost('lrp_id');
			$post_data['doc_no'] = $this->getRequest()->getPost('doc_no');
			$post_data['proses_date'] = $this->getRequest()->getPost('proses_date');

			$result = $this->exportdata($post_data);
		} else if ($read_type_mode == 'th_lrp') {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$result = $model->dataprosesdateRead($post_data);
		} else if ($read_type_mode == 'td_lrp_detail') {
			$post_data['lrp_id'] = $this->getRequest()->getPost('lrp_id');
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$result = $model->dataprosesdetailRead($post_data);
		} else if ($read_type_mode == 'update_bungalrp') {
			$post_data['prosesbunga_date'] = $this->getRequest()->getPost('prosesbunga_date');

			$result = $model->dataUpdateBungaLRP($post_data);
		} else if ($read_type_mode == 'export_pdf') {
			$post_data['lrp_id'] = $this->getRequest()->getPost('lrp_id');
			$post_data['doc_no'] = $this->getRequest()->getPost('doc_no');
			$post_data['proses_date'] = $this->getRequest()->getPost('proses_date');

			$result = $this->exportpdf($post_data);
		} else if ($read_type_mode == 'configLRP') {
			$result['splitLRP'] = $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSplitPTLRP();
			$result['deleteLRP'] = in_array($this->session->getUserId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getUserDeleteLRP()) ? 1 : 0;
		} else if ($read_type_mode == 'summary_report') { // added by rico 22092022
			$appDao = new Erems_Models_Master_AppDao();

			$result['pt_name'] = ($this->getRequest()->getPost('pt_id') == '') ? 'ALL PT': $appDao->getPt($this->getRequest()->getPost('pt_id'))[0][0]['name'];
		} else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
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

		$model = new Erems_Models_Bagihasilproses();
		$result = $model->dataCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	/* function updateAction() {
	  $this->getResponse()->setHeader('Content-Type', 'application/json');

	  $result = array('data' => array(), 'total' => 0, 'success' => false);

	  $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

	  $model = new Erems_Models_Bagihasilproses();
	  $result = $model->dataUpdate($post_data);

	  echo Zend_Json::encode($result);

	  $this->_helper->viewRenderer->setNoRender(true);
	  }

	  function deleteAction() {
	  $this->getResponse()->setHeader('Content-Type', 'application/json');

	  $result = array('data' => array(), 'total' => 0, 'success' => false);

	  $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

	  $model = new Erems_Models_Bagihasilproses();
	  $result = $model->landrepaymentDelete($post_data);

	  echo Zend_Json::encode($result);

	  $this->_helper->viewRenderer->setNoRender(true);
	  } */

	function exportdata($param) {
		$model = new Erems_Models_Bagihasilproses();

		$result['success'] = false;

		$data = array();

		// Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();

		$styleArrayBg = array(
			'fill' => array(
				'type' => PHPExcel_Style_Fill::FILL_SOLID,
				'color' => array('rgb' => 'FFFF00')
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

		$styleArrayTotal = array(
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

		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A2', 'PROJECT: ' . $this->session->getCurrentProjectName())
				->setCellValue('A3', 'LAND REPAYMENT, MANAGEMENT FEE & ROYALTY')
				->setCellValue('A4', 'PERIOD: ' . date("F Y", strtotime($param['proses_date'])))
				->setTitle('LRP'); // sheet name

		$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);
		$objPHPExcel->getActiveSheet()->getStyle('A3')->applyFromArray($styleArrayTitle);
		$objPHPExcel->getActiveSheet()->getStyle('A4')->applyFromArray($styleArrayTitle);

		// Initialise the Excel row number 
		$rowCount = 6;
		$column = 'A';

		//============== sheet 1 =============//
		$result = $model->exportData($param);

		if (isset($result['data'][1])) {

			$resultdata = $result['data'][1];

			$lrp_total = array();
			$management_total = array();
			$royalty_total = array();

			$lrp_field = 0;
			$management_field = 0;
			$royalty_field = 0;
			$i = 0;

			foreach ($resultdata as $key => $value) {
				$total_l = 0;
				$total_m = 0;
				$total_r = 0;

				foreach ($value as $k => $v) {
					if (strpos($k, 'LRP') !== false) {
						$total_l += (int) $v;
						$lrp_field++;
					}

					if (strpos($k, 'Management') !== false) {
						$total_m += (int) $v;
						$management_field++;
					}

					if (strpos($k, 'Royalty') !== false) {
						$total_r += (int) $v;
						$royalty_field++;
					}
				}
				array_push($lrp_total, $total_l);
				array_push($management_total, $total_m);
				array_push($royalty_total, $total_r);
				$i++;
			}

			foreach ($resultdata[0] as $field => $value) {
				if ($field == 'name') {
					$field = 'PT';
				}
				if ($field == 'tgl_transaksi') {
					$field = 'Tgl. Transaksi';
				}
				if ($field == 'pembeli') {
					$field = 'Pembeli';
				}
				if ($field == 'cluster') {
					$field = 'Kawasan / Tower';
				}
				if ($field == 'unit_number') {
					$field = 'Unit';
				}
				if ($field == 'land_size') {
					$field = 'Luas Tanah (SGA)';
				}
				if ($field == 'building_size') {
					$field = 'Luas Bangunan (Netto)';
				}
				if ($field == 'type_name') {
					$field = 'Tipe';
				}
				if ($field == 'harga_netto') {
					$field = 'Harga Netto';
				}
				if ($field == 'harga_total_jual') {
					$field = 'Harga Total';
				}
				if ($field == 'cara_bayar') {
					$field = 'Cara Pembayaran';
				}
				if ($field == 'total_schedule_inh') {
					$field = 'Lamanya Inhouse';
				}
				if ($field == 'duedate_kpr') {
					$field = 'Due Date KPR';
				}
				if ($field == 'rencana_pembayaran_terakhir') {
					$field = 'Rencana Pembayaran Terakhir';
				}
				if ($field == 'cash_in') {
					$field = 'Cash In - Rp';
				}
				if ($field == 'cash_in_persen') {
					$field = 'Cash In - %';
				}
				if ($field == 'harga_bangunan') {
					$field = 'Selling Price Netto (Rp) Building - Total';
				}
				// if ($field == 'harga_tanah_permeter') {
					// $field = 'COGS Raw Land Rp - /M2 (Gross)';
				// }
				// if ($field == 'harga_tanah_permeter_efisiensi') {
					// $field = 'COGS Raw Land Rp - /M2 (Netto)';
				// }
				// if ($field == 'harga_tanah') {
					// $field = 'COGS Raw Land Rp - Total (Gross MAX)';
				// }
				// if ($field == 'Harga_Tanah_Efisiensi') {
					// $field = 'COGS Raw Land Rp - Total (Netto MAX)';
				// }

				if ($field != 'unit_id') {
					$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ucwords(str_replace("_", " ", $field)));

					$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
					$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

					if ($field == 'LRP_' . ($lrp_field / $i)) {
						$column++;
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, "LRP Total");

						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
					}

					if ($field == 'Management_Fee_' . ($management_field / $i)) {
						$column++;
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, "Management Total");

						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
					}

					if ($field == 'Royalty_' . ($royalty_field / $i)) {
						$column++;
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, "Royalty Total");

						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
					}

					$column++;
				}
			}

			// added by rico 03012022
			$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, "Sisa LRP");

			$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
			$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

			$column++;
			$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, "Sisa Management Fee");

			$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
			$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

			$column++;
			$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, "Sisa Royalty Fee");

			$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
			$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

			$rowCount = 7;
			$x = 0;
			foreach ($resultdata as $rs) {
				$column = 'A';
				foreach ($rs as $field => $value) {
					if ($field != 'unit_id') {
						// added by rico 03012022
						if ($field == 'tgl_transaksi' || $field == 'duedate_kpr' || $field == 'rencana_pembayaran_terakhir') {
							$date = empty($value) ? '' : date("d-m-Y", strtotime($value));
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $date);
						} else {
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);
						}

						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

						//summary column
						if (!preg_match("/[a-z]/i", $value) && $field != 'No' && $field != 'tgl_transaksi' && $field != 'duedate_kpr' && $field != 'rencana_pembayaran_terakhir') {
							$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
						}

						if ($field == 'LRP_' . ($lrp_field / $i)) {
							$column++;
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $lrp_total[$x]);
							$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
						}

						if ($field == 'Management_Fee_' . ($management_field / $i)) {
							$column++;
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $management_total[$x]);
							$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
						}

						if ($field == 'Royalty_' . ($royalty_field / $i)) {
							$column++;
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $royalty_total[$x]);
							$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
						}
						$column++;
					}
				}
				// added by rico 03012022
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ($rs['Harga_Tanah_Efisiensi'] - $lrp_total[$x]));
				$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
				$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

				$column++;
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ($rs['management_fee_max'] - $management_total[$x]));
				$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
				$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

				$column++;
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ($rs['royalty_fee_max'] - $royalty_total[$x]));
				$objPHPExcel->getActiveSheet()->setCellValue($column . ($rowCount + 1), '=SUM(' . $column . '7:' . $column . '' . ($rowCount) . ')');
				$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

				$rowCount++;
				$x++;
			}

			//set total
			$objPHPExcel->getActiveSheet()->setCellValue('C' . $rowCount, 'TOTAL');
			$objPHPExcel->getActiveSheet()->getStyle('A' . $rowCount . ':' . $objPHPExcel->getActiveSheet()->getHighestColumn() . $rowCount)
					->applyFromArray($styleArrayTotal);
		}

		//============== sheet 2 =============//
		$result = $model->exportBacklogData($param);

		if (isset($result['data'][0])) {

			$resultdata = $result['data'][0];

			$objPHPExcel->createSheet();
			$objPHPExcel->setActiveSheetIndex(1)
					->setCellValue('A1', 'PROJECT: ' . $this->session->getCurrentProjectName())
					->setCellValue('A2', 'SALES BACKLOG')
					->setCellValue('A3', 's/d: ' . date("F Y", strtotime($param['proses_date'])))
					->setTitle('BACKLOG (LRP)'); // sheet name

			$objPHPExcel->getActiveSheet()->getStyle('A1')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A3')->applyFromArray($styleArrayTitle);

			// Initialise the Excel row number 
			$rowCount = 5;
			$column = 'A';

			if (count($resultdata) > 0) {
				foreach ($resultdata[0] as $field => $value) {
					// if($field == 'purchase_date') { $field = 'Tanggal SP'; }
					// if($field == 'proses_date') { $field = 'Tanggal Proses'; }
					// if($field == 'cluster') { $field = 'Kawasan'; }
					// if($field == 'block') { $field = 'Blok'; }
					// if($field == 'customer_name') { $field = 'Nama Pembeli'; }
					// if($field == 'land_size') { $field = 'Luas Tanah (SGA)'; }
					// if($field == 'building_size') { $field = 'Luas Bangunan (Netto)'; }
					// if($field == 'type') { $field = 'Type'; }
					// if($field == 'total_payment') { $field = 'Uang Masuk (UM)'; }
					// if($field == 'harga_tanah') { $field = 'Harga Jual (Net) - Tanah'; }
					// if($field == 'harga_bangunan') { $field = 'Harga Jual (Net) - Bangunan'; }
					// if($field == 'harga_netto') { $field = 'Harga Jual (Net) - Total'; }
					// if($field == 'harga_total_jual') { $field = 'Harga Total Jual (Inc. PPN, BBN, AJB)'; }
					// if($field == '%_UM_thd_harga_jual_total') { $field = '% UM thd Harga Jual Total'; }
					// if($field == 'pricetype') { $field = 'Cara Pembayaran'; }

					if ($field != 'unit_id') {
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $field);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
						$column++;
					}
				}

				$rowCount = 6;
				foreach ($resultdata as $rs) {
					$column = 'A';
					foreach ($rs as $field => $value) {
						if ($field != 'unit_id') {
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);

							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

							$column++;
						}
					}
					$rowCount++;
				}
			}
		}

		//============== sheet 3 =============//
		$result = $model->exportCancelData($param);

		if (isset($result['data'][0])) {

			$resultdata = $result['data'][0];

			$objPHPExcel->createSheet();
			$objPHPExcel->setActiveSheetIndex(2)
					->setCellValue('A1', 'PROJECT: ' . $this->session->getCurrentProjectName())
					->setCellValue('A2', 'DATA CANCEL')
					->setCellValue('A3', 's/d: ' . date("F Y", strtotime($param['proses_date'])))
					->setTitle('DATA CANCEL'); // sheet name

			$objPHPExcel->getActiveSheet()->getStyle('A1')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A3')->applyFromArray($styleArrayTitle);

			// Initialise the Excel row number 
			$rowCount = 5;
			$column = 'A';

			if (count($resultdata) > 0) {
				foreach ($resultdata[0] as $field => $value) {
					// if($field == 'purchase_date') { $field = 'Tanggal SP'; }
					// if($field == 'proses_date') { $field = 'Tanggal Proses'; }
					// if($field == 'cluster') { $field = 'Kawasan'; }
					// if($field == 'block') { $field = 'Blok'; }
					// if($field == 'customer_name') { $field = 'Nama Pembeli'; }
					// if($field == 'land_size') { $field = 'Luas Tanah (SGA)'; }
					// if($field == 'building_size') { $field = 'Luas Bangunan (Netto)'; }
					// if($field == 'type') { $field = 'Type'; }
					// if($field == 'total_payment') { $field = 'Uang Masuk (UM)'; }
					// if($field == 'harga_tanah') { $field = 'Harga Jual (Net) - Tanah'; }
					// if($field == 'harga_bangunan') { $field = 'Harga Jual (Net) - Bangunan'; }
					// if($field == 'harga_netto') { $field = 'Harga Jual (Net) - Total'; }
					// if($field == 'harga_total_jual') { $field = 'Harga Total Jual (Inc. PPN, BBN, AJB)'; }
					// if($field == '%_UM_thd_harga_jual_total') { $field = '% UM thd Harga Jual Total'; }
					// if($field == 'pricetype') { $field = 'Cara Pembayaran'; }

					if ($field != 'unit_id') {
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $field);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
						$column++;
					}
				}

				$rowCount = 6;
				foreach ($resultdata as $rs) {
					$column = 'A';
					foreach ($rs as $field => $value) {
						if ($field != 'unit_id') {
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);

							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

							$column++;
						}
					}
					$rowCount++;
				}
			}
		}
		//============== sheet 3 =============//
		$result = $model->exportChangekavelingData($param);

		if (isset($result['data'][0])) {

			$resultdata = $result['data'][0];

			$objPHPExcel->createSheet();
			$objPHPExcel->setActiveSheetIndex(3)
					->setCellValue('A1', 'PROJECT: ' . $this->session->getCurrentProjectName())
					->setCellValue('A2', 'PINDAH KAVELING')
					->setCellValue('A3', 's/d: ' . date("F Y", strtotime($param['proses_date'])))
					->setTitle('DATA PINDAH KAVELING'); // sheet name

			$objPHPExcel->getActiveSheet()->getStyle('A1')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A3')->applyFromArray($styleArrayTitle);

			// Initialise the Excel row number 
			$rowCount = 5;
			$column = 'A';

			if (count($resultdata) > 0) {
				foreach ($resultdata[0] as $field => $value) {
					// if($field == 'purchase_date') { $field = 'Tanggal SP'; }
					// if($field == 'proses_date') { $field = 'Tanggal Proses'; }
					// if($field == 'cluster') { $field = 'Kawasan'; }
					// if($field == 'block') { $field = 'Blok'; }
					// if($field == 'customer_name') { $field = 'Nama Pembeli'; }
					// if($field == 'land_size') { $field = 'Luas Tanah (SGA)'; }
					// if($field == 'building_size') { $field = 'Luas Bangunan (Netto)'; }
					// if($field == 'type') { $field = 'Type'; }
					// if($field == 'total_payment') { $field = 'Uang Masuk (UM)'; }
					// if($field == 'harga_tanah') { $field = 'Harga Jual (Net) - Tanah'; }
					// if($field == 'harga_bangunan') { $field = 'Harga Jual (Net) - Bangunan'; }
					// if($field == 'harga_netto') { $field = 'Harga Jual (Net) - Total'; }
					// if($field == 'harga_total_jual') { $field = 'Harga Total Jual (Inc. PPN, BBN, AJB)'; }
					// if($field == '%_UM_thd_harga_jual_total') { $field = '% UM thd Harga Jual Total'; }
					// if($field == 'pricetype') { $field = 'Cara Pembayaran'; }

					if ($field != 'unit_id') {
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $field);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBg);
						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);
						$column++;
					}
				}

				$rowCount = 6;
				foreach ($resultdata as $rs) {
					$column = 'A';
					foreach ($rs as $field => $value) {
						if ($field != 'unit_id') {
							$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);

							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

							$column++;
						}
					}
					$rowCount++;
				}
			}
		}


		//============== sheet 5 =============//
		$result = $model->exportBungaData($param);

		if (isset($result['data'][0])) {

			$resultdata = $result['data'][0];

			if (count($resultdata) > 0) {
				$bunga_persen = (isset($resultdata[1]['bunga']) ? $resultdata[1]['bunga'] : 10);
			} else {
				$bunga_persen = 10;
			}

			$objPHPExcel->createSheet();
			$objPHPExcel->setActiveSheetIndex(4)
					->setCellValue('A1', 'Bunga ' . $bunga_persen . '% Atas Sisa Land Repayment')
					->setCellValue('A2', 'Bulan ' . date("F Y", strtotime($param['proses_date'])))
					->setTitle('BUNGA LRP'); // sheet name



			$objPHPExcel->getActiveSheet()->getStyle('A1')->applyFromArray($styleArrayTitle);
			$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArrayTitle);

//                $objPHPExcel->getActiveSheet()->mergeCells("B4:B5"); 
//		$objPHPExcel->getActiveSheet()->getStyle("B4:B5")->applyFromArray($styleArrayBorderThin);
//                $objPHPExcel->getActiveSheet()->getStyle("B4:B5")->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
			// Initialise the Excel row number 
			$rowCount = 5;
			$column = 'A';

//                        $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setWidth('10');
//                        $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setWidth('50');
//                        $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setWidth('100');
//                        $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setWidth('150');
//                        $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setWidth('200');
//                        $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setWidth('250');

			foreach (range('B', 'G') as $columnID) {
				$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
			}
//					$objPHPExcel->getActiveSheet()->getColumnDimension('B4')->setAutoSize(true);
//                        $objPHPExcel->getActiveSheet()->mergeCells('A4:A5');
//                        $objPHPExcel->getActiveSheet()->setCellValue('A4', 'NO');
//                        $objPHPExcel->getActiveSheet()->mergeCells('B4:B5');
//                        $objPHPExcel->getActiveSheet()->setCellValue('B4', 'TGL. PEMBELIAN');
//					$objPHPExcel->getActiveSheet()->getColumnDimension('B5')->setAutoSize(true);
//                                        
//                        $value =  $objPHPExcel->getActiveSheet()->getCell('B4')->getValue();
//$width = mb_strwidth ($value); //Return the width of the string
//$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth($width);
//
//$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(false);
//$objPHPExcel->getActiveSheet()->getStyle("B4")->getAlignment()->setWrapText(true);
			if (count($resultdata) > 0) {
				foreach ($resultdata[0] as $field => $value) {
					if ($field == 'purchase_date') {
						$field = 'TGL. PEMBELIAN';
					}
					if ($field == 'customer_name') {
						$field = 'KONSUMEN';
					}
					if ($field == 'customer_name') {
						$field = 'UNIT';
					}
					if ($field == 'building_size') {
						$field = 'Luas Bangunan (Netto)';
					}
					if ($field == 'land_size') {
						$field = 'Luas Tanah (SGA)';
					}
					if ($field == 'harga_netto') {
						$field = 'NET PRICE';
					}
					if ($field == 'harga_total_jual') {
						$field = 'HARGA TOTAL';
					}
					if ($field == 'duedate') {
						$field = 'TGL JATUH TEMPO';
					}
					if ($field == 'bulan_ini') {
						$field = 'BULAN INI';
					}
					if ($field == 'bulan_lalu') {
						$field = 'TUNGGAKAN S/D BULAN LALU';
					}
					if ($field == 'payment_date') {
						$field = 'TGL BAYAR';
					}
					if ($field == 'total_payment') {
						$field = 'TOTAL PEMBAYARAN';
					}
					if ($field == 'harga_tanah') {
						$field = 'HARGA TANAH/M2';
					}
					if ($field == 'lrp_total') {
						$field = 'TOTAL (RP)';
					}
					if ($field == 'lrp_paid') {
						$field = 'PAID (RP)';
					}
					if ($field == 'lrp_period') {
						$field = 'PERIOD';
					}
					if ($field == 'lrp_unpaid') {
						$field = 'UNPAID (RP)';
					}
					if ($field == 'bunga') {
						$field = 'BUNGA PER-TAHUN';
					}
					if ($field == 'perhitungan_bunga_lrp') {
						$field = 'PERHITUNGAN BUNGA LRP (RP)';
					}
					if ($field == 'bunga_lrp_payment') {
						$field = 'BUNGA LRP YG DIBAYARKAN (RP)';
					}
					if ($field == 'pph_bunga_lrp') {
						$field = 'PPH ATAS BUNGA LRP (15%)';
					}


					$objPHPExcel->getActiveSheet()->getStyle($column . ($rowCount - 1))->applyFromArray($styleArrayBorderThin);
					$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

//                                        if($column != 'A'){                                  
//                                            $objPHPExcel->getActiveSheet()->getColumnDimension($column)->setAutoSize(true);
//                                        }

					$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $field);
					$objPHPExcel->getActiveSheet()->getStyle($column . ($rowCount - 1) . ":" . $column . $rowCount)->applyFromArray($styleArrayBg);

// $objPHPExcel->getActiveSheet()->mergeCells($column.$rowCount.":".$column.($rowCount+1));                                        
// $objPHPExcel->getActiveSheet()->getStyle($column.$rowCount)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);

					$column++;
				}

// $objPHPExcel->getActiveSheet()->mergeCells('A4:A5'); 
				$rowCount = 6;
				foreach ($resultdata as $rs) {
					$column = 'A';
					foreach ($rs as $field => $value) {
						$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);

						$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleArrayBorderThin);

						$column++;
					}
					$rowCount++;
				}
			}
		}
		$objPHPExcel->getActiveSheet()->setCellValue("J4", "ANGSURAN");
		$objPHPExcel->getActiveSheet()->setCellValue("O4", "LAND REPAYMENT");

		$objPHPExcel->getActiveSheet()->mergeCells("J4:K4");
		$objPHPExcel->getActiveSheet()->mergeCells("O4:R4");

		$objPHPExcel->getActiveSheet()->getStyle("J4:K4")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$objPHPExcel->getActiveSheet()->getStyle("O4:R4")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

		$objPHPExcel->getActiveSheet()->getStyle("J4:K4")->applyFromArray($styleArrayBorderThin);
		$objPHPExcel->getActiveSheet()->getStyle("O4:R4")->applyFromArray($styleArrayBorderThin);

		$objPHPExcel->getDefaultStyle()->getBorders()->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

		foreach (range('B', 'V') as $columnID) {
			$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
		}

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

		$fileResult = 'List_LRP_' . time() . '.xlsx';
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

	function exportpdf($param) {
		$model = new Erems_Models_Bagihasilproses();
		$result = $model->exportData($param);

		$fileName = 'bagihasilproses_' . $param['lrp_id'] . '.pdf';
		$filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/bagihasilproses/' . $fileName;
		$fileUrl = 'app/erems/uploads/pdf/bagihasilproses/' . $fileName;
		$options = new Options();
		$options->set('defaultFont', 'Arial');
		$options->setIsRemoteEnabled(true);

		$html = '';

		if ($result['data'][0] > 0) {

			$resultdata = $result['data'][1];

			$html .= '
						<table>
							<tr>
								<th>PROJECT:</th>
								<td>' . $this->session->getCurrentProjectName() . '</td>
							</tr>
							<tr>
								<th>LAND REPAYMENT, </th>
								<td>MANAGEMENT FEE & ROYALTY</td>
							</tr>
							<tr>
								<th>PERIOD:</th>
								<td>' . date("F Y", strtotime($param['proses_date'])) . '</td>
							</tr>
						</table>
						<br/><br/>
					';

			$lrp_total = array();
			$management_total = array();
			$royalty_total = array();

			$lrp_field = 0;
			$management_field = 0;
			$royalty_field = 0;
			$i = 0;

			foreach ($resultdata as $key => $value) {
				$total_l = 0;
				$total_m = 0;
				$total_r = 0;

				foreach ($value as $k => $v) {
					if (strpos($k, 'LRP') !== false) {
						$total_l += (int) $v;
						$lrp_field++;
					}

					if (strpos($k, 'Management') !== false) {
						$total_m += (int) $v;
						$management_field++;
					}

					if (strpos($k, 'Royalty') !== false) {
						$total_r += (int) $v;
						$royalty_field++;
					}
				}
				array_push($lrp_total, $total_l);
				array_push($management_total, $total_m);
				array_push($royalty_total, $total_r);
				$i++;
			}

			$html .= '
						<style>
							.mainTable th{
								text-align:center;
								background:yellow;
							}
						</style>

						<table class="mainTable" border="1">
							<tr>
					';

			foreach ($resultdata[0] as $field => $value) {
				if ($field == 'name') {
					$field = 'PT';
				}
				if ($field == 'tgl_transaksi') {
					$field = 'Tgl. Transaksi';
				}
				if ($field == 'pembeli') {
					$field = 'Pembeli';
				}
				if ($field == 'cluster') {
					$field = 'Kawasan / Tower';
				}
				if ($field == 'unit_number') {
					$field = 'Unit';
				}
				if ($field == 'land_size') {
					$field = 'Luas Tanah (SGA)';
				}
				if ($field == 'building_size') {
					$field = 'Luas Bangunan (Netto)';
				}
				if ($field == 'type_name') {
					$field = 'Tipe';
				}
				if ($field == 'harga_netto') {
					$field = 'Harga Netto';
				}
				if ($field == 'harga_total_jual') {
					$field = 'Harga Total';
				}
				if ($field == 'cara_bayar') {
					$field = 'Cara Pembayaran';
				}
				if ($field == 'cash_in') {
					$field = 'Cash In - Rp';
				}
				if ($field == 'cash_in_persen') {
					$field = 'Cash In - %';
				}
				if ($field == 'harga_bangunan') {
					$field = 'Selling Price Netto (Rp) Building - Total';
				}
				if ($field == 'harga_tanah_permeter') {
					$field = 'COGS Raw Land Rp - /M2 (Gross)';
				}
				if ($field == 'harga_tanah_permeter_efisiensi') {
					$field = 'COGS Raw Land Rp - /M2 (Netto)';
				}
				if ($field == 'harga_tanah') {
					$field = 'COGS Raw Land Rp - Total (Gross)';
				}
				if ($field == 'harga_tanah_efisiensi') {
					$field = 'COGS Raw Land Rp - Total (Netto)';
				}

				if ($field != 'unit_id') {
					$html .= '
								<th>' . str_replace("_", " ", $field) . '</th>
							';

					if ($field == 'LRP_' . ($lrp_field / $i)) {
						$html .= '
									<th>LRP Total</th>
								';
					}

					if ($field == 'Management_Fee_' . ($management_field / $i)) {
						$html .= '
									<th>Management Total</th>
								';
					}

					if ($field == 'Royalty_' . ($royalty_field / $i)) {
						$html .= '
									<th>Royalty Total</th>
								';
					}
				}
			}

			$html .= '</tr>';
			$totalArray = array();
			$x = 0;

			foreach ($resultdata as $rs) {
				$html .= '<tr>';
				$y = 0;

				foreach ($rs as $field => $value) {
					if ($field != 'unit_id') {
						if (is_numeric($value)) {
							if (!empty($totalArray[$y])) {
								$totalArray[$y] = $totalArray[$y] + $value;
							} else {
								$totalArray[$y] = $value;
							}
						} else {
							$totalArray[$y] = '';
						}

						$html .= '<td>' . $value . '</td>';

						if ($field == 'LRP_' . ($lrp_field / $i)) {
							$y++;
							$totalArray[$y] = array_sum($lrp_total);
							$html .= '
									<td>' . $lrp_total[$x] . '</td>
									';
						}

						if ($field == 'Management_Fee_' . ($management_field / $i)) {
							$y++;
							$totalArray[$y] = array_sum($management_total);
							$html .= '
									<td>' . $management_total[$x] . '</td>
									';
						}

						if ($field == 'Royalty_' . ($royalty_field / $i)) {
							$y++;
							$totalArray[$y] = array_sum($royalty_total);
							$html .= '
									<td>' . $royalty_total[$x] . '</td>
									';
						}
					}
					$y++;
				}
				$x++;
				$html .= '</tr>';
			}

			$html .= '
					<tr>
						<td colspan="6">Total</td>
					';

			foreach ($totalArray as $key => $value) {
				if ($key > 5) {
					$html .= '
								<td>' . $value . '</td>
							';
				}
			}

			$html .= '</table>';

			$customPaper = array(0, 0, 3100, 1000);

			$dompdf = new Dompdf($options);
			$dompdf->setPaper($customPaper);
			$dompdf->loadHtml($html);
			$dompdf->render();
			$output = $dompdf->output();

			if (file_put_contents($filePath, $output)) {
				$result['success'] = true;
				$result['url'] = $fileUrl;

				return $result;
			} else {
				$result['success'] = false;
				return $result;
			}
		} else {
			$result['success'] = false;
			$result['msg'] = 'Tidak ada data';
			return $result;
		}
	}
	
	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Bagihasilproses();
		$result = $model->LRPDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
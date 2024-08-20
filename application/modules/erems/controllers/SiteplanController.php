<?php

//require_once dirname(__DIR__) . '../library/apli/ApliController.php';
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_SiteplanController extends Zend_Controller_Action {

	// private $sm;
	// public function __construct($app) {
	//     $this->sm = $app->getServiceManager();
	// }

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->objPHPExcel = new PHPExcel();
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');

		$post_data['moderead_type'] = $this->getRequest()->getPost('moderead_type');
		if ($post_data['moderead_type'] == 'exportexcel') {
			$result = $this->exportdata($post_data);
		} else if ($post_data['moderead_type'] == 'loadSiteplan') {
			$result = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getfilesiteplan();
		} else if ($post_data['moderead_type'] == 'getunit') {
			$model_siteplan = new Erems_Models_Siteplan();

			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
			$result['unit'] = $model_siteplan->siteplanIndex($post_data);
		} else if ($post_data['moderead_type'] == 'exportexcel2') {
			$result = $this->exportdata2($post_data);
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

	function loadsvgAction() {
//        $this->getResponse()->setHeader('Content-Type', 'application/json');

		$model_siteplan = new Erems_Models_Siteplan();

		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');

		$result['legend'] = $model_siteplan->masterLegendList($post_data);
		$result['rulelegend'] = $model_siteplan->ruleLegend($post_data);
		$result['listunit'] = $model_siteplan->unitList($post_data);
		$result['siteplan_svg'] = $this->getRequest()->getPost('siteplan_svg');
		$this->view->assign('data', $result);
	}

	function detailAction() {

		$model_siteplan = new Erems_Models_Siteplan();
		$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
		$result['dtl'] = $model_siteplan->siteplanDetail($post_data);
		$this->view->assign('data', $result);
	}

	function cellColor($cells, $color) {
		// global $objPHPExcel;
		// $objPHPExcel = new PHPExcel();
		// $objPHPExcel->getActiveSheet()->getStyle($cells)->getFill()->applyFromArray(array(
		//     'type' => PHPExcel_Style_Fill::FILL_SOLID,
		//     'startcolor' => array(
		//          'rgb' => $color
		//     )
		// ));

		$this->objPHPExcel->getActiveSheet()->getStyle($cells)->applyFromArray(
				array(
					'fill' => array(
						'type' => PHPExcel_Style_Fill::FILL_SOLID,
						'color' => array('rgb' => $color)
					)
				)
		);
	}

	function exportdata($param) {
		$model = new Erems_Models_Siteplan();

		$result['block'] = $model->siteplanIndexBlock($param);
		$result['nomor'] = $model->siteplanIndexNomor($param);
		$result['detail'] = $model->siteplanIndex($param);

		$resultblock = $result['block']['data'];
		$resultnomor = $result['nomor']['data'];
		$resultdetail = $result['detail']['data'];

		// var_dump($resultdetail);die();

		if (count($resultblock) > 0) {
			// Instantiate a new PHPExcel object 
			// global $objPHPExcel;
			// $objPHPExcel = new PHPExcel();
			// Set the active Excel worksheet to sheet 0 
			$this->objPHPExcel->setActiveSheetIndex(0);
			// Initialise the Excel row number 

			$styleArray = array(
				'font' => array(
					'bold' => true,
					// 'color' => array('rgb' => 'FF0000'),
					'size' => 11,
				// 'name'  => 'Verdana'
				)
			);
			$this->objPHPExcel->getDefaultStyle()->applyFromArray($styleArray);

			$styleborderArray = array(
				'borders' => array(
					'allborders' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				)
			);

			$this->cellColor('A1', 'FF0000');
			$this->cellColor('A2', 'ffff00');
			$this->cellColor('A3', '808080');
			$this->cellColor('A4', 'ffa500');

			$this->cellColor('E1', 'fa8072');
			$this->cellColor('E2', '0000ff');
			$this->cellColor('E3', 'adff2f');
			$this->cellColor('E4', '008000');

			$this->objPHPExcel->getActiveSheet()->setCellValue('B1', 'Sold');
			$this->objPHPExcel->getActiveSheet()->setCellValue('B2', 'Sold Under 30%');
			$this->objPHPExcel->getActiveSheet()->setCellValue('B3', 'Proses Batal');
			$this->objPHPExcel->getActiveSheet()->setCellValue('B4', 'Hold');

			$this->objPHPExcel->getActiveSheet()->setCellValue('F1', 'Broken');
			$this->objPHPExcel->getActiveSheet()->setCellValue('F2', 'Booked');
			$this->objPHPExcel->getActiveSheet()->setCellValue('F3', 'Planning');
			$this->objPHPExcel->getActiveSheet()->setCellValue('F4', 'Available');

			$rowCount = 6;
			$column = 'B';

			$this->objPHPExcel->getActiveSheet()->setCellValue('A6', 'Lt/No');
			$this->objPHPExcel->getActiveSheet()->getStyle('A6')->applyFromArray($styleborderArray);
			foreach ($resultnomor as $field => $value) {
				// var_dump($value);
				$this->objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value['nomor']);
				$this->objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleborderArray);
				$column++;
			}


			// $block = $resultblock;
			// $detail = $resultdetail;
			$detail2 = array();
			$detail3 = array();

			$rowCount2 = 7;
			$column2 = 'B';

			$rowCount = 7;
			foreach ($resultblock as $value) {

				// $rowCount = 7;
				$column = 'A';
				// var_dump($rowCount);
				// var_dump($value);
				$this->objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value['blok']);
				$this->objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleborderArray);

				foreach ($resultdetail as $values) {
					if ($value['blok'] == $values['blok']) {
						$tes = array(trim($values['nomor']), $values['unit_id'], $values['status'], $values['batal'], $values['persen_payment']);
						array_push($detail2, $tes);
						array_push($detail3, trim($values['nomor']));
					}
				}


				foreach ($resultnomor as $val) {

					if (in_array(trim($val['nomor']), $detail3)) {
						//                                        var_dump('wew'.$val['nomor']);
						foreach ($detail2 as $data) {
							//                                          var_dump($data);

							if (trim($val['nomor']) == $data[0]) {
								$this->objPHPExcel->getActiveSheet()->setCellValue($column2 . $rowCount, $val['nomor']);
								$this->objPHPExcel->getActiveSheet()->getStyle($column2 . $rowCount)->applyFromArray($styleborderArray);
								if ($data[3] == 1) {
									$this->cellColor($column2 . $rowCount, '808080');
								} else {

									if ($data[2] == 5) {
										if ($data[4] < 30) {
											$this->cellColor($column2 . $rowCount, 'ffff00');
										} else {
											$this->cellColor($column2 . $rowCount, 'FF0000');
										}
									} else if ($data[2] == 11) {
										$this->cellColor($column2 . $rowCount, 'ffa500');
									} else if ($data[2] == 10) {
										$this->cellColor($column2 . $rowCount, 'fa8072');
									} else if ($data[2] == 4) {
										$this->cellColor($column2 . $rowCount, '0000ff');
									} else if ($data[2] == 1) {
										$this->cellColor($column2 . $rowCount, 'adff2f');
									} else if ($data[2] == 3) {
										$this->cellColor($column2 . $rowCount, '008000');
									}
								}
							}
						}
					} else {
						$this->cellColor($column2 . $rowCount, 'f5f5f5');
					}
					$column2++;
				}
				$column2 = 'B';
				$detail2 = array();
				$detail3 = array();
				$rowCount++;
			}

			// die();

			$objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel2007');

			$fileResult = 'Siteplan' . '_' . time() . '.xlsx';
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
			$url = 'app/erems/downloadfile/msexcel/' . $fileResult;

			$result['url'] = $url;
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}
		return $result;
	}

	function fixtableAction() {
		$model_siteplan = new Erems_Models_Siteplan();

		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$file_name = $this->getRequest()->getPost('file_name');

		// $result['block'] = $model_siteplan->siteplanIndexBlock($post_data);
		// $result['nomor'] = $model_siteplan->siteplanIndexNomor($post_data);
		$result['detail'] = $model_siteplan->siteplanIndex($post_data);

		$path = array(APPLICATION_PATH, 'modules', 'erems', 'views', 'scripts', 'siteplan');
		$view = new Zend_View(array('scriptPath' => implode(DIRECTORY_SEPARATOR, $path)));

		$view->data = $result['detail'];
		$view->filename = $file_name;
		echo $this->_response->setBody($view->render('fixtable.phtml'));
		die();
	}

	function exportdata2($param) {
		$model = new Erems_Models_Siteplan();
		$file = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getfilesiteplan();

		// $file = $this->filename;
		// var_dump(dirname(__DIR__)); die();
		require_once dirname(__DIR__) . '\\views\\scripts\\siteplan\\' . $file . '.phtml';

		// $result['block'] = $model->siteplanIndexBlock($param);
		// $result['nomor'] = $model->siteplanIndexNomor($param);
		$result['detail'] = $model->siteplanIndex($param);

		// $resultblock = $result['block']['data'];
		// $resultnomor = $result['nomor']['data'];
		$resultdetail = $result['detail']['data'];

		// added by rico 04042022
		$unit = str_split($resultdetail[0]['unit_number']);
		$unit_number = implode('', array_filter($unit, function ($a) {
					if (ctype_alpha($a)) {
						return $a;
					} else {
						return null;
					}
				}));

		// var_dump($resultdetail);die();

		if (count($resultdetail) > 0) {
			// Instantiate a new PHPExcel object 
			// global $objPHPExcel;
			// $objPHPExcel = new PHPExcel();
			// Set the active Excel worksheet to sheet 0 
			$this->objPHPExcel->setActiveSheetIndex(0);
			// Initialise the Excel row number 

			$styleArray = array(
				'font' => array(
					'bold' => true,
					// 'color' => array('rgb' => 'FF0000'),
					'size' => 11,
				// 'name'  => 'Verdana'
				)
			);
			$this->objPHPExcel->getDefaultStyle()->applyFromArray($styleArray);

			$styleborderArray = array(
				'borders' => array(
					'allborders' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN
					)
				)
			);

			$this->cellColor('A1', 'FF0000');
			$this->cellColor('A2', 'ffff00');
			$this->cellColor('A3', '808080');
			$this->cellColor('A4', 'ffa500');

			$this->cellColor('E1', 'fa8072');
			$this->cellColor('E2', '0000ff');
			$this->cellColor('E3', 'adff2f');
			$this->cellColor('E4', '008000');

			$this->objPHPExcel->getActiveSheet()->setCellValue('B1', 'Sold');
			$this->objPHPExcel->getActiveSheet()->setCellValue('B2', 'Sold Under 30%');
			$this->objPHPExcel->getActiveSheet()->setCellValue('B3', 'Proses Batal');
			$this->objPHPExcel->getActiveSheet()->setCellValue('B4', 'Hold');

			$this->objPHPExcel->getActiveSheet()->setCellValue('F1', 'Broken');
			$this->objPHPExcel->getActiveSheet()->setCellValue('F2', 'Booked');
			$this->objPHPExcel->getActiveSheet()->setCellValue('F3', 'Planning');
			$this->objPHPExcel->getActiveSheet()->setCellValue('F4', 'Available');

			$rowCount = 6;
			$column = 'A';
			foreach ($data as $value) {
				// echo '<tr>';
				foreach ($value as $xx) {
					// $this->objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $xx); 
					// $this->objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleborderArray);
					// $this->cellColor($column.$rowCount, 'f5f5f5');
					// var_dump($column . $rowCount); 
					if ($xx === "0") {
						$this->objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleborderArray);
						$this->cellColor($column . $rowCount, 'f5f5f5');
					} else {
						$x = null;
						foreach ($resultdetail as $val) {
							// added by rico 04042022
							$unit_x = str_split($xx);
							$x = implode('', array_filter($unit_x, function ($a) {
										if (ctype_alpha($a)) {
											return $a;
										} else {
											return null;
										}
									}));

							if ($val['unit_number'] == $xx) {
								$this->objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $val['unit_number']);
								$this->objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleborderArray);

								if ($val['batal'] == 1) {
									$this->cellColor($column . $rowCount, '808080');
								} else {
									if ($val['status'] == 5) {
										if ($val['persen_payment'] < 30) {
											$this->cellColor($column . $rowCount, 'ffff00');
										} else {
											$this->cellColor($column . $rowCount, 'FF0000');
										}
									} else if ($val['status'] == 11) {
										$this->cellColor($column . $rowCount, 'ffa500');
									} else if ($val['status'] == 10) {
										$this->cellColor($column . $rowCount, 'fa8072');
									} else if ($val['status'] == 4) {
										$this->cellColor($column . $rowCount, '0000ff');
									} else if ($val['status'] == 1) {
										$this->cellColor($column . $rowCount, 'adff2f');
									} else if ($val['status'] == 3) {
										$this->cellColor($column . $rowCount, '008000');
									}
								}
							} else {
								// $this->objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray($styleborderArray);
								// $this->cellColor($column.$rowCount, 'f5f5f5');
							}
						}
					}
					$column++;
				}
				// die();
				$column = 'A';
				// added by rico 04042022
				if ($x == $unit_number) {
					$rowCount++;
				}
			}

			$objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel2007');

			$fileResult = 'Siteplan' . '_' . time() . '.xlsx';
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
			$url = 'app/erems/downloadfile/msexcel/' . $fileResult;

			$result['url'] = $url;
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}
		return $result;
	}

}

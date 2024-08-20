<?php

class Erems_AdmincollectionController extends Zend_Controller_Action {

	function init() {
		date_default_timezone_set('Asia/Jakarta');
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {


		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		$mode_read = ($this->getRequest()->getPost('mode_read') ? $this->getRequest()->getPost('mode_read') : '');
		// var_dump($this->getRequest()->getPost('mode_read')); die();
		$model_admincollection = new Erems_Models_Admincollection();
		$model_buktipemilik = new Erems_Models_Buktipemilik();
		$model_bankkpr = new Erems_Models_Bankkpr();

		if ($read_type_mode == 'update_pengakuan_penjualan') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['pengakuan_penjualan_date'] = $this->getRequest()->getPost('pengakuan_penjualan_date');

			$result = $model_admincollection->admincollectionUpdatePengakuanPenjualanDate($post_data);
		} 
		// else if ($read_type_mode == 'subholding_config') {
		// 	$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		// 	$result = $config->activateSh1Features('admincollection');
		// } 
		else if ($mode_read == 'mastercollector') {
			$post_data['position'] = $this->getRequest()->getPost('position');
			$result = $model_admincollection->mastercollector($post_data);
		} else if ($read_type_mode == 'customer_document') {
			$post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$result = $model_buktipemilik->buktipemilikcustomerdocumentRead($post_data);
		} else if ($read_type_mode == 'validasium_config') {
			$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$result = $config->validasiumakad();
		} else if ($read_type_mode == 'cek_um') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_admincollection->cekum($post_data);
		} else if ($read_type_mode == 'update_collector') {
			$post_data['collector'] = $this->getRequest()->getPost('collector');
			$post_data['purchaseletter_id'] = Zend_Json::decode($this->getRequest()->getPost('purchaseletter_id'));
			$result = $model_admincollection->updateCollector($post_data);
		} else if ($read_type_mode == 'printout_lunasdp') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			$rs = $model_admincollection->printout_lunasdpRead($post_data);
			$resultdata = $rs['data'][0];

			// $is_print_lunas_dp = $this->getRequest()->getPost('is_print_lunas_dp');
			if ($resultdata['is_print_lunas_dp'] == 0) {
				$result = $model_admincollection->lunasdpUpdateCounterNo($post_data);
				if ($result['success'] == true) {
					// $document_name = $this->getRequest()->getPost('document_name');
					$result = $this->printout_lunasdp();
				}
			} else {
				// $document_name = $this->getRequest()->getPost('document_name');
				$result = $this->printout_lunasdp();
			}
		}
		//added by anas 04062021
		// else if ($read_type_mode == 'open_hari_va') {
		// 	$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

		// 	// edited by rico 14092021
		// 	$checklist = false;
		// 	if (is_array($config->showIncludeDendaVA())) {
		// 		$checklist = in_array($this->session->getUserId(), $config->showIncludeDendaVA());
		// 	} else {
		// 		$checklist = $this->session->getUserId() == $config->showIncludeDendaVA() ? TRUE : FALSE;
		// 	}

		// 	$result = array('button' => $config->validate_openhariVA(), 'checklist' => $checklist);
		// } 
		else if ($read_type_mode == 'update_openhariva') {
			$post_data['open_hari_va'] = (int) $this->getRequest()->getPost('open_hari_va');
			$post_data['include_denda_va'] = (int) $this->getRequest()->getPost('include_denda_va');
			$post_data['purchaseletter_id'] = Zend_Json::decode($this->getRequest()->getPost('purchaseletter_id'));
			$result = $model_admincollection->updateOpenHariVA($post_data);
		}
		else if ($read_type_mode == 'update_adjust_kpr') {
			$post_data['kpr_date_adjust']   = $this->getRequest()->getPost('kpr_date_adjust');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_admincollection->updateAdjustkprdate($post_data);
		}
		//end added by anas
		else if ($read_type_mode == 'remaining_denda') {
			$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			// edited by rico 14092021
			$genco = $config->validateDendaPrintSKLDP();
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = array('data' => $model_admincollection->checkRemainingDenda($post_data), 'genco' => $genco);
		} else if ($read_type_mode == 'printout') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('id');
			$post_data['param_string'] = $this->getRequest()->getPost('param_string');
			$document_name = $this->getRequest()->getPost('document_name');

			$rs = $model_admincollection->printRetensi($post_data);
			$resultdata = $rs['data'];

			$result = $this->printoutRetensi($resultdata, $document_name);
		} /* added by rico 22042022 */ else if($read_type_mode == 'printout_feekpr'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			$rs = $model_admincollection->printout_feekprRead($post_data);
			$resultdata = $rs['data'][0];

			if ($resultdata['is_print_fee_kpr'] == 0) {
				$result = $model_admincollection->feekprUpdateCounterNo($post_data);
				if ($result['success'] == true) {
					$result = $this->printout_feekpr();
				}
			} else {
				$result = $this->printout_feekpr();
			}
		} /* added by rico 06042023 */ else if($read_type_mode == 'printout_covernotes'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			// $rs = $model_admincollection->printout_covernotesRead($post_data);
			// $resultdata = $rs['data'][0];

			// if ($resultdata['is_print_fee_kpr'] == 0) {
			// 	$result = $model_admincollection->covernotesUpdateCounterNo($post_data);
			// 	if ($result['success'] == true) {
					$result = $this->printout_covernotes();
			// 	}
			// } else {
			// 	$result = $this->printout_covernotes();
			// }
		} /* added by rico 13022023 */ else if($read_type_mode == 'printout_suratkuasa'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			// $rs = $model_admincollection->printout_feekprRead($post_data);
			// $resultdata = $rs['data'][0];

			// if ($resultdata['is_print_fee_kpr'] == 0) {
			// 	$result = $model_admincollection->feekprUpdateCounterNo($post_data);
			// 	if ($result['success'] == true) {
					$result = $this->printout_suratkuasa();
			// 	}
			// } else {
			// 	$result = $this->printout_feekpr();
			// }
		} /* added by rico 12052023 */ else if($read_type_mode == 'printout_subsidikpr'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			// $rs = $model_admincollection->printout_feekprRead($post_data);
			// $resultdata = $rs['data'][0];

			// if ($resultdata['is_print_fee_kpr'] == 0) {
			// 	$result = $model_admincollection->feekprUpdateCounterNo($post_data);
			// 	if ($result['success'] == true) {
					$result = $this->printout_subsidikpr();
			// 	}
			// } else {
			// 	$result = $this->printout_feekpr();
			// }
		} /* added by rico 22042022 */ else if($read_type_mode == 'printout_buyback'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			// $rs = $model_admincollection->printout_buybackRead($post_data);
			// $resultdata = $rs['data'][0];

			// if ($resultdata['is_print_fee_kpr'] == 0) {
			// 	$result = $model_admincollection->feekprUpdateCounterNo($post_data);
			// 	if ($result['success'] == true) {
					$result = $this->printout_buyback();
			// 	}
			// } else {
			// 	$result = $this->printout_feekpr();
			// }
		} /* added by rico 22042022 */ else if($read_type_mode == 'printout_konfirmasi'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

			$result = $this->printout_konfirmasi();
		}else if($read_type_mode == 'printout_orderakta'){ // added by rico 14082023
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $this->printout_orderakta();
		}else if($read_type_mode == 'printout_suratbiaya'){ // added by rico 14082023
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $this->printout_suratbiaya();
		}else if($read_type_mode == 'printout_orderajb'){ // added by rico 14082023
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $this->printout_orderajb();
		}
		else if ($read_type_mode == 'configuration') {
			$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			// edited by rico 14092021
			$checklist = false;
			if (is_array($genco->showIncludeDendaVA())) {
				if(count($genco->showIncludeDendaVA()) > 0){
					$checklist = in_array($this->session->getUserId(), $genco->showIncludeDendaVA());
				}else{
					$checklist = true;
				}
			} else {
				$checklist = $this->session->getUserId() == $genco->showIncludeDendaVA() ? TRUE : FALSE;
			}
			
			// added by rico 29/07/2024
			$button = false;
			if(is_array($genco->validate_openhariVA())){
				if(count($genco->validate_openhariVA()) > 0){
					$button = in_array($this->session->getUserId(), $genco->validate_openhariVA());
				}else{
					$button = TRUE;
				}
			}else{
				$button = $this->session->getUserId() == $genco->validate_openhariVA() ? TRUE : FALSE;
			}

			$subholding_config = $genco->activateSh1Features('admincollection');

			$appDao = new Erems_Models_Master_AppDao();

			$hasil_batas_toleransi = $appDao->getGlobalParam($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), "BATAS_TOLERANSI");
			$batas_toleransi = 0;
			if (is_array($hasil_batas_toleransi) && count($hasil_batas_toleransi) > 0) {
				if (is_array($hasil_batas_toleransi[0]) && count($hasil_batas_toleransi[0]) > 0) {
					$batas_toleransi = intval($hasil_batas_toleransi[0][0]["value"]);
				}
			}

			$hasil_denda_permil = $appDao->getGlobalParam($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), "DENDA_PERMIL");
			$denda_permil = 0;
			if (is_array($hasil_denda_permil) && count($hasil_denda_permil) > 0) {
				if (is_array($hasil_denda_permil[0]) && count($hasil_denda_permil[0]) > 0) {
					$denda_permil = floatval($hasil_denda_permil[0][0]["value"]);
				}
			}

			$result = array(
				'button'            => $button, 
				// 'button'            => $genco->validate_openhariVA(), 
				'active_check_akad' => $genco->getActiveCheckAkad(), 
				'checklist'         => $checklist,
				'subholding_config' => $subholding_config,
				'batas_toleransi'   => $batas_toleransi,
				'denda_permil'      => $denda_permil,
			);
		}
		else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
			// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
			$post_data['purchase_startdate'] = $this->getRequest()->getPost('purchase_startdate');
			$post_data['purchase_enddate'] = $this->getRequest()->getPost('purchase_enddate');
			$post_data['pricetype_id'] = $this->getRequest()->getPost('pricetype_id');
			$post_data['recommended_tocancel_id'] = $this->getRequest()->getPost('cancel_type');
			$post_data['is_akad'] = $this->getRequest()->getPost('cbf_akad');

			$result = $model_admincollection->admincollectionRead($post_data);
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	// added by rico 15122021
	function printoutRetensi($res, $document_name) {
		$data = array();
		if (count($res) > 0) {
			foreach ($res as $field => $value) {
				$data[$field] = $value;
			}

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'pencairan_retensi/' . $document_name;

			$finalFile = 'PENCAIRAN_RETENSI_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data[0]);

			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	function printout_lunasdp() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_lunasdpRead($post_data);

		$resultdata = $rs['data'][0];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			// $data["schedule_list"] = str_replace('\n ', '             ', $data["schedule_list"]);
			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			// $wpdf = new Erems_Box_Library_WordToPdf();
			//$fileSrc = 'template_ppjb.docx';
			//$fileSrc = 'sppjbprintout/'.$data["document_name"];
			$fileSrc = 'lunasdpprintout/' . $document_name;

			$finalFile = 'SURATLUNASDP_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);

			// $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			// if($generalConfig->getFormatFileSPT()=="pdf"){
			//     $wpdf->convert($p->getUrl());
			//     $pathUrl = str_replace(".docx",".pdf",$p->getUrl());
			// }else{
			$pathUrl = $p->getUrl();
			// }

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	/* function createAction() {



	  $this->getResponse()->setHeader('Content-Type', 'application/json');

	  $result = array('data' => array(), 'total' => 0, 'success' => false);

	  $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

	  $model_admincollection = new Erems_Models_Admincollection();
	  $result = $model_admincollection->admincollectionCreate($post_data);

	  echo Zend_Json::encode($result);

	  $this->_helper->viewRenderer->setNoRender(true);
	  }

	  function updateAction() {
	  $this->getResponse()->setHeader('Content-Type', 'application/json');

	  $result = array('data' => array(), 'total' => 0, 'success' => false);

	  $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

	  $mode_admincollection = new Erems_Models_Admincollection();
	  $result = $mode_admincollection->admincollectionUpdate($post_data);

	  echo Zend_Json::encode($result);

	  $this->_helper->viewRenderer->setNoRender(true);
	  }

	  function deleteAction() {
	  $this->getResponse()->setHeader('Content-Type', 'application/json');

	  $result = array('data' => array(), 'total' => 0, 'success' => false);

	  $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

	  $mode_admincollection = new Erems_Models_Admincollection();
	  $result = $mode_admincollection->admincollectionDelete($post_data);

	  echo Zend_Json::encode($result);

	  $this->_helper->viewRenderer->setNoRender(true);
	  } */

	function printout_feekpr() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_feekprRead($post_data);

		$resultdata = $rs['data'][0];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'lunasdpprintout/' . $document_name;

			$finalFile = 'SURATFEEKPR_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	// added by rico 13022023
	function printout_suratkuasa() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_suratkuasaRead($post_data);

		$resultdata = $rs['data'][0];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'suratkuasakpr/' . $document_name;

			$finalFile = 'SURATKUASA_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	// added by rico 13022023
	function printout_covernotes() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_covernotesRead($post_data);

		$resultdata = $rs['data'][0];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'covernotes/' . $document_name;

			$finalFile = 'COVERNOTES_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	function printout_subsidikpr() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_subsidikprRead($post_data);

		$resultdata = $rs['data'][0];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'subsidikpr/' . $document_name;

			$finalFile = 'SURATSUBSIDIKPR_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}
	
	function printout_buyback() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_buybackRead($post_data);
		$resultdata = $rs['data'];

		// var_dump($resultdata);
		// die;
		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			// $data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			// $data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			// $data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			// $data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			// $data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'buyback/' . $document_name;

			$finalFile = 'BUYBACK_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}
	
	// added rico 17072023
	function printout_konfirmasi() {
		$model = new Erems_Models_Admincollection();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$document_name = $this->getRequest()->getPost('document_name');
		$post_data['tunggakan'] = $this->getRequest()->getPost('tunggakan'); // added by rico 17072023

		$rs = $model->printout_konfirmasiRead($post_data);

		$resultdata = $rs['data'][0];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'konfirmasitunggakan/' . $document_name;

			$finalFile = 'Konfirmasi_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();
			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}

	// added by rico 13022023
	function printout_orderakta() {
		$model = new Erems_Models_Admincollection();
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_orderaktaRead($post_data);

		$resultdata = $rs['data'];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'orderakta/' . $document_name;

			$finalFile = 'ORDERAKTA_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}
	// added by rico 13022023
	function printout_suratbiaya() {
		$model = new Erems_Models_Admincollection();
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_suratbiayaRead($post_data);

		$resultdata = $rs['data'];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'suratbiaya/' . $document_name;

			$finalFile = 'SURATBIAYALEGALITAS_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}
	// added by rico 13022023
	function printout_orderajb() {
		$model = new Erems_Models_Admincollection();
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$document_name = $this->getRequest()->getPost('document_name');

		$rs = $model->printout_orderajbRead($post_data);

		$resultdata = $rs['data'];

		$result['success'] = false;

		$data = array();
		if (count($resultdata) > 0) {
			foreach ($resultdata as $field => $value) {
				$data[$field] = $value;
			}

			$p = new Erems_Box_Library_MyWordParser();
			$fileSrc = 'orderajb/' . $document_name;

			$finalFile = 'ORDERAJB_DOC_' . time() . '.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			$pathUrl = $p->getUrl();

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}

		return $result;
	}
}

?>
<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_PopupmasterController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		// $post_data['start'] = $this->getRequest()->getPost('start');
		// $post_data['limit'] = $this->getRequest()->getPost('limit');
		// $post_data['page']  = $this->getRequest()->getPost('page');

		// $post_data['unit_number']       = $this->getRequest()->getPost('unit_number');
		// $post_data['purchaseletter_no'] = $this->getRequest()->getPost('purchaseletter_no');
		// $post_data['customer_name']     = $this->getRequest()->getPost('customer_name');

		// $post_data['popup_type'] = $this->getRequest()->getPost('popup_type');

		$post_data  = $this->getRequest()->getPost();
		$exportData = isset($post_data['export_excel']) ? $post_data['export_excel'] : 0;

		if($exportData == 1){
			$result = $this->exportdata($post_data);
		}
		else{
			$model = new Erems_Models_Popupmaster();
			if ($post_data['popup_type'] == 'belumakadkredit') { $result = $model->popupbelumakadkreditRead($post_data); } 
			else if ($post_data['popup_type'] == 'sudahakadkredit') { $result = $model->popupsudahakadkreditRead($post_data); } 
			else if ($post_data['popup_type'] == 'belumsppjb') { $result = $model->popupbelumsppjbRead($post_data); } 
			else if ($post_data['popup_type'] == 'belumajb') { $result = $model->popupbelumajbRead($post_data); } 
			else if ($post_data['popup_type'] == 'belumhgbpt') { $result = $model->popupbelumhgbptRead($post_data); } 
			else if ($post_data['popup_type'] == 'belumhgbcustomer') { $result = $model->popupbelumhgbcustomerRead($post_data); } 
			else if ($post_data['popup_type'] == 'pembatalan') { $result = $model->popuppembatalanRead($post_data); } 
			else if ($post_data['popup_type'] == 'belumst') { $result = $model->popupbelumstRead($post_data); } 
			else if ($post_data['popup_type'] == 'belumimb') { $result = $model->popupbelumimbRead($post_data); } 
			else if ($post_data['popup_type'] == 'sudahprogressbelumcair') { $result = $model->popupsudahprogressbelumcairRead($post_data); } 
			else if ($post_data['popup_type'] == 'popupchangecancelrev') { $result = $model->popupchangecancelrevRead($post_data); }
			else if ($post_data['popup_type'] == 'listsertifikat') { $result = $model->popuplistsertifikatRead($post_data);} 
			else if ($post_data['popup_type'] == 'spkenahariini') { $result = $model->popupspkenahariiniRead($post_data); } 
			else if ($post_data['popup_type'] == 'agingcomplaint') { $result = $model->popupagingcomplaintRead($post_data); }
			else if ($post_data['popup_type'] == 'insentifpajak') { $result = $model->popupinsentifpajakRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'lunasum') { $result = $model->popuplunasumRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popupppatk') { $result = $model->popupppatkRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popupreservation') { $result = $model->popupreservationRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popupprintedlunasdp') { $result = $model->popupprintedlunasdpRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'lunasumbelumakad') { $result = $model->popuplunasumbelumakadRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'vida') { $result = $model->popupvidaRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'perpanjanganschedule') { $result = $model->popupperpanjanganscheduleRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'hasilsurvey') { $result = $model->popuphasilsurveyRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'dibiayaiinstansi') { $result = $model->popupdibiayaiinstansiRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'upgradeppn') { $result = $model->upgradeppnRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'followuphistory') { $result = $model->popupfollowuphistoryRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popupkomisi') { $result = $model->popupkomisiRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'adminfeekpr') { $result = $model->adminfeekprRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'hargadatastock') { $result = $model->hargadatastockRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popuppenundaanbiayalegalitas') { $result = $model->penundaanbiayaRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'documenthistorycustomer') { $result = $model->documenthistorycustomerRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'documenthistoryunit') { $result = $model->documenthistoryunitRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'logkomunikasicustomer') { $result = $model->logkomunikasicustomerRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popuppurchaseletterreward') { $result = $model->popuppurchaseletterrewardRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'popuplistautocancel') { $result = $model->popuplistautocancelRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'listpembatalan') { $result = $model->popuplistpembatalanRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'listbelumkomisi') { $result = $model->popuplistbelumkomisiRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'blokirpurchaseletter') { $result = $model->popupblokirpurchaseletterRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'pinjampakailunas') { $result = $model->popuppinjampakailunasRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'discountcollection') { $result = $model->popupdiscountcollectionRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'disckaryawan') { $result = $model->popupdisckaryawanRead($post_data, 'grid'); } 
			else if ($post_data['popup_type'] == 'jatuhtempoescrow') { $result = $model->popupjatuhtempoescrowRead($post_data); }
			else if ($post_data['popup_type'] == 'ppatkLapor') { $result = $model->popupppatkLapor(Zend_Json::decode($this->getRequest()->getPost('data'))); }
			else if ($post_data['popup_type'] == 'popupfakturtagihan') { $result = $model->popupfakturtagihanRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'dendasystem') { $result = $model->popupdendasystemRead($post_data, 'grid'); }
			else if ($post_data['popup_type'] == 'unitlunas') { $result = $model->popupunitlunasRead($post_data, 'grid'); }
		}

		// if ($post_data['popup_type'] == 'belumakadkredit') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumakadkreditRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'sudahakadkredit') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupsudahakadkreditRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'belumsppjb') {
		// 	$post_data['pricetype_id'] = $this->getRequest()->getPost('pricetype_id');
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumsppjbRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'belumajb') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumajbRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'belumhgbpt') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumhgbptRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'belumhgbcustomer') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumhgbcustomerRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'pembatalan') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popuppembatalanRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'belumst') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumstRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'belumimb') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupbelumimbRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'sudahprogressbelumcair') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupsudahprogressbelumcairRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'popupdenda') { //modul tommy nebeng export disini
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	}
		// }
		// //edited by Rizal 1 Maret 2019
		// else if ($post_data['popup_type'] == 'popupchangecancelrev') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupchangecancelrevRead($post_data);
		// 	}
		// }
		// //endedited
		// else if ($post_data['popup_type'] == 'listsertifikat') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popuplistsertifikatRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'spkenahariini') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupspkenahariiniRead($post_data);
		// 	}
		// } else if ($post_data['popup_type'] == 'agingcomplaint') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupagingcomplaintRead($post_data);
		// 	}
		// }
		// else if ($post_data['popup_type'] == 'insentifpajak') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupinsentifpajakRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by anas 23062021
		// else if ($post_data['popup_type'] == 'lunasum') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuplunasumRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// else if ($post_data['popup_type'] == 'popupppatk') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupppatkRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// else if ($post_data['popup_type'] == 'popupreservation') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupreservationRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// else if ($post_data['popup_type'] == 'popupprintedlunasdp') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupprintedlunasdpRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 19112021
		// else if ($post_data['popup_type'] == 'lunasumbelumakad') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuplunasumbelumakadRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 06122021
		// else if ($post_data['popup_type'] == 'vida') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupvidaRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 07122021
		// else if ($post_data['popup_type'] == 'perpanjanganschedule') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupperpanjanganscheduleRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 18012022
		// else if ($post_data['popup_type'] == 'hasilsurvey') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuphasilsurveyRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 27012022
		// else if ($post_data['popup_type'] == 'dibiayaiinstansi') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupdibiayaiinstansiRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 2503022
		// else if ($post_data['popup_type'] == 'upgradeppn') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->upgradeppnRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 26072022
		// else if ($post_data['popup_type'] == 'followuphistory') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupfollowuphistoryRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by dika 30032022
		// else if ($post_data['popup_type'] == 'popupkomisi') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupkomisiRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 07042022
		// else if ($post_data['popup_type'] == 'adminfeekpr') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->adminfeekprRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 23082022
		// else if ($post_data['popup_type'] == 'hargadatastock') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->hargadatastockRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 02092022
		// else if ($post_data['popup_type'] == 'popuppenundaanbiayalegalitas') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->penundaanbiayaRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 02092022
		// else if ($post_data['popup_type'] == 'documenthistorycustomer') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->documenthistorycustomerRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 02092022
		// else if ($post_data['popup_type'] == 'documenthistoryunit') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->documenthistoryunitRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 02092022
		// else if ($post_data['popup_type'] == 'logkomunikasicustomer') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->logkomunikasicustomerRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 2503022
		// else if ($post_data['popup_type'] == 'popuppurchaseletterreward') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuppurchaseletterrewardRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 10102022
		// else if ($post_data['popup_type'] == 'popuplistautocancel') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuplistautocancelRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 12102022
		// else if ($post_data['popup_type'] == 'listpembatalan') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuplistpembatalanRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 23112022
		// else if ($post_data['popup_type'] == 'listbelumkomisi') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuplistbelumkomisiRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 28112022
		// else if ($post_data['popup_type'] == 'blokirpurchaseletter') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupblokirpurchaseletterRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 18012023
		// else if ($post_data['popup_type'] == 'pinjampakailunas') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popuppinjampakailunasRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 18012023
		// else if ($post_data['popup_type'] == 'discountcollection') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupdiscountcollectionRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// //added by rico 19012023
		// else if ($post_data['popup_type'] == 'disckaryawan') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupdisckaryawanRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// } 
		// //added by rico 16022023
		// else if ($post_data['popup_type'] == 'jatuhtempoescrow') {
		// 	$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		// 	$post_data['plafon_id'] = $this->getRequest()->getPost('plafon_id');

		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($post_data);
		// 	} else {
		// 		$result = $model->popupjatuhtempoescrowRead($post_data);
		// 	}
		// }else if ($post_data['popup_type'] == 'ppatkLapor') { //added by rico 16032023
		// 	$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		// 	$result = $model->popupppatkLapor($post_data);
		// }
		// // added by rico 13042023
		// else if ($post_data['popup_type'] == 'popupfakturtagihan') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupfakturtagihanRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// // added by rico 16052023
		// else if ($post_data['popup_type'] == 'dendasystem') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupdendasystemRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }
		// else if ($post_data['popup_type'] == 'unitlunas') {
		// 	if ($exportData == 1) {
		// 		$result = $this->exportdata($this->getRequest()->getPost());
		// 	} else {
		// 		$result = $model->popupunitlunasRead($this->getRequest()->getPost(), 'grid');
		// 	}
		// }

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function exportdata($param) {
		$model = new Erems_Models_Popupmaster();

		$result     = $model->exportData($param);
		$resultdata = $result['data'][0];
		
		/// Add by Erwin.S 15042021
		$col_date = array('firstpurchase_date', 'purchase_date', 'last_payment_date', 'ajb_date', 'serahterima_date', 'birthdate', 'sppjb_sign_date', 'kpr_acc_date','tanggal_cair_fee_kpr','tgl_akad', 'sp1_date', 'sp2_date', 'sp3_date', 'sp4_date', 'last_updated', 'duedate_tanda_jadi', 'duedate_batal','tanggal_blokir','pinjampakai_date', 'duedate_escrow','tanggal_tagihan','jatuhtempo_date', 'duedate');
		$col_decimal = array('harga_netto', 'harga_total_jual', 'total_payment', 'persen_bayar', 'progress','harga_jual_total_tunai','harga_jual_total_kpr','harga_jual_total_inhouse','disc_collection','remaining_denda');
		$col_phone = array('phone');

		if (count($resultdata) > 0) {

			// Instantiate a new PHPExcel object 
			$objPHPExcel = new PHPExcel();
			// Set the active Excel worksheet to sheet 0 
			$objPHPExcel->setActiveSheetIndex(0);
			// Initialise the Excel row number 
			$rowCount = 1;
			$column = 'A';

			foreach ($resultdata[0] as $field => $value) {
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ucwords(str_replace('_', ' ', $field)));
				/// Add by Erwin.S 15042021
				$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->getFont()->setBold(true);
				$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->getFont()->setSize(13);
				$column++;
			}

			$rowCount = 2;
			foreach ($resultdata as $rs) {
				$column = 'A';
				foreach ($rs as $field => $value) {
					
					/// Add by Erwin.S 15042021
					if(!empty($value)){
						if(in_array($field, $col_date)){
							$value = date("d/m/Y", strtotime($value));	
						}
						else if(in_array($field, $col_decimal)){
							$value = doubleval($value);
						}
						// added by rico 12092022
						else if(in_array($field, $col_phone)){
							$value = sprintf("%02s ", $value);
						}
					}

					if($param['popup_type'] == 'unitlunas'){ /// Add by Erwin.S
						if(isset($rs['remaining_denda']) && $rs['remaining_denda'] > 0){
							$objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->applyFromArray(
							    array(
							        'fill' => array(
										'type'  => PHPExcel_Style_Fill::FILL_SOLID,
										'color' => array('rgb' => 'ffc8c8')
							        )
							    )
							);
						}
					}

					$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);
					$column++;
				}
				$rowCount++;
			}

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

			$fileResult = 'List_popup_' . $param['popup_type'] . '_' . time() . '.xlsx';
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

?>

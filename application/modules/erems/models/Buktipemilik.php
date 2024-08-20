<?php

class Erems_Models_Buktipemilik extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 't_buktipemilik';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	// function buktipemilikRead($param) {
	// $return['success'] = false;
	// if (is_array($param) && count($param)) {
	// try {
	// $resultcount = $this->execSP('sp_buktipemilik_count', 
	// $param['cluster_id'], 
	// $param['pt_id'], 
	// $param['block_id'], 
	// $param['unit_id'], 
	// // $param['kavling_number_start'], 
	// // $param['kavling_number_end'], 
	// $param['unit_number'],
	// $param['customer_name'],
	// $param['position_id'], 
	// $param['productcategory_id'], 
	// $param['type_id'], 
	// $param['unitstatus_id'],
	// $this->session->getCurrentProjectId(), 
	// $this->session->getCurrentPtId()
	// );
	// $resultdata = $this->execSP('sp_buktipemilik_read', 
	// $param['cluster_id'], 
	// $param['pt_id'], 
	// $param['block_id'], 
	// $param['unit_id'], 
	// // $param['kavling_number_start'], 
	// // $param['kavling_number_end'], 
	// $param['unit_number'],
	// $param['customer_name'],
	// $param['position_id'], 
	// $param['productcategory_id'], 
	// $param['type_id'], 
	// $param['unitstatus_id'],
	// $this->session->getCurrentProjectId(), 
	// $this->session->getCurrentPtId(),
	// $param['start'], 
	// $param['limit']
	// );
	// $return['total'] = $resultcount[0]['RECORD_TOTAL'];
	// $return['data'] = $resultdata;
	// $return['success'] = true;
	// } catch (Exception $e) {
	// var_dump($e->getMessage());
	// }
	// }
	// return $return;
	// }

	function buktipemilikRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {

			try {
				$limit = (empty($param['limit'])) ? 25 : $param['limit'];
				$page = (empty($param['page'])) ? 1 : $param['page'];
				$start = (empty($param['start'])) ? 0 : $param['start'];

				$data = array(
					$param['cluster_id'],
					$param['pt_id'],
					$param['block_id'],
					$param['unit_id'],
					$param['unit_number'],
					$param['customer_name'],
					$param['position_id'],
					$param['productcategory_id'],
					$param['type_id'],
					$param['unitstatus_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$start,
					$limit,
					$page
				);
				$result = $this->execSP3('sp_buktipemilik_new_read', $data);
				// print_r("expression");
				$return['total']   = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result[1];
				$return['success'] = true;

			} catch (Exception $e) { /* var_dump($e->getMessage()); */ }
		}
		return $return;
	}

	function hgbajbRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
			/* $resultcount = $this->execSP('sp_hgbajb_count', 
			  $param['hgbajb_id'],
			  $param['buktipemilik_id']
			  );

			  $resultdata = $this->execSP('sp_hgbajb_read',
			  $param['hgbajb_id'],
			  $param['buktipemilik_id'],
			  $param['start'],
			  $param['limit']
			  ); */
			  $resultdata = $this->execSP('sp_hgbajb_buktipemilik_read',
			  	$param['buktipemilik_id'],
			  	$param['temp_buktipemilik_id']
			  );

			//$return['total'] = $resultcount[0]['RECORD_TOTAL'];
			  $return['data'] = $resultdata;
			  $return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function buktipemilikCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				if ($param['is_hgbajb_detail'] == 'yes') {
					$affectedRow = $this->execSP('sp_hgbajb_create',
						$param['hgbajb_buktipemilik_id'],
						$param['hgbinduk_id'],
						$param['ajb_name'],
						$param['ajb_sign_date'],
						$param['ajb_notaris_date'],
						$param['ajb_number'],
						$param['ajb_date'],
						$param['notaris_id'],
						$param['ajb_skmht_date'],
						$param['ajb_apht_date'],
						$param['ajb_tocustomer_date'],
						$param['ajb_tocontractor_date'],
						$param['hgb_number'],
						$param['hgb_date'],
						$param['hgb_gsgu_no'],
						$param['hgb_gsgu_date'],
						((!$param['hgb_gsgu_luas'] ? 0 : $param['hgb_gsgu_luas'])),
						$param['hgb_tocustomer_date'],
						$param['hgb_tocontractor_date'],
						$param['pt_hgb_no'],
						$param['pt_hgb_date'],
						$param['pt_gsgu_no'],
						$param['pt_gsgu_date'],
						((!$param['pt_luas'] ? 0 : $param['pt_luas'])),
						$param['pt_id'],
						$param['note'],
						$param['temp_buktipemilik_id'],
						$param['ajb_legal_tonotaris_date'],
						$param['ajb_notaris_tolegal_date'],
						$param['ajb_legal_toperijinan_date'],
						$param['hgb_perijinan_tolegal_date'],
						$param['hgb_legal_toperijinan_date'],
						$param['hgb_shm_perijinan_tolegal_date'],
						$param['hgb_notaris_tobank_date'],
						$param['hgb_target_date'],
						$param['hgb_hm_no'],
						$param['hgb_hm_tocustomer_date'],
						$param['hgb_nop'],
						$param['ajb_is_status_balik_nama'],
						$param['ajb_balik_nama_date'],
						$param['hgb_gsgu_land_date'],
						$param['kelengkapan_berkas_ajb_date'],
						$param['girik_id'],
						$param['akta_no_sh1'],
						$param['akta_date_sh1'],
						$param['notaris_id_sh1'],
						$param['tgl_terbit_pt'],
						$param['tgl_berakhir_pt'],
						$param['tgl_terima_pt'],
						$param['tgl_keluar_pt'],
						$param['posisi_pt'],
						$param['kelurahan_pt'],
						//start addby:fatkur, addon:22/7/19
						$param['hpl_date'],
						$param['hpl_terima_date'],
						$param['hpl_keluar_date'],
						$param['hpl_akhir_date'],
						$param['hpl_no_gs'],
						$param['hpl_skpt_no'],
						$param['hpl_kelurahan'],
	//                                                                        $param['hpl_luas'],
						((!$param['hpl_luas'] ? 0 : $param['hpl_luas'])),
						//end
						$param['ajb_validasipphselesai_date'],
						## Add by RH 05/06/2020 ##
						$param['pt_hgb_nib'],
						## END Add by RH 05/06/2020 ##
						$this->session->getUserId(),
						'1',
						$param['lunas_notaris'],
						$param['hgbajb_unit_id']
					);
					$return['success'] = (bool) $affectedRow;
				} else {

					$param_akad = $param['details_akad'];
					$akadconfirmation_id = '';
					$akadconfirmation_pl_id = '';
					$akadconfirmation_plbankkpr_id = '';
					$akadconfirmation_index = '';
					$akadconfirmation_date = '';
					$akadconfirmation_status_id = '';
					$akadconfirmation_note = '';
					$deleted_akad = '';
					$temp_id_akad = '';
					if (is_array($param_akad) && count($param_akad) > 0) {
						foreach ($param_akad as $idx => $data) {

							foreach ($data as $key => $value) {
								switch ($key) {
									case 'akadconfirmation_id': $akadconfirmation_id .= $value . "~";
									break;
									case 'purchaseletter_id': $akadconfirmation_pl_id .= $value . "~";
									break;
									case 'purchaseletter_bankkpr_id': $akadconfirmation_plbankkpr_id .= $value . "~";
									break;
									case 'akadconfirmation_index': $akadconfirmation_index .= $value . "~";
									break;
									case 'akadconfirmation_date': $akadconfirmation_date .= $value . "~";
									break;
									case 'akadconfirmation_status_id': $akadconfirmation_status_id .= $value . "~";
									break;
									case 'akadconfirmation_note': $akadconfirmation_note .= $value . "~";
									break;
									case 'deleted': $deleted_akad .= $value . "~";
									break;
									case 'temp_id_akad': $temp_id_akad .= $value . "~";
									break;
								}
							}
						};

						$akadconfirmation_id = preg_replace('/(~)$/', '', $akadconfirmation_id);
						$akadconfirmation_pl_id = preg_replace('/(~)$/', '', $akadconfirmation_pl_id);
						$akadconfirmation_plbankkpr_id = preg_replace('/(~)$/', '', $akadconfirmation_plbankkpr_id);
						$akadconfirmation_index = preg_replace('/(~)$/', '', $akadconfirmation_index);
						$akadconfirmation_date = preg_replace('/(~)$/', '', $akadconfirmation_date);
						$akadconfirmation_status_id = preg_replace('/(~)$/', '', $akadconfirmation_status_id);
						$akadconfirmation_note = preg_replace('/(~)$/', '', $akadconfirmation_note);
						$deleted_akad = preg_replace('/(~)$/', '', $deleted_akad);
						$temp_id_akad = preg_replace('/(~)$/', '', $temp_id_akad);
					}
					$affectedRow = $this->execSP('sp_buktipemilik_create',
						$param['temp_buktipemilik_id'],
						$param['unit_id'],
						$param['imb_no'],
						$param['imb_date'],
						$param['imb_buy_date'],
						$param['imb_legal_date'],
						$param['pbbinduk_id'],
						$param['nop'],
						$param['note_bp'],
						$param['reg_date'],
						$param['imb_target_date'],
						$param['ijin_tobpt_date'],
						$param['bpt_toijin_date'],
						$param['imb_pecahan_no'],
						$param['reg_pecahan_date'],
						$param['ijin_tobpt_pecahan_date'],
						$param['bpt_toijin_pecahan_date'],
						$param['imb_legal_pecahan_date'],
						$param['pbb_ijin_topemda_date'],
						$param['pbb_pemda_toijin_date'],
						$param['ssp_terima_date'],
						$param['aftersales_st_date'],
						$param['pengurusan_ijin_topemda_date'],
						$param['pengurusan_pemda_toijin_date'],
						$param['pengukuran_ijin_tobpn_date'],
						$param['pengukuran_bpn_toijin_date'],
						$param['note_bp'],
						$param['akad_note_bp'],
						$param['imb_khusus_no'],
						$param['reg_khusus_date'],
						$param['ijin_tobpt_khusus_date'],
						$param['bpt_toijin_khusus_date'],
						$param['imb_legal_khusus_date'],
						$param['imb_buy_khusus_date'],
						$param['sk_terbit_date'],
						$param['status_sby'],
						$param['terbit_untuk_sby'],
						$param['keterangan_sby'],
						$param['girik'],
						$param['akad_realisasiondate'],
						$param['is_use'],
						$param['purchaseletter_id'],
						$akadconfirmation_id,
						$akadconfirmation_pl_id,
						$akadconfirmation_plbankkpr_id,
						$akadconfirmation_index,
						$akadconfirmation_date,
						$akadconfirmation_status_id,
						$akadconfirmation_note,
						$deleted_akad,
						$temp_id_akad,
						$this->session->getUserId(),
						'1',
						$param['tanggal_akta_subrogasi'],
						$param['is_holdlegal'],
						$param['notes_holdlegal'],
						$param['unitstatus_id'],
						$param['notaris_id'],
						$param['no_akta_subrogasi'],
						$param['is_unit_dikosongkan'],
						$param['is_tundapembayaran_legalitas'], // added by rico 02092022
						$param['notaris_akta_id'], // added by rico 14082023
						$param['notaris_ajb_id'], // added by rico 14082023
						$param['imb_pecahan_date'],
						$param['akta_notaril_no'],
						$param['notaris'],
						$param['tanggal_akta'],
						$param['tanggal_tanda_tangan']
					);
					$return['success'] = (bool) $affectedRow;
				}
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function buktipemilikUpdate($param = array()) {
		$return['success'] = false;
	// var_dump($param);die();
		if (is_array($param) && count($param)) {
			try {
				if ($param['is_hgbajb_detail'] == 'yes') {
					$affectedRow = $this->execSP('sp_hgbajb_update',
						$param['hgbajb_id'],
						$param['hgbajb_buktipemilik_id'],
						$param['hgbinduk_id'],
						$param['ajb_name'],
						$param['ajb_sign_date'],
						$param['ajb_notaris_date'],
						$param['ajb_number'],
						$param['ajb_date'],
						$param['notaris_id'],
						$param['ajb_skmht_date'],
						$param['ajb_apht_date'],
						$param['ajb_tocustomer_date'],
						$param['ajb_tocontractor_date'],
						$param['hgb_number'],
						$param['hgb_date'],
						$param['hgb_gsgu_no'],
						$param['hgb_gsgu_date'],
						((!$param['hgb_gsgu_luas'] ? 0 : $param['hgb_gsgu_luas'])),
						$param['hgb_tocustomer_date'],
						$param['hgb_tocontractor_date'],
						$param['pt_hgb_no'],
						$param['pt_hgb_date'],
						$param['pt_gsgu_no'],
						$param['pt_gsgu_date'],
						((!$param['pt_luas'] ? 0 : $param['pt_luas'])),
						$param['pt_id'],
						$param['note'],
						$param['ajb_legal_tonotaris_date'],
						$param['ajb_notaris_tolegal_date'],
						$param['ajb_legal_toperijinan_date'],
						$param['hgb_perijinan_tolegal_date'],
						$param['hgb_legal_toperijinan_date'],
						$param['hgb_shm_perijinan_tolegal_date'],
						$param['hgb_notaris_tobank_date'],
						$param['hgb_target_date'],
						$param['hgb_hm_no'],
						$param['hgb_hm_tocustomer_date'],
						$param['hgb_nop'],
						$param['ajb_is_status_balik_nama'],
						$param['ajb_balik_nama_date'],
						$param['hgb_gsgu_land_date'],
						$param['kelengkapan_berkas_ajb_date'],
						$param['girik_id'],
						$param['akta_no_sh1'],
						$param['akta_date_sh1'],
						$param['notaris_id_sh1'],
						$param['tgl_terbit_pt'],
						$param['tgl_berakhir_pt'],
						$param['tgl_terima_pt'],
						$param['tgl_keluar_pt'],
						$param['posisi_pt'],
						$param['kelurahan_pt'],
						//start addby:fatkur, addon:22/7/19
						$param['hpl_date'],
						$param['hpl_terima_date'],
						$param['hpl_keluar_date'],
						$param['hpl_akhir_date'],
						$param['hpl_no_gs'],
						$param['hpl_skpt_no'],
						$param['hpl_kelurahan'],
	//                                                                        $param['hpl_luas'],
						((!$param['hpl_luas'] ? 0 : $param['hpl_luas'])),
						//end
						$param['ajb_validasipphselesai_date'],
						## Add by RH 05/06/2020 ##
						$param['pt_hgb_nib'],
						## END Add by RH 05/06/2020 ##
						$this->session->getUserId(),
						'1',
						$param['lunas_notaris'],
						$param['hgbajb_unit_id']
					);
					$return['success'] = (bool) $affectedRow;
				} else if ($param['temp_buktipemilik_id']) {
					$param_akad = $param['details_akad'];
					$akadconfirmation_id = '';
					$akadconfirmation_pl_id = '';
					$akadconfirmation_plbankkpr_id = '';
					$akadconfirmation_index = '';
					$akadconfirmation_date = '';
					$akadconfirmation_status_id = '';
					$akadconfirmation_note = '';
					$deleted_akad = '';
					$temp_id_akad = '';
					if (is_array($param_akad) && count($param_akad) > 0) {
						foreach ($param_akad as $idx => $data) {

							foreach ($data as $key => $value) {
								switch ($key) {
									case 'akadconfirmation_id': $akadconfirmation_id .= $value . "~";
									break;
									case 'purchaseletter_id': $akadconfirmation_pl_id .= $value . "~";
									break;
									case 'purchaseletter_bankkpr_id': $akadconfirmation_plbankkpr_id .= $value . "~";
									break;
									case 'akadconfirmation_index': $akadconfirmation_index .= $value . "~";
									break;
									case 'akadconfirmation_date': $akadconfirmation_date .= $value . "~";
									break;
									case 'akadconfirmation_status_id': $akadconfirmation_status_id .= $value . "~";
									break;
									case 'akadconfirmation_note': $akadconfirmation_note .= $value . "~";
									break;
									case 'deleted': $deleted_akad .= $value . "~";
									break;
									case 'temp_id_akad': $temp_id_akad .= $value . "~";
									break;
								}
							}
						};

						$akadconfirmation_id = preg_replace('/(~)$/', '', $akadconfirmation_id);
						$akadconfirmation_pl_id = preg_replace('/(~)$/', '', $akadconfirmation_pl_id);
						$akadconfirmation_plbankkpr_id = preg_replace('/(~)$/', '', $akadconfirmation_plbankkpr_id);
						$akadconfirmation_index = preg_replace('/(~)$/', '', $akadconfirmation_index);
						$akadconfirmation_date = preg_replace('/(~)$/', '', $akadconfirmation_date);
						$akadconfirmation_status_id = preg_replace('/(~)$/', '', $akadconfirmation_status_id);
						$akadconfirmation_note = preg_replace('/(~)$/', '', $akadconfirmation_note);
						$deleted_akad = preg_replace('/(~)$/', '', $deleted_akad);
						$temp_id_akad = preg_replace('/(~)$/', '', $temp_id_akad);
					}
					$affectedRow = $this->execSP('sp_buktipemilik_create',
						$param['temp_buktipemilik_id'],
						$param['unit_id'],
						$param['imb_no'],
						$param['imb_date'],
						$param['imb_buy_date'],
						$param['imb_legal_date'],
						$param['pbbinduk_id'],
						$param['nop'],
						$param['note_bp'],
						$param['reg_date'],
						$param['imb_target_date'],
						$param['ijin_tobpt_date'],
						$param['bpt_toijin_date'],
						$param['imb_pecahan_no'],
						$param['reg_pecahan_date'],
						$param['ijin_tobpt_pecahan_date'],
						$param['bpt_toijin_pecahan_date'],
						$param['imb_legal_pecahan_date'],
						$param['pbb_ijin_topemda_date'],
						$param['pbb_pemda_toijin_date'],
						$param['ssp_terima_date'],
						$param['aftersales_st_date'],
						$param['pengurusan_ijin_topemda_date'],
						$param['pengurusan_pemda_toijin_date'],
						$param['pengukuran_ijin_tobpn_date'],
						$param['pengukuran_bpn_toijin_date'],
						$param['note_bp'],
						$param['akad_note_bp'],
						$param['imb_khusus_no'],
						$param['reg_khusus_date'],
						$param['ijin_tobpt_khusus_date'],
						$param['bpt_toijin_khusus_date'],
						$param['imb_legal_khusus_date'],
						$param['imb_buy_khusus_date'],
						$param['sk_terbit_date'],
						$param['status_sby'],
						$param['terbit_untuk_sby'],
						$param['keterangan_sby'],
						$param['girik'],
						$param['akad_realisasiondate'],
						$param['is_use'],
						$param['purchaseletter_id'],
						$akadconfirmation_id,
						$akadconfirmation_pl_id,
						$akadconfirmation_plbankkpr_id,
						$akadconfirmation_index,
						$akadconfirmation_date,
						$akadconfirmation_status_id,
						$akadconfirmation_note,
						$deleted_akad,
						$temp_id_akad,
						$this->session->getUserId(),
						'1',
						$param['tanggal_akta_subrogasi'],
						$param['is_holdlegal'],
						$param['notes_holdlegal'],
						$param['unitstatus_id'],
						$param['notaris_id'],
						$param['no_akta_subrogasi'],
						$param['is_unit_dikosongkan'],
						$param['is_tundapembayaran_legalitas'], // added by rico 02092022
						$param['notaris_akta_id'], // added by rico 14082023
						$param['notaris_ajb_id'], // added by rico 14082023
						$param['imb_pecahan_date'],
						$param['akta_notaril_no'],
						$param['notaris'],
						$param['tanggal_akta'],
						$param['tanggal_tanda_tangan']
					);
					$return['success'] = (bool) $affectedRow;
				} else {
					$param_akad = $param['details_akad'];
					$akadconfirmation_id = '';
					$akadconfirmation_pl_id = '';
					$akadconfirmation_plbankkpr_id = '';
					$akadconfirmation_index = '';
					$akadconfirmation_date = '';
					$akadconfirmation_status_id = '';
					$akadconfirmation_note = '';
					$deleted_akad = '';
					$temp_id_akad = '';
					if (is_array($param_akad) && count($param_akad) > 0) {
						foreach ($param_akad as $idx => $data) {

							foreach ($data as $key => $value) {
								switch ($key) {
									case 'akadconfirmation_id': $akadconfirmation_id .= $value . "~";
									break;
									case 'purchaseletter_id': $akadconfirmation_pl_id .= $value . "~";
									break;
									case 'purchaseletter_bankkpr_id': $akadconfirmation_plbankkpr_id .= $value . "~";
									break;
									case 'akadconfirmation_index': $akadconfirmation_index .= $value . "~";
									break;
									case 'akadconfirmation_date': $akadconfirmation_date .= $value . "~";
									break;
									case 'akadconfirmation_status_id': $akadconfirmation_status_id .= $value . "~";
									break;
									case 'akadconfirmation_note': $akadconfirmation_note .= $value . "~";
									break;
									case 'deleted': $deleted_akad .= $value . "~";
									break;
									case 'temp_id_akad': $temp_id_akad .= $value . "~";
									break;
								}
							}
						};

						$akadconfirmation_id = preg_replace('/(~)$/', '', $akadconfirmation_id);
						$akadconfirmation_pl_id = preg_replace('/(~)$/', '', $akadconfirmation_pl_id);
						$akadconfirmation_plbankkpr_id = preg_replace('/(~)$/', '', $akadconfirmation_plbankkpr_id);
						$akadconfirmation_index = preg_replace('/(~)$/', '', $akadconfirmation_index);
						$akadconfirmation_date = preg_replace('/(~)$/', '', $akadconfirmation_date);
						$akadconfirmation_status_id = preg_replace('/(~)$/', '', $akadconfirmation_status_id);
						$akadconfirmation_note = preg_replace('/(~)$/', '', $akadconfirmation_note);
						$deleted_akad = preg_replace('/(~)$/', '', $deleted_akad);
						$temp_id_akad = preg_replace('/(~)$/', '', $temp_id_akad);
					}

					$affectedRow = $this->execSP('sp_buktipemilik_update',
						$param['buktipemilik_id'],
						$param['unit_id'],
						$param['imb_no'],
						$param['imb_date'],
						$param['imb_buy_date'],
						$param['imb_legal_date'],
						$param['pbbinduk_id'],
						$param['nop'],
						$param['note_bp'],
						$param['reg_date'],
						$param['imb_target_date'],
						$param['ijin_tobpt_date'],
						$param['bpt_toijin_date'],
						$param['imb_pecahan_no'],
						$param['reg_pecahan_date'],
						$param['ijin_tobpt_pecahan_date'],
						$param['bpt_toijin_pecahan_date'],
						$param['imb_legal_pecahan_date'],
						$param['pbb_ijin_topemda_date'],
						$param['pbb_pemda_toijin_date'],
						$param['ssp_terima_date'],
						$param['aftersales_st_date'],
						$param['pengurusan_ijin_topemda_date'],
						$param['pengurusan_pemda_toijin_date'],
						$param['pengukuran_ijin_tobpn_date'],
						$param['pengukuran_bpn_toijin_date'],
						$param['note_bp'],
						$param['akad_note_bp'],
						$param['imb_khusus_no'],
						$param['reg_khusus_date'],
						$param['ijin_tobpt_khusus_date'],
						$param['bpt_toijin_khusus_date'],
						$param['imb_legal_khusus_date'],
						$param['imb_buy_khusus_date'],
						$param['sk_terbit_date'],
						$param['status_sby'],
						$param['terbit_untuk_sby'],
						$param['keterangan_sby'],
						$param['girik'],
						$param['akad_realisasiondate'],
						$param['is_use'],
						$param['purchaseletter_id'],
						$akadconfirmation_id,
						$akadconfirmation_pl_id,
						$akadconfirmation_plbankkpr_id,
						$akadconfirmation_index,
						$akadconfirmation_date,
						$akadconfirmation_status_id,
						$akadconfirmation_note,
						$deleted_akad,
						$temp_id_akad,
						$this->session->getUserId(),
						'1',
						$param['tanggal_akta_subrogasi'],
						$param['is_holdlegal'],
						$param['notes_holdlegal'],
						$param['unitstatus_id'],
						$param['notaris_id'],
						$param['no_akta_subrogasi'],
						$param['is_unit_dikosongkan'],
						$param['is_tundapembayaran_legalitas'], // added by rico 02092022
						$param['notaris_akta_id'], // added by rico 14082023
						$param['notaris_ajb_id'], // added by rico 14082023
						$param['imb_pecahan_date'],
						$param['akta_notaril_no'],
						$param['notaris'],
						$param['tanggal_akta'],
						$param['tanggal_tanda_tangan']
					);
					$return['success'] = (bool) $affectedRow;
				}
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function buktipemilikDelete($param = array()) {
		$return['success'] = false;

		$is_hgbajb_detail = '';
		if (is_array($param) && count($param)) {
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					if ($val['is_hgbajb_detail'] == 'yes') {
						$is_hgbajb_detail = 'yes';
					}
				} else {
					if ($param['is_hgbajb_detail'] == 'yes') {
						$is_hgbajb_detail = 'yes';
					}
				}
			}
		}

		if ($is_hgbajb_detail == 'yes') {
			if (is_array($param) && count($param)) {
				$key_name = 'hgbajb_id';
				$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
				foreach ($param as $key => $val) {
					if (is_array($val)) {
						$param[$key_name] .= $val[$key_name] . ',';
					}
				}
				$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
				try {
					$affectedRow = $this->execSP('sp_hgbajb_destroy', $param[$key_name], $this->session->getUserId());
					$return['total'] = $affectedRow;
					$return['success'] = (bool) $affectedRow;
				} catch (Exception $e) {

				}
			}
			return $return;
		} else {
		/* if (is_array($param) && count($param)) {
		  $key_name = 'buktipemilik_id';
		  $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
		  foreach ($param as $key => $val) {
		  if (is_array($val)) {
		  $param[$key_name] .= $val[$key_name] . ',';
		  }
		  }
		  $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
		  try {
		  $affectedRow = $this->execSP('sp_buktipemilik_destroy', $param[$key_name], $this->session->getUserId());
		  $return['total'] = $affectedRow;
		  $return['success'] = (bool) $affectedRow;
		  } catch (Exception $e) {

		  }
		  }
		  return $return; */
		}
	}

	function buktipemilikcustomerdocumentRead($param) {
		$return['success'] = false;
		$temp_id='';
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['customer_id'],
					$temp_id,
					$param['page'],
					$param['limit'],
				);
				$result = $this->execSP3('sp_customerdocument_read', $data);
				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function cekum($param) {
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_admincollection_cekum', $data);	
	//				var_dump($result);die();			
	                            //$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
	}


	function printhgbajbRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['hgbajb_id']
				);
				$result = $this->execSP3('sp_printpenjadwalanajb_read', $data);	
			// var_dump($result);die();			
							//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
	}

	function buktipemilikOneRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {

			try {
				$limit = (empty($param['limit'])) ? 25 : $param['limit'];
				$page = (empty($param['page'])) ? 1 : $param['page'];
				$start = (empty($param['start'])) ? 0 : $param['start'];

				$data = array(
					$param['cluster_id'],
					$param['pt_id'],
					$param['block_id'],
					$param['unit_id'],
					$param['unit_number'],
					$param['customer_name'],
					$param['position_id'],
					$param['productcategory_id'],
					$param['type_id'],
					$param['unitstatus_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$start,
					$limit,
					$page
				);
				$result = $this->execSP3('sp_buktipemilik_new_read', $data);
				// print_r("expression");
				$return['total']   = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result[1];
				$return['success'] = true;

			} catch (Exception $e) { /* var_dump($e->getMessage()); */ }
		}
		return $return;

	}
}

?>
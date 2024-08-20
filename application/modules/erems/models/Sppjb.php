<?php

class Erems_Models_Sppjb extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 't_sppjb';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

    // function sppjbRead($param) {
        // $return['success'] = false;
        // if (is_array($param) && count($param)) {
            // try {
                // $resultcount = $this->execSP('sp_sppjb_count', 
									// $param['sppjb_id'], 
									// $param['purchaseletter_id'], 
									// $param['cluster_id'], 
									// $param['block_id'], 
									// $param['unit_id'],
									// $param['unit_number'],
									// $param['customer_name'], 									
									// $param['sppjb_startdate'], 
									// $param['sppjb_enddate'], 
									// $param['handover_startdate'], 
									// $param['handover_enddate'], 
									// $param['sign_startdate'], 
									// $param['sign_enddate'], 
									// $this->session->getCurrentProjectId(), 
									// $this->session->getCurrentPtId()
								// );

                // $resultdata = $this->execSP('sp_sppjb_read', 
									// $param['sppjb_id'], 
									// $param['purchaseletter_id'], 
									// $param['cluster_id'], 
									// $param['block_id'], 
									// $param['unit_id'], 
									// $param['unit_number'], 
									// $param['customer_name'],
									// $param['sppjb_startdate'], 
									// $param['sppjb_enddate'], 
									// $param['handover_startdate'], 
									// $param['handover_enddate'], 
									// $param['sign_startdate'], 
									// $param['sign_enddate'],
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
	
	function sppjbRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['sppjb_id'], 
					$param['purchaseletter_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					$param['unit_id'], 
					$param['unit_number'], 
					$param['customer_name'],
					$param['sppjb_startdate'], 
					$param['sppjb_enddate'], 
					$param['handover_startdate'], 
					$param['handover_enddate'], 
					$param['sign_startdate'], 
					$param['sign_enddate'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(), 
					$param['start'], 
					$param['limit'],
					$param['page'],
					$param['is_cancel'],
				);
				$result = $this->execSP3('sp_sppjb_new_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function sppjbCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				
				$serahterimaplan_date = '';
				$serahterimaplan_month = 0;
				
				$config_sh = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$sh_feature = $config_sh->activateSh1Features('sppjb_tgl_st');
				
				if($sh_feature == 1){
					$serahterimaplan_date = $param['serahterimaplan_date'];
					$serahterimaplan_month = $param['serahterimaplan_month'];
				} else {
					if($param['radio_st_group'] == 'radio_tgl_st'){
						$serahterimaplan_date = $param['serahterimaplan_date'];
					}else if($param['radio_st_group'] == 'radio_bln_st'){
						$serahterimaplan_month = $param['serahterimaplan_month'];
					}
				}
				
				$affectedRow = $this->execSP('sp_sppjb_create', 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['unit_id'], 
					$param['parametersppjb_id'], 
					$param['purchaseletter_id'], 
					'',
					$param['customer_ktp'], 
					$param['customer_npwp'], 
					(strpos($param['sppjb_name'], "'") !== false ? str_replace("'", "''", $param['sppjb_name']) : $param['sppjb_name']), 
					(strpos($param['sppjb_address'], "'") !== false ? str_replace("'", "''", $param['sppjb_address']) : $param['sppjb_address']), 
					$param['sppjb_date'], 
					(strpos($param['atasnama'], "'") !== false ? str_replace("'", "''", $param['atasnama']) : $param['atasnama']), 
					$param['suratkuasa_date'], 
					$param['serahterima_date'], 
					$param['tandatangan_date'], 
					$serahterimaplan_date, 
					$serahterimaplan_month,
					$param['unit_electricity'], 

									//added for sby
					$param['sent_date'], 
					$param['received_date'], 
					$param['return_date'], 

					$param['ijb_no'], 
					$param['ijb_date'], 
					$param['ijb_name'], 
					$param['notaris_id'], 
					((!$param['land_size_sppjb'] ? 0 : $param['land_size_sppjb'])), 

					$param['finish_constr_date'], 

					$this->session->getUserId(), 
					'1'
                	//Rizal 3 Mei 2019
					, 
					$param['note'], 
					$param['adendum_ke'],
                    $param['received_name'],         // addby: fatkur, addon:19/7/19
                    $param['kelurahan_unit'],        // addby: fatkur, addon:23/12/19
                    $param['kecamatan_unit'],         // addby: fatkur, addon:23/12/19,
                    $param['nomor_identifikasi_rumah'], // added by rico 27082021,
                    $param['sppjb_kuasa_name'], // added by rico 21022024,
                    $param['sppjb_kuasa_ktp'], // added by rico 21022024,
                    $param['sppjb_kuasa_npwp'], // added by rico 21022024,
                    $param['sppjb_kuasa_address'], // added by rico 2102202
                    $param['sppjb_doc_id'], // added by rico 21022024

					$param['pjb_lunas_no'],
					$param['pjb_notaris'],
					$param['pjb_lunas_date'],
					$param['pjb_lunas_sign_date']

                );
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function sppjbUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$serahterimaplan_date = '';
				$serahterimaplan_month = 0;
				
				$config_sh = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$sh_feature = $config_sh->activateSh1Features('sppjb_tgl_st');

				if($sh_feature == 1){
					$serahterimaplan_date = $param['serahterimaplan_date'];
					$serahterimaplan_month = $param['serahterimaplan_month'];
				} else {
					if($param['radio_st_group'] == 'radio_tgl_st'){
						$serahterimaplan_date = $param['serahterimaplan_date'];
					}else if($param['radio_st_group'] == 'radio_bln_st'){
						$serahterimaplan_month = $param['serahterimaplan_month'];
					}
				}
				
				$affectedRow = $this->execSP('sp_sppjb_update', 
					$param['sppjb_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['unit_id'], 
					$param['parametersppjb_id'], 
					$param['purchaseletter_id'], 
					$param['sppjb_no'], 
					$param['customer_ktp'], 
					$param['customer_npwp'], 
					(strpos($param['sppjb_name'], "'") !== false ? str_replace("'", "''", $param['sppjb_name']) : $param['sppjb_name']), 
					(strpos($param['sppjb_address'], "'") !== false ? str_replace("'", "''", $param['sppjb_address']) : $param['sppjb_address']),
					$param['sppjb_date'], 
					(strpos($param['atasnama'], "'") !== false ? str_replace("'", "''", $param['atasnama']) : $param['atasnama']), 
					$param['suratkuasa_date'], 
					$param['serahterima_date'], 
					$param['tandatangan_date'], 
					$serahterimaplan_date, 
					$serahterimaplan_month,
					$param['unit_electricity'], 

									//added for sby
					$param['sent_date'], 
					$param['received_date'], 
					$param['return_date'], 

					$param['ijb_no'], 
					$param['ijb_date'], 
					$param['ijb_name'], 
					$param['notaris_id'], 
					((!$param['land_size_sppjb'] ? 0 : $param['land_size_sppjb'])), 

					$param['finish_constr_date'], 

					$this->session->getUserId(), 
					'1'
                    //Rizal 3 Mei 2019
					, 
					$param['note'], 
					$param['adendum_ke'],
                    $param['received_name'],     // addby: fatkur, addon:19/7/19
                    $param['kelurahan_unit'],        // addby: fatkur, addon:23/12/19
                    $param['kecamatan_unit'],         // addby: fatkur, addon:23/12/19
                                                                        
                    $param['nomor_identifikasi_rumah'], // added by rico 27082021
                    
                    $param['sppjb_kuasa_name'], // added by rico 21022024,
                    $param['sppjb_kuasa_ktp'], // added by rico 21022024,
                    $param['sppjb_kuasa_npwp'], // added by rico 21022024,
                    $param['sppjb_kuasa_address'], // added by rico 21022024

                    $param['pjb_lunas_no'],
					$param['pjb_notaris'],
					$param['pjb_lunas_date'],
					$param['pjb_lunas_sign_date']
                );
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function sppjbDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'sppjb_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_sppjb_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {

			}
		}
		return $return;
	}
	
	function sppjbprinoutRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$result = $this->execSP2('sp_sppjb_printout_read', 
					$param['sppjb_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$this->session->getUserId(),
					$param['parameter_id']
				);	
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { }
		}		
		return $return;
	}
	
	function validasiSppjbRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'], 
					$param['unit_id']
				);
				$result = $this->execSP3('sp_validasi_print_sppjb_read', $data);
				$return['data'] = $result[0][0];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

}

?>
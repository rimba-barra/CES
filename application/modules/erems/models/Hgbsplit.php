<?php

class Erems_Models_Hgbsplit extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_hgbsplit';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function hgbsplitRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['cluster_id'], 
					$param['block_id'], 
					$param['unit_number'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['is_gabungan'],
                                        $param['view_grid_param'],
					$param['start'], 
					$param['limit'],
                                        $param['page']
				);
				$result = $this->execSP3('sp_hgbsplit_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
			}
		}		
		return $return;
    }

    function hgbsplitCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{                        
			try {

				//added by anas 25032021
            	if(isset($param['notaris_id']) == false) 
            	{
            		$return['msg'] = "Invalid Notaris";
            	}
            	else
            	{                            
					$data = array (
						$param['buktipemilik_id'], 
						$param['unit_id'], 
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
	//                                        $param['hpl_luas'],
	                                        ((!$param['hpl_luas'] ? 0 : $param['hpl_luas'])),
	                                        //end
	                                        
	                                        //start addby fatkur addon 12/8/19
						$param['is_ijb'],
	                                        //end
	                                    
	                                        $this->session->getUserId(), 
						'1'
					);
	                                
					$result = $this->execSP3('sp_hgbsplit_create', $data);
	//                                echo 'tes';
	                                
					$return['total'] = $result[0];
					$return['success'] = $result[0]>0;
				}
			} catch(Exception $e) { var_dump($e);                                die();}			
		}
		return $return;
    }

    function hgbsplitUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {

				//added by anas 25032021
            	if(isset($param['notaris_id']) == false) 
            	{
            		$return['msg'] = "Invalid Notaris";
            	}
            	else{
					$data = array (
						$param['hgbajb_id'], 
						$param['buktipemilik_id'], 
						$param['unit_id'], 
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
	//                                        $param['hpl_luas'],
	                                        ((!$param['hpl_luas'] ? 0 : $param['hpl_luas'])),
	                                        //end
						
	                                        //start addby fatkur addon 12/8/19
	                                        $param['is_ijb'],
	                                        //end
	                                        $this->session->getUserId(), 
						'1'
	                                        
					);
					$result = $this->execSP3('sp_hgbsplit_update', $data);
					$return['total'] = $result[0];
					$return['success'] = $result[0]>0;	
				}		
			} catch(Exception $e) { }
		}
		return $return;
    }

    function hgbsplitDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'hgbajb_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_hgbajb_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	function hgbsplitUpdateGabungan($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['hgbajb_id'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_hgbsplit_gabungan_update', $data);	
				//var_dump($result);			
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }

}

?>
<?php

class Erems_Models_Masterlandrepayment extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'mh_landrepayment';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function landrepaymentRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['landrepayment_id'], 
					$param['code'], 
					$param['keterangan'], 
					$param['start'], 
					$param['limit'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterlandrepayment_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }
	
	function landrepaymentdetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['landrepayment_id']
				);
				$result = $this->execSP3('sp_masterlandrepayment_detail_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function landrepaymentCreate($param = array()) {
    	$return['success'] = false;

		$landrepayment_id = $param['landrepayment_id'];
		$code             = $param['code'];
		$keterangan       = $param['keterangan'];
		$management_fee   = $param['management_fee'];
		$royalty          = $param['royalty'];
		$param_detail     = $param['data_detail'];
        
        if (is_array($param) && count($param)) {
            try {
				$landrepayment_detail_id = '';
				$landrepayment_id_header = '';
				$nomor                   = '';
				$periode_awal            = '';
				$periode_akhir           = '';
				$nilai_pembayaran        = '';
				$deleted_detail          = '';
				$efisiensi               = '';
				//added by anas 13102021
				$nilai_efisiensi         = '';
               
			    //detail
                if (is_array($param_detail) && count($param_detail) > 0) {
                    foreach ($param_detail as $idx => $data) {

                        foreach ($data as $key => $value) {
                            switch ($key) {
                                case 'landrepayment_detail_id': $landrepayment_detail_id .= $value . "~#~";
                                    break;
                                case 'landrepayment_id': $landrepayment_id_header .= $value . "~#~";
                                    break;
                                case 'nomor': $nomor .= $value . "~#~";
                                    break;
                                case 'periode_awal': $periode_awal .= $value . "~#~";
                                    break;
                                case 'periode_akhir': $periode_akhir .= $value . "~#~";
                                    break;
								case 'nilai_pembayaran': $nilai_pembayaran .= $value . "~#~";
                                    break;
                                case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
								    break;
								    //added by anas 04102021
                                case 'efisiensi': $efisiensi .= ($value ? $value : 0) . "~#~";
								    break;
							    //added by anas 13102021
                                case 'nilai_efisiensi': $nilai_efisiensi .= $value . "~#~";
								    break;
                            }
                        }
                    };

					$landrepayment_detail_id = preg_replace('/(~)$/', '', $landrepayment_detail_id);
					$landrepayment_id_header = preg_replace('/(~)$/', '', $landrepayment_id_header);
					$nomor                   = preg_replace('/(~)$/', '', $nomor);
					$periode_awal            = preg_replace('/(~)$/', '', $periode_awal);
					$periode_akhir           = preg_replace('/(~)$/', '', $periode_akhir);
					$nilai_pembayaran        = preg_replace('/(~)$/', '', $nilai_pembayaran);
					$deleted_detail          = preg_replace('/(~)$/', '', $deleted_detail);
					//added by anas 04102021
					$efisiensi               = preg_replace('/(~)$/', '', $efisiensi);
					//added by anas 13102021
					$nilai_efisiensi         = preg_replace('/(~)$/', '', $nilai_efisiensi);
                }

                $result = $this->execSP3('sp_masterlandrepayment_create', 
					$landrepayment_id, 
					$this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
					$code, 
					$keterangan, 
					$management_fee, 
					$royalty, 
					$landrepayment_detail_id, $landrepayment_id_header, $nomor, $periode_awal, $periode_akhir, $nilai_pembayaran, $deleted_detail,
					$this->session->getUserId(),
					//added by anas 04102021
					$efisiensi,
				    //added by anas 13102021
					$nilai_efisiensi
                );

				$return['total']   = $result[0];
				$return['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */ }
        }
        return $return;
    }

    /*function bankkprUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['bankkpr_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['bank_id'], 
					$param['name'], 
					$param['tahap1_id'], 
					$param['tahap2_id'], 
					$param['tahap3_id'], 
					$param['tahap4_id'], 
					$param['tahap5_id'], 
					$param['tahap6_id'], 
					$param['tahap7_id'], 
					$param['tahap8_id'], 
					floatval($param['tahap1_persen']), 
					floatval($param['tahap2_persen']), 
					floatval($param['tahap3_persen']), 
					floatval($param['tahap4_persen']), 
					floatval($param['tahap5_persen']), 
					floatval($param['tahap6_persen']), 
					floatval($param['tahap7_persen']), 
					floatval($param['tahap8_persen']), 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_bankkpr_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }*/

    function landrepaymentDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'landrepayment_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].'~#~'; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterlandrepayment_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }

	function lrpprojectsettingUpdate($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['set_status'],
					$this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterlandrepayment_project_setting_update', $data);	
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
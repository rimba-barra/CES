<?php

class Erems_Models_Masterbankkpr extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_bankkpr';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function bankkprRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['bankkpr_id'], 
					$param['bank_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_bankkpr_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function bankkprCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			//try {
//				$data = array (
//					0, 
//					$param['bank_id'], 
//					$this->session->getCurrentProjectId(), 
//					$this->session->getCurrentPtId(),
//					0, 
//					0
//				);
//				$result = $this->execSP3('sp_bankkpr_read', $data);				
//				/*$return['total'] = $result[0][0]['RECORD_TOTAL'];
//				$return['data'] = $result[1];			
//				$return['success'] = true;		*/		
//			} catch(Exception $e) { 
//				
//			}
			
			try {
				$data = array (
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
					'1',
					$param['initial_bank'], 
					$param['alamat_bank'], 
					$param['pic_bank'], 
					$param['nama_pt_bank'], 
					$param['jabatan'],
					$param['atas_nama_bank_project'], 
					$param['nomor_rekening_project'],
					$param['pic_collection'], 
					$param['pic_collection_phone']
				);
				$result = $this->execSP3('sp_bankkpr_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    function bankkprUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
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
					'1',
					$param['initial_bank'], 
					$param['alamat_bank'], 
					$param['pic_bank'], 
					$param['nama_pt_bank'], 
					$param['jabatan'],
					$param['atas_nama_bank_project'], 
					$param['nomor_rekening_project'],
					$param['pic_collection'], 
					$param['pic_collection_phone']
				);

				$result = $this->execSP3('sp_bankkpr_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { 
				$return = $e->getMessage();
			}
		}
		return $return;
    }

    function bankkprDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			$key_name = 'bankkpr_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bankkpr_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }

}

?>
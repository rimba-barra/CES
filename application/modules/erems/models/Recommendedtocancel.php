<?php

class Erems_Models_Recommendedtocancel extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function recommendedtocancelRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['cluster_id'], 
					$param['block_id'], 
					$param['unit_number'], 
					$param['customer_name'], 
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$param['pricetype_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					'0',
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_recommendedtocancel_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
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
					'1'
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
					'1'
				);
				$result = $this->execSP3('sp_bankkpr_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
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

	// added by rico 04062022
	function printout_documentRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_canceldocument_printout_read',
					$param['purchaseletter_id'],
					$param['purchaseletter_bankkpr_id']
				);
				$return['data'] = $result['data'];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

}

?>
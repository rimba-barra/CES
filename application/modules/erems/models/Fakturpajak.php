<?php

class Erems_Models_Fakturpajak extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_fakturpajak';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function fakturpajakRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['payment_startdate'], 
					$param['payment_enddate'], 
					$param['paymentflag_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					$param['unit_number'], 	
					$param['start'], 
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_fakturpajak_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}	
		return $return;
    }

    function fakturpajakCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['fakturpajak_id'], 
					$this->session->getCurrentProjectId(), 
					$param['pt_id'], 
					'',
					$param['payment_id'], 
					$param['fakturpajak_no'], 
					$param['counter'], 
					strlen($param['counter']),
					$param['customer_name'], 
					$param['customer_address'], 
					$param['customer_npwp'], 
					$param['payment_date'], 
					$param['payment'], 
					$param['dpp'], 
					$param['receipt_no'], 
					$param['fakturpajak_date'], 
					doubleval($param['ppn_persen']), 
					$param['ppn_amount'], 
					doubleval($param['ppnbm_persen']), 
					$param['ppnbm_amount'], 
					doubleval($param['pph22_persen']), 
					$param['pph22_amount'], 
					$param['notes'], 
					$param['pt_address'], 
					$param['pt_npwp'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_fakturpajak_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    function fakturpajakUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['fakturpajak_id'], 
					$this->session->getCurrentProjectId(), 
					$param['pt_id'], 
					'',
					$param['payment_id'], 
					$param['fakturpajak_no'],
					$param['counter'],  
					strlen($param['counter']),
					$param['customer_name'], 
					$param['customer_address'], 
					$param['customer_npwp'], 
					$param['payment_date'], 
					$param['payment'], 
					$param['dpp'], 
					$param['receipt_no'], 
					$param['fakturpajak_date'], 
					doubleval($param['ppn_persen']), 
					$param['ppn_amount'], 
					doubleval($param['ppnbm_persen']), 
					$param['ppnbm_amount'], 
					doubleval($param['pph22_persen']), 
					$param['pph22_amount'], 
					$param['notes'], 
					$param['pt_address'], 
					$param['pt_npwp'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_fakturpajak_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function fakturpajakDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'fakturpajak_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_fakturpajak_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	function ptdetailRead($param) {
        //$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pt_id'], 
					$param['pt_name'], 
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_pterems_read', $data);				
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				//$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

}

?>
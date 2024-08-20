<?php

class Erems_Models_Vabookingfee extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_bookingfee';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function vabookingfeeRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['nomor_va'], 
					$param['nomor_vamandiri'], 
					$param['customer_name'], 
					$param['receipt_no'], 
					$param['start'], 
					$param['limit'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['page']
				);
				$result = $this->execSP3('sp_vabookingfee_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function vabookingfeeCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['bookingfee_id'], 
					$param['notes'],
					$param['customer_name'], 
					$param['amount'], 
					$param['receipt_no'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$this->session->getUserId(), 
					$param['paymentmethod']
				);
				$result = $this->execSP3('sp_vabookingfee_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    function vabookingfeeUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$paymentmethod = 0;
				if(is_numeric($param['paymentmethod']) == 1){
					$paymentmethod = $param['paymentmethod'];
				}

				$data = array (
					$param['bookingfee_id'], 
					$param['notes'],
					$param['customer_name'], 
					(float) $param['amount'], 
					$param['receipt_no'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$this->session->getUserId(), 
					$paymentmethod,
					$param['payment_date']
				);
				$result = $this->execSP3('sp_vabookingfee_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function vabookingfeeDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'vabookingfee_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_vabookingfee_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }

	function dataReadAmount($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['start'], 
					$param['limit'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['page']
				);
				$result = $this->execSP3('sp_bookingfeeamount_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

}

?>
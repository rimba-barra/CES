<?php

class Erems_Models_Paymentreturn extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_paymentreturn';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function paymentreturnRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['paymentreturn_id'], 
					$param['purchaseletter_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'], 
					$param['customer_name'], 
					$param['paymentreturn_startdate'], 
					$param['paymentreturn_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_paymentreturn_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { }
		}		
		return $return;
    }
	
	function paymentreturnscheduleRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'],
					$param['schedule_id']
				);
				$result = $this->execSP3('sp_paymentreturn_schedule_read', $data);				
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }

    function paymentreturnCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					'', 
					$param['amount'], 
					$param['note'], 
					$param['is_schedulerelated'], 
					$param['date'], 
					$param['schedule_id'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_paymentreturn_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) {  }			
		}
		return $return;
    }

    function paymentreturnUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['paymentreturn_id'],  
					$param['purchaseletter_id'], 
					$param['payment_id'],
					$param['paymentreturn_no'], 
					$param['amount'], 
					$param['note'], 
					$param['is_schedulerelated'], 
					$param['date'], 
					$param['schedule_id'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_paymentreturn_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function paymentreturnDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'paymentreturn_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_paymentreturn_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }

}

?>
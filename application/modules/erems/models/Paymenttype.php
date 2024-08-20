<?php


class Erems_Models_Paymenttype extends Zend_Db_Table_Abstract{
	protected $_schema = 'erems';
	protected $_name = 'm_paymenttype';
	protected $session;
	
	function init(){
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function paymenttypeRead($param){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$resultcount = $this->execSP('sp_paymenttype_count',$param['code'],$param['paymenttype'],$param['description']);
				$resultdata = $this->execSP('sp_paymenttype_read',$param['code'],$param['paymenttype'],$param['description'],$param['start'],$param['limit'],$param['page']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}
		return $return;
	}
	
	function paymenttypeCreate($param=array()){	
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$affectedRow = $this->execSP('sp_paymenttype_create',$param['code'],$param['paymenttype'],$param['description'],$this->session->getUserId());
				// $return['success'] = (bool)$affectedRow;
				$return = $affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function paymenttypeUpdate($param=array()){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$affectedRow = $this->execSP('sp_paymenttype_update', $param['paymenttype_id'], $param['code'],$param['paymenttype'],$param['description'], $this->session->getUserId());
				$return = $affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function paymenttypeDelete($param=array()){
		$return['success'] = false;
		if (is_array($param) && count($param))		{
			$key_name = 'paymenttype_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_paymenttype_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
?>
<?php
            

class Erems_Models_Masteremployee extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_employee';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function masteremployeeRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['employee_id'],
					$param['employee_name'],
					$param['employee_nik'],
					$param['jabatan_code'],
					$param['start'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_eremsemployee_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;			
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
	}
	
	function masteremployeeCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_employee_create',$param['code'],$param['employee'],$param['description'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masteremployeeUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_employee_update', $param['employee_id'], $param['code'],$param['employee'],$param['description'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masteremployeeDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'employee_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_employee_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
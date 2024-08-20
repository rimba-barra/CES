<?php
            

class Erems_Models_Mastercomplaintstatus extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_complaintstatus';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function mastercomplaintstatusRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['complaintstatus_id'],
					$param['complaintstatus'],
					$param['start'],
					$param['limit']
				);
				$result = $this->execSP3('sp_complaintstatus_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;			
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
	}
	
	function mastercomplaintstatusCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_complaintstatus_create',$param['code'],$param['complaintstatus'],$param['description'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function mastercomplaintstatusUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_complaintstatus_update', $param['complaintstatus_id'], $param['code'],$param['complaintstatus'],$param['description'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function mastercomplaintstatusDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'complaintstatus_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_complaintstatus_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
<?php
            

class Erems_Models_Masterparameterglobal extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_paramater';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function masterparameterglobalRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_parameter_count',$param['parametername'],$param['value'],$param['datatype'],$param['description'],$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
				$resultdata = $this->execSP('sp_parameter_read',$param['parametername'],$param['value'],$param['datatype'],$param['description'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e);
                        }
		}
		return $return;
	}
	
	function masterparameterglobalCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_parameter_create',$param['parametername'],$param['value'],$param['datatype'],$param['description'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterparameterglobalUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_parameter_update', $param['parameter_id'], $param['parametername'],$param['value'],$param['datatype'],$param['description'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterparameterglobalDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'parameter_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_parameter_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
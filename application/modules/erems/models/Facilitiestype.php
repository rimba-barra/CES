<?php

class Erems_Models_Facilitiestype extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_facilitiestype';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function facilitiestypeRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_facilitiestype_count', $param['code'], $param['facilitiestype'],$param['description']);
				$resultdata = $this->execSP('sp_facilitiestype_read', $param['code'], $param['facilitiestype'],$param['description'], $param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	function facilitiestypeCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_facilitiestype_create',  $param['code'], $param['facilitiestype'], $param['icon'], $param['description'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function facilitiestypeUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_facilitiestype_update', $param['facilitiestype_id'], $param['code'], $param['facilitiestype'],$param['icon'], $param['description'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function facilitiestypeDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'facilitiestype_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_facilitiestype_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
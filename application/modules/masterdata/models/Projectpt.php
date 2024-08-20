<?php

class Masterdata_Models_Projectpt extends Zend_Db_Table_Abstract
{
	protected $_schema = 'dbmaster';
	protected $_name = 'm_projectpt';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function projectptRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_projectpt_count', $param['projectpt_id'], $param['project_id'], $param['pt_id']);
				$resultdata = $this->execSP('sp_projectpt_read', $param['projectpt_id'], $param['project_id'], $param['pt_id'], $param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function projectptCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_projectpt_create',  $param['project_id'], $param['pt_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function projectptUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_projectpt_update', $param['projectpt_id'], $param['project_id'], $param['pt_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function projectptDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'projectpt_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_projectpt_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
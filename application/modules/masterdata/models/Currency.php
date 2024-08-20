<?php

class Masterdata_Models_Currency extends Zend_Db_Table_Abstract
{
	protected $_schema = 'dbmaster';
	protected $_name = 'm_currency';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function currencyRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_currency_count', $param['currency_id'], $param['currency_name']);
				$resultdata = $this->execSP('sp_currency_read', $param['currency_id'], $param['currency_name'], $param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function currencyCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_currency_create',  $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function currencyUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_currency_update', $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function currencyDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'currency_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_currency_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
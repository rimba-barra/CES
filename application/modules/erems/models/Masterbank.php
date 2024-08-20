<?php

class Erems_Models_Masterbank extends Zend_Db_Table_Abstract
{
	protected $_schema			= 'erems';
	protected $_name 			= 'm_bank';	
	protected $datadelimiter	= '~#~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array());	
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
		
	function dataRead($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname 	= 'sp_masterbank_read';
			$spparamkey = array('datasearch'=>array('bank_id', 'bank_name', 'bank_company_name'), 'start', 'limit');

			try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param));
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			} catch(Exception $e) { }
		}		
		return $this->returned;		
	}
	
	function dataCreate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_masterbank_create';
			$spparamkey = array('data'=>array('bank_name', 'bank_company_name', 'description', 'active'=>1));
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $this->returned;
	}
	
	function dataUpdate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_masterbank_update';
			$spparamkey = array('data'=>array('bank_id', 'bank_name', 'bank_company_name', 'description', 'active'=>1));
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
	
	function dataDelete($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname		= 'sp_masterbank_destroy';
			$spparamkey	= array('data'=>array('bank_id'));			
						
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param,array('datadelimiter'=>($this->datadelimiter))),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
}
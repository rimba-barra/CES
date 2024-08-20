<?php

class Masterdata_Models_Sistemdocumentnumbering extends Zend_Db_Table_Abstract
{
	protected $_schema 			= 'dbmaster';
	protected $_name 			= 'm_sistemdocumentnumber';	
	protected $datadelimiter	= '~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array(), 'message'=>'');	
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function dataRead($param=array())
	{	
		if (is_array($param) && count($param))
		{
			$spname 	= 'sp_sistemdocumentnumber_read';
			$spparamkey = array('datasearch'=>array('sistemdocumentnumber_id', 'apps_id', 'project_id', 'pt_id', 'module_name', 'reset_type', 'year', 'month', 'day'), 'start', 'limit', 'print'=>0);
						
			try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getUserId());
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			} catch(Exception $e) { }
		}		
		return $this->returned;		
	}
	
	function dataCreate($param=array())
	{	
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_sistemdocumentnumber_create';
			$spparamkey = array('data'=>array('apps_id', 'project_id', 'pt_id', 'module_name', 'reset_type', 'format', 'year', 'month', 'day', 'counter', 'description'/*, 'is_default'*/));
			
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getUserId());
			
				$this->returned['total'] = $result[0][0]['total_row']; $this->returned['success'] = $result[0][0]['success']>0;
				$this->returned['message'] = $result[0][0]['message'];
			} catch(Exception $e) { }			
		}
		return $this->returned;
	}
	
	function dataUpdate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_sistemdocumentnumber_update';
			$spparamkey = array('data'=>array('sistemdocumentnumber_id', 'format', 'counter', 'description'/*, 'is_default'*/));
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getUserId());

				$this->returned['total'] = $result[0][0]['total_row']; $this->returned['success'] = $result[0][0]['success']>0;
				$this->returned['message'] = $result[0][0]['message'];
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
	
	function dataDelete($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname		= 'sp_sistemdocumentnumber_destroy';
			$spparamkey	= array('data'=>array('sistemdocumentnumber_id'));
			
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}

	function getsistemdocnoCounter($param=array())
	{ 
		if (is_array($param) && count($param))
		{		
			$fnname		= 'fn_getsistemdocno_counter';
			$param	= Zend_Json::decode($param['data']);

			try {				
				$affectedRow = $this->execFn($fnname, 'COUNTER', $param[0]['sistemdocumentnumber_id']);	
			
				$this->returned['success'] = (bool)count($affectedRow['data'][0]);	
				$this->returned['data'] = $affectedRow['data'][0]['COUNTER'];			
			} catch(Exception $e) { }
		
		}
		return $this->returned;
	}	
}
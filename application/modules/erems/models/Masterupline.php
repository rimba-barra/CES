<?php

class Erems_Models_Masterupline extends Zend_Db_Table_Abstract{
	protected $_schema			= 'erems';
	protected $_name 			= 'm_upline';	
	protected $datadelimiter	= '~#~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array());	
	protected $session;
	
	function init(){
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
		
	function dataRead($param=array()){
		if (is_array($param) && count($param)){
			$spname 	= 'sp_upline_read';
			$spparamkey = array('datasearch'=>array('upline_id', 'code', 'name'), 'start', 'limit');

			try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			} catch(Exception $e) { }
		}		
		return $this->returned;		
	}
	
	function dataCreate($param=array()){
		if (is_array($param) && count($param)){			
			$spname 	= 'sp_upline_create';
			$spparamkey = array('data'=>array('code', 'name', 'active'=>1));
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $this->returned;
	}
	
	function dataUpdate($param=array()){
		if (is_array($param) && count($param)){			
			$spname 	= 'sp_upline_update';
			$spparamkey = array('data'=>array('upline_id', 'code', 'name', 'active'=>1));
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
	
	function dataDelete($param=array()){
		if (is_array($param) && count($param)){
			$spname		= 'sp_upline_destroy';
			$spparamkey	= array('data'=>array('upline_id'));			
						
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param,array('datadelimiter'=>($this->datadelimiter))),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
}
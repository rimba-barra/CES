<?php

class Main_Models_Masterwhatsnew extends Zend_Db_Table_Abstract
{
	protected $_schema			= 'dbmaster';
	protected $_name 			= 'm_whatsnew';	
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
			$spname 	= 'sp_whatsnew_read';
			$paramj = json_decode($param['datasearch']);

			if ( isset($paramj->hideparam) && $paramj->hideparam == 'cashbon_late' ) {
				$this->_schema = 'cashier.dbo';
				$result = $this->execSP3('sp_cashbon_late_read', $paramj->project_id, $paramj->pt_id, $paramj->user_id);
				$this->returned['total'] = $result[0][0]['result']; $this->returned['success'] =  $result[0][0]['result']; $this->returned['data'] = $result[1][0]['msg'];

			}else{

				if(isset($paramj->active)){
					$spname = 'sp_whatsnewpopup_read';
					$spparamkey = array('datasearch'=>array('whatsnew_id', 'title', 'description','app_name','active'), 'start', 'limit');
				}else{
					$spparamkey = array('datasearch'=>array('whatsnew_id', 'title', 'description','app_name'), 'start', 'limit');
				}
				
				try {					
					$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());

					$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
				} catch(Exception $e) { }
			}
		}		
		return $this->returned;		
	}
	
	function dataCreate($param=array())
	{

		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_whatsnew_create';
			$spparamkey = array('data'=>array('app_name','title', 'description', 'publish_start_date','publish_end_date','image', 'active'));			
			try {	
				$spparam = $this->generateSPParam($spparamkey,$param);
				$description = $spparam['data.description'];		
				$description = str_replace("'","''",$description);
				$spparam['data.description'] = $description;	
				$result = $this->execSP3($spname,$spparam,$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		
		return $this->returned;
	}
	
	function dataUpdate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_whatsnew_update';
			$spparamkey = array('data'=>array('whatsnew_id', 'app_name','title', 'description', 'publish_start_date','publish_end_date','image', 'active'));
			try {			
				$spparam = $this->generateSPParam($spparamkey,$param);
				$description = $spparam['data.description'];
				$description = str_replace("'","''",$description);
				$spparam['data.description'] = $description;
				$result = $this->execSP3($spname,$spparam,$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
	
	function dataDelete($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname		= 'sp_whatsnew_destroy';
			$spparamkey	= array('data'=>array('whatsnew_id'));			
						
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param,array('datadelimiter'=>($this->datadelimiter))),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
}
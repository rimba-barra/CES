<?php

class Erems_Models_Pphpayment extends Zend_Db_Table_Abstract
{
	protected $_schema			= 'erems';
	protected $_name 			= 'th_purchaseletter';	
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
			$spname 	= 'sp_pphpayment_read';
			$spparamkey = array('datasearch'=>array('unit_number', 'purchaseletter_no', 'customer_name'), 'start', 'limit');

			try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			} catch(Exception $e) { }
		}		
		return $this->returned;		
	}
	
	function dataCreate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_pekerjaankonsumen_create';
			$spparamkey = array('data'=>array('code', 'name', 'active'=>1));
								
			try {				
				/*$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;*/
			} catch(Exception $e) { }			
		}
		return $this->returned;
	}
	
	function dataUpdate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			
		
			$spname 	= 'sp_pphpayment_update';
			$spparamkey = array('details'=>array(
									'pphpaymentlist'=>array('payment_id', 'is_pph_pay', 'pph_pay_date', 'pph_amount', 'pph_ntpn_no')
								));
								
			//var_dump($this->generateSPParam($spparamkey,$param));exit;
								
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
			$spname		= 'sp_pekerjaankonsumen_destroy';
			$spparamkey	= array('data'=>array('pekerjaankonsumen_id'));			
						
			try {				
				/*$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param,array('datadelimiter'=>($this->datadelimiter))),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;*/
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
	
	function dataPaymentListRead($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname 	= 'sp_pphpaymentlist_read';
			$spparamkey = array('datasearch'=>array('purchaseletter_id'), 'start', 'limit', 'print'=>0);
								
			//try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId());
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			//} catch(Exception $e) { }
		}		
		return $this->returned;		
	}
}
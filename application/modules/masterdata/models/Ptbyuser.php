<?php

class Masterdata_Models_Ptbyuser extends Zend_Db_Table_Abstract
{
	protected $_schema = 'dbmaster';
	protected $_name = 'm_pt';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function ptbyuserRead($param)
	{
		$return['success'] = false;

		if($param)
		{
			try {		
				$resultdata = $this->execSP('sp__get_pt_byuser', $param['apps_id'], $param['project_id'], $this->session->getUserId());
				
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { }
		}

		return $return;
	}	
}
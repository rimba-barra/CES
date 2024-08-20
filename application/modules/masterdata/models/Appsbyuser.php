<?php

class Masterdata_Models_Appsbyuser extends Zend_Db_Table_Abstract
{
	protected $_schema = 'dbmaster';
	protected $_name = 'm_project';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function appsbyuserRead()
	{ 
		$return['success'] = false;

		try {		
			$resultdata = $this->execSP('sp__get_apps_byuser', $this->session->getUserId());
			
			$return['data'] = $resultdata;			
			$return['success'] = true;
		} catch(Exception $e) { }

		return $return;
	}	
}
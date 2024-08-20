<?php

class Appsmgmt_Models_Useractivity extends Zend_Db_Table_Abstract
{
	protected $_name = 'sec_user_activity';
	protected $session;
	protected $options;
	
	protected function _setupDatabaseAdapter()
	{		
		$this->_db = Zend_Registry::get('dbmain');
		parent::_setupDatabaseAdapter();
	}
	
	public function __construct()
	{
		$this->options = Zend_Registry::get('main_config');		
		parent::__construct();
	}
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function readData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$resultcount = $this->execSP('sp_user_activity_count', $param['user_activity_id'], $param['user_id'], $param['access_page'], $param['access_time_start'], $param['access_time_end'], $param['access_session'], $param['apps_id']);
				$resultdata = $this->execSP('sp_user_activity_read', $param['user_activity_id'], $param['user_id'], $param['access_page'], $param['access_time_start'], $param['access_time_end'], $param['access_session'], $param['apps_id'], $param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { }
		}		
		return $return;
	}
}
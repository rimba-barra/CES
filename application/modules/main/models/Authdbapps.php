<?php

class Main_Models_Authdbapps extends Zend_Db_Table_Abstract
{
	protected $_name = 'sec_user';
	protected $options;
	protected $session;
	protected $ldap;
	
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
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('Session');
	}
	
	function getDbApps()
	{
		return $this->execSP('sp_dbapps_read', $this->session->getCurrentModuleScript());
	}
}
<?php

class Appsmgmt_Models_User extends Zend_Db_Table_Abstract
{
	protected $_name = 'sec_user';
	protected $session;
	protected $options;
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
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->ldap = isset($this->options['apps']['login']['ldap']['use']) ?  $this->options['apps']['login']['ldap']['use'] : false;
	}
	
	function readData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
//				$resultcount = $this->execSP('sp_user_count', $param['user_id'], $param['user_name'], $param['user_fullname']);
				$resultdata = $this->execSP3('sp_user_read_new', $param['user_id'], $param['search_query'], $param['page'], $param['limit']);
				$return['total'] = $resultdata[0][0]['totalRow'];
				$return['data'] = $resultdata[1];			
				$return['success'] = true;
			} catch(Exception $e) { }
		}		
		return $return;
	}
	
	function createData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_user_create', $param['user_name'], md5($param['user_pass']), $param['user_fullname'], $param['user_email'], $param['employee_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function updateData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_user_update', $param['user_id'], $param['user_name'], $param['user_fullname'], $param['user_email'], $param['employee_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;

				if ($return['success'] && $param['user_name']===$this->session->getUserName()){ $this->session->setUserFullName($param['user_fullname']); }
				
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function deleteData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'user_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_user_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function logout($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp__set_user_logout', $param['user_id'], '', '', '');
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function changepassword($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{			
			try {
				if ($this->ldap)
				{
					$result = $this->ldapChangePassword($param['user_id'], $param['user_pass']);
					if (!$result) return false;
				}
				$affectedRow = $this->execSP('sp__set_user_password', $param['user_id'], $this->encryptPass($param['user_pass']), $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	protected function ldapChangePassword($user, $newpass)
	{		
		$options = array(
			'host'						=> $this->options['apps']['login']['ldap']['host'],
			'port'    				 	=> $this->options['apps']['login']['ldap']['port'],
			'username' 					=> $this->options['apps']['login']['ldap']['admin']['username'],
			'password'					=> $this->options['apps']['login']['ldap']['admin']['password'],
			'baseDn'					=> $this->options['apps']['login']['ldap']['baseDn'],
			'accountDomainName'			=> $this->options['apps']['login']['ldap']['accountDomainName'],
			'accountDomainNameShort'	=> $this->options['apps']['login']['ldap']['accountDomainNameShort']
		);		
		$ldap = new Zend_Ldap($options);
		$ldap->_protocol = 3;
		$dn = 'UID='.$user.$this->options['apps']['login']['ldap']['user']['username'];
		try 
		{ 
			$ldap->bind();	
			$entry = $ldap->getEntry($dn);
			Zend_Ldap_Attribute::setPassword($entry, $newpass, Zend_Ldap_Attribute::PASSWORD_HASH_MD5);
			$ldap->update($dn, $entry);
			$ldap->disconnect();
			return true;		
		} catch (Zend_Ldap_Exception $e) { return false; }									
	}
	
	protected function encryptPass($pass) {
		return md5($pass);
	}
}
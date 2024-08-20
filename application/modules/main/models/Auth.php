<?php

class Main_Models_Auth extends Zend_Db_Table_Abstract {

	protected $_name = 'sec_user';
	protected $options;
	protected $session;
	protected $ldap;

	protected function _setupDatabaseAdapter() {
		$this->_db = Zend_Registry::get('dbmain');
		parent::_setupDatabaseAdapter();
	}

	public function __construct() {
		$this->options = Zend_Registry::get('main_config');
		parent::__construct();
	}

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('Session');
		$this->ldap = isset($this->options['apps']['login']['ldap']['active']) ? $this->options['apps']['login']['ldap']['active'] : false;
	}

	function login($user, $pass, &$userdata = array(), $from = '') {
		if (preg_match('/[^A-Za-z0-9\.]/', $user) || preg_match('/[^A-Za-z0-9\.\,\~\!\@\#\$\%\^\&\*]/', $pass))
			array(1, 'Login failed !');
		if ($this->ldap) {
			$result = $this->ldapLogin($user, $pass);
			if (!$result) {
				return array(1, 'Login failed !');
			}
			$this->update(array('user_pass' => $this->encryptPass($pass)), "user_name='" . $user . "'");
		}
		$retuser = $this->execSP('sp_user_read', 0, $user, '', 1, 0, 1);
		$usercount = count($retuser);
		if ($usercount > 1)
			return array(1, 'Authentication failed !');
		if ($usercount < 1 || !$retuser[0]['user_id'] || !$retuser[0]['user_name'] || strcmp($retuser[0]['user_name'], $user) != 0 || strcmp($retuser[0]['user_pass'], $this->encryptPass($pass)) != 0) {
			if ($this->ldap && $result) {
				return array(1, 'You do not have permission to access this system !');
			} else {
				return array(1, 'Login failed !');
			}
		}
		if (!$retuser[0]['active'])
			return array(1, 'User account is currently inactive !');
		if ($retuser[0]['login_status'] && ($retuser[0]['activity_age'] && (int) $retuser[0]['activity_age'] < (int) $this->options['apps']['timeout']) && $from != "force") {
			$diff = round(((int) $this->options['apps']['timeout'] - (int) $retuser[0]['activity_age']) / 60);
			return array(1, 'User di-suspend ' . ($diff > 0 ? ('selama ' . $diff . ' menit' . ($diff > 1 ? '' : '')) : ' beberapa detik') . ' . Harap gunakan fasilitas Force Logout pada halaman Login untuk tetap bisa Login');
		}

		if ($this->options['apps']['password']['forcechange']) {
			$apps_password_age = (int) $this->options['apps']['password']['age'];
			$user_password_age = (int) $retuser[0]['password_age'];
			if (!$user_password_age)
				return array(2, 'Please change your default password now !');
			if ($user_password_age > $apps_password_age)
				return array(1, 'Your password has expired !');
			$diff = $apps_password_age - (int) $this->options['apps']['password']['expiredwarning'];
			if ($user_password_age == $diff)
				return array(2, 'Your password has expired ! Please change it now !');
			if ($user_password_age >= $diff) {
				$diff = $apps_password_age - $user_password_age;
				return array(3, 'Your password will be expired in ' . $diff . ' day' . ($diff > 1 ? 's' : '') . ' Do you want to change it now ?');
			}
		}

		$userdata = $retuser[0];

		Zend_Session::regenerateId();
		//$result = $this->execSP('sp__set_user_login', $userdata['user_id'], $this->session->getSessionId(), $_SERVER['REMOTE_ADDR'], gethostbyaddr($_SERVER['REMOTE_ADDR']));		
		$result = $this->execSP('sp__set_user_login', $userdata['user_id'], $this->session->getSessionId(), $_SERVER['REMOTE_ADDR'], '');
		if (!$result)
			return array(1, 'Error: Unable to log you in !');
		return true;
	}

	function auth($pageurl, &$returndata = array()) {
		//if (!$this->session->isLoggedIn()) return 'Session has lost !';	
		$result = $this->execSP('sp__get_user_validation', $this->session->getUserId(), $this->session->getCurrentModuleId(), $pageurl);
		//$result = $this->execSP('sp__get_user_validation', $this->session->getUserId(), $this->session->getCurrentGroupId(), $pageurl);
		$resultCount = count($result);
		if (!$resultCount || $resultCount > 1 || !$result[0]['user_id'] || !$result[0]['user_name'])
			return 'Authentication failed ! ';
		if ($result[0]['login_status'] && (int) $result[0]['activity_age'] > (int) $this->options['apps']['timeout'])
			return 'Session has expired !';
		if (!$result[0]['login_status'])
			return 'You have been logged out !';
		if ($result[0]['login_status'] && strcasecmp($result[0]['last_session_id'], $this->session->getSessionId()) != 0)
			return 'Session information has changed !';
		//if ($result[0]['login_status'] && strcasecmp($result[0]['last_login_ip'], $_SERVER['REMOTE_ADDR'])!=0) return 'Your IP address information has changed !';	//mark req by jerry on 20170227		
		$returndata = $result[0];
		return true;
	}

	function setUserActivity($pageurl) {
		//$this->execSP('sp_user_activity_create', $this->session->getUserId(), $pageurl, $this->session->getSessionId(), $this->session->getCurrentModuleId(), $_SERVER['REMOTE_ADDR'], gethostbyaddr($_SERVER['REMOTE_ADDR']));
		$this->execSP('sp_user_activity_create', $this->session->getUserId(), $pageurl, $this->session->getSessionId(), $this->session->getCurrentModuleId(), $_SERVER['REMOTE_ADDR'], '');
	}

	function logout() {
		$result = $this->execSP('sp__set_user_logout', $this->session->getUserId(), $this->session->getSessionId());
		if ($result <= 0)
			return 'An error occured while logging you out !';
		return true;
	}

	function forcelogout($userID) {
		$result = $this->execSP('sp__set_user_force_logout', $userID, $this->session->getSessionId());
		if ($result <= 0)
			return 'An error occured while logging you out !';
		return true;
	}

	function changePassword($pass) {
		if (!$pass)
			return false;
		if ($this->ldap) {
			$result = $this->ldapChangePassword($this->session->getUserName(), $pass);
			if (!$result)
				return false;
		}
		$result = $this->execSP('sp__set_user_password', $this->session->getUserId(), $this->encryptPass($pass), $this->session->getUserId());
		if ($result) {
			$this->session->setUserPass($pass);
			$this->session->setUserPassEnc($this->encryptPass($pass));
		}
		return (bool) $result;
	}

	function getUserApps() {
		return $this->execSP('sp__get_user_apps', $this->session->getUserId());
	}

	function getAppsDepend($appsid) {
		return $this->execSP('sp_depend_read', 0, preg_replace("/[^0-9.]/", "", $appsid), 0, 0, 0);
	}

	function getUserMenu($appsid, $projectptid) {
		return $this->execSP('sp__get_user_menu', $this->session->getUserId(), preg_replace("/[^0-9.]/", "", $appsid), $projectptid);
		//return $this->execSP('sp_group_menu_read', 0, $this->session->getCurrentGroupId(), 0, 0, 0);
	}

	function getUserObject($appsid, $projectptid) {
		return $this->execSP('sp__get_user_object', $this->session->getUserId(), preg_replace("/[^0-9.]/", "", $appsid), $projectptid);
		//return $this->execSP('sp_group_object_read', 0, $this->session->getCurrentGroupId(), 0, 0, 0);
	}

	function getUserAction($appsid, $projectptid) {
		return $this->execSP('sp__get_user_action', $this->session->getUserId(), preg_replace("/[^0-9.]/", "", $appsid), $projectptid);
		//return $this->execSP('sp_group_action_read', 0, $this->session->getCurrentGroupId(), 0, 0, 0);
	}

	protected function ldapLogin($user, $pass) {
		$options = array(
			'host' => $this->options['apps']['login']['ldap']['host'],
			'port' => $this->options['apps']['login']['ldap']['port'],
			'username' => 'UID=' . $user . $this->options['apps']['login']['ldap']['user']['username'],
			'password' => $pass,
			'baseDn' => $this->options['apps']['login']['ldap']['baseDn'],
			'accountDomainName' => $this->options['apps']['login']['ldap']['accountDomainName'],
			'accountDomainNameShort' => $this->options['apps']['login']['ldap']['accountDomainNameShort']
		);
		$ldap = new Zend_Ldap($options);
		$ldap->_protocol = 3;
		try {
			$ldap->bind();
			$ldap->disconnect();
			return true;
		} catch (Zend_Ldap_Exception $e) {
			return false;
		}
	}

	protected function ldapChangePassword($user, $newpass) {
		$options = array(
			'host' => $this->options['apps']['login']['ldap']['host'],
			'port' => $this->options['apps']['login']['ldap']['port'],
			'username' => $this->options['apps']['login']['ldap']['admin']['username'],
			'password' => $this->options['apps']['login']['ldap']['admin']['password'],
			'baseDn' => $this->options['apps']['login']['ldap']['baseDn'],
			'accountDomainName' => $this->options['apps']['login']['ldap']['accountDomainName'],
			'accountDomainNameShort' => $this->options['apps']['login']['ldap']['accountDomainNameShort']
		);
		$ldap = new Zend_Ldap($options);
		$ldap->_protocol = 3;
		$dn = 'UID=' . $user . $this->options['apps']['login']['ldap']['user']['username'];
		try {
			$ldap->bind();
			$entry = $ldap->getEntry($dn);
			Zend_Ldap_Attribute::setPassword($entry, $newpass, Zend_Ldap_Attribute::PASSWORD_HASH_MD5);
			$ldap->update($dn, $entry);
			$ldap->disconnect();
			return true;
		} catch (Zend_Ldap_Exception $e) {
			return false;
		}
	}

	protected function encryptPass($pass) {
		return md5($pass);
	}

	//added by tommy 20180214
	function getGroupAppInfo($appId, $groupId) {
		return $this->execSP('sp_group_app_read', $appId, $groupId);
	}

	//end added by tommy 20180214
	//added by tommy 20180903
	function getUserByKey($userKey) {
		return $this->execSP('sp_user_find', $userKey);
	}

	public function getFlashWebToken($recordId, $module) {
		$hasil = 0;

		$hasil = $this->execSP('sp_flashwebtoken_read', $module, $recordId);

		return $hasil;
	}

	public function saveFlashWebToken($module, $recordId, $token, $durasi) {
		$hasil = 0;

		$hasil = $this->execSP('sp_flashwebtoken_create', $recordId, $module, $token, $durasi);

		return $hasil;
	}

	//end added by tommy 20180903
}

<?php

class Appsmgmt_Models_Controller extends Zend_Db_Table_Abstract {

	protected $_name = 'sec_apps_controller';
	protected $session;
	protected $options;

	protected function _setupDatabaseAdapter() {
		$this->_db = Zend_Registry::get('dbmain');
		parent::_setupDatabaseAdapter();
	}

	public function __construct() {
		$this->options = Zend_Registry::get('main_config');
		parent::__construct();
	}

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
//				$resultcount = $this->execSP('sp_controller_count', $param['controller_id'], $param['controller_name'], $param['apps_id']);
				$resultdata = $this->execSP3('sp_controller_read_new', $param['controller_id'], $param['controller_name'], $param['apps_id'], $param['page'], $param['limit']);

				$return['total'] = $resultdata[0][0]['totalRow'];
				$return['data'] = $resultdata[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function createData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_controller_create', $param['controller_name'], $param['apps_id'], $param['description'], $param['active'], $param['default_actions'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function updateData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_controller_update', $param['controller_id'], $param['controller_name'], $param['apps_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function deleteData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'controller_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_controller_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

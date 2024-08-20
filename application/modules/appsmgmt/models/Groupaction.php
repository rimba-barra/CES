<?php

class Appsmgmt_Models_Groupaction extends Zend_Db_Table_Abstract {

	protected $_name = 'sec_group_action';
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
//				$resultcount = $this->execSP('sp_group_action_count', $param['group_action_id'], $param['group_id'], $param['action_id']);
				$resultdata = $this->execSP3('sp_group_action_read_new', $param['group_action_id'], $param['group_id'], $param['action_id'], $param['page'], $param['limit']);

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
				$affectedRow = $this->execSP('sp_group_action_create', $param['group_id'], $param['action_id'], $param['description'], $param['active'], $this->session->getUserId());
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
				$affectedRow = $this->execSP('sp_group_action_update', $param['group_action_id'], $param['group_id'], $param['action_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function deleteData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'group_action_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_group_action_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function CopyData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_group_action_copy_create', $param['group1'], $param['group2'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function CopyMenuData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_group_menu_copy_create', $param['group1'], $param['group2'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

}

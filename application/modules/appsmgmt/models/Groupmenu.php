<?php

class Appsmgmt_Models_Groupmenu extends Zend_Db_Table_Abstract {

	protected $_name = 'sec_group_menu';
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
				if ($param['group_id'] !== null) { /* Updated by David */
//					$resultcount = $this->execSP('sp_group_menu_count', $param['group_menu_id'], $param['group_id'], $param['menu_id']);
					$resultdata = $this->execSP3('sp_group_menu_read_new', $param['group_menu_id'], $param['group_id'], $param['menu_id'], $param['page'], $param['limit']);
					$return['total'] = $resultdata[0][0]['totalRow'];
					$return['data'] = $resultdata[1];
					$return['success'] = true;
				}
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function createData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_group_menu_create', $param['group_id'], $param['menu_id'], $param['description'], $param['active'], $this->session->getUserId());
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
				$affectedRow = $this->execSP('sp_group_menu_update', $param['group_menu_id'], $param['group_id'], $param['menu_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function deleteData($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'group_menu_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_group_menu_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

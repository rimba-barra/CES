<?php

class Erems_Models_Masternotaris extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_notaris';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function masternotarisRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$resultcount = $this->execSP('sp_notaris_count', $param['code'], $param['notaris'], $param['alamat'], $param['city_id'], $param['country_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$resultdata = $this->execSP('sp_notaris_read', $param['code'], $param['notaris'], $param['alamat'], $param['city_id'], $param['country_id'], $param['start'], $param['limit'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function masternotarisCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_notaris_create', $param['code'], $param['notaris'], $param['alamat'], $param['country_id'], $param['city_id'], $param['telp'], $param['fax'], $param['email'], $this->session->getUserId(), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['notaris_register'], $param['notaris_npwp']);
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				var_dump($e);
			}
		}
		return $return;
	}

	function masternotarisUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_notaris_update', $param['notaris_id'], $param['code'], $param['notaris'], $param['alamat'], $param['country_id'], $param['city_id'], $param['telp'], $param['fax'], $param['email'], $this->session->getUserId(), $param['notaris_register'], $param['notaris_npwp']);
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masternotarisDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'notaris_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_notaris_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>
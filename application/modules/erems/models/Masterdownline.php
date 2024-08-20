<?php

class Erems_Models_Masterdownline extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_downline';
	protected $datadelimiter = '~#~';
	protected $returned = array('total' => 0, 'success' => false, 'data' => array());
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function dataRead($param = array()) {
		if (is_array($param) && count($param)) {
			$spname = 'sp_downline_read';
			$paramSP = [
				isset($param['downline_id']) ? $param['downline_id'] : 0,
				$param['code'],
				$param['name'],
				$param['start'],
				$param['limit'],
				$this->session->getCurrentProjectId(), $this->session->getCurrentPtId()
			];

			try {
				$result = $this->execSP3($spname, $paramSP);
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL'];
				$this->returned['success'] = true;
				$this->returned['data'] = $result[1];
			} catch (Exception $e) {
				
			}
		}
		return $this->returned;
	}

	function dataCreate($param = array()) {

		if (is_array($param) && count($param)) {
			$spname = 'sp_downline_create';
			$spparamkey = array('data' => array('code', 'name', 'address', 'rekening', 'phone', 'registration_date', 'is_broker', 'active' => 1));
			try {
				$result = $this->execSP3($spname, $this->generateSPParam($spparamkey, $param), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $this->session->getUserId());
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}

		return $this->returned;
	}

	function dataUpdate($param = array()) {
		if (is_array($param) && count($param)) {
			$spname = 'sp_downline_update';
			$spparamkey = array('data' => array('downline_id', 'code', 'name', 'address', 'rekening', 'phone', 'registration_date', 'is_broker', 'active' => 1));
			try {
				$result = $this->execSP3($spname, $this->generateSPParam($spparamkey, $param), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $this->session->getUserId());
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $this->returned;
	}

	function dataDelete($param = array()) {
		if (is_array($param) && count($param)) {
			$spname = 'sp_downline_destroy';
			$spparamkey = array('data' => array('downline_id'));

			try {
				$result = $this->execSP3($spname, $this->generateSPParam($spparamkey, $param, array('datadelimiter' => ($this->datadelimiter))), $this->session->getUserId());
				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $this->returned;
	}

}

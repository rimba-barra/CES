<?php

class Erems_Models_Masterdistchannel extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_komisi_distributionchannel';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function distchannelRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_distributionchannel_id'],
					$param['code'],
					$param['distributionchannel'],
					$param['start'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterdistchannel_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function distchannelCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['code'],
					$param['distributionchannel'],
					$param['description'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterdistchannel_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function distchannelUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_distributionchannel_id'],
					$param['code'],
					$param['distributionchannel'],
					$param['description'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterdistchannel_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function distchannelDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_distributionchannel_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . '~#~';
				}
			}
			try {
				$data = array(
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterdistchannel_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>
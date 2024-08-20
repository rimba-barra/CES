<?php

class Erems_Models_Masterkomisiprogresif extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_komisi_progresif';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function komisiprogresifRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_progresif_id'],
					$param['code'],
					$param['tahun'],
					$param['start'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterkomisiprogresif_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function komisiprogresifCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['code'],
					$param['tahun'],
					$param['persentase'],
					$param['target_1'],
					$param['target_2'],
					$param['target_3'],
					$param['target_4'],
					$param['target_5'],
					$param['target_6'],
					$param['target_7'],
					$param['target_8'],
					$param['target_9'],
					$param['target_10'],
					$param['target_11'],
					$param['target_12'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterkomisiprogresif_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function komisiprogresifUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_progresif_id'],
					$param['code'],
					$param['tahun'],
					$param['persentase'],
					$param['target_1'],
					$param['target_2'],
					$param['target_3'],
					$param['target_4'],
					$param['target_5'],
					$param['target_6'],
					$param['target_7'],
					$param['target_8'],
					$param['target_9'],
					$param['target_10'],
					$param['target_11'],
					$param['target_12'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterkomisiprogresif_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function komisiprogresifDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_progresif_id';
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
				$result = $this->execSP3('sp_masterkomisiprogresif_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>
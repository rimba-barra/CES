<?php

class Erems_Models_Masterlrpsharingparameter extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_lrp_sharingparameter';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function lrpsharingparameterRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['lrp_sharingparameter_id'],
					$param['start'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterlrpsharingparameter_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function lrpsharingparameterCreate($param = array()) {
		$ptID = $this->session->getCurrentPtId();
		$gencoSplitLRP = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSplitPTLRP();
		if ($gencoSplitLRP == 1) {
			$ptID = $param['pt_id'];
		}
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$ptID,
					$param['pricetype_id'],
					$param['payment_start'],
					$param['payment_end'],
					$param['sharing'],
					$param['is_sppjb'],
					$param['is_sertifikat'],
					$param['is_akad'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterlrpsharingparameter_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function lrpsharingparameterUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['lrp_sharingparameter_id'],
					$param['pricetype_id'],
					$param['payment_start'],
					$param['payment_end'],
					$param['sharing'],
					$param['is_sppjb'],
					$param['is_sertifikat'],
					$param['is_akad'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterlrpsharingparameter_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function lrpsharingparameterDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'lrp_sharingparameter_id';
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
				$result = $this->execSP3('sp_masterlrpsharingparameter_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>
<?php

class Erems_Models_Masterpencairankomisi extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_komisi_pencairan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function pencairankomisiRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_pencairan_id'],
					$param['code'],
					$param['judul_komisi'],
					$param['start'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterpencairankomisi_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function pencairankomisidetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_masterpencairankomisidetail_read', $param['komisi_pencairan_id']);
				$return['total'] = count($result[0]);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function pencairankomisiCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$komisi_pencairan_detail_id = '';
				$komisi_pencairan_id = '';
				$komisi_penerima_id = '';
				$komisi_persen_nominal = '';
				$komisi_value = '';
				$populated_data = '';
				$reff_id = '';
				$reff_name = '';
				$npwp = '';
				$keterangan = '';
				$deleted_detail = '';
				$param_detail = $param['data_detail'];
				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'komisi_pencairan_detail_id': $komisi_pencairan_detail_id .= $value . "~#~";
									break;
								case 'komisi_pencairan_id': $komisi_pencairan_id .= $value . "~#~";
									break;
								case 'komisi_penerima_id': $komisi_penerima_id .= $value . "~#~";
									break;
								case 'komisi_persen_nominal': $komisi_persen_nominal .= $value . "~#~";
									break;
								case 'komisi_value': $komisi_value .= str_replace(",", "", $value) . "~#~";
									break;
								case 'populated_data': $populated_data .= $value . "~#~";
									break;
								case 'reff_id': $reff_id .= $value . "~#~";
									break;
								case 'reff_name': $reff_name .= $value . "~#~";
									break;
								case 'npwp': $npwp .= $value . "~#~";
									break;
								case 'keterangan': $keterangan .= $value . "~#~";
									break;
								case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
									break;
							}
						}
					};

					$komisi_pencairan_detail_id = preg_replace('/(~)$/', '', $komisi_pencairan_detail_id);
					$komisi_pencairan_id = preg_replace('/(~)$/', '', $komisi_pencairan_id);
					$komisi_penerima_id = preg_replace('/(~)$/', '', $komisi_penerima_id);
					$komisi_persen_nominal = preg_replace('/(~)$/', '', $komisi_persen_nominal);
					$komisi_value = preg_replace('/(~)$/', '', $komisi_value);
					$populated_data = preg_replace('/(~)$/', '', $populated_data);
					$reff_id = preg_replace('/(~)$/', '', $reff_id);
					$reff_name = preg_replace('/(~)$/', '', $reff_name);
					$npwp = preg_replace('/(~)$/', '', $npwp);
					$deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
					$keterangan = preg_replace('/(~)$/', '', $keterangan);
				}


				$data = array(
					$param['komisi_pencairan_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['code'],
					$param['komisi_distributionchannel_id'],
					$param['judul_komisi'],
					$param['description'],
					$komisi_pencairan_detail_id,
					$komisi_penerima_id,
					$komisi_persen_nominal,
					$komisi_value,
					$populated_data,
					$reff_id,
					$reff_name,
					$npwp,
					$deleted_detail,
					$keterangan,
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterpencairankomisi_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				$err_message = explode(']', $e->getMessage());
				$return['message'] = $err_message[count($err_message)-1];
			}
		}
		return $return;
	}

	function pencairankomisiUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['komisi_pencairan_id'],
					$param['code'],
					$param['pencairan_komisi'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterpencairankomisi_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function pencairankomisiDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_pencairan_id';
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
				$result = $this->execSP3('sp_masterpencairankomisi_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function pencairankomisidetailDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'komisi_pencairan_detail_id';
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
				$result = $this->execSP3('sp_masterpencairankomisidetail_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function employeeRead($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['jabatan']
				);
				$result = $this->execSP3('sp_employee_cbf_read', $data);
				$return['total'] = count($result[0]);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function citraclubRead() {
		$return['success'] = false;
		try {
			$data = array(
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId()
			);
			$result = $this->execSP3('sp_citraclub_cbf_read', $data);
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			
		}
		return $return;
	}

	function memberRead() {
		$return['success'] = false;
		try {
			$data = array(
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId()
			);
			$result = $this->execSP3('sp_cac_cbf_read', $data);
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			
		}
		return $return;
	}

}

?>
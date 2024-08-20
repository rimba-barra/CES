<?php

class Erems_Models_Masterrangebagihasil extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_rangebagihasil';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function rangebagihasilRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['rangebagihasil_id'],
					$param['code'],
					$param['name'],
					$param['start'],
					$param['limit'],
					$param['page'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterrangebagihasil_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function rangebagihasildetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_masterrangebagihasildetail_read', $param['rangebagihasil_id']);
				$return['total'] = count($result[0]);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function rangebagihasilCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$rangebagihasil_detail_id = '';
				$hargatanah_start = '';
				$hargatanah_end = '';
				$komposisi_tanah_partner = '';
				$komposisi_tanah_ciputra = '';
				$komposisi_bangunan_partner = '';
				$komposisi_bangunan_ciputra  = '';
				$deleted_detail = '';
				$param_detail = $param['data_detail'];
				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'rangebagihasil_detail_id': $rangebagihasil_detail_id .= $value . "~#~";
									break;
								case 'hargatanah_permeter_start': $hargatanah_start .= $value . "~#~";
									break;
								case 'hargatanah_permeter_end': $hargatanah_end .= $value . "~#~";
									break;
								case 'komposisi_tanah_partner': $komposisi_tanah_partner .= str_replace(",", "", $value) . "~#~";
									break;
								case 'komposisi_tanah_ciputra': $komposisi_tanah_ciputra .= $value . "~#~";
									break;
								case 'komposisi_bangunan_partner': $komposisi_bangunan_partner .= $value . "~#~";
									break;
								case 'komposisi_bangunan_ciputra': $komposisi_bangunan_ciputra .= $value . "~#~";
									break;
								case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
									break;
							}
						}
					};

					$rangebagihasil_detail_id = preg_replace('/(~)$/', '', $rangebagihasil_detail_id);
					$hargatanah_start = preg_replace('/(~)$/', '', $hargatanah_start);
					$hargatanah_end = preg_replace('/(~)$/', '', $hargatanah_end);
					$komposisi_tanah_partner = preg_replace('/(~)$/', '', $komposisi_tanah_partner);
					$komposisi_tanah_ciputra = preg_replace('/(~)$/', '', $komposisi_tanah_ciputra);
					$komposisi_bangunan_partner = preg_replace('/(~)$/', '', $komposisi_bangunan_partner);
					$komposisi_bangunan_ciputra  = preg_replace('/(~)$/', '', $komposisi_bangunan_ciputra );
					$deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
				}


				$data = array(
					$param['rangebagihasil_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['code'],
					$param['name'],
					$param['komisi_marketing'],
					$param['pph'],
					$param['is_progresif'],
					$rangebagihasil_detail_id,
					$hargatanah_start,
					$hargatanah_end,
					$komposisi_tanah_partner,
					$komposisi_tanah_ciputra,
					$komposisi_bangunan_partner,
					$komposisi_bangunan_ciputra ,
					$deleted_detail,
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterrangebagihasil_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				// echo $e;
			}
		}
		return $return;
	}

	function rangebagihasilDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'rangebagihasil_id';
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
				$result = $this->execSP3('sp_masterrangebagihasil_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function rangebagihasildetailDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'rangebagihasil_detail_id';
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
				$result = $this->execSP3('sp_masterrangebagihasildetail_destroy', $param[$key_name], $data);
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
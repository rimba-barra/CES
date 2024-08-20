<?php

class Erems_Models_Mastersiteplanlegend extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_legend';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function legendRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['siteplanlegend_id'],
					$param['code'],
					$param['name'],
					$param['start'],
					$param['limit'],
					$param['page'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_mastersiteplanlegend_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function legenddetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_mastersiteplanlegenddetail_read', [$param['siteplanlegend_id'], $this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()]);
				$return['total'] = count($result[0]);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function siteplanparameterRead() {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_siteplanparameter_read');
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			
		}
		return $return;
	}

	function siteplanparameterrelationalRead($param) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_siteplanparameterrelational_read', [$param['relational_table'], $param['relational_field_id'], $param['relational_field_value']]);
			$return['total'] = count($result[0]);
			$return['data'] = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			
		}
		return $return;
	}

	function legendCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$siteplanlegenddetail_id = '';
				$siteplanparameter_id = '';
				$operator = '';
				$valueParam = '';
				$valueDisplay = '';
				$deleted_detail = '';
				$param_detail = $param['data_detail'];

				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'siteplanlegenddetail_id': $siteplanlegenddetail_id .= $value . "~#~";
									break;
								case 'siteplanparameter_id': $siteplanparameter_id .= $value . "~#~";
									break;
								case 'operator': $operator .= str_replace(",", "", $value) . "~#~";
									break;
								case 'value': $valueParam .= $value . "~#~";
									break;
								case 'value_display': $valueDisplay .= $value . "~#~";
									break;
								case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
									break;
							}
						}
					};

					$siteplanlegenddetail_id = preg_replace('/(~)$/', '', $siteplanlegenddetail_id);
					$siteplanparameter_id = preg_replace('/(~)$/', '', $siteplanparameter_id);
					$operator = preg_replace('/(~)$/', '', $operator);
					$valueParam = preg_replace('/(~)$/', '', $valueParam);
					$valueDisplay = preg_replace('/(~)$/', '', $valueDisplay);
					$deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
				}


				$data = array(
					$param['siteplanlegend_id'],
					$param['file_svg'],
					$param['prefixcode_svg'],
					$param['legendid_svg'],
					$param['color'],
					$param['description'],
					$siteplanlegenddetail_id,
					$siteplanparameter_id,
					$operator,
					$valueParam,
					$valueDisplay,
					$deleted_detail,
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_mastersiteplanlegend_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
//				 echo $e;
			}
		}
		return $return;
	}

	function legendDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'siteplanlegend_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			$fileSVG[$key_name] = isset($param['file_svg']) ? $param['file_svg'] : '';
			;
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$fileSVG[$key_name] = $val['file_svg'];
					$param[$key_name] .= $val[$key_name] . '~#~';
				}
			}
			try {
				$data = array(
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_mastersiteplanlegend_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
				foreach ($fileSVG as $key => $fileName) {
					unlink(APPLICATION_PATH . '/../public/app/erems/uploads/siteplan/' . $fileName);
				}
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function legenddetailDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'siteplanlegenddetail_id';
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
				$result = $this->execSP3('sp_mastersiteplanlegenddetail_destroy', $param[$key_name], $data);
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
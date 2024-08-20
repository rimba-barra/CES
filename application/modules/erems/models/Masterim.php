<?php

class Erems_Models_Masterim extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_internalmemo';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function masterimRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['internalmemo_id'],
					$param['nomor_im'],
					isset($param['page']) ? $param['page'] : 1,
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterim_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterimDropdownRead() {
		$data = array(
			$this->session->getCurrentProjectId(),
			$this->session->getCurrentPtId()
		);
		$result = $this->execSP3('sp_masterim_read_dropdown', $data);
		$return['total']   = count($result[0]);
		$return['data']    = $result[0];
		$return['success'] = true;

		return $return;
	}

	function masterimdetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_masterimdetail_read', $param['internalmemo_id']);
				$return['total'] = count($result[0]);
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterimdetailDropdownRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_masterimdetail_read_dropdown', $param['internalmemo_id']);
				$return['total']   = count($result[0]);
				$return['data']    = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterimCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$internalmemo_detail_id = '';
				$internalmemo_id = '';
				$group_id = '';
				$reward_id = '';
				$amount = '';
				$notes = '';
				$deleted_detail = '';

				$param_detail = $param['data_detail'];
				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'internalmemo_detail_id': $internalmemo_detail_id .= $value . "~#~";
									break;
								case 'internalmemo_id': $internalmemo_id .= $value . "~#~";
									break;
								case 'group_id': $group_id .= $value . "~#~";
									break;
								case 'reward_id': $reward_id .= $value . "~#~";
									break;
								case 'amount': $amount .= str_replace(",", "", $value) . "~#~";
									break;
								case 'notes': $notes .= $value . "~#~";
									break;
								case 'deleted': $deleted_detail .= ($value ? $value : 0) . "~#~";
									break;
							}
						}
					};

					$internalmemo_detail_id = preg_replace('/(~)$/', '', $internalmemo_detail_id);
					$internalmemo_id = preg_replace('/(~)$/', '', $internalmemo_id);
					$group_id = preg_replace('/(~)$/', '', $group_id);
					$reward_id = preg_replace('/(~)$/', '', $reward_id);
					$amount = preg_replace('/(~)$/', '', $amount);
					$deleted_detail = preg_replace('/(~)$/', '', $deleted_detail);
					$notes = preg_replace('/(~)$/', '', $notes);
				}


				$data = array(
					$param['internalmemo_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['nomor_im'],
					$param['tanggal_im'],
					$param['periode_start'],
					$param['periode_end'],
					$param['description'],
					$internalmemo_detail_id,
					$group_id,
					$reward_id,
					$amount,
					$deleted_detail,
					$notes,
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterim_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				$err_message = explode(']', $e->getMessage());
				$return['message'] = $err_message[count($err_message)-1];
			}
		}
		return $return;
	}

	function masterimUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'internalmemo_detail_id';
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
				$result = $this->execSP3('sp_masterimdetail_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterimDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'internalmemo_id';
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
				$result = $this->execSP3('sp_masterim_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function masterimdetailDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'internalmemo_detail_id';
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
				$result = $this->execSP3('sp_masterimdetail_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}
}

?>
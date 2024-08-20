<?php

class Erems_Models_Revenuesharing extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_komisi_perhitungan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function revenuesharingRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['cluster_id'],
					$param['block_id'],
					$param['unit_number'],
					$param['customer_name'],
					isset($param['set_rs']) && $param['set_rs'] ? $param['set_rs'] : 0,
					$param['page'],
					$param['limit'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_revenuesharing_read', $data);
//				print_r($result);
//				die;

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function revenuesharinglookupRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					0,
					100000,
					1
				);
				$result = $this->execSP3('sp_revenuesharing_lookup_rs_read', $data);

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function revenuesharingpurchaseletterdetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_revenuesharing_purchaseletter_detail_read', $data);
//				print_r($result[0][0]);
//				foreach ($result[0][0] AS $key=>$val)
//					echo "{name: '".$key."', type: 'int'},<br/>";
//				die;

				$return['total'] = count($result[0][0]);
				$return['data'] = $result[0][0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function revenuesharingUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$param['unit_id'],
					$param['cb_set_cluster'],
					isset($param['cluster_id']) ? $param['cluster_id'] : 0,
					$param['rangebagihasil_id'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_revenuesharing_update', $data);
				$return['total'] = count($result[0]);
				$return['success'] = (bool) $result;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function revenuesharingDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'unit_id';
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
				$result = $this->execSP3('sp_revenuesharing_unset', $param[$key_name], $data);
				$return['total'] = count($result[0]);
				$return['success'] = count($result[0]) > 0;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	// added by rico 05122022
	function revenuesharingUpdateLegalitas($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					str_replace( ',', '', $param['biaya_legalitas_netto']),
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_revenuesharing_update_legalitas', $data);
				$return['total'] = count($result[0]);
				$return['success'] = (bool) $result;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>

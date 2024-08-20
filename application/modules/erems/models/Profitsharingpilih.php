<?php

class Erems_Models_Profitsharingpilih extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_komisi_perhitungan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function profitsharingpilihRead($param) {
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
				$result = $this->execSP3('sp_profitsharingpilih_read', $data);

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function profitsharingpilihlookupRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					0,
					100000,
					1
				);
				$result = $this->execSP3('sp_profitsharingpilih_lookup_rs_read', $data);

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function profitsharingpilihpurchaseletterdetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_profitsharingpilih_purchaseletter_detail_read', $data);
				
				$return['total'] = count($result[0][0]);
				$return['data'] = $result[0][0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function profitsharingpilihUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$param['unit_id'],
					$param['cb_set_cluster'],
					isset($param['cluster_id']) ? $param['cluster_id'] : 0,
					$param['profitsharing_id'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_profitsharingpilih_update', $data);
				$return['total'] = count($result[0]);
				$return['success'] = (bool) $result;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function profitsharingpilihDelete($param = array()) {
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
				$result = $this->execSP3('sp_profitsharingpilih_unset', $param[$key_name], $data);
				$return['total'] = count($result[0]);
				$return['success'] = count($result[0]) > 0;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	function profitsharingpilihdetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['profitsharing_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_profitsharingpilih_detail_read', $data);

				if(count($result[0]) > 0){
					$return['total'] = count($result[0]);
					$return['data'] = $result[0][0];
				}
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>

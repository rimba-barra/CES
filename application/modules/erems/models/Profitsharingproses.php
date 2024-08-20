<?php

class Erems_Models_Profitsharingproses extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function dataRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['unit_number'],
					$param['customer_name'],
					$param['cluster_id'],
					$param['block_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page']
				);
				$result = $this->execSP3('sp_profitsharingproses_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	} 

	function dataprosesdateRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page']
				);
				$result = $this->execSP3('sp_profitsharingprosesdate_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function dataprosesdetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['profitsharing_id'],
					$param['unit_id'],
					$param['purchaseletter_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page']
				);
				$result = $this->execSP3('sp_profitsharingprosesdetail_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function dataCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {

				$data = array(
					$param['doc_no'],
					$param['process_date'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['payment_flag'],
					1, // 1 = new process 2, pre process
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_profitsharingproses_create', $data);
//				print_r($result);
				$return['total'] = $result[0];
				$return['success'] = true; //$result[0] > 0;
			} catch (Exception $e) {
				//var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function exportData($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['doc_no'],
					$param['process_date'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['payment_flag'],
					2, // 1 = new process 2, pre process
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_profitsharingproses_create', $data);
//				print_r($result);
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $result;
	}

	function printOut($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['profitsharing_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				if ($param['rg_print'] == "detail_rs") {
					$result = $this->execSP3('sp_profitsharingproses_export_excel_detail_rs', $data);
				} else if ($param['rg_print'] == "rekap_rs") {
					$result = $this->execSP3('sp_profitsharingproses_export_excel_rekap_rs', $data);
				} else if ($param['rg_print'] == "detail_terjual") {
					$result = $this->execSP3('sp_profitsharingproses_export_excel_detail_terjual', $data);
				} else if ($param['rg_print'] == "rekap_terjual") {
					$result = $this->execSP3('sp_profitsharingproses_export_excel_rekap_terjual', $data);					
				}
//				print_r($result);
//				foreach ($result[0][0] as $key => $value) {
//					echo "{".$key."}<br/>";
//				}
//				die;
			} catch (Exception $e) {
//				var_dump($e->getMessage());
			}
		}
		return $result;
	}
	
	function RSDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['profitsharing_id'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_profitsharingproses_destroy', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>
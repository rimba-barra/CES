<?php

class Erems_Models_Utility extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_utility';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function utilityRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['cluster_id'],
					$param['block_id'],
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					// $param['customer_id'],
					$param['unit_number'],
					$param['customer_name'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_utility_new_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function utilitydetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$resultdata = $this->execSP('sp_utilitydetail_read',
						$param['unit_id'],
						$param['temp_utility_id']
				);

				$return['data'] = $resultdata;
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function utilityCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				if ($param['is_detail'] == 'yes') {
					$affectedRow = $this->execSP('sp_utility_create',
							$param['unit_id'],
							$param['utilitytype_id'],
							$param['utilitystatus_id'],
							$param['purchaseletter_id'],
							doubleval($param['power']),
							$param['request_date'],
							$param['installment_date'],
							$param['followup_date'],
							$param['installment_no'],
							$param['meter_no'],
							$param['note'],
							$param['temp_utility_id'],
							$this->session->getUserId(),
							'1'
					);
					$return['success'] = (bool) $affectedRow;
				}
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function utilityUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				if ($param['is_detail'] == 'yes') {
					$affectedRow = $this->execSP('sp_utility_update',
							$param['utility_id'],
							$param['unit_id'],
							$param['utilitytype_id'],
							$param['utilitystatus_id'],
							$param['purchaseletter_id'],
							doubleval($param['power']),
							$param['request_date'],
							$param['installment_date'],
							$param['followup_date'],
							$param['installment_no'],
							$param['meter_no'],
							$param['note'],
							$this->session->getUserId(),
							'1'
					);
					$return['success'] = (bool) $affectedRow;
				}
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function utilityDelete($param = array()) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			$key_name = 'utility_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . ',';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_utility_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function utilityCheckId($projectId, $ptId, $codeCluster, $unitNumber, $tipeUtilitas, $statusUtilitas) {
		$return['success'] = false;
		try {
			$affectedRow = $this->execSP('sp_utility_checkid_read', $projectId, $ptId, $codeCluster, $unitNumber, $tipeUtilitas, $statusUtilitas);
			$return['data'] = $affectedRow;
			$return['success'] = (bool) $affectedRow;
		} catch (Exception $e) {
			
		}
		return $return;
	}

}

?>
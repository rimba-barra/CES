<?php

class Erems_Models_Netpresentvalue extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = 't_verification_approval';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function netpresentvalueRead($params) {
		$return['success'] = false;
		try {
			$post = $params->getPost();
			$data = array(
				$params->getPost('page'),
				$params->getPost('limit'),
				$this->session->getCurrentProjectId(),
				($params->getPost('cluster_id') ? $params->getPost('cluster_id') : 0),
				$params->getPost('unit_number'),
				$params->getPost('customer_name'),
				$this->session->getCurrentPtId()
			);
			$result = $this->execSP3('sp_npv_read', $data);
			$return['total'] = $result[0][0]['totalRow'];
			$return['data'] = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function purchaseletterlistRead($params) {
		$result = $this->execSP3('sp_npv_list_purchaseletter_read',
			$this->session->getCurrentProjectId(),
			$this->session->getCurrentPtId(),
			$params->getPost('page'),
			$params->getPost('limit'),
			$params->getPost('purchaseletter_no'),
			$params->getPost('customer_name'),
			$params->getPost('unit_id')
		);

		$return['total']   = $result[0][0]['totalRow'];
		$return['data']    = $result[1];
		$return['success'] = true;
		return $return;
	}

	function schedulepurchaseletterRead($params){
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_npv_schedule_purchaseletter_read', 
				$params->getPost('purchaseletter_id')
			);
			$return['total']   = count($result[0]);
			$return['data']    = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function netpresentvalueCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$param_standard  = $param['detail_standard'];
			$param_realisasi = $param['detail_realisasi'];

			$standard_npv_detail_standard_id = '';
			$standard_record_no              = '';
			$standard_duedate                = '';
			$standard_scheduletype_id        = '';
			$standard_termin                 = '';
			$standard_amount                 = '';
			$standard_remaining_balance      = '';
			$standard_npv_value              = '';
			$standard_deleted                = '';

			$realisasi_npv_detail_realisasi_id = '';
			$realisasi_record_no               = '';
			$realisasi_duedate                 = '';
			$realisasi_scheduletype_id         = '';
			$realisasi_termin                  = '';
			$realisasi_amount                  = '';
			$realisasi_npv_value               = '';
			$realisasi_deleted                 = '';

			if (is_array($param_standard) && count($param_standard) > 0){
                    foreach ($param_standard as $key => $val){
                    	if(isset($val['npv_detail_standard_id'])){ $standard_npv_detail_standard_id .= ($val['npv_detail_standard_id'] ? $val['npv_detail_standard_id'] : 0) . "~"; }
                    	if(isset($val['record_no'])){ $standard_record_no .= $val['record_no'] . "~"; }
                    	if(isset($val['duedate'])){ $standard_duedate .= $val['duedate'] . "~"; }
                    	if(isset($val['scheduletype_id'])){ $standard_scheduletype_id .= $val['scheduletype_id'] . "~"; }
                    	if(isset($val['termin'])){ $standard_termin .= $val['termin'] . "~"; }
                    	if(isset($val['amount'])){ $standard_amount .= ($val['amount'] ? $val['amount'] : 0) . "~"; }
                    	if(isset($val['remaining_balance'])){ $standard_remaining_balance .= ($val['remaining_balance'] ? $val['remaining_balance'] : 0) . "~"; }
                    	if(isset($val['npv_value'])){ $standard_npv_value .= ($val['npv_value'] ? $val['npv_value'] : 0) . "~"; }
                    	if(isset($val['deleted'])){ $standard_deleted .= $val['deleted'] . "~"; }
                    }

					$standard_npv_detail_standard_id = preg_replace('/(~)$/', '', $standard_npv_detail_standard_id);
					$standard_record_no              = preg_replace('/(~)$/', '', $standard_record_no);
					$standard_duedate                = preg_replace('/(~)$/', '', $standard_duedate);
					$standard_scheduletype_id        = preg_replace('/(~)$/', '', $standard_scheduletype_id);
					$standard_termin                 = preg_replace('/(~)$/', '', $standard_termin);
					$standard_amount                 = preg_replace('/(~)$/', '', $standard_amount);
					$standard_remaining_balance      = preg_replace('/(~)$/', '', $standard_remaining_balance);
					$standard_npv_value              = preg_replace('/(~)$/', '', $standard_npv_value);
					$standard_deleted                = preg_replace('/(~)$/', '', $standard_deleted);
            }

			if (is_array($param_realisasi) && count($param_realisasi) > 0){
                    foreach ($param_realisasi as $key => $val){
                    	if(isset($val['npv_detail_realisasi_id'])){ $realisasi_npv_detail_realisasi_id .= ($val['npv_detail_realisasi_id'] ? $val['npv_detail_realisasi_id'] : 0) . "~"; }
                    	if(isset($val['record_no'])){ $realisasi_record_no .= $val['record_no'] . "~"; }
                    	if(isset($val['duedate'])){ $realisasi_duedate .= $val['duedate'] . "~"; }
                    	if(isset($val['scheduletype_id'])){ $realisasi_scheduletype_id .= $val['scheduletype_id'] . "~"; }
                    	if(isset($val['termin'])){ $realisasi_termin .= $val['termin'] . "~"; }
                    	if(isset($val['amount'])){ $realisasi_amount .= ($val['amount'] ? $val['amount'] : 0) . "~"; }
                    	if(isset($val['npv_value'])){ $realisasi_npv_value .= ($val['npv_value'] ? $val['npv_value'] : 0) . "~"; }
                    	if(isset($val['deleted'])){ $realisasi_deleted .= $val['deleted'] . "~"; }
                    }

					$realisasi_npv_detail_realisasi_id = preg_replace('/(~)$/', '', $realisasi_npv_detail_realisasi_id);
					$realisasi_record_no               = preg_replace('/(~)$/', '', $realisasi_record_no);
					$realisasi_duedate                 = preg_replace('/(~)$/', '', $realisasi_duedate);
					$realisasi_scheduletype_id         = preg_replace('/(~)$/', '', $realisasi_scheduletype_id);
					$realisasi_termin                  = preg_replace('/(~)$/', '', $realisasi_termin);
					$realisasi_amount                  = preg_replace('/(~)$/', '', $realisasi_amount);
					$realisasi_npv_value               = preg_replace('/(~)$/', '', $realisasi_npv_value);
					$realisasi_deleted                 = preg_replace('/(~)$/', '', $realisasi_deleted);
            }

			try {
				$npv_id = $param['npv_id'] ? $param['npv_id'] : 0;

				$affectedRow = $this->execSP3('sp_npv_create',
					$npv_id,
					$param['purchaseletter_id'],
					$param['harga_total_jual'],
					$param['npv_no'],
					$param['npv_date'],
					$param['harga_total_jual_new'],
					$param['npv_standard'],
					$param['npv_realisasi'],
					$param['npv_nilai_persen'],
					$param['total_standard'],
					$param['total_realisasi'],
					$param['notes'],

					$standard_npv_detail_standard_id, 
					$standard_record_no, 
					$standard_duedate,
					$standard_scheduletype_id,
					$standard_termin,
					$standard_amount,
					$standard_remaining_balance,
					$standard_npv_value,
					$standard_deleted,

					$realisasi_npv_detail_realisasi_id,
					$realisasi_record_no,
					$realisasi_duedate,
					$realisasi_scheduletype_id,
					$realisasi_termin,
					$realisasi_amount,
					$realisasi_npv_value,
					$realisasi_deleted,

					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
                    $this->session->getUserId(),

					($param['selisih_standard'] ? $param['selisih_standard'] : null),
					($param['selisih_standard_persen'] ? $param['selisih_standard_persen'] : null),
					($param['selisih_realisasi'] ? $param['selisih_realisasi'] : null),
					($param['selisih_realisasi_persen'] ? $param['selisih_realisasi_persen'] : null),
					($param['selisih_perubahan'] ? $param['selisih_perubahan'] : null),
					($param['selisih_perubahan_persen'] ? $param['selisih_perubahan_persen'] : null)
                );
				$return['success'] = (bool)$affectedRow;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	function netpresentvalueDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'npv_id';
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
				$result = $this->execSP3('sp_npv_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	function netpresentvaluedetailRead($params) {
		$return['success'] = false;
		$result = array();
		try {
			if($params['mode'] == 'getschedule'){
				$result = $this->execSP3('sp_npv_schedule_purchaseletter_read', $params['purchaseletter_id']);
			}
			else if($params['mode'] == 'getdetailstandard'){
				$result = $this->execSP3('sp_npv_detail_standard_read', $params['npv_id']);
			}
			else if($params['mode'] == 'getdetailrealisasi'){
				$result = $this->execSP3('sp_npv_detail_realisasi_read', $params['npv_id']);
			}
			else if($params['mode'] == 'getdetail'){
				$result = $this->execSP3('sp_npv_detail_read', $params['npv_id'], $this->session->getUserId());
			}

			if(count($result) > 0){
				$return['total']   = count($result[0]);
				$return['data']    = $result[0];
				$return['success'] = true;
			}
		} catch (Exception $e) {
			echo $e;
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

	function get_discount_rate_year(){
    	$return = 12; /// Default
		try {
			$data = array (
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				'DISCOUNT_RATE_YEAR'
			);
			$result = $this->execSP3('sp_global_parameter_read', $data);

			if(isset($result[0]) && count($result[0]) > 0){
				$return = $result[0][0]['value'];
			}
		} catch(Exception $e) {
            var_dump($e->getMessage());
        }
		return $return;
    }
}

?>
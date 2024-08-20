<?php

class Erems_Models_Verificationapproval extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = 't_verification_approval';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
// 	public function getapprovalRead(Erems_Box_Models_App_HasilRequestRead $r){
        
//         $hasil = array();
// //        if($id==0){
// //            return $hasil;
// //        }
//         $hasil = $this->dbTable->SPExecute('sp_verificationapproval_read',$r->getOthersValue('purchaseletter_id'),$r->getOthersValue('verification_id'));
// //        var_dump($hasil[0][0]['totalRow']); die();    
//         $return['totalRow'] = $hasil[0][0]['totalRow'];
//         $return['data'] = $hasil[1];
    
//         return $return;
//     }

	function verificationapprovalRead($params) {
		$return['success'] = false;
		try {
			$data = array(
				$params->getPost('page'),
				$params->getPost('limit'),
				$this->session->getCurrentProjectId(),
				($params->getPost('cluster_id') ? $params->getPost('cluster_id') : 0),
				($params->getPost('verification_id') ? $params->getPost('verification_id') : 0),
				$params->getPost('unit_number'),
				$params->getPost('customer_name')
			);

			$result = $this->execSP3('sp_verification_approval_read', $data);
			$return['total'] = $result[0][0]['totalRow'];
			$return['data'] = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function verificationapprovaldetailRead($params) {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_verification_approval_print_read', $params->getPost('verification_approval_id'));
			$return['total']   = count($result[0]);
			$return['data']    = $result[0];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function purchaseletterlistRead($params) {
		$result = $this->execSP3('sp_verification_approval_list_purchaseletter_read',
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

	function detailpurchaseletterRead($params){
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_verification_approval_purchaseletter_read', 
				$this->session->getCurrentProjectId(),
				$params->getPost('purchaseletter_id')
			);
			$return['total']   = count($result[0]);
			$return['data']    = array('main' => $result[0], 'detail' => $result[1]);
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function verificationapprovalUpdate($param = array()){
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP3('sp_verification_approval_update_status_create',
					$param['verification_approval_id'],
					$param['approve_date'],
					$param['status'],
                    $this->session->getUserId()
                );

                if((bool)$affectedRow == true && isset($affectedRow[1][0]['flag_return']) && $affectedRow[1][0]['flag_return'] == 1){
                	$return['success'] = (bool)$affectedRow;
                }
			} 
			catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	function verificationapprovalCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$verification_approval_id = $param['verification_approval_id'] ? $param['verification_approval_id'] : 0;

				$affectedRow = $this->execSP3('sp_verification_approval_create',
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$verification_approval_id,
					$param['verification_approval_date'],
					$param['verification_approval_no'],
					$param['purchaseletter_id'],
					$param['request_by_1'],
					$param['request_by_1_name'],
					$param['request_by_2'],
					$param['request_by_2_name'],
					$param['request_by_2_position'],
					$param['approved_by'],
					$param['approved_by_name'],
					$param['verification_id'],
					$param['verification_code'],
					$param['verification_detail_id'],
					$param['ketentuan'],
					$param['alasan'],
                    $this->session->getUserId()
                );
				$return['success'] = (bool)$affectedRow;
			} catch (Exception $e) {
				echo $e;
			}
		}
		return $return;
	}

	function verificationapprovalDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'verification_approval_id';
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
				$result = $this->execSP3('sp_verification_approval_destroy', $param[$key_name], $data);
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
}

?>
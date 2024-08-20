<?php
class Erems_Models_Master_Periodecutoff extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = 'm_audit_periode_cutoff';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function periodecutoffRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'], 
					$param['page'],
					$param['periode']
				);
				$result = $this->execSP3('sp_masterperiodecutoff_read', $data);		

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }
	
    function periodecutoffCreate($param = array()) {
        $return['success'] = false;

		if (is_array($param) && count($param)){
			$check = $this->periodecutoffCheck($param);
	        if($check['total'] > 0){
				$return['msg'] = "Data tidak bisa diproses.<br/>Periode cut off (". date('Y', strtotime($param['periode_cutoff'])) .") tidak boleh tahun yang sama.";
			}
			else{
				try {
					$data = array (
						$this->session->getCurrentProjectId(), 
						$this->session->getCurrentPtId(),
						$param['audit_periode_cutoff_id'],
						$param['periode_cutoff'], 
						$this->session->getUserId()
					);
					$result = $this->execSP3('sp_masterperiodecutoff_create', $data);

					$return['total']   = $result[0];
					$return['success'] = $result[0] > 0;
				} catch(Exception $e) {
	                var_dump($e->getMessage());
	            }			
			}
		}
		return $return;
    }

    function periodecutoffCheck($param = array()){
		$return['total']   = 0;
		$return['success'] = false;

		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['audit_periode_cutoff_id'], 
					date('Y-m-d', strtotime($param['periode_cutoff']))
				);
				$result = $this->execSP3('sp_masterperiodecutoff_check', $data);

				$return['total']   = $result[0][0]['RECORD_TOTAL'];
				$return['success'] = $result[0][0]['RECORD_TOTAL'] > 0 ? true : false;
			} catch(Exception $e) {
                var_dump($e->getMessage());
            }			
		}
		return $return;
    }

    function periodecutoffDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['audit_periode_cutoff_id'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterperiodecutoff_destroy', $data);
				$return['total']   = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) {
                var_dump($e->getMessage());
            }
		}
		return $return;
    }
}
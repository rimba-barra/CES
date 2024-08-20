<?php

class Masterdata_Models_Masterbankkpr extends Zend_Db_Table_Abstract {

    protected $_schema = 'dbmaster';
    protected $_name = 'm_bankkpr';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function bankkprRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['bankkpr_id'], 
					$param['bank_id'],
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_bankkpr_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    /*function bankkprCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					'', 
					$param['bankkpr_date'], 
					$param['serahterima_date'], 
					$param['note'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_bankkpr_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    function bankkprUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['bankkpr_id'], 
					$param['purchaseletter_id'],
					$param['bankkpr_no'], 
					$param['bankkpr_date'], 
					$param['serahterima_date'], 
					$param['note'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_bankkpr_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function bankkprDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'bankkpr_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bankkpr_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }*/

}

?>
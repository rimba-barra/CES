<?php

class Erems_Models_Masterfakturpajakcounter extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_fakturpajak_counter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function fakturpajakcounterRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['fakturpajak_counter_id'], 
					$param['year'], 
					$this->session->getCurrentProjectId(), 
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_fakturpajakcounter_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    /*function fakturpajakcounterCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$param['year'], 
					$param['counter'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_fakturpajakcounter_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }*/

    function fakturpajakcounterUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['fakturpajak_counter_id'], 
					$this->session->getCurrentProjectId(), 
					$param['year'], 
					$param['counter'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_fakturpajakcounter_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    /*function fakturpajakcounterDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'fakturpajak_counter_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_fakturpajakcounter_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }*/

}

?>
<?php

class Erems_Models_Warningjatuhtempo extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function warningjatuhtempoRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'],
					$param['customer_name'], 
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$param['is_responnote'],
					$param['today_plus'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_warningjatuhtempo_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function warningjatuhtempoCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['schedule_id'], 
					$param['respon_note'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_warningjatuhtempo_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    

}

?>
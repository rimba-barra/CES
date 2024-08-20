<?php

class Erems_Models_Constconstallreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function constconstallreportRead($param) { 
        $return['success'] = false;
		/*if (is_array($param) && count($param))
		{*/
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['cluster_id'],
					$param['type_id'],
					$param['spkstatus_id'],
					$param['lunasstatus_id'],
					$param['cp_start'],
					$param['cp_end']
				);
				
				$result = $this->execSP3('sp_reportconstconstall_read', $data);	
						
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;		
			} catch(Exception $e) { var_dump($e->getMessage()); }
		//}		
		return $return;
    }

    

}

?>
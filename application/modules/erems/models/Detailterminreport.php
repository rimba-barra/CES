<?php

class Erems_Models_Detailterminreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_schedule';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function detailterminreportRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['cluster_id'],
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$param['pricetype_id']
				);	
				
				$result = $this->execSP3('sp_reportdetailtermin_read', $data);
				
				$return['data'] = $result[1];			
				$return['success'] = true;
				
			} catch(Exception $e) { /*var_dump($e->getMessage());*/ }
		}		
		return $return;
    }

    

}

?>
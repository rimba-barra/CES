<?php

class Erems_Models_Cashinpaymentreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_schedule';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function cashinpaymentreportRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$result = $this->execSP2('sp_reportcashin_withpayment_read', $this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$param['periode_startdate'], 
					$param['periode_enddate'],
					$param['pricetype_id']);	
						
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { }
		}		
		return $return;
    }

    

}

?>
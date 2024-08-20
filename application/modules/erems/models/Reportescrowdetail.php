<?php

class Erems_Models_Reportescrowdetail extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function reportescrowdetailRead($param) {
        $return['success'] = false;

		if (is_array($param) && count($param)){
			try {
				$result = $this->execSP2('sp_report_escrow_detail_read', 
					$this->session->getCurrentProjectId(), 
					$param['pt_id'],
					$param['cluster_id'],
					$param['bank_id'],
					$param['radio_statuspencairan'],
					$param['radio_statuslunas'],

					$param['purchase_start_date'], // added by rico 10082023
					$param['purchase_end_date'], // added by rico 10082023
					$param['cair_start_date'], // added by rico 10082023
					$param['cair_end_date'] // added by rico 10082023
                 );	
						
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { echo $e;}
		}		
		return $return;
    }

    

}

?>
<?php

class Erems_Models_Reportproyeksilrp extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function reportproyeksilrpRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				// $result = $this->execSP2('sp_report_penerimaan_collection_read', 
				$result = $this->execSP2('sp_report_proyeksi_lrp_read', 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['period_cut_off'],
					$param['cluster_id']
                 );	
						
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { echo $e;}
		}		
		return $return;
    }

    

}

?>
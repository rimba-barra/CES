<?php

class Erems_Models_Reporttunggakanwa extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function reporttunggakanwaRead($param) {
        $return['success'] = false;

		if (is_array($param) && count($param)){
			try {
				// $result = $this->execSP2('sp_report_tunggakan_blast_read', 
				$result = $this->execSP2('sp_report_tunggakan_blast_read_new', 
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$this->session->getUserId(),
					$param['periode'],
					$param['format_type']
                 );	
						
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { echo $e;}
		}		
		return $return;
    }
}

?>
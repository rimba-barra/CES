<?php

class Erems_Models_Penerimaancollectionreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function penerimaancollectionreportRead($param) {
        $return['success'] = false;

		if (is_array($param) && count($param)){
			try {
				if($param['radio_filtertype'] == 1){
					$name_sp = 'sp_report_penerimaan_collection_read';
				}
				else{
					$name_sp = 'sp_report_collection_sh2_read';
				}

				$result = $this->execSP2($name_sp, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['period_cut_off'],
					$param['cluster_id'],
					$param['radio_salestype'], // added by rico 29052023,
					$param['radio_filterdate'], // added by rico 03082023,
					$param['param_startdate'], // added by rico 03082023,
					$param['param_enddate'] // added by rico 03082023
                 );	
						
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { echo $e;}
		}		
		return $return;
    }

    

}

?>
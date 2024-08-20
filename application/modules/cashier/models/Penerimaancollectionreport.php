<?php

class Cashier_Models_Penerimaancollectionreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
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

				$result = $this->execSP3($name_sp, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['period_cut_off'],
					$param['cluster_id'],
					$param['radio_salestype'], 
					$param['radio_filterdate'],
					$param['param_startdate'], 
					$param['param_enddate']
                );	

                // echo json_encode($result);die;
						
				$return['data']    = $result[0];
				$return['success'] = true;
			} catch(Exception $e) { echo $e;}
		}		
		return $return;
    }

    

}

?>
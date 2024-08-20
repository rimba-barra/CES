<?php

class Erems_Models_Collagingreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    //protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
	
	function agingGetProsesDate($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['aging_type']
				);
				$result = $this->execSP3('sp_reportcollaging_bulkdata_prosesdate_read', $data);	
				//var_dump($result);			
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
}

?>
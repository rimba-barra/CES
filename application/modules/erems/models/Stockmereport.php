<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Stockmereport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function stockmereportRead($param) { 
        $return['success'] = false;
		/*if (is_array($param) && count($param))
		{*/
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$param['pt_id'],
					$param['cluster_id'],
					$param['start_date'],
					$param['end_date'],
				);
				
				// $result = $this->execSP3('sp_reportstockme_read', $data);

				// $return['total'] = $result[0][0]['RECORD_TOTAL'];
				// $return['data'] = $result[0];			
				// $return['success'] = true;
				
				$data = "'".implode("','", $data)."'";
				$createexcel = 'python '.APPLICATION_PATH .'/modules/erems/models/BigReport.py "exec sp_reportstockme_read '.$data.'" "Stockme_Report" "'.$this->session->getUserId().'"';
				$resultPython = exec($createexcel);
				$resultPython = rtrim($resultPython);
				$return['data'] = $resultPython;
				$return['success'] = true;
			} catch(Exception $e) { var_dump($e->getMessage()); }
		//}		
		return $return;
    }

    

}

?>
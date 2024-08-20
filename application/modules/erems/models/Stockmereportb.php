<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Stockmereportb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function stockmereportbRead($param) { 
		$param['top_date'] = str_replace('T00:00:00','',$param['top_date']);
    	$param['bot_date'] = str_replace('T00:00:00','',$param['bot_date']);

        $return['success'] = false;
		/*if (is_array($param) && count($param))
		{*/
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['cluster_id'], $param['bot_date'], $param['top_date']
				);
				
				$result = $this->execSP3('sp_stockme_read', $data);	
						
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;		
			} catch(Exception $e) { var_dump($e->getMessage()); }
		//}		
		return $return;
    }

    

}

?>
<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Masteruploadlivestock extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_unit';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masteruploadlivestockUpdate($param) { 
        $return['success'] = false;
		/*if (is_array($param) && count($param))
		{*/
			try {
				$data = array (
					$param['project_id'],
					$param['KawasanCode'],
					$param['BlockCode'],
					$param['Koordinat'],
					$this->session->getUserId(),
					'1'
				);
				
				$result = $this->execSP3('sp_mms_livestock_koordinat_update', $data);	
						
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$this->returned['success'] = $result[0] > 0;	
			} catch(Exception $e) { var_dump($e->getMessage()); }
		//}		
		return $return;
    }

    

}

?>
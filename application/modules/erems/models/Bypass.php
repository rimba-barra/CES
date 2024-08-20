<?php
class Erems_Models_Bypass extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = '';

    function init() {
        // $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function flashwebtokenRead($param){
    	$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array ($param['token']);
				$result = $this->execSP3('sp_flashwebtoken_read_new', $data);		

				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function flashwebtokenapproveRead($param){
    	$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array ($param['token_id'], $param['menit']);
				$result = $this->execSP3('sp_flashwebtoken_approve', $data);		
				if($result[0][0]['result'] > 0){
					$return['success'] = true;				
				}
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

}
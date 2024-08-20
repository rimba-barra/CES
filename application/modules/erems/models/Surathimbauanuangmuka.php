<?php
            

class Erems_Models_Surathimbauanuangmuka extends Zend_Db_Table_Abstract{
	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;
	
	function init(){
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function surathimbauanuangmukaRead($param, $flag='grid', $type=0){
		$return['success'] = false;

		
		if (is_array($param) && count($param)){
			try {
				if($type == 1){
					$data = array (
						isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
						isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
						$param['customer_name'], 
						$param['unit_number'], 
						$this->session->getCurrentProjectId(), 
						$this->session->getCurrentPtId(),
						isset($param['page']) && $param['page'] ? $param['page'] : 1, 
						isset($param['limit']) && $param['limit'] ? $param['limit'] : 25,
						$flag
					);
					$result = $this->execSP3('sp_surat_himbauan_read', $data);				
				}else{
					$result = $this->execSP3('sp_one_surat_himbauan_read', $param['purchaseletter_id']);
				}

				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;	
			} catch(Exception $e) { 
                var_dump($e->getMessage());
            }
		}
		return $return;
	}
}

?>
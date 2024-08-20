<?php

class Erems_Models_Batallunas extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function batallunasRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_batallunas_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				//var_dump($e->getMessage());
			}
		}		
		return $return;
    }

    function batallunasUpdate($param = array()) {
		$return['success'] = false;
		
		$batal_lunas_all = $param['batal_lunas_all'];
		$cluster_id = $param['cluster_id'];
		$block_id = $param['block_id'];
		
		$param = $param['data'];
		
		if (is_array($param) && count($param))
		{
			try {
				$purchaseletter_id = ''; 
				
				foreach ($param as $idx => $value)
				{
					$purchaseletter_id .= $value."~";
				};
				
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				
				$affectedRow = $this->execSP2('sp_batallunas_update', 
								   $purchaseletter_id, 
								   $batal_lunas_all,
								   $cluster_id,
								   $block_id,
								   $this->session->getUserId(),
								   $this->session->getCurrentProjectId(), 
								   $this->session->getCurrentPtId()
								); 
				$return['success'] = (bool)$affectedRow['data'][0]['total_row'];
				$return['total'] = $affectedRow['data'][0]['total_row'];				
			} catch(Exception $e) { }
		}
		return $return;
    }
}

?>
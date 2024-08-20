<?php

class Erems_Models_Pelunasan extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function pelunasanRead($param) {
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
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_pelunasan_new_read', $data);		
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;	
				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function pelunasanUpdate($param = array()) {
        $return['success'] = false;
		
		$lunas_all = $param['lunas_all'];
		$cluster_id = $param['cluster_id'];
		$block_id = $param['block_id'];
		
		$param = $param['data'];
		
		if (is_array($param) && count($param))
		{
			try {
				$purchaseletter_id = ''; 
				$lunas_date = ''; 
				
				
				
				foreach ($param as $idx => $data)
				{
					foreach ($data as $key => $value)	
					{
						switch ($key){
							case 'purchaseletter_id': $purchaseletter_id .= $value."~";break;
							case 'lunas_date': $lunas_date .= $value."~";break;
						}							
					}				
				};
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				$lunas_date = preg_replace('/(~)$/','',$lunas_date);

				$affectedRow = $this->execSP2('sp_pelunasan_update', 
								   $purchaseletter_id, 
								   $lunas_date, 
								   $lunas_all,
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
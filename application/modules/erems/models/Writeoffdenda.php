<?php

class Erems_Models_Writeoffdenda extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_writeoff';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function writeoffdendaRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['writeoff_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'],
					$param['customer_name'], 
					$param['addon_startdate'], 
					$param['addon_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_writeoffdenda_read', $data);				

				$return['total']   = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} 
			catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function writeoffdendadetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					'',
					$param['writeoff_id']
				);
				$result = $this->execSP3('sp_writeoffdendadetail_read', $data);				
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result[0];			
				$return['success'] = true;		
			} 
			catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function writeoffdendascheduledetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array($param['purchaseletter_id']);
				$result = $this->execSP3('sp_writeoffdendaschedule_read', $data);				
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result[0];			
				$return['success'] = true;				
			} 
			catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function writeoffdendaCreate($param = array()) {
		$return['success'] = false;

		$isUsedVerification = $param['isUsedVerification']; 
		$writeoff_id        = $param['writeoff_id'];
		$purchaseletter_id  = $param['purchaseletter_id'];
		$note               = $param['note'];
		$param_schedule     = $param['data_schedule'];
		$param              = $param['data'];
				
		if (is_array($param) && count($param)){
			try {
				$writeoffdetail_id = ''; 
				$schedule_id       = ''; 
				$denda             = ''; 
				$writeoff          = '';
				$after_writeoff    = ''; 
				$deleted           = ''; 
				
				foreach ($param as $idx => $data){
					foreach ($data as $key => $value){
						switch ($key){
							case 'writeoffdetail_id': $writeoffdetail_id .= $value."~";break;
							case 'schedule_id': $schedule_id .= $value."~";break;
							case 'denda': $denda .= $value."~";break;
							case 'writeoff': $writeoff .= $value."~";break;	
							case 'after_writeoff': $after_writeoff .= $value."~";break;
							case 'deleted': $deleted .= $value."~";break;	
						}							
					}				
				};

				$writeoffdetail_id = preg_replace('/(~)$/','',$writeoffdetail_id);
				$schedule_id       = preg_replace('/(~)$/','',$schedule_id);
				$denda             = preg_replace('/(~)$/','',$denda);
				$writeoff          = preg_replace('/(~)$/','',$writeoff);
				$after_writeoff    = preg_replace('/(~)$/','',$after_writeoff);
				$deleted           = preg_replace('/(~)$/','',$deleted);
				
				//=== for table th_schedulue ===
				$schedule_id_sch     = ''; 
				$remaining_denda_sch = ''; 
				foreach ($param_schedule as $idx => $data){
					foreach ($data as $key => $value){
						switch ($key){
							case 'schedule_id': $schedule_id_sch .= $value."~";break;
							case 'remaining_denda': $remaining_denda_sch .= $value."~";break;
						}							
					}				
				};
				
				$schedule_id_sch     = preg_replace('/(~)$/','',$schedule_id_sch);
				$remaining_denda_sch = preg_replace('/(~)$/','',$remaining_denda_sch);
				
				$affectedRow = $this->execSP2('sp_writeoffdenda_create', 
				   $writeoff_id, 
				   $purchaseletter_id,
				   $note,
				   $writeoffdetail_id,
				   $schedule_id,
				   $denda,
				   $writeoff,
				   $after_writeoff,
				   $deleted,
				   $schedule_id_sch,
				   $remaining_denda_sch,
				   $this->session->getUserId(),
				   '1',
				   $isUsedVerification
				); 

				$return['success'] = (bool)$affectedRow['data'][0]['total_row'];
				$return['total']   = $affectedRow['data'][0]['total_row'];				
			} 
			catch(Exception $e) { }
		}
		return $return;
    }
}

?>
<?php

class Erems_Models_Reward extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function rewardRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_no'], 
					$param['cluster_id'], 
					$param['unit_number'], 
					$param['customer_name'], 
					// $param['purchase_startdate'], 
					// $param['purchase_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_reward_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
	}
	
	function rewardInlineUpdate($param = array()) {
		$return['success'] = false;
		$table             = 'th_purchaseletter';
		$id                = 'purchaseletter_id';
		$id_value          = $param['id'];
		$collumn           = $param['collumn'];
		$collumn_value     = $param['value'];

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_reward_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
                var_dump($e); 
            }
        
          
        }
        return $return;
    }	

    function rewardDetailRead($param){
    	$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array ($param['purchaseletter_id']);
				$result = $this->execSP3('sp_reward_detail_read', $data);				

				$return['data']    = $result[0];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }

    function approveRejectStatus($param = array()){
		$result = $this->execSP3('sp_reward_detail_read', $param['purchaseletter_id']);
		$data   = $result[0][0];

		$return['success'] = false;
		$return['msg']     = $param['title_text'] . ' ' . $data['purchaseletter_no'] . ' gagal di ' . $param['status'];
        
        if($param['status'] == 'APPROVE'){
            $collumn1 = 'is_approve_closing_fee'; 
        	$collumn2 = 'closing_fee_approved_by';
        	$collumn3 = 'is_reject_closing_fee'; 

	        if($param['flag_modul'] == 'reward_blt'){ 
	            $collumn1 = 'is_approve_blt'; 
	        	$collumn2 = 'blt_approved_by';
	            $collumn3 = 'is_reject_blt'; 
	        }
	        else if($param['flag_modul'] == 'reward_extrareward'){ 
	            $collumn1 = 'is_approve_extrareward'; 
	        	$collumn2 = 'extrareward_approved_by';
	            $collumn3 = 'is_reject_extrareward'; 
	        }
        }
        else{
            $collumn1 = 'is_reject_closing_fee'; 
        	$collumn2 = 'closing_fee_rejected_by';
            $collumn3 = 'is_approve_closing_fee'; 
        	
        	if($param['flag_modul'] == 'reward_blt'){ 
	            $collumn1 = 'is_reject_blt'; 
	        	$collumn2 = 'blt_rejected_by';
            	$collumn3 = 'is_approve_blt'; 
	        }
	        else if($param['flag_modul'] == 'reward_extrareward'){ 
	            $collumn1 = 'is_reject_extrareward'; 
	        	$collumn2 = 'extrareward_rejected_by';
            	$collumn3 = 'is_approve_extrareward'; 
	        }	
        }

        if($data['is_approve_closing_fee'] == 1 && ($collumn1 == 'is_approve_closing_fee' || $collumn1 == 'is_reject_closing_fee')){
        	$return['success'] = false;
			$return['msg']     = 'Tidak bisa ' . $param['status'] . '!!!\n' . $param['title_text'] . ' ' . $data['purchaseletter_no'] . ' sudah di APPROVE sebelumnya oleh ' . $data['closing_fee_approved_by_user'];
        }
        else if($data['is_approve_blt'] == 1 && ($collumn1 == 'is_approve_blt' || $collumn1 == 'is_reject_blt')){
        	$return['success'] = false;
			$return['msg']     = 'Tidak bisa ' . $param['status'] . '!!!\n' . $param['title_text'] . ' ' . $data['purchaseletter_no'] . ' sudah di APPROVE sebelumnya oleh ' . $data['blt_approved_by_user'];
        }
        else if($data['is_approve_extrareward'] == 1 && ($collumn1 == 'is_approve_extrareward' || $collumn1 == 'is_reject_extrareward')){
        	$return['success'] = false;
			$return['msg']     = 'Tidak bisa ' . $param['status'] . '!!!\n' . $param['title_text'] . ' ' . $data['purchaseletter_no'] . ' sudah di APPROVE sebelumnya oleh ' . $data['extrareward_approved_by_user'];
        }
        else{
	    	$value1 = 1;
	    	$value2 = $param['approveid'];
	    	$value3 = 0;

	        if (is_array($param) && count($param)) {
	            try {
	                $affectedRow = $this->execSP('sp_reward_status_approve_reject_update', $param['purchaseletter_id'], $collumn1, $value1, $collumn2, $value2, $collumn3, $value3, $param['approveid']);
	                $return['success'] = (bool) $affectedRow;

	                if((bool)$affectedRow == true){
						$return['msg'] = $param['title_text'] . ' ' . $data['purchaseletter_no'] . ' berhasil di ' . $param['status'];
	                }
	            } 
	            catch (Exception $e) {
	                // var_dump($e->getMessage());
	                // var_dump($e); 
	            }
	        }
        }

        return $return;
    }

}

?>
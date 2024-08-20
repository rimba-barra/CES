<?php

class Erems_Models_Skl extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_skl';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function sklRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['skl_id'], 
					$param['purchaseletter_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'],
					$param['skl_no'], 
					$param['skl_startdate'], 
					$param['skl_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'],
					$param['page']
				);
				//$result = $this->execSP3('sp_skl_read', $data);
				$result = $this->execSP3('sp_skl_new_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function sklCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					'', 
					$param['skl_date'], 
					$param['serahterima_date'], 
					$param['note'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_skl_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    function sklUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['skl_id'], 
					$param['purchaseletter_id'],
					$param['skl_no'], 
					$param['skl_date'], 
					$param['serahterima_date'], 
					$param['note'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_skl_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function sklDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'skl_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_skl_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }

	function sklPrintDocRead($param) {
        // $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['pl_id']
				);
				//$result = $this->execSP3('sp_skl_read', $data);
				$result = $this->execSP3('sp_skl_printout_read', $data);				
				// $return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;			
				// $return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

}

?>
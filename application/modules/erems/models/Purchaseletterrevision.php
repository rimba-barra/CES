<?php

class Erems_Models_Purchaseletterrevision extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function purchaseletterrevisionRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_no'], 
					$param['cluster_id'], 
					$param['block_id'], 
					$param['unit_number'], 
					$param['customer_name'], 
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_purchaseletterrevision_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
	
	function purchaseletterrevisionhistoryRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_purchaseletterrevisionhistory_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }

	function purchaseletterrevisionchangepriceRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_purchaseletterrevisionchangeprice_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
	
	function purchaseletterrevisionchangenameRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_purchaseletterrevisionchangename_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
	
	function purchaseletterrevisionchangekavlingRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_purchaseletterrevisionchangekavling_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
	
	function gantinamadetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$resultdata = $this->execSP('sp_purchaseletterrevision_changenamedetail_read', $param['changename_id']);

                $return['total'] = 1;
                $return['data'] = $resultdata;
                $return['success'] = true;			
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
	
	function gantihargadetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$resultdata = $this->execSP('sp_purchaseletterrevision_changepricedetail_read', $param['changeprice_id']);

                $return['total'] = 1;
                $return['data'] = $resultdata;
                $return['success'] = true;			
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
	
	function gantikavlingdetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$resultdata = $this->execSP('sp_purchaseletterrevision_changekavlingdetail_read', $param['changekavling_id']);

                $return['total'] = 1;
                $return['data'] = $resultdata;
                $return['success'] = true;			
			} catch(Exception $e) { 
				var_dump($e->getMessage());
			}
		}		
		return $return;
    }
}

?>
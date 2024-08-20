<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Purchaselettertb extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function purchaseletterv2Read($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_purchaseletterv2_count',$param['param_spcreq'],$param['unit_id'],$param['purchaseletter_no'],$param['block_id'],$param['customer_name'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['cluster_id'],$param['cluster_code']);
				//$resultdata = $this->execSP('sp_purchaseletterv2_read',$param['param_spcreq'],$param['unit_id'],$param['purchaseletter_no'],$param['block_id'],$param['customer_name'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['start'], $param['limit']);
				$resultdata = $this->execSP('sp_purchaseletterv2_new_read',$param['param_spcreq'],$param['unit_id'],$param['purchaseletter_no'],$param['block_id'],$param['customer_name'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['start'], $param['limit'], $param['page'],$param['cluster_id'],$param['cluster_code']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                var_dump($e->getMessage());
            }
		}
		return $return;
	}
	
	function purchaseletterdetailwithpaymentRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				
				$resultdata = $this->execSP('sp_purchaseletterdetailwithpayment_read',$param['purchaseletter_id'],$param['param_scheduletype']);
				
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
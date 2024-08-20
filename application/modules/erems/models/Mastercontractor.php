<?php
            

class Erems_Models_Mastercontractor extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_contractor';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function mastercontractorRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_contractor_count',$param['code'],$param['contractorname'],$param['address'],$param['PIC'],$param['city_id'],$param['country_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId()
                                );
				$resultdata = $this->execSP('sp_contractor_read',$param['code'],$param['contractorname'],$param['address'],$param['PIC'],$param['city_id'],$param['country_id'],$param['start'], $param['limit'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	function mastercontractorCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_contractor_create',$param['code'],$param['contractorname'],$param['address'],$param['telp'],$param['fax'],$param['email'],$param['PIC'],$param['city_id'],$param['kodepos'],$param['country_id'],$this->session->getUserId(), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { 
                               
                        }
		}
		return $return;
	}
	
	function mastercontractorUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_contractor_update', $param['contractor_id'], $param['code'],$param['contractorname'],$param['address'],$param['telp'],$param['fax'],$param['email'],$param['city_id'],$param['kodepos'],$param['country_id'],$param['PIC'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) {var_dump($e); }
		}
		return $return;
	}
	
	function mastercontractorDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'contractor_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_contractor_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
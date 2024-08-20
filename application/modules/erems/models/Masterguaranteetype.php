<?php
            

class Erems_Models_Masterguaranteetype extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_guaranteetype';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function masterguaranteetypeRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['cancellation_id'], 
					$param['purchaseletter_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					$param['kavling_number_start'], 
					$param['kavling_number_end'], 
					$param['customer_name'], 
					$param['cancellation_startdate'], 
					$param['cancellation_enddate'], 
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_guaranteetype_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
	}
	
	// === create, update, delete belum dibuat === //
	function masterguaranteetypeCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_guaranteetype_create',$param['code'],$param['guaranteetype'],$param['alamat'],$param['country_id'],$param['city_id'],$param['telp'],$param['fax'],$param['email'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { var_dump($e);}
		}
		return $return;
	}
	
	function masterguaranteetypeUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_guaranteetype_update', $param['guaranteetype_id'], $param['code'],$param['guaranteetype'],$param['alamat'],$param['country_id'],$param['city_id'],$param['telp'],$param['fax'],$param['email'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterguaranteetypeDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'guaranteetype_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_guaranteetype_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
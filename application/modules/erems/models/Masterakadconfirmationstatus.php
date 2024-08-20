<?php
            

class Erems_Models_Masterakadconfirmationstatus extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_akadconfirmation_status';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function masterakadconfirmationstatusRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['akadconfirmation_status_id'],
					$param['start'],
					$param['limit']
				);
				$result = $this->execSP3('sp_akadconfirmationstatus_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;			
			} catch(Exception $e) { }
		}		
		return $return;
	}
	
	// === create, update, delete belum dibuat === //
	/*function masterakadconfirmationstatusCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_akadconfirmationstatus_create',$param['code'],$param['akadconfirmationstatus'],$param['alamat'],$param['country_id'],$param['city_id'],$param['telp'],$param['fax'],$param['email'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { var_dump($e);}
		}
		return $return;
	}
	
	function masterakadconfirmationstatusUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_akadconfirmationstatus_update', $param['akadconfirmationstatus_id'], $param['code'],$param['akadconfirmationstatus'],$param['alamat'],$param['country_id'],$param['city_id'],$param['telp'],$param['fax'],$param['email'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterakadconfirmationstatusDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'akadconfirmationstatus_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_akadconfirmationstatus_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}*/
}

?>
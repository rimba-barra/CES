<?php
            

class Erems_Models_Masterutilitystatus extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_utilitystatus';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function masterutilitystatusRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_utilitystatus_count',
											$param['utilitystatus_id'],
											$param['utilitystatus']
                      			);
				
				$resultdata = $this->execSP('sp_utilitystatus_read',
												$param['utilitystatus_id'],
												$param['utilitystatus'],
												$param['start'], 
												$param['limit']
								);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	function masterutilitystatusCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_utilitystatus_create',$param['code'],$param['utilitystatus'],$param['alamat'],$param['country_id'],$param['city_id'],$param['telp'],$param['fax'],$param['email'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { var_dump($e);}
		}
		return $return;
	}
	
	function masterutilitystatusUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_utilitystatus_update', $param['utilitystatus_id'], $param['code'],$param['utilitystatus'],$param['alamat'],$param['country_id'],$param['city_id'],$param['telp'],$param['fax'],$param['email'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterutilitystatusDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'utilitystatus_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_utilitystatus_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
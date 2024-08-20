<?php
            

class Erems_Models_Mastergaransi extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_guaranteetype';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function mastergaransiRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_guaranteetype_count',$param['code'],$param['guaranteetype'],$param['period'],$param['description']
                                );
				$resultdata = $this->execSP('sp_guaranteetype_read',$param['code'],$param['guaranteetype'],$param['period'],$param['description'],$param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	function mastergaransiCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_guaranteetype_create',$param['code'],$param['guaranteetype'],$param['description'],$param['guarantee'],$param['period'],$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { var_dump($e);}
		}
		return $return;
	}
	
	function mastergaransiUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_guaranteetype_update', $param['guaranteetype_id'], $param['code'],$param['guaranteetype'],$param['description'],$param['guarantee'],$param['period'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function mastergaransiDelete($param=array())
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
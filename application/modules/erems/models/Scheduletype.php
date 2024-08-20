<?php
            

class Erems_Models_Scheduletype extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_scheduletype';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function scheduletypeRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_scheduletype_count',$param['scheduletype'],$param['description']);
				$resultdata = $this->execSP('sp_scheduletype_read',$param['scheduletype'],$param['description'],$param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	function scheduletypeCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_scheduletype_create',$param['scheduletype'],$param['description'],$this->session->getUserId());
				// $return['success'] = (bool)$affectedRow;
				$return = $affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function scheduletypeUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_scheduletype_update', $param['scheduletype_id'], $param['scheduletype'],$param['description'], $this->session->getUserId());
				$return = $affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function scheduletypeDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'scheduletype_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_scheduletype_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>
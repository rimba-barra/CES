<?php

class Erems_Models_Masterposisi extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_position';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function masterposisiRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_masterposisi_count', $param['code'], $param['position'],$param['description'],$param['cluster_id'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$resultdata = $this->execSP('sp_masterposisi_read', $param['code'], $param['position'],$param['description'],$param['cluster_id'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	function masterposisiCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_masterposisi_create',  $param['code'], $param['position'], $param['description'], $param['cluster_id'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$this->session->getUserId());
				$return['success'] = (bool)$affectedRow;;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterposisiUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_masterposisi_update', $param['position_id'], $param['code'], $param['position'], $param['description'],$param['cluster_id'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function masterposisiDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'position_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_masterposisi_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
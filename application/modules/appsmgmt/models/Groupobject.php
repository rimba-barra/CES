<?php

class Appsmgmt_Models_Groupobject extends Zend_Db_Table_Abstract
{
	protected $_name = 'sec_group_object';
	protected $session;
	protected $options;
	
	protected function _setupDatabaseAdapter()
	{		
		$this->_db = Zend_Registry::get('dbmain');
		parent::_setupDatabaseAdapter();
	}
	
	public function __construct()
	{
		$this->options = Zend_Registry::get('main_config');		
		parent::__construct();
	}
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function readData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$resultcount = $this->execSP('sp_group_object_count', $param['group_object_id'], $param['group_id'], $param['object_id']);
				$resultdata = $this->execSP('sp_group_object_read', $param['group_object_id'], $param['group_id'], $param['object_id'], $param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { }
		}		
		return $return;
	}
	
	function createData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_group_object_create', $param['group_id'], $param['object_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function updateData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_group_object_update', $param['group_object_id'],  $param['group_id'], $param['object_id'], $param['description'], $param['active'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function deleteData($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'group_object_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_group_object_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
<?php

class Appsmgmt_Models_Object extends Zend_Db_Table_Abstract
{
	protected $_name = 'sec_apps_object';
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
				$resultcount = $this->execSP('sp_object_count', $param['object_id'], $param['object_name'], $param['object_caption'], $param['object_type_id'], $param['object_parent'], $param['controller_id'], $param['action_id'], $param['object_action'], $param['apps_id']);
				$resultdata = $this->execSP('sp_object_read', $param['object_id'], $param['object_name'], $param['object_caption'], $param['object_type_id'], $param['object_parent'], $param['controller_id'], $param['action_id'], $param['object_action'], $param['apps_id'], $param['start'], $param['limit']);
				
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
				$affectedRow = $this->execSP('sp_object_create', $param['object_name'], $param['object_caption'], $param['object_type_id'], $param['object_parent'], $param['object_icon'], $param['object_icon_cls'], $param['controller_id'], $param['action_id'], $param['object_action'], $param['object_action_args'], $param['apps_id'], $param['description'], $param['active'], $this->session->getUserId());
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
				$affectedRow = $this->execSP('sp_object_update', $param['object_id'],  $param['object_name'], $param['object_caption'], $param['object_type_id'], $param['object_parent'], $param['object_icon'], $param['object_icon_cls'], $param['controller_id'], $param['action_id'], $param['object_action'], $param['object_action_args'], $param['apps_id'], $param['description'], $param['active'], $this->session->getUserId());
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
			$key_name = 'object_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_object_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}
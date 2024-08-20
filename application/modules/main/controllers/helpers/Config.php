<?php

class Main_Helpers_Config extends Zend_Controller_Action_Helper_Abstract
{
	protected $config = array();
	
	function init()
	{ 
		$moduleName	= $this->getRequest()->getModuleName();
		$this->config = Zend_Registry::get($moduleName.'_config');
	}	
	
	function direct()
	{
		return $this->config;
	}
	
	function __get($var)
	{
		return (isset($this->config[$var]) ? $this->config[$var] : null); 
	}		
}
<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{	
	protected function _initAutoloader()
	{			
		$autoloader = new Zend_Application_Module_Autoloader(
			array(
				'basePath'      => dirname(__FILE__),
				'namespace'     => 'Main',
				'resourceTypes' => array(
					'plugin' => array('path' => 'plugins', 'namespace' => 'Plugins'),
					'helper' => array('path' => 'controllers/helpers', 'namespace' => 'Helpers'),
					'model'  => array('path' => 'models', 'namespace' => 'Models'),
					'box'    => array('path' => 'box', 'namespace' => 'Box')
				)
			)
		);
	}
	
	protected function _initConfig()
	{ 
		Zend_Registry::set('main_config',$this->getOptions());		
	}		
			
	protected function _initFrontControllerPlugins()
	{
		Zend_Controller_Front::getInstance()->registerPlugin(new Main_Plugins_Initializer());
	}
	
	protected function _initActionHelpers()
	{ 
		Zend_Controller_Action_HelperBroker::addHelper(new Main_Helpers_Config());				
		Zend_Controller_Action_HelperBroker::addHelper(new Main_Helpers_Session());
		Zend_Controller_Action_HelperBroker::addHelper(new Main_Helpers_Documentno());
        	//Zend_Controller_Action_HelperBroker::addHelper(new Main_Helpers_Email());
	}	
}
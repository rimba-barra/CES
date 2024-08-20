<?php

class Hrd_Bootstrap extends Zend_Application_Module_Bootstrap {

    protected $moduleName;

    protected function _initAutoloader() {
        $this->moduleName = $this->getModuleName();

        $autoloader = new Zend_Application_Module_Autoloader(
                array(
            'basePath' => dirname(__FILE__),
            'namespace' => "",
            //'namespace' => $this->moduleName,
            'resourceTypes' => array(
                'plugin' => array('path' => 'plugins', 'namespace' => 'Plugins'),
                'helper' => array('path' => 'controllers/helpers', 'namespace' => 'Helpers'),
                'model' => array('path' => 'models', 'namespace' => 'Hrd_Models'),
                'box' => array('path' => 'library/box', 'namespace' => 'Box_'),
                'ruangkoding' => array('path' => 'library/ruangkoding', 'namespace' => 'Ruangkoding_'),
                
            )
            )
        );
        /*
         $autoloader = new Zend_Application_Module_Autoloader(
                array(
            'basePath' => dirname(__FILE__),
            'namespace' => $this->moduleName,
            'resourceTypes' => array(
                'plugin' => array('path' => 'plugins', 'namespace' => 'Plugins'),
                'helper' => array('path' => 'controllers/helpers', 'namespace' => 'Helpers'),
                'model' => array('path' => 'models', 'namespace' => 'Models')
            )
            )
        );
         */
      
        Zend_Registry::set("module_autoloader", $autoloader);
    }

    protected function _initConfig() {
        $configFile = APPLICATION_PATH . '/modules/' . $this->moduleName . '/configs/config.ini';

        if (!file_exists($configFile)) {
            return;
        }
        $config = new Zend_Config_Ini($configFile, $this->getEnvironment());
        $this->setOptions($config->toArray());

        Zend_Registry::set(strtolower($this->moduleName) . '_config', $this->getOptions());
    }

}
<?php

class Gl_Bootstrap extends Zend_Application_Module_Bootstrap {

    protected $moduleName;

    protected function _initAutoloader() {
        $this->moduleName = $this->getModuleName();

        $autoloader = new Zend_Application_Module_Autoloader(
                array(
            'basePath' => dirname(__FILE__),
            'namespace' => $this->moduleName,
            'resourceTypes' => array(
                'plugin' => array('path' => 'plugins', 'namespace' => 'Plugins'),
                'helper' => array('path' => 'controllers/helpers', 'namespace' => 'Helpers'),
                'model' => array('path' => 'models', 'namespace' => 'Models'),
                'box' => array('path' => 'library/box', 'namespace' => 'Box_'),
                'perpus' => array('path' => 'library/helpers', 'namespace' => 'Perpus_'),
            )
                )
        );
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

<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_CommonController extends Zend_Controller_Action {

    function init() {
        $this->_modeldata = new Hrd_Models_Common();
    }

    function readAction() {        
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data = Zend_Json::decode($data['data']);
        }
        
        if($data['mode_read'] == 'report'){
            
            $this->_modeldata = new Hrd_Models_Reportcommon();      
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => array(), 'total' => 0, 'success' => false);
            $result = $this->_modeldata->RoutesAllRequest($data);
            echo Zend_Json::encode($result);
            $this->_helper->viewRenderer->setNoRender(true);
            
            // save json file, untuk contoh saat pembuatan report stimulsoft
            $jsn = Zend_Json::encode($result);
            $x = explode(".", $data['reportfile']);
            file_put_contents("./app/hrd/reportjs/jsonexample/".$x[0] . '.json', $jsn);
            
        } else {
        
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => array(), 'total' => 0, 'success' => false);
            $data = $this->getRequest()->getPost();
            if (isset($data['data'])) {
                $data = Zend_Json::decode($data['data']);
            }
            $result = $this->_modeldata->RoutesAllRequest($data);
            echo Zend_Json::encode($result);
            $this->_helper->viewRenderer->setNoRender(true);
            
        }
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->RoutesAllRequest($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
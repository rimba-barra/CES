<?php

class Erems_ListdatacjpController extends Zend_Controller_Action {

    function init() {
        $this->_model = new Erems_Models_Upload_Listdatacjp();
    }
    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $data = $this->getRequest()->getPost();
        $result = $this->_model->RoutesAllActions($data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

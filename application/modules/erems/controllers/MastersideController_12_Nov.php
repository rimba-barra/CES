<?php

class Erems_MastersideController extends Zend_Controller_Action {

    function readAction() {
       
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['side'] = $this->getRequest()->getPost('side');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');


        $model_masterside = new Erems_Models_Masterside();
        $result = $model_masterside->mastersideRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterside = new Erems_Models_Masterside();
        $result = $model_masterside->mastersideCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterside = new Erems_Models_Masterside();
        $result = $mode_masterside->mastersideUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterside = new Erems_Models_Masterside();
        $result = $mode_masterside->mastersideDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    
   

}

?>
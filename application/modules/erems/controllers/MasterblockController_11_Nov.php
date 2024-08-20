<?php

class Erems_MasterblockController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['block'] = $this->getRequest()->getPost('block');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');


        $model_masterblock = new Erems_Models_Masterblock();
        $result = $model_masterblock->masterblockRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterblock = new Erems_Models_Masterblock();
        $result = $model_masterblock->masterblockCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterblock = new Erems_Models_Masterblock();
        $result = $mode_masterblock->masterblockUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterblock = new Erems_Models_Masterblock();
        $result = $mode_masterblock->masterblockDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

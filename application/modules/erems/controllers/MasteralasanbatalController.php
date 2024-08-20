<?php

class Erems_MasteralasanbatalController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['cancelreason'] = $this->getRequest()->getPost('cancelreason');
        $post_data['description'] = $this->getRequest()->getPost('description');


        $model_masteralasanbatal = new Erems_Models_Masteralasanbatal();
        $result = $model_masteralasanbatal->masteralasanbatalRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masteralasanbatal = new Erems_Models_Masteralasanbatal();
        $result = $model_masteralasanbatal->masteralasanbatalCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masteralasanbatal = new Erems_Models_Masteralasanbatal();
        $result = $mode_masteralasanbatal->masteralasanbatalUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masteralasanbatal = new Erems_Models_Masteralasanbatal();
        $result = $mode_masteralasanbatal->masteralasanbatalDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

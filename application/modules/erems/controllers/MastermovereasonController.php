<?php

class Erems_MastermovereasonController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');

        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['movereason'] = $this->getRequest()->getPost('movereason');
        $post_data['description'] = $this->getRequest()->getPost('description');

        $model_mastermovereason = new Erems_Models_Mastermovereason();
        $result = $model_mastermovereason->mastermovereasonRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_mastermovereason = new Erems_Models_Mastermovereason();
        $result = $model_mastermovereason->mastermovereasonCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_mastermovereason = new Erems_Models_Mastermovereason();
        $result = $mode_mastermovereason->mastermovereasonUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_mastermovereason = new Erems_Models_Mastermovereason();
        $result = $mode_mastermovereason->mastermovereasonDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}
?>

<?php

class Cashier_MasterpenandatanganController extends Zend_Controller_Action {
	
	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_penandatangan = new Cashier_Models_Masterpenandatangan();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['inisial'] = $this->getRequest()->getPost('inisial');
        $post_data['name'] = $this->getRequest()->getPost('name');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $result = $model_penandatangan->penandatanganRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_penandatangan = new Cashier_Models_Masterpenandatangan();
        $result = $model_penandatangan->penandatanganCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_penandatangan = new Cashier_Models_Masterpenandatangan();
        $result = $mode_penandatangan->penandatanganUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_penandatangan = new Cashier_Models_Masterpenandatangan();
        $result = $mode_penandatangan->penandatanganDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function detailAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_penandatangan = new Cashier_Models_Masterpenandatangan();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['inisial'] = $this->getRequest()->getPost('inisial');
        $post_data['name'] = $this->getRequest()->getPost('name');
        
        $result = $model_penandatangan->getprojectptbyuseridRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
}

?>
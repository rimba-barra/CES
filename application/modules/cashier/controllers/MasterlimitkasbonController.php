<?php

class Cashier_MasterlimitkasbonController extends Zend_Controller_Action {
	
	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_penandatangan = new Cashier_Models_Masterlimitkasbon();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['user_id'] = $this->getRequest()->getPost('user_id');
        $post_data['limit_cashbon'] = $this->getRequest()->getPost('limit_cashbon');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $result = $model_penandatangan->penandatanganRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_penandatangan = new Cashier_Models_Masterlimitkasbon();
        $result = $model_penandatangan->penandatanganCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_penandatangan = new Cashier_Models_Masterlimitkasbon();
        $result = $mode_penandatangan->penandatanganUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_penandatangan = new Cashier_Models_Masterlimitkasbon();
        $result = $mode_penandatangan->penandatanganDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   
	
}

?>
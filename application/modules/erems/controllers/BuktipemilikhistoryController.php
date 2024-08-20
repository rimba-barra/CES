<?php

class Erems_BuktipemilikhistoryController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		$post_data['read_type_mode'] = $this->getRequest()->getPost('read_type_mode');

        $model_buktipemilikhistory = new Erems_Models_Buktipemilikhistory();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['page']  = $this->getRequest()->getPost('page');
        $post_data['unit_id']    = $this->getRequest()->getPost('unit_id');
		
		$result = $model_buktipemilikhistory->buktipemilikhistoryRead($post_data);
	
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_buktipemilikhistory = new Erems_Models_Buktipemilikhistory();
        $result = $model_buktipemilikhistory->buktipemilikhistoryCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_buktipemilikhistory = new Erems_Models_Buktipemilikhistory();
        $result = $mode_buktipemilikhistory->buktipemilikhistoryUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_buktipemilikhistory = new Erems_Models_Buktipemilikhistory();
        $result = $mode_buktipemilikhistory->buktipemilikhistoryDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
<?php

class Erems_MasterchangeownershipreasonController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
        $model_masterchangeownershipreason = new Erems_Models_Masterchangeownershipreason();
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['code'] = $this->getRequest()->getPost('code');
		$post_data['changeownershipreason_id'] = $this->getRequest()->getPost('changeownershipreason_id');
		$result = $model_masterchangeownershipreason->masterchangeownershipreasonRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterchangeownershipreason = new Erems_Models_Masterchangeownershipreason();
        $result = $model_masterchangeownershipreason->masterchangeownershipreasonCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterchangeownershipreason = new Erems_Models_Masterchangeownershipreason();
        $result = $mode_masterchangeownershipreason->masterchangeownershipreasonUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterchangeownershipreason = new Erems_Models_Masterchangeownershipreason();
        $result = $mode_masterchangeownershipreason->masterchangeownershipreasonDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

}

?>

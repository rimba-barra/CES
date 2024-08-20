<?php

class Erems_MasterparametersppjbController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
		
		$post_data['start'] = '';
		$post_data['limit'] = '';
		$post_data['parametersppjb_id'] = '';
		$post_data['code'] = '';

        $model_masterparametersppjb = new Erems_Models_Masterparametersppjb();
		
		if ($post_data['mode_read'] == 'detail') {
			$post_data['parametersppjb_id'] = $this->getRequest()->getPost('parametersppjb_id');
            $result = $model_masterparametersppjb->masterparametersppjbRead($post_data);
		}
		else{
			$post_data['start'] = $this->getRequest()->getPost('start');
        	$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['code'] = $this->getRequest()->getPost('code');
			$result = $model_masterparametersppjb->masterparametersppjbRead($post_data);
		}

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterparametersppjb = new Erems_Models_Masterparametersppjb();
        $result = $model_masterparametersppjb->masterparametersppjbCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterparametersppjb = new Erems_Models_Masterparametersppjb();
        $result = $mode_masterparametersppjb->masterparametersppjbUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterparametersppjb = new Erems_Models_Masterparametersppjb();
        $result = $mode_masterparametersppjb->masterparametersppjbDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

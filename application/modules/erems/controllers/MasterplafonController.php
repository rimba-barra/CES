<?php

class Erems_MasterplafonController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_plafon = new Erems_Models_Masterplafon();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['plafon_id'] = $this->getRequest()->getPost('plafon_id');
		
		$result = $model_plafon->plafonRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_plafon = new Erems_Models_Masterplafon();
        $result = $model_plafon->plafonCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_plafon = new Erems_Models_Masterplafon();
        $result = $mode_plafon->plafonUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_plafon = new Erems_Models_Masterplafon();
        $result = $mode_plafon->plafonDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

}

?>
<?php

class Erems_MasterposisiController extends Zend_Controller_Action {

    function readAction() {
       
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['position'] = $this->getRequest()->getPost('position');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');


        $model_masterposisi = new Erems_Models_Masterposisi();
        $result = $model_masterposisi->masterposisiRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterposisi = new Erems_Models_Masterposisi();
        $result = $model_masterposisi->masterposisiCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterposisi = new Erems_Models_Masterposisi();
        $result = $mode_masterposisi->masterposisiUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterposisi = new Erems_Models_Masterposisi();
        $result = $mode_masterposisi->masterposisiDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}

?>
<?php

class Erems_MasteruangmasukController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['cashsources'] = $this->getRequest()->getPost('cashsources');
        $post_data['description'] = $this->getRequest()->getPost('description');


        $model_masteruangmasuk = new Erems_Models_Masteruangmasuk();
        $result = $model_masteruangmasuk->masteruangmasukRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masteruangmasuk = new Erems_Models_Masteruangmasuk();
        $result = $model_masteruangmasuk->masteruangmasukCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masteruangmasuk = new Erems_Models_Masteruangmasuk();
        $result = $mode_masteruangmasuk->masteruangmasukUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masteruangmasuk = new Erems_Models_Masteruangmasuk();
        $result = $mode_masteruangmasuk->masteruangmasukDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

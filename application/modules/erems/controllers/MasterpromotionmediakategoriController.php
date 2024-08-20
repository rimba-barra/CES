<?php

class Erems_MasterpromotionmediakategoriController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        // $post_data['mediapromotion'] = $this->getRequest()->getPost('mediapromotion');
        // $post_data['description'] = $this->getRequest()->getPost('description');


        $model_masterpromotionmediakategori = new Erems_Models_Masterpromotionmediakategori();
        $result = $model_masterpromotionmediakategori->masterpromotionmediakategoriRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterpromotionmediakategori = new Erems_Models_Masterpromotionmediakategori();
        $result = $model_masterpromotionmediakategori->masterpromotionmediakategoriCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterpromotionmediakategori = new Erems_Models_Masterpromotionmediakategori();
        $result = $mode_masterpromotionmediakategori->masterpromotionmediakategoriUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterpromotionmediakategori = new Erems_Models_Masterpromotionmediakategori();
        $result = $mode_masterpromotionmediakategori->masterpromotionmediakategoriDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

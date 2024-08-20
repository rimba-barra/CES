<?php

class Erems_MasterlokasipenjualanController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['saleslocation'] = $this->getRequest()->getPost('saleslocation');
        $post_data['description'] = $this->getRequest()->getPost('description');

        $model_masterlokasipenjualan = new Erems_Models_Masterlokasipenjualan();
        $result = $model_masterlokasipenjualan->masterlokasipenjualanRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterlokasipenjualan = new Erems_Models_Masterlokasipenjualan();
        $result = $model_masterlokasipenjualan->masterlokasipenjualanCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterlokasipenjualan = new Erems_Models_Masterlokasipenjualan();
        $result = $mode_masterlokasipenjualan->masterlokasipenjualanUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterlokasipenjualan = new Erems_Models_Masterlokasipenjualan();
        $result = $mode_masterlokasipenjualan->masterlokasipenjualanDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

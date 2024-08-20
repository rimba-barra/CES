<?php

class Erems_Models_Oldcontroller_MasterproductcategoryController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['productcategory'] = $this->getRequest()->getPost('productcategory');
        $post_data['description'] = $this->getRequest()->getPost('description');


        $model_masterproductcategory = new Erems_Models_Masterproductcategory();
        $result = $model_masterproductcategory->masterproductcategoryRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterproductcategory = new Erems_Models_Masterproductcategory();
        $result = $model_masterproductcategory->masterproductcategoryCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterproductcategory = new Erems_Models_Masterproductcategory();
        $result = $mode_masterproductcategory->masterproductcategoryUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterproductcategory = new Erems_Models_Masterproductcategory();
        $result = $mode_masterproductcategory->masterproductcategoryDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

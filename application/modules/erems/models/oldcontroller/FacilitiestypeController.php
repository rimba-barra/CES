<?php

class Erems_Models_Oldcontroller_FacilitiestypeController extends Zend_Controller_Action {

    function readAction() {
        //$this->getResponse()->setHeader('Content-Type', 'application/json');
        $this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['facilitiestype'] = $this->getRequest()->getPost('facilitiestype');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');


        $model_facilitiestype = new Erems_Models_Facilitiestype();
        $result = $model_facilitiestype->facilitiestypeRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_facilitiestype = new Erems_Models_Facilitiestype();
        $result = $model_facilitiestype->facilitiestypeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_facilitiestype = new Erems_Models_Facilitiestype();
        $result = $model_facilitiestype->facilitiestypeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_facilitiestype = new Erems_Models_Facilitiestype();
        $result = $model_facilitiestype->facilitiestypeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function uploadAction() {
        $upload = new Zend_File_Transfer_Adapter_Http();
        $imageName = 'facilitiestype_'.time().'.jpg';
        $upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/upload/'.$imageName, 'overwrite' => true));
        $success = false;
        $msg = '';

        try {
            $upload->receive();
            $success = true;
            $msg = 'success';
        } catch (Zend_File_Transfer_Exception $e) {
            $msg = $e->message();
            $imageName = '';
            $success = false;
        }


        $this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
        $result = array('data' => array(), 'total' => 0, 'success' => true, 'msg' => $msg,'imageName'=>$imageName);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
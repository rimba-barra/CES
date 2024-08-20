<?php

class Hrd_CleansingdataController extends Zend_Controller_Action {
   public $_model = null;
    function init() {
        $this->_model = new Hrd_Models_Cleansingdata();
        $this->_defaultreturn = array('data' => array(), 'total' => 0, 'success' => false);
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data = Zend_Json::decode($data['data']);
        }
        $result = $this->_model->RoutesAllActions($data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);                
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['mode_read'] = 'create';
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['mode_read'] = 'update';
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function approveAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['mode_read'] = 'approve';
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['mode_read'] = 'delete';
        $result = $this->_model->deleteData($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function uploadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $response = array('success' => false, 'msg' => "no process upload");
        if ($_FILES["uploadfile"]["error"] > 0) {
            $error = $_FILES["file"]["error"];
            $response = array('success' => false, 'msg' => $error);
        } else {
            $response = $this->_model->Createupload($_POST, $_FILES);
        }
        echo json_encode($response);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function printAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

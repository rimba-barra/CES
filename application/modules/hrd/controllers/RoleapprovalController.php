<?php

class Hrd_RoleapprovalController extends Zend_Controller_Action {

    function init() {
        $this->_model = new Hrd_Models_Roleapproval();
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

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['mode_read'] = 'delete';
        $result = $this->_model->deleteData($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

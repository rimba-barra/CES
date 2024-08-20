<?php

class Erems_NotifikasiuserController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['user_email'] = $this->getRequest()->getPost('user_email');
        $post_data['module_name'] = $this->getRequest()->getPost('module_name');

        $model_notifikasiuser = new Erems_Models_Notifikasiuser();
        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
        if($read_type_mode == 'get_notes'){
            $post_data['id'] = $this->getRequest()->getPost('id');
            $result = $model_notifikasiuser->getNotes($post_data);
        }else{
            $result = $model_notifikasiuser->notifikasiuserRead($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_notifikasiuser = new Erems_Models_Notifikasiuser();
        $result = $model_notifikasiuser->notifikasiuserCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_notifikasiuser = new Erems_Models_Notifikasiuser();
        $result = $mode_notifikasiuser->notifikasiuserUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_notifikasiuser = new Erems_Models_Notifikasiuser();
        $result = $mode_notifikasiuser->notifikasiuserDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

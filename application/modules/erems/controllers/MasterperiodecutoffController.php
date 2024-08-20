<?php
class Erems_MasterperiodecutoffController extends Zend_Controller_Action {
    protected $model;

    function init() {
        $this->model = new Erems_Models_Master_Periodecutoff();

        $action = $this->getRequest()->getActionName();
        if($action != 'status'){
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            if($this->session->getUserId() == null){
                throw new Zend_Controller_Action_Exception('This page does not exist', 404);
            }
        }
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start']   = $this->getRequest()->getPost('start');
        $post_data['limit']   = $this->getRequest()->getPost('limit') == 0 ? 25 : $this->getRequest()->getPost('limit');
        $post_data['page']    = $this->getRequest()->getPost('page');
        $post_data['periode'] = $this->getRequest()->getPost('periode');

        $result = $this->model->periodecutoffRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->model->periodecutoffCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->model->periodecutoffCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->model->periodecutoffDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}
?>

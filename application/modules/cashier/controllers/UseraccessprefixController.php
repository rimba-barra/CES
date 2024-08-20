<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_UseraccessprefixController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_modeldata = new Cashier_Models_Useraccessprefix();
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['projectname'] = $this->getRequest()->getPost('projectname');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['ptname'] = $this->getRequest()->getPost('ptname');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['user_name'] = $this->getRequest()->getPost('user_name');
        $post_data['prefixcode'] = $this->getRequest()->getPost('prefixcode');
        $post_data['in_out'] = $this->getRequest()->getPost('in_out');
        $post_data['cash_bank'] = $this->getRequest()->getPost('cash_bank');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['user_fullname'] = $this->getRequest()->getPost('user_fullname');
        $post_data['prefixcode'] = $this->getRequest()->getPost('prefixcode');
        $result = $this->_modeldata->Read($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name'] = $this->session->getCurrentPtName();
        $result['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Create($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Update($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Useraccessprefix();
        $result = $this->_modeldata->Delete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
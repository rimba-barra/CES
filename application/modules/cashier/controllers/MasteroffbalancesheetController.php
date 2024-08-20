<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_MasteroffbalancesheetController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_Masteroffbalancesheet();
    }

    function readAction() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['parametersql'] = $this->getRequest()->getPost('parametersql');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['banktype'] = $this->getRequest()->getPost('banktype');
        $post_data['bank_name'] = $this->getRequest()->getPost('bank_name');
        $post_data['bank_acc_no'] = $this->getRequest()->getPost('bank_acc_no');
        
        $result = $this->_model->MasteroffbalanceRead($post_data);
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

        if ($post_data['hideparam'] == 'copydate') {
            $result = $this->_model->MasteroffbalanceCopy($post_data);
        }else{
            $result = $this->_model->MasteroffbalanceCreate($post_data);
        }
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->_model->MasteroffbalanceUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->_model->MasteroffbalanceDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
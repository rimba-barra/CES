<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_SubeditorController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
        $this->_model = new Cashier_Models_Subeditor();
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
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['src_voucher_no'] = $this->getRequest()->getPost('src_voucher_no');
        $post_data['src_jid'] = $this->getRequest()->getPost('src_jid');
        $post_data['src_coa'] = $this->getRequest()->getPost('src_coa');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $result = $this->_model->SubeditorRead($post_data);
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

        $result = $this->_model->SubeditorCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['user_id'] = $this->session->getUserId();
        $result = $this->_model->SubeditorUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_model->SubeditorDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
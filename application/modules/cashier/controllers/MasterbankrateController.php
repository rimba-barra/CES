<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_MasterbankrateController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_Masterbankrate();
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['voucherprefix_id'] = $this->getRequest()->getPost('voucherprefix_id');
        $post_data['periode'] = $this->getRequest()->getPost('periode');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');

        if ($post_data['hideparam'] == 'getkelsubbycoa') {
            $result = $this->_model->getkelsubcoa($post_data);
        }else{
            $result = $this->_model->masterbankrateRead($post_data);
            $result['project_name'] = $this->session->getCurrentProjectName();
            $result['pt_name'] = $this->session->getCurrentPtName();
            $result['userprint'] = $this->session->getUserFullName();
        }
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $result = $this->_model->masterbankrateCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_model->masterbankrateUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_model->masterbankrateDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id'] = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc'] = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id'] = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['remarks'] = $this->getRequest()->getPost('remarks');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $this->_modeldatadetail->KasbondeptdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatadetail->KasbondeptdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatadetail->KasbondeptdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatadetail->KasbondeptdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptsubdetail_id'] = $this->getRequest()->getPost('kasbondeptsubdetail_id');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id'] = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['subgl'] = $this->getRequest()->getPost('subgl');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['remarks'] = $this->getRequest()->getPost('remarks');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $this->_modeldatasubdetail->KasbondeptsubdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatasubdetail->KasbondeptsubdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatasubdetail->KasbondeptsubdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatasubdetail->KasbondeptsubdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function decvdeptreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id'] = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc'] = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id'] = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['remarks'] = $this->getRequest()->getPost('remarks');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $this->_modeldatadetail->KasbondeptdecvdeptRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaillogreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id'] = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc'] = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id'] = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['remarks'] = $this->getRequest()->getPost('remarks');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $this->_modeldatadetail->KasbondeptdetaillogRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
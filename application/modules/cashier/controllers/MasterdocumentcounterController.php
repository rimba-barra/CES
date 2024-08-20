<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_MasterdocumentcounterController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Masterdocumentcounter();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['counter_type'] = $this->getRequest()->getPost('counter_type');
        $post_data['year'] = $this->getRequest()->getPost('year');
        $post_data['month'] = $this->getRequest()->getPost('month');
        $post_data['counter_no_id'] = $this->getRequest()->getPost('counter_no_id');

        $result = $model->read($post_data);
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
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $model = new Cashier_Models_Masterdocumentcounter();
        $result = $model->create($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $model = new Cashier_Models_Masterdocumentcounter();
        $result = $model->persentasepajakUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $model = new Cashier_Models_Masterdocumentcounter();
        $result = $model->persentasepajakDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_PostingstepduaController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Postingstepdua();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['projectcode'] = $this->getRequest()->getPost('projectcode');
        $post_data['projectname'] = $this->getRequest()->getPost('projectname');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['ptcode'] = $this->getRequest()->getPost('ptcode');
        $post_data['ptname'] = $this->getRequest()->getPost('ptname');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');
        $post_data['kasbank_id'] = $this->getRequest()->getPost('kasbank_id');
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');
        $post_data['sort'] = $this->getRequest()->getPost('sort');
        $post_data['is_post'] = $this->getRequest()->getPost('is_post');
        $post_data['is_fromkasir'] = $this->getRequest()->getPost('is_fromkasir');
        $post_data['is_postingstep2'] = $this->getRequest()->getPost('is_postingstep2');
        $post_data['voucher_date'] = $this->getRequest()->getPost('voucher_date');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['debet_total'] = $this->getRequest()->getPost('debet_total');
        $post_data['credit_total'] = $this->getRequest()->getPost('credit_total');
        $post_data['selisih'] = $this->getRequest()->getPost('selisih');

        $post_data['active'] = $this->getRequest()->getPost('active');
        $post_data['addby'] = $this->getRequest()->getPost('addby');
        $post_data['modiby'] = $this->getRequest()->getPost('modiby');
        $post_data['deleteby'] = $this->getRequest()->getPost('deleteby');

        $result = $model->postingstepduaRead($post_data);
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
        $model = new Cashier_Models_Postingstepdua();
        $result = $model->postingstepduaCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Postingstepdua();
        $result = $model->postingstepduaUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Postingstepdua();
        $result = $model->postingstepduaDelete($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
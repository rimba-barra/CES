<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_OffsetreportController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Offsetreport();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['periodefrom'] = $this->getRequest()->getPost('periodefrom');
        $post_data['periodeto'] = $this->getRequest()->getPost('periodeto');
        $post_data['coa_debet'] = $this->getRequest()->getPost('coa_debet');
        $post_data['coa_credit'] = $this->getRequest()->getPost('coa_credit');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['journal_date'] = $this->getRequest()->getPost('journal_date');

        $result = $model->offsetreportRead($post_data);
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

        $model = new Cashier_Models_Offsetreport();
        $result = $model->offsetreportCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_PaymentController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Payment();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kasbank_id'] = $this->getRequest()->getPost('kasbank_id');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['projectcode'] = $this->getRequest()->getPost('projectcode');
        $post_data['projectname'] = $this->getRequest()->getPost('projectname');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['ptcode'] = $this->getRequest()->getPost('ptcode');
        $post_data['ptname'] = $this->getRequest()->getPost('ptname');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $post_data['department_id'] = $this->getRequest()->getPost('department_id');
        $post_data['department'] = $this->getRequest()->getPost('department');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['coaname'] = $this->getRequest()->getPost('coaname');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');
        $post_data['prefix'] = $this->getRequest()->getPost('prefix');
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['paymentdate'] = $this->getRequest()->getPost('paymentdate');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['transno'] = $this->getRequest()->getPost('transno');
        $post_data['voucherprefix_id'] = $this->getRequest()->getPost('voucherprefix_id');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');
        $post_data['journal_voucher_no'] = $this->getRequest()->getPost('journal_voucher_no');
        $post_data['grouptrans_id'] = $this->getRequest()->getPost('grouptrans_id');
        $post_data['cashbon_project_id'] = $this->getRequest()->getPost('cashbon_project_id');
        $post_data['cashbon_create_by'] = $this->getRequest()->getPost('cashbon_create_by');
        $post_data['chequegiro_reject_by'] = $this->getRequest()->getPost('chequegiro_reject_by');
        $post_data['kasbon_paid'] = $this->getRequest()->getPost('kasbon_paid');
        $post_data['cashbon_paid'] = $this->getRequest()->getPost('cashbon_paid');
        $post_data['is_posting'] = $this->getRequest()->getPost('is_posting');
        $post_data['tmp_prefix'] = $this->getRequest()->getPost('tmp_prefix');
        $post_data['chequegiro_accured'] = $this->getRequest()->getPost('chequegiro_accured');
        $post_data['chequegiro_no'] = $this->getRequest()->getPost('chequegiro_no');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['kasbank'] = $this->getRequest()->getPost('kasbank');
        $post_data['chequegiro_status'] = $this->getRequest()->getPost('chequegiro_status');
        $post_data['posting_date'] = $this->getRequest()->getPost('posting_date');
        $post_data['kasbank_date'] = $this->getRequest()->getPost('kasbank_date');
        $post_data['cashbon_date'] = $this->getRequest()->getPost('cashbon_date');
        $post_data['chequegiro_date'] = $this->getRequest()->getPost('chequegiro_date');
        $post_data['chequegiro_payment_date'] = $this->getRequest()->getPost('chequegiro_payment_date');
        $post_data['chequegiro_receive_date'] = $this->getRequest()->getPost('chequegiro_receive_date');
        $post_data['chequegiro_reject_date'] = $this->getRequest()->getPost('chequegiro_reject_date');
        $post_data['chequegiro_release_date'] = $this->getRequest()->getPost('chequegiro_release_date');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['active'] = $this->getRequest()->getPost('active');
        
        $result = $model->paymentRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name'] = $this->session->getCurrentPtName();
        $result['fulname_user'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Cashier_Models_Payment();
        $result = $model->paymentCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Payment();
        $result = $model->paymentUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Payment();
        $result = $model->paymentDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
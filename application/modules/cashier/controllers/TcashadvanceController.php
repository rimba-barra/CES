<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_TcashadvanceController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    
    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Tcashadvance();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kasbon_id'] = $this->getRequest()->getPost('kasbon_id');
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
        $post_data['cashbon_projectpt_id'] = $this->getRequest()->getPost('cashbon_projectpt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        
       
        
        $post_data['transno'] = $this->getRequest()->getPost('transno');
        $post_data['realisation_expence'] = $this->getRequest()->getPost('realisation_expence');
        $post_data['monitoring'] = $this->getRequest()->getPost('monitoring');
        $post_data['is_posting'] = $this->getRequest()->getPost('is_posting');
        $post_data['accept_date'] = $this->getRequest()->getPost('accept_date');
        $post_data['posting_date'] = $this->getRequest()->getPost('posting_date');
        $post_data['claim_date'] = $this->getRequest()->getPost('claim_date');
        $post_data['status'] = $this->getRequest()->getPost('status');
        $post_data['statusdata'] = $this->getRequest()->getPost('statusdata');
        $post_data['kasbongiro'] = $this->getRequest()->getPost('kasbongiro');
        $post_data['status_special'] = $this->getRequest()->getPost('status_special');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['coa_desc'] = $this->getRequest()->getPost('coa_desc');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['cashback'] = $this->getRequest()->getPost('cashback');
        $post_data['paid'] = $this->getRequest()->getPost('paid');
        $post_data['balance'] = $this->getRequest()->getPost('balance');
        $post_data['applyamount'] = $this->getRequest()->getPost('applyamount');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['made_by'] = $this->getRequest()->getPost('made_by');
        $post_data['cashbon_create_by'] = $this->getRequest()->getPost('cashbon_create_by');
        $post_data['active'] = $this->getRequest()->getPost('active');
        
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow'); //new
        $post_data['kasbongiro'] = $this->getRequest()->getPost('kasbongiro'); //new
        $post_data['chequegiro_accured'] = $this->getRequest()->getPost('chequegiro_accured'); //new
        $post_data['chequegiro_no'] = $this->getRequest()->getPost('chequegiro_no'); //new 
        $post_data['chequegiro_payment_date'] = $this->getRequest()->getPost('chequegiro_payment_date'); //new
        $post_data['chequegiro_receive_date'] = $this->getRequest()->getPost('chequegiro_receive_date'); //new
        $post_data['chequegiro_reject_date'] = $this->getRequest()->getPost('chequegiro_reject_date'); //new
        $post_data['chequegiro_release_date'] = $this->getRequest()->getPost('chequegiro_release_date'); //new
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['due_date'] = $this->getRequest()->getPost('due_date');
        
        $result = $model->cashadvanceRead($post_data);
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

        $model = new Cashier_Models_Tcashadvance();
        $result = $model->cashadvanceCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Tcashadvance();
        $result = $model->cashadvanceUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Tcashadvance();
        $result = $model->cashadvanceDelete($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
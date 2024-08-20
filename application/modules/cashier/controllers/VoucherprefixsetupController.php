<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_VoucherprefixsetupController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Voucherprefixsetup();        
       
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['voucherprefix_id'] = $this->getRequest()->getPost('voucherprefix_id');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');
        $post_data['is_cashflow'] = $this->getRequest()->getPost('is_cashflow');
        $post_data['is_cashier'] = $this->getRequest()->getPost('is_cashier');
        $post_data['is_fixed'] = $this->getRequest()->getPost('is_fixed');
        $post_data['is_limitdate'] = $this->getRequest()->getPost('is_limitdate');
        $post_data['is_limitamount'] = $this->getRequest()->getPost('is_limitamount');
        $post_data['is_posting'] = $this->getRequest()->getPost('is_posting');
        $post_data['fixed_coa_id'] = $this->getRequest()->getPost('fixed_coa_id');
        $post_data['reference_id'] = $this->getRequest()->getPost('reference_id');
        $post_data['projectname'] = $this->getRequest()->getPost('projectname');
        $post_data['ptname'] = $this->getRequest()->getPost('ptname');
        $post_data['coaname'] = $this->getRequest()->getPost('coaname');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['prefix'] = $this->getRequest()->getPost('prefix');
        $post_data['temp_prefix'] = $this->getRequest()->getPost('temp_prefix');
        $post_data['no_acc'] = $this->getRequest()->getPost('no_acc');
        $post_data['cash_bank'] = $this->getRequest()->getPost('cash_bank');
        $post_data['in_out'] = $this->getRequest()->getPost('in_out');
        $post_data['fixed_coa'] = $this->getRequest()->getPost('fixed_coa');
        $post_data['limitdate'] = $this->getRequest()->getPost('limitdate');
        $post_data['limit_min'] = $this->getRequest()->getPost('limit_min');
        $post_data['limit_max'] = $this->getRequest()->getPost('limit_max');
        $post_data['prefix_desc'] = $this->getRequest()->getPost('prefix_desc');
        $post_data['fixed_account_desc'] = $this->getRequest()->getPost('fixed_account_desc');
        $post_data['description'] = $this->getRequest()->getPost('description');
       /* start for filter */
        $post_data['fromcompany'] = $this->getRequest()->getPost('fromprojectpt');
        $post_data['untilcompany'] = $this->getRequest()->getPost('untilprojectpt');
        $post_data['frombank'] = $this->getRequest()->getPost('frombank');
        $post_data['untilbank'] = $this->getRequest()->getPost('untilbank');
        $post_data['payment_via_id'] = $this->getRequest()->getPost('payment_via_id');
        $post_data['bank_id'] = $this->getRequest()->getPost('bank_id');
        $post_data['bank_name'] = $this->getRequest()->getPost('bank_name');
        $post_data['banktype_id'] = $this->getRequest()->getPost('banktype_id');
         /* end for filter */

        $result = $model->voucherprefixsetupRead($post_data);
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
        
        $model = new Cashier_Models_Voucherprefixsetup();
        
        //Rizal 21 Mei 2019
//        $post_data['in_out'] = "I";
        $result = $model->voucherprefixsetupCreate($post_data);
        
        $post_data['in_out'] = "O";
//        $result = $model->voucherprefixsetupCreate($post_data);
        //
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Voucherprefixsetup();
        $result = $model->voucherprefixsetupUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Voucherprefixsetup();
        $result = $model->voucherprefixsetupDelete($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
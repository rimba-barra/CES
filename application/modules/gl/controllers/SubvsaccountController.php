<?php

class Gl_SubvsaccountController extends Zend_Controller_Action {

    function readAction() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/gl/report/';
        
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');


        $post_data['journalsubdetail_id'] = $this->getRequest()->getPost('journalsubdetail_id');
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['fromcoa'] = $this->getRequest()->getPost('fromcoa');
        $post_data['untilcoa'] = $this->getRequest()->getPost('untilcoa');
        $post_data['voucher_date'] = $this->getRequest()->getPost('voucher_date');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['keterangan'] = $this->getRequest()->getPost('keterangan');
        $post_data['note'] = $this->getRequest()->getPost('note');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['amountheader'] = $this->getRequest()->getPost('amountheader');
        $post_data['amountdetail'] = $this->getRequest()->getPost('amountdetail');
        $post_data['amountsubdetail'] = $this->getRequest()->getPost('amountsubdetail');
        

        $model = new Gl_Models_Subvsaccount();
        $result = $model->SubvsaccountRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subvsaccount();
        $result = $model->SubvsaccountCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subvsaccount();
        $result = $model->SubvsaccountUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subvsaccount();
        $result = $model->SubvsaccountDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
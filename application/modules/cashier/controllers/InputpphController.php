<?php

class Cashier_InputpphController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_Inputpph();
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
        $post_data['coafrom'] = $this->getRequest()->getPost('coafrom');
        $post_data['coato'] = $this->getRequest()->getPost('coato');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['date_from'] = $this->getRequest()->getPost('date_from');
        $post_data['date_to'] = $this->getRequest()->getPost('date_to');
        $post_data['voucher_from'] = $this->getRequest()->getPost('voucher_no_from');
        $post_data['voucher_to'] = $this->getRequest()->getPost('voucher_no_until');
        
        $result = $this->_model->InputpphRead($post_data);
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
        $model = new Cashier_Models_Inputpph();

        $result = $model->InputpphCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
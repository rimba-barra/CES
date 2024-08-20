<?php

class Cashier_DailytransactionkpController extends Zend_Controller_Action {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }  
	
    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Dailytransactionkp();
       
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['dept_id'] = $this->getRequest()->getPost('dept_id');
        $post_data['dateparam'] = $this->getRequest()->getPost('dateparam');
        $post_data['periodfrom'] = $this->getRequest()->getPost('periodfrom') == "" ? "" : date('Y-m-d', strtotime($this->getRequest()->getPost('periodfrom')));
        $post_data['periodto'] = $this->getRequest()->getPost('periodto') == "" ? "" : date('Y-m-d', strtotime($this->getRequest()->getPost('periodto')));
        $post_data['status'] = $this->getRequest()->getPost('status');
        $post_data['paymentmethod_id'] = $this->getRequest()->getPost('paymentmethod_id');
        $post_data['sortby'] = $this->getRequest()->getPost('sortby');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $result = $model->dailytransactionkpRead($post_data); 
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Dailytransactionkp();
        $result = $model->dailytransactionkpCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php

class Cashier_BanktransactionreportController extends Zend_Controller_Action {

    function init() {
		date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->session->set('selected_dbapps', 'gl_2018');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/gl/report/';
        $return['project_name'] = $this->session->getCurrentProjectName();
        $return['pt_name'] = $this->session->getCurrentPtName();
        $return['userprint'] = $this->session->getUserFullName();
        $return['userid'] = $this->session->getUserId();
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Banktransactionreport();
        $result = $model->Create($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
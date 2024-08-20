<?php

class Cashier_ReportpenerimaanController extends Zend_Controller_Action {

	function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }  

    function createAction() {       
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => true);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Reportpenerimaan();
        $result = $model->dataCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
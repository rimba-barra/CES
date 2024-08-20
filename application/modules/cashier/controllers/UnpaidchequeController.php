<?php

class Cashier_UnpaidchequeController extends Zend_Controller_Action {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'cashier');
    }  

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Unpaidcheque();
        $result = $model->unpaidchequeCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
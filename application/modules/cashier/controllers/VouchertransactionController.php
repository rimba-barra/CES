<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_VouchertransactionController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_generaldata = new Cashier_Helpers_Defaultdata();
        $this->_modelreport = new Cashier_Models_Report_Vouchertransaction();
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $return = $this->_generaldata->generalData();
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modelreport->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
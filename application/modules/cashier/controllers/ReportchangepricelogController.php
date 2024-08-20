<?php

class Cashier_ReportchangepricelogController extends Zend_Controller_Action {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'cashier');
    }  

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $return['project_name'] = $this->session->getCurrentProjectName();
        $return['pt_name'] = $this->session->getCurrentPtName();
        $return['userprint'] = $this->session->getUserFullName();
        $return['userid'] = $this->session->getUserId();
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
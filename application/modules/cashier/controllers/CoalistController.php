<?php

class Cashier_CoalistController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $return['projectpt_id'] = $this->session->getCurrentProjectPtId();
        $return['project_id'] = $this->session->getCurrentProjectId();
        $return['project_name'] = $this->session->getCurrentProjectName();
        $return['pt_id'] = $this->session->getCurrentPtId();
        $return['pt_name'] = $this->session->getCurrentPtName();
        $return['userprint'] = $this->session->getUserFullName();
        $return['userid'] = $this->session->getUserId();
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
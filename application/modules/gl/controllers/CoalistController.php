<?php

class Gl_CoalistController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/gl/report/';
        $return['project_name'] = $this->session->getCurrentProjectName();
        $return['pt_name'] = $this->session->getCurrentPtName();
        $return['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
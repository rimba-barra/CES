<?php

class Gl_TrialbalanceController extends Zend_Controller_Action {

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

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Trialbalance();
        $result = $model->Create($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
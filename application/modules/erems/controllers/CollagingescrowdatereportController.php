<?php

class Erems_CollagingescrowdatereportController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Erems_Models_Report_ReportAgingesrow;
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';
        $project_name = $this->session->getCurrentProjectName();
        $pt_name = $this->session->getCurrentPtName();
        $action = $this->getRequest()->getPost('actiondata');
        if ($action == 'exportdata') {
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $data = $this->getRequest()->getPost('data');
            $params = Zend_Json::decode($data);
            $return = $this->_model->RoutesAllActions($params);
        }
        $return['project_name'] = $project_name;
        $return['pt_name'] = $pt_name;
        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

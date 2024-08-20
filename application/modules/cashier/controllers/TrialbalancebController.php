<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Cashier_TrialbalancebController extends Zend_Controller_Action {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }  

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/gl/report/';
        
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_BudgetCoaDao();
        $ptHasil = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $return = array(
            "pt" => $ptHasil,
            "project_name"=>$this->session->getCurrentProjectName(),
            "pt_name"=>$this->session->getCurrentPtName(),
            "userprint"=>$this->session->getUserFullName(),
            "userid"=>$this->session->getUserId(),
        );

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
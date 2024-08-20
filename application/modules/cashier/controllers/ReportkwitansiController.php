<?php
require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_ReportkwitansiController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_generaldata = new Cashier_Helpers_Defaultdata();
        $this->_modelreport = new Cashier_Models_Report_Reportkwitansi();
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/gl/report/';
        
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);

        $dao           = new Cashier_Models_Master_BudgetCoaDao();                                     // nembak kesini dlu, nnti bisa dipindahkan ke module sendiri
        $ptHasil       = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $prefixreceipt = $dao->getCustomReadDirectModule('global','prefixreceipt',$request,$session);
        $return        = $this->_generaldata->generalData();
        
        $return = array(
            "pt"             => $ptHasil,
            "project_name"   => $this->session->getCurrentProjectName(),
            "pt_name"        => $this->session->getCurrentPtName(),
            "userprint"      => $this->session->getUserFullName(),
            "userid"         => $this->session->getUserId(),
            "prefix_receipt" => $prefixreceipt
        );

        echo Zend_Json::encode($return);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['user_id'] = $this->session->getUserId();
        $result = $this->_modelreport->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
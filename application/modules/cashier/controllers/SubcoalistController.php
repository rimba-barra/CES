<?php

class Cashier_SubcoalistController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_Subcoalist();
    }
    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['subaccgroup_id'] = $this->getRequest()->getPost('subaccgroup_id');
        $post_data['project_name'] = $this->getRequest()->getPost('project_name');
        $post_data['pt_name'] = $this->getRequest()->getPost('pt_name');
        $post_data['subaccgroup_name'] = $this->getRequest()->getPost('subaccgroup_name');
        
        $result = $this->_model->subcoalistRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name'] = $this->session->getCurrentPtName();
        $result['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    
}

?>
<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_LoanerController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';         
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Loaner();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['loaner_id'] = $this->getRequest()->getPost('loaner_id');
        $post_data['departement_id'] = $this->getRequest()->getPost('departement_id');
        $post_data['departement'] = $this->getRequest()->getPost('departement');
        $post_data['loaner'] = $this->getRequest()->getPost('loaner');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['pekerjaan'] = $this->getRequest()->getPost('pekerjaan');
        $post_data['npwp'] = $this->getRequest()->getPost('npwp');
        $post_data['address'] = $this->getRequest()->getPost('address');
        $post_data['phone'] = $this->getRequest()->getPost('phone');
        $post_data['mobilephone'] = $this->getRequest()->getPost('mobilephone');
        $post_data['fax'] = $this->getRequest()->getPost('fax');
        $post_data['email'] = $this->getRequest()->getPost('email');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $result = $model->loanerRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name'] = $this->session->getCurrentPtName();
        $result['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Cashier_Models_Loaner();
        $result = $model->loanerCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Loaner();
        $result = $model->loanerUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Loaner();
        $result = $model->loanerDelete($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
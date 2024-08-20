<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_LogautomailController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Logautomail();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['module_code'] = $this->getRequest()->getPost('module_code');
        $post_data['type_code'] = $this->getRequest()->getPost('type_code');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

          $post_data['from_senddate'] = $this->getRequest()->getPost('from_senddate');
          $post_data['until_senddate'] = $this->getRequest()->getPost('until_senddate');
          $post_data['status'] = $this->getRequest()->getPost('status');    
          $post_data['send_email'] = $this->getRequest()->getPost('send_email');    
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');    
  

        $result = $model->logautomailRead($post_data);
      //  $result['project_name'] = $this->session->getCurrentProjectName();
     //   $result['pt_name'] = $this->session->getCurrentPtName();
      //  $result['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Cashier_Models_Logautomail();
        $result = $model->logautomailCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Logautomail();
        $result = $model->logautomailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Logautomail();
        $result = $model->logautomailDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_KartupiutangaccController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    
    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Kartupiutangacc();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
        $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['datefrom'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['subcoa'] = $this->getRequest()->getPost('subcoa');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');

        $result = $model->read($post_data);
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

        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');

        $model = new Cashier_Models_Kartupiutangacc();
        $result = $model->create($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');

        $model = new Cashier_Models_Kartupiutangacc();
        $result = $model->kartupiutangUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $model = new Cashier_Models_Kartupiutangacc();
        $result = $model->kartupiutangDelete($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
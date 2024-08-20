<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_PersentasepajakController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Persentasepajak();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['tipepajak_id'] = $this->getRequest()->getPost('tipepajak_id');
        $post_data['tipepajakdetail_id'] = $this->getRequest()->getPost('tipepajakdetail_id');
        $post_data['persentase_from'] = $this->getRequest()->getPost('persentase_from');
        $post_data['persentase_to'] = $this->getRequest()->getPost('persentase_to');
        $post_data['is_npwp'] = $this->getRequest()->getPost('is_npwp');
        $post_data['kelaskontraktor_id'] = $this->getRequest()->getPost('kelaskontraktor_id');
        $post_data['tipekontraktor_id'] = $this->getRequest()->getPost('tipekontraktor_id');
        $post_data['persentase'] = $this->getRequest()->getPost('persentase') == "" ? 0 : $this->getRequest()->getPost('persentase');

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

        $model = new Cashier_Models_Persentasepajak();
        $result = $model->create($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $model = new Cashier_Models_Persentasepajak();
        $result = $model->persentasepajakUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $model = new Cashier_Models_Persentasepajak();
        $result = $model->persentasepajakDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_PengajuanserahterimaController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_Pengajuanserahterima();
    }

    function readAction() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['pengajuanserahterima_id'] = $this->getRequest()->getPost('pengajuanserahterima_id');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
        $post_data['rencana_serahterima_date'] = $this->getRequest()->getPost('rencana_serahterima_date');
        $post_data['rencana_serahterima_aju_date'] = $this->getRequest()->getPost('rencana_serahterima_aju_date');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['query'] = $this->getRequest()->getPost('query');
        $post_data['fromstdate'] = $this->getRequest()->getPost('fromstdate');
        $post_data['untilstdate'] = $this->getRequest()->getPost('untilstdate');
        $post_data['fromstajudate'] = $this->getRequest()->getPost('fromstajudate');
        $post_data['untilstajudate'] = $this->getRequest()->getPost('untilstajudate');
      
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data = Zend_Json::decode($data['data']);
            $post_data = array_merge($post_data, $data);
        }
        
        $result = $this->_model->PengajuanserahterimaRead($post_data);
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
        // echo json_encode($post_data);die;

        $result = $this->_model->PengajuanserahterimaCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        // echo json_encode($post_data);die;

        $result = $this->_model->PengajuanserahterimaUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        // echo json_encode($post_data);die;

        $result = $this->_model->PengajuanserahterimaDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
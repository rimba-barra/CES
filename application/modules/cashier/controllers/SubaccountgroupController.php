<?php

class Cashier_SubaccountgroupController extends Zend_Controller_Action {
    
	function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }  
	
    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Gl_Models_Subaccountgroup();
        
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsubid_in'] = $this->getRequest()->getPost('kelsubid_in');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['fromkelsub'] = $this->getRequest()->getPost('fromkelsub');
        $post_data['untilkelsub'] = $this->getRequest()->getPost('untilkelsub');
        $post_data['fromcoa'] = $this->getRequest()->getPost('fromcoa');
        $post_data['untilcoa'] = $this->getRequest()->getPost('untilcoa');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');

        $result = $model->subaccountgroupRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subaccountgroup();
        $result = $model->subaccountgroupCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountgroup();
        $result = $model->subaccountgroupUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountgroup();
        $result = $model->subaccountgroupDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function mergeAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountgroup();
        $result = $model->subaccountgroupMerge($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
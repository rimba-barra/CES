<?php

class Gl_CoaController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Gl_Models_Coa();
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['coacode'] = $this->getRequest()->getPost('coacode');
        $post_data['name'] = $this->getRequest()->getPost('name');
        $post_data['name_convert'] = $this->getRequest()->getPost('name_convert');
        $post_data['type'] = $this->getRequest()->getPost('type');
        $post_data['level'] = $this->getRequest()->getPost('level');
        $post_data['parent_id'] = $this->getRequest()->getPost('parent_id');
        $post_data['parent_code'] = $this->getRequest()->getPost('parent_code');
        $post_data['is_journal'] = $this->getRequest()->getPost('is_journal');
        $post_data['report'] = $this->getRequest()->getPost('report');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['group_gl'] = $this->getRequest()->getPost('group_gl');
        $post_data['coa_status'] = $this->getRequest()->getPost('coa_status');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');


        $result = $model->CoaRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Coa();
        $result = $model->CoaCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Coa();
        $result = $model->CoaUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Coa();
        $result = $model->CoaDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function importAction() {
        
    }

}

?>
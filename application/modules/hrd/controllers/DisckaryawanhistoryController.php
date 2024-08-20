<?php

class Hrd_DisckaryawanhistoryController extends Zend_Controller_Action
{
    function init() {
        $this->model = new Hrd_Models_Disckaryawanhistory();
    }
    
    function readAction() {        
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => array(), 'total' => 0, 'success' => false);       

            $post_data['employee_name'] = $this->getRequest()->getPost('employee_name');
            $post_data['project_id'] = $this->getRequest()->getPost('project_id');    
            $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');    
    
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $result = $this->model->dataRead($post_data);
            echo Zend_Json::encode($result);

            $this->_helper->viewRenderer->setNoRender(true);
    }
       
    function exportAction() {
        
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);       
        
        $data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $post_data['employee_name'] = $data['employee_name'];
        $post_data['project_id'] = $data['project_id'];

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');

        $result = $this->model->dataExport($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}
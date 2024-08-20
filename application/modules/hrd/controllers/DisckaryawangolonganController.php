<?php

class Hrd_DisckaryawangolonganController extends Zend_Controller_Action
{
    function init() {
        $this->model = new Hrd_Models_Disckaryawangolongan();
    }
    
    function readAction() {
        
        $mode_read = $this->getRequest()->getPost('mode_read');
        if($mode_read == 'discstatus'){
            
            $this->discstatusRead();
            
        } else {
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => array(), 'total' => 0, 'success' => false);       

            $post_data['employee_name'] = $this->getRequest()->getPost('employee_name');
            $post_data['project_id'] = $this->getRequest()->getPost('project_id');    
            $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');    
            $post_data['lokasi_project_id'] = $this->getRequest()->getPost('lokasi_project_id');    
            $post_data['discstatus'] = $this->getRequest()->getPost('discstatus');    
            $post_data['tgl_pengajuan_dari'] = $this->getRequest()->getPost('tgl_pengajuan_dari');    
            $post_data['tgl_pengajuan_sampai'] = $this->getRequest()->getPost('tgl_pengajuan_sampai');  
            $post_data['noref'] = $this->getRequest()->getPost('noref');   
    
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $result = $this->model->dataRead($post_data);
            echo Zend_Json::encode($result);

            $this->_helper->viewRenderer->setNoRender(true);
        }
    }
    
    function discstatusRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);       
        
        $post_data['employee_name'] = $this->getRequest()->getPost('employee_name');
        $post_data['description'] = $this->getRequest()->getPost('description');    
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        
        $result = $this->model->discstatusRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->model->dataUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}
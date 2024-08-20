<?php

class Hrd_MasterharibesarController extends Zend_Controller_Action
{
    function init() {
        $this->model = new Hrd_Models_Masterharibesar();
    }
    
    function readAction() {
        
        $mode_read = $this->getRequest()->getPost('mode_read');

        if($mode_read == 'holidayname'){
            
            $this->holidaynameRead();
            
        } else {
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => array(), 'total' => 0, 'success' => false);       

            $post_data['holiday_name'] = $this->getRequest()->getPost('holiday_name');    
            $post_data['start'] = $this->getRequest()->getPost('start');      
            $post_data['page'] = $this->getRequest()->getPost('page');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $result = $this->model->masterharibesarRead($post_data);
            echo Zend_Json::encode($result);
            $this->_helper->viewRenderer->setNoRender(true);
        }
    }
    
    function holidaynameRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);       
        
        $post_data['holiday_name'] = $this->getRequest()->getPost('holiday_name'); 
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        
        $result = $this->model->holidaynameRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->model->masterharibesarCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->model->masterharibesarUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));     
        $result = $this->model->masterharibesarDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
}

?>

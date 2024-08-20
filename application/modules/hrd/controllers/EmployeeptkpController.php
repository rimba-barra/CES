<?php

class Hrd_EmployeeptkpController extends Zend_Controller_Action {
   public $_model = null;
    function init() {
        $this->_model = new Hrd_Models_Employeeptkp();
        $this->_defaultreturn = array('data' => array(), 'total' => 0, 'success' => false);
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data = Zend_Json::decode($data['data']);
        }
        $result = $this->_model->RoutesAllActions($data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['mode_read'] = 'update';
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
        
    function updateallAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $data = $this->getRequest()->getPost();
                
        if (isset($data)) {
            
            if($data['mode_read'] == 'checked' || $data['mode_read'] == 'unchecked'){
                // tombol checked selected
                $result = $this->_model->RoutesAllActions($data);
                

            } else if($data['mode_read'] == 'checkedf' || $data['mode_read'] == 'uncheckedf'){
                // tombol checked filtered
                $data = Zend_Json::decode($data['data']);
                $dataf = $this->getRequest()->getPost();
                $data['is_checked'] = $dataf['is_checked'];
                $data['mode_read'] = $dataf['mode_read'];
                $result = $this->_model->RoutesAllActions($data);
                
            } else if($data['mode_read'] == 'updateselected'){
                // tombol checked filtered
                $data = Zend_Json::decode($data['data']);
                $dataf = $this->getRequest()->getPost();
                $data['mode_read'] = $dataf['mode_read'];
                $result = $this->_model->RoutesAllActions($data);
                
            } else {
                
                // Form Update All
                $data = Zend_Json::decode($data['data']);

                $dataf = $this->getRequest()->getPost();
                $data['ptkp_id_all'] = $dataf['ptkp_id'];
                $data['effective_date_all'] = $dataf['effective_date'];

                $data['ptkp_claim_id_all'] = $dataf['ptkp_claim_id'];
                $data['claim_effective_date_all'] = $dataf['claim_effective_date'];
                
                $data['note_all'] = $dataf['note'];
                $data['mode_read'] = $dataf['mode_read'];
                $result = $this->_model->RoutesAllActions($data);
            }
        }
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function generateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = $this->_defaultreturn;
        $post_data = $this->getRequest()->getPost();
        $result = $this->_model->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>

<?php

class Erems_PurchaseletterrewardprosesController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_purchaseletterreward = new Erems_Models_Purchaseletterrewardproses();
        
        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
        
        if($post_data['mode_read'] == 'detail_grid'){
            // var_dump($this->getRequest()->getPost('purchaseletter_id') );die();
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $post_data['page'] = $this->getRequest()->getPost('page');
            $result = $model_purchaseletterreward->purchaseletterrewarddetailRead($post_data);            
        } else if($post_data['mode_read'] == 'pl_detail'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result = $model_purchaseletterreward->purchaseletterdetailRead($post_data);            
        } else {
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['page'] = $this->getRequest()->getPost('page');
            $post_data['unit_number'] = $this->getRequest()->getPost('unit_unit_number');
            $post_data['purchaseletter_no'] = $this->getRequest()->getPost('purchaseletter_no');
            $post_data['unit_virtualaccount_bca'] = $this->getRequest()->getPost('unit_virtualaccount_bca');
            $post_data['unit_virtualaccount_mandiri'] = $this->getRequest()->getPost('unit_virtualaccount_mandiri');
            $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');

            
            $result = $model_purchaseletterreward->purchaseletterrewardRead($post_data);
        }
            
        
        

        
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model_purchaseletterreward = new Erems_Models_Purchaseletterrewardproses();
        
        $result = $model_purchaseletterreward->purchaseletterrewardCreate($post_data);  

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model_purchaseletterreward = new Erems_Models_Purchaseletterrewardproses();
        
        $result = $model_purchaseletterreward->purchaseletterrewardCreate($post_data);  

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
    //    var_dump($post_data);        die();
        $model_klaimkomisinew = new Erems_Models_Klaimkomisinew();
        $result = $model_klaimkomisinew->klaimkomisinewDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    

}

?>
<?php

class Erems_VabookingfeeController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_vabookingfee = new Erems_Models_Vabookingfee();

        $post_data['nomor_va'] = $this->getRequest()->getPost('nomor_va');        
        $post_data['nomor_vamandiri'] = $this->getRequest()->getPost('nomor_vamandiri');        
        $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');        
		$post_data['receipt_no'] = $this->getRequest()->getPost('receipt_no');     

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = (empty($this->getRequest()->getPost('limit'))) ? 25 : $this->getRequest()->getPost('limit');
        $post_data['page'] = $this->getRequest()->getPost('page');   
        
        $result = $model_vabookingfee->vabookingfeeRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_vabookingfee = new Erems_Models_Vabookingfee();
        $result = $model_vabookingfee->vabookingfeeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $mode_vabookingfee = new Erems_Models_Vabookingfee();
        $result = $mode_vabookingfee->vabookingfeeUpdate($post_data);


        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_vabookingfee = new Erems_Models_Vabookingfee();
        $result = $mode_vabookingfee->vabookingfeeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
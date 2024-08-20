<?php

class Erems_SspssbController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_sspssb = new Erems_Models_Sspssb();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['sspssb_id'] = $this->getRequest()->getPost('sspssb_id');
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
		// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
		$post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
		$post_data['type_id'] = $this->getRequest()->getPost('type_id');
		$post_data['tax_year'] = $this->getRequest()->getPost('tax_year');
		
		$result = $model_sspssb->sspssbRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_sspssb = new Erems_Models_Sspssb();
        $result = $model_sspssb->sspssbCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_sspssb = new Erems_Models_Sspssb();
        $result = $mode_sspssb->sspssbUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_sspssb = new Erems_Models_Sspssb();
        $result = $mode_sspssb->sspssbDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
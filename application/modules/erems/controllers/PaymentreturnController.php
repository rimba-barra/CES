<?php

class Erems_PaymentreturnController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		
        $model_paymentreturn = new Erems_Models_Paymentreturn();

		if($read_type_mode == 'read_schedule'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['schedule_id'] = $this->getRequest()->getPost('schedule_id');
			
			$result = $model_paymentreturn->paymentreturnscheduleRead($post_data);
		} else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			
			$post_data['paymentreturn_id'] = $this->getRequest()->getPost('paymentreturn_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			
			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
			// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
			$post_data['paymentreturn_startdate'] = $this->getRequest()->getPost('paymentreturn_startdate');
			$post_data['paymentreturn_enddate'] = $this->getRequest()->getPost('paymentreturn_enddate');
			
			$result = $model_paymentreturn->paymentreturnRead($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_paymentreturn = new Erems_Models_Paymentreturn();
        $result = $model_paymentreturn->paymentreturnCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_paymentreturn = new Erems_Models_Paymentreturn();
        $result = $mode_paymentreturn->paymentreturnUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_paymentreturn = new Erems_Models_Paymentreturn();
        $result = $mode_paymentreturn->paymentreturnDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
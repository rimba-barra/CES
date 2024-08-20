<?php

class Erems_WarningjatuhtempoController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_warningjatuhtempo = new Erems_Models_Warningjatuhtempo();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
		// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
		$post_data['purchase_startdate'] = $this->getRequest()->getPost('purchase_startdate');
		$post_data['purchase_enddate'] = $this->getRequest()->getPost('purchase_enddate');
		$post_data['is_responnote'] = $this->getRequest()->getPost('is_responnote');
		$post_data['today_plus'] = $this->getRequest()->getPost('today_plus');
		
		$result = $model_warningjatuhtempo->warningjatuhtempoRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_warningjatuhtempo = new Erems_Models_Warningjatuhtempo();
        $result = $model_warningjatuhtempo->warningjatuhtempoCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
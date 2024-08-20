<?php

class Erems_DiscountcollectionController extends Zend_Controller_Action {

	public function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('library', 'library', 'Libraries');
        
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_discountcollection = new Erems_Models_Discountcollection();

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
		
		$result = $model_discountcollection->discountcollectionRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

	function readscheduleAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_discountcollection = new Erems_Models_Discountcollection();
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$result = $model_discountcollection->discountcollectionscheduleRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function updatescheduleAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_discountcollection = new Erems_Models_Discountcollection();
        $result = $mode_discountcollection->discountcollectionscheduleUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
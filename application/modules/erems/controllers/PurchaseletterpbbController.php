<?php

class Erems_PurchaseletterpbbController extends Zend_Controller_Action {

	function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_purchaseletterpbb = new Erems_Models_Purchaseletterpbb();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
		
		$result = $model_purchaseletterpbb->purchaseletterpbbRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

	function readdetailAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_purchaseletterpbb = new Erems_Models_Purchaseletterpbb();
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$result = $model_purchaseletterpbb->purchaseletterpbbdetailRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function createdetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_purchaseletterpbb = new Erems_Models_Purchaseletterpbb();
        $result = $mode_purchaseletterpbb->purchaseletterpbbdetailCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function updatedetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_purchaseletterpbb = new Erems_Models_Purchaseletterpbb();
        $result = $mode_purchaseletterpbb->purchaseletterpbbdetailUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function deletedetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_skl = new Erems_Models_Purchaseletterpbb();
        $result = $mode_skl->purchaseletterpbbdetailDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
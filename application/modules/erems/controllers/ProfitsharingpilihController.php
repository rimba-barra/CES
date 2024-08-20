<?php

class Erems_ProfitsharingpilihController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$model = new Erems_Models_Profitsharingpilih();
		if ($this->getRequest()->getPost('mode') == 'detail') {
			$post_data['profitsharing_id'] = $this->getRequest()->getPost('profitsharing_id');
			$result = $model->profitsharingpilihdetailRead($post_data);
		} else if ($this->getRequest()->getPost('mode') == 'purchaseletter_detail') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model->profitsharingpilihpurchaseletterdetailRead($post_data);
		} else if ($this->getRequest()->getPost('mode') == 'lookup') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model->profitsharingpilihlookupRead($post_data);
		} else {
			$result = $model->profitsharingpilihRead($this->getRequest()->getPost());
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Profitsharingpilih();
		$result = $model->profitsharingpilihUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Profitsharingpilih();
		$result = $model->profitsharingpilihDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
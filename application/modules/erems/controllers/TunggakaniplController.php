<?php

class Erems_TunggakaniplController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Tunggakanipl();
		$result = $model->tunggakaniplRead($this->getRequest());
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Tunggakanipl();
		$result = $model->tunggakaniplUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}
}

?>
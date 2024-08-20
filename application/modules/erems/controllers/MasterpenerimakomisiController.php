<?php

class Erems_MasterpenerimakomisiController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Masterpenerimakomisi();

		$post_data['komisi_penerima_id'] = $this->getRequest()->getPost('komisi_penerima_id');
		$post_data['code'] = $this->getRequest()->getPost('code');
		$post_data['penerima_komisi'] = $this->getRequest()->getPost('penerima_komisi');
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		$result = $model->penerimakomisiRead($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterpenerimakomisi();
		$result = $model->penerimakomisiCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterpenerimakomisi();
		$result = $model->penerimakomisiUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterpenerimakomisi();
		$result = $model->penerimakomisiDelete($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
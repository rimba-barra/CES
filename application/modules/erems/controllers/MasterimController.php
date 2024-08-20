<?php

class Erems_MasterimController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Masterim();
		if ($this->getRequest()->getPost('mode') == 'detail') {
			$post_data['internalmemo_id'] = $this->getRequest()->getPost('internalmemo_id');
			$result = $model->masterimdetailRead($post_data);
		} else {
			$post_data['internalmemo_id'] = $this->getRequest()->getPost('internalmemo_id');
			$post_data['nomor_im'] = $this->getRequest()->getPost('nomor_im');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$result = $model->masterimRead($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterim();
		$result = $model->masterimCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterim();
		$result = $model->masterimUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterim();

		if ($this->getRequest()->getPost('mode') == 'detail') {
			$result = $model->masterimdetailDelete($post_data);
		} else {
			$result = $model->masterimDelete($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
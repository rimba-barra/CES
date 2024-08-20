<?php

class Erems_MasterrangebagihasilController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Masterrangebagihasil();

		if ($this->getRequest()->getPost('mode') == 'detail') {
			$post_data['rangebagihasil_id'] = $this->getRequest()->getPost('rangebagihasil_id');
			$result = $model->rangebagihasildetailRead($post_data);
		} else {
			$post_data['rangebagihasil_id'] = $this->getRequest()->getPost('rangebagihasil_id');
			$post_data['code'] = $this->getRequest()->getPost('code');
			$post_data['name'] = $this->getRequest()->getPost('name');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$result = $model->rangebagihasilRead($post_data);
		}

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterrangebagihasil();
		$result = $model->rangebagihasilCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterrangebagihasil();

		if ($this->getRequest()->getPost('mode') == 'detail') {
			$result = $model->rangebagihasildetailDelete($post_data);
		} else {
			$result = $model->rangebagihasilDelete($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
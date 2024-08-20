<?php

class Erems_MasterperhitungankomisiController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Masterperhitungankomisi();
		if ($this->getRequest()->getPost('mode') == 'detail') {
			$post_data['komisi_perhitungan_id'] = $this->getRequest()->getPost('komisi_perhitungan_id');
			$result = $model->perhitungankomisidetailRead($post_data);
		} else {
			$post_data['komisi_perhitungan_id'] = $this->getRequest()->getPost('komisi_perhitungan_id');
			$post_data['judul'] = $this->getRequest()->getPost('judul_perhitungan');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$result = $model->perhitungankomisiRead($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
//		print_r($post_data);
//		die;
		$model = new Erems_Models_Masterperhitungankomisi();
		$result = $model->perhitungankomisiCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterperhitungankomisi();
		$result = $model->perhitungankomisiUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterperhitungankomisi();

		if ($this->getRequest()->getPost('mode') == 'detail') {
			$result = $model->perhitungankomisidetailDelete($post_data);
		} else {
			$result = $model->perhitungankomisiDelete($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
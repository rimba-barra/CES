<?php

class Erems_MasterpencairankomisiController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Masterpencairankomisi();
		if ($this->getRequest()->getPost('mode') == 'cbf') {
			if ($this->getRequest()->getPost('populated_data') == "all") {
				$params['jabatan'] = 0;
				$result = $model->employeeRead($params);
			} else if ($this->getRequest()->getPost('populated_data') == "salesman") {
				$params['jabatan'] = 7;
				$result = $model->employeeRead($params);
			} else if ($this->getRequest()->getPost('populated_data') == "kode_kc") {
				$params['jabatan'] = 263;
				$result = $model->employeeRead($params);
			} else if ($this->getRequest()->getPost('populated_data') == "club_citra") {
				$result = $model->citraclubRead();
			} else if ($this->getRequest()->getPost('populated_data') == "member") {
				$result = $model->memberRead();
			}
		} else if ($this->getRequest()->getPost('mode') == 'detail') {
			$post_data['komisi_pencairan_id'] = $this->getRequest()->getPost('komisi_pencairan_id');
			$result = $model->pencairankomisidetailRead($post_data);
		} else {
			$post_data['komisi_pencairan_id'] = $this->getRequest()->getPost('komisi_pencairan_id');
			$post_data['code'] = $this->getRequest()->getPost('code');
			$post_data['judul_komisi'] = $this->getRequest()->getPost('judul_komisi');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$result = $model->pencairankomisiRead($post_data);
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
		$model = new Erems_Models_Masterpencairankomisi();
		$result = $model->pencairankomisiCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterpencairankomisi();
		$result = $model->pencairankomisiUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Masterpencairankomisi();

		if ($this->getRequest()->getPost('mode') == 'detail') {
			$result = $model->pencairankomisidetailDelete($post_data);
		} else {
			$result = $model->pencairankomisiDelete($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
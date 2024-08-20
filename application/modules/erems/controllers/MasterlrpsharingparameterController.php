<?php

class Erems_MasterlrpsharingparameterController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$model = new Erems_Models_Masterlrpsharingparameter();

		if ($this->getRequest()->getPost('mode_read') == "splitLRP") {
			$result['splitLRP'] = $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSplitPTLRP();
		} else {
			$result = array('data' => array(), 'total' => 0, 'success' => false);
			$post_data['lrp_sharingparameter_id'] = $this->getRequest()->getPost('lrp_sharingparameter_id');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');

			$result = $model->lrpsharingparameterRead($post_data);
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterlrpsharingparameter();
		$result = $model->lrpsharingparameterCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterlrpsharingparameter();
		$result = $model->lrpsharingparameterUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Masterlrpsharingparameter();
		$result = $model->lrpsharingparameterDelete($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
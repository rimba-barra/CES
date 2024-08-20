<?php

class Erems_MastersiteplanlegendController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Mastersiteplanlegend();

		if ($this->getRequest()->getPost('mode') == 'siteplanparameter') {
			$result = $model->siteplanparameterRead();
		} else if ($this->getRequest()->getPost('mode') == 'detail') {
			$post_data['siteplanlegend_id'] = $this->getRequest()->getPost('siteplanlegend_id');
			$result = $model->legenddetailRead($post_data);
		} else if ($this->getRequest()->getPost('mode') == 'upload') {
			$result = $this->uploadAction();
		} else if ($this->getRequest()->getPost('mode') == 'tableRelational') {
			$post_data['relational_table'] = $this->getRequest()->getPost('relational_table');
			$post_data['relational_field_id'] = $this->getRequest()->getPost('relational_field_id');
			$post_data['relational_field_value'] = $this->getRequest()->getPost('relational_field_value');
			$result = $model->siteplanparameterrelationalRead($post_data);
		} else {
			$post_data['siteplanlegend_id'] = $this->getRequest()->getPost('siteplanlegend_id');
			$post_data['code'] = $this->getRequest()->getPost('code');
			$post_data['name'] = $this->getRequest()->getPost('name');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$result = $model->legendRead($post_data);
		}

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Mastersiteplanlegend();
		$result = $model->legendCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Mastersiteplanlegend();

		if ($this->getRequest()->getPost('mode') == 'detail') {
			$result = $model->legenddetailDelete($post_data);
		} else {
			$result = $model->legendDelete($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function uploadAction() {
//		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$msg = '???';
		$success = FALSE;
		$imageUpload = NULL;

		$file = $_FILES['file_svg'];
		$ext = pathinfo($file['name'], PATHINFO_EXTENSION);

		$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/siteplan/", "legend" . $this->session->getCurrentProjectId() . $this->session->getCurrentPtId(), $ext);
		$imageUpload->runDocument('svg');

		if (!$imageUpload->isSuccess()) {
			$msg = $imageUpload->getErrorMsg();
		} else {
			$success = TRUE;
			$msg = $imageUpload->getImageName();
		}
		return $result = array('msg' => $msg, 'success' => $success);
//		echo Zend_Json::encode($result);
//		$this->_helper->viewRenderer->setNoRender(true);
//        $app->setMsg($msg);
//        $app->setSuccess($success);
//        $app->run();
	}

}

?>
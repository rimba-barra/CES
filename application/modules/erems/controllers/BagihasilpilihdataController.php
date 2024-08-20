<?php

class Erems_BagihasilpilihdataController extends Zend_Controller_Action {

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Bagihasilpilihdata();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['page'] = $this->getRequest()->getPost('page');

		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['set_lrp'] = $this->getRequest()->getPost('set_lrp', 0);
		$post_data['pt_id'] = $this->getRequest()->getPost('pt_id');

		// added by rico 09052022
		$post_data['type'] = $this->getRequest()->getPost('type_id');

		// added by rico 25112022
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
	
		if ($read_type_mode == 'config') {
            $model_dropdown = new Erems_Models_Dropdown();
            
			// added by rico 25112022
			$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
			$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getCurrentProjectId(), $session->getCurrentPtId());
			$result['lrpsh1'] = $genco->lrpSH1Raya();

            $result_projectpt = $model_dropdown->projectpt($this->getRequest());
            $result_projectpt = $result_projectpt['success'] ? $result_projectpt['data'] : array();
			$result['projectpt'] = $result_projectpt;

		}else{
			$result = $model->dataRead($post_data);
		}


		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	/* function createAction() {

	  $this->getResponse()->setHeader('Content-Type', 'application/json');

	  $result = array('data' => array(), 'total' => 0, 'success' => false);

	  $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

	  $model = new Erems_Models_Bagihasilpilihdata();
	  $result = $model->landrepaymentCreate($post_data);

	  echo Zend_Json::encode($result);

	  $this->_helper->viewRenderer->setNoRender(true);
	  } */

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Bagihasilpilihdata();
		$result = $model->dataUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Bagihasilpilihdata();
		$result = $model->bagihasilDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
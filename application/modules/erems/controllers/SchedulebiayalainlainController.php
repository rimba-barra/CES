<?php

class Erems_SchedulebiayalainlainController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_schedulebiayalainlain = new Erems_Models_Schedulebiayalainlain();
		
		$post_data['mode_read']      = $this->getRequest()->getPost('mode_read');
		$post_data['read_type_mode'] = $this->getRequest()->getPost('read_type_mode');

		if ($post_data['mode_read'] == 'paymenttypeall_combo') {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page']  = $this->getRequest()->getPost('page');

			$result = $model_schedulebiayalainlain->paymenttypeallRead($post_data);
		} 
		else if ($post_data['mode_read'] == 'detail_biayalainlain') {
			$post_data['biayalainlain_id'] = $this->getRequest()->getPost('biayalainlain_id');

			$result = $model_schedulebiayalainlain->detailschedulebiayalainlainRead($post_data);
		}
		else if ($post_data['mode_read'] == 'unit_bll') {
			$post_data['start']       = $this->getRequest()->getPost('start');
			$post_data['limit']       = $this->getRequest()->getPost('limit');
			$post_data['page']        = $this->getRequest()->getPost('page');            
			$post_data['unit_id']     = $this->getRequest()->getPost('unit_id');
			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['cluster_id']  = $this->getRequest()->getPost('cluster_id');

			$result = $model_schedulebiayalainlain->unitschedulebllRead($post_data);
		}
		else if ($post_data['mode_read'] == 'customer_bll') {
			$post_data['start']       = $this->getRequest()->getPost('start');
			$post_data['limit']       = $this->getRequest()->getPost('limit');
			$post_data['page']        = $this->getRequest()->getPost('page');            
			$post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
			$post_data['code']        = $this->getRequest()->getPost('code');
			$post_data['name']        = $this->getRequest()->getPost('name');
			$post_data['address']     = $this->getRequest()->getPost('address');
			$post_data['KTP_number']  = $this->getRequest()->getPost('KTP_number');

			$result = $model_schedulebiayalainlain->customerschedulebllRead($post_data);
		}
		else if($post_data['mode_read'] == 'config'){ /// add by erwin.st 16112021
			$vabca     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->NovabcaBiayalainlain();
			$vamandiri = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->NovamandiriBiayalainlain();
			$round     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->pembulatanSchedulebiayalainlain();

			$result = array(
				'vabca_active'                           => $vabca['active'],
				'vabca_digit_payment'                    => $vabca['digit_payment'],
				'vabca_start_index_digit_payment'        => $vabca['start_index_digit_payment'],
				'vabca_start_index_digit_payment_id'     => $vabca['start_index_digit_payment_id'],
				'vamandiri_active'                       => $vamandiri['active'],
				'vamandiri_digit_payment'                => $vamandiri['digit_payment'],
				'vamandiri_start_index_digit_payment'    => $vamandiri['start_index_digit_payment'],
				'vamandiri_start_index_digit_payment_id' => $vamandiri['start_index_digit_payment_id'],
				'round'                                  => $round
			);
		}
		// added by rico 23122021
		else if($post_data['mode_read'] == 'save_customer'){
			$data = $this->getRequest()->getPost('data');
			$result = $this->savecustomer($data);
		}
		else {
			$post_data['start']           = $this->getRequest()->getPost('start');
			$post_data['limit']           = $this->getRequest()->getPost('limit');
			$post_data['page']            = $this->getRequest()->getPost('page');
			$post_data['unit_number']     = $this->getRequest()->getPost('unit_number');
			$post_data['cluster_id']      = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id']        = $this->getRequest()->getPost('block_id');
			$post_data['customer_name']   = $this->getRequest()->getPost('customer_name');
			$post_data['virtual_account'] = $this->getRequest()->getPost('virtual_account');
			$post_data['paymentflag_id']  = $this->getRequest()->getPost('paymentflag_id');

			$result = $model_schedulebiayalainlain->schedulebiayalainlainRead($post_data);
		}
		
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model_schedulebiayalainlain = new Erems_Models_Schedulebiayalainlain();
		$result = $model_schedulebiayalainlain->schedulebiayalainlainCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model_schedulebiayalainlain = new Erems_Models_Schedulebiayalainlain();
		$result = $model_schedulebiayalainlain->schedulebiayalainlainUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));        
		$model_schedulebiayalainlain = new Erems_Models_Schedulebiayalainlain();
		$result = $model_schedulebiayalainlain->schedulebiayalainlainDelete($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function savecustomer($data) {
		$model = new Erems_Models_Schedulebiayalainlain();
		$result = $model->newcustomer($data);

		return $result;
	}
}
?>
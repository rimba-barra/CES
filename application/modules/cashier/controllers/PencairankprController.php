<?php

class Cashier_PencairankprController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       	$ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		
		$model_pencairankpr = new Cashier_Models_Pencairankpr();
		
		if($read_type_mode == 'getDuedateEscrow'){
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$get_data_type = ($this->getRequest()->getPost('get_data_type') ? $this->getRequest()->getPost('get_data_type') : '');
			
			if($get_data_type == 'progress_status'){
				$result = $model_pencairankpr->pencairankprReadProgress($post_data);
			} else {
				$result = $model_pencairankpr->pencairankprReadDueDateEscrow($post_data);
			}
		} else if($read_type_mode == 'full_payment'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_pencairankpr->pencairanfullpaymenrtRead($post_data);
		}else if($read_type_mode == 'checkallowedgenerate'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_pencairankpr->checkallowedgenerateRead($post_data);
		} else {		
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			
			$post_data['purchaseletter_pencairankpr_id'] = $this->getRequest()->getPost('purchaseletter_pencairankpr_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			
			$result = $model_pencairankpr->pencairankprRead($post_data);
		}
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_pencairankpr = new Cashier_Models_Pencairankpr();
        $result = $model_pencairankpr->pencairankprCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_pencairankpr = new Cashier_Models_Pencairankpr();
        $result = $mode_pencairankpr->pencairankprUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_pencairankpr = new Cashier_Models_Pencairankpr();
        $result = $mode_pencairankpr->pencairankprDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function printAction()
	{
		$report_fn = 'Pencairankpr.mrt';
				
		echo ($report_fn && file_exists($this->_helper->session->report_path.$report_fn)) ? $report_fn : 'ERROR';
				
		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
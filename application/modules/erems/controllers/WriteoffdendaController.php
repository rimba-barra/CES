<?php

class Erems_WriteoffdendaController extends Zend_Controller_Action {

	public function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('library', 'library', 'Libraries');
        
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_writeoffdenda = new Erems_Models_Writeoffdenda();

        $post_data['start']           = $this->getRequest()->getPost('start');
        $post_data['limit']           = $this->getRequest()->getPost('limit');
        $post_data['writeoff_id']     = $this->getRequest()->getPost('writeoff_id');
        $post_data['cluster_id']      = $this->getRequest()->getPost('cluster_id');
        $post_data['block_id']        = $this->getRequest()->getPost('block_id');
        $post_data['unit_number']     = $this->getRequest()->getPost('unit_number');
        $post_data['customer_name']   = $this->getRequest()->getPost('customer_name');
        $post_data['addon_startdate'] = $this->getRequest()->getPost('addon_startdate');
        $post_data['addon_enddate']   = $this->getRequest()->getPost('addon_enddate');
        // $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
        // $post_data['kavling_number_end']   = $this->getRequest()->getPost('kavling_number_end');
		
		$result = $model_writeoffdenda->writeoffdendaRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

	function readdetailAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['writeoff_id'] = $this->getRequest()->getPost('writeoff_id');
		
        $model_writeoffdenda = new Erems_Models_Writeoffdenda();
		$result = $model_writeoffdenda->writeoffdendadetailRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function readscheduleAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
        $model_writeoffscheduledenda = new Erems_Models_Writeoffdenda();
		$result = $model_writeoffscheduledenda->writeoffdendascheduledetailRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_writeoffdenda = new Erems_Models_Writeoffdenda();
        $result = $mode_writeoffdenda->writeoffdendaCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
<?php

class Erems_HgbsplitController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        $model_hgbsplit = new Erems_Models_Hgbsplit();

		if($read_type_mode == 'update_is_gabungan'){
			$post_data['hgbajb_id'] = $this->getRequest()->getPost('hgbajb_id');
			
			$result = $model_hgbsplit->hgbsplitUpdateGabungan($post_data);
		} 
		else{
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
                        $post_data['page'] = $this->getRequest()->getPost('page');
			
			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['is_gabungan'] = $this->getRequest()->getPost('is_gabungan');
                        $post_data['view_grid_param'] = $this->getRequest()->getPost('view_grid_param');
			
			$result = $model_hgbsplit->hgbsplitRead($post_data);
		}
		
		echo Zend_Json::encode($result);
		
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_hgbsplit = new Erems_Models_Hgbsplit();
        $result = $model_hgbsplit->hgbsplitCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_hgbsplit = new Erems_Models_Hgbsplit();
        $result = $mode_hgbsplit->hgbsplitUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_hgbsplit = new Erems_Models_Hgbsplit();
        $result = $mode_hgbsplit->hgbsplitDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function printAction()
	{
		$report_fn = 'Hgbsplit.mrt';
				
		echo ($report_fn && file_exists($this->_helper->session->report_path.$report_fn)) ? $report_fn : 'ERROR';
				
		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
<?php

class Erems_PelunasanController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_pelunasan = new Erems_Models_Pelunasan();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['page'] = $this->getRequest()->getPost('page');
		
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');

		
		$result = $model_pelunasan->pelunasanRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_pelunasan = new Erems_Models_Pelunasan();
        $result = $mode_pelunasan->pelunasanUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

	function setlunasAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_pelunasan = new Erems_Models_Pelunasan();
        $result = $mode_pelunasan->pelunasanUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
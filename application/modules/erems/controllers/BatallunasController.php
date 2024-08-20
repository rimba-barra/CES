<?php

class Erems_BatallunasController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_batallunas = new Erems_Models_Batallunas();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		
		$result = $model_batallunas->batallunasRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

	function setbatalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_batallunas = new Erems_Models_Batallunas();
        $result = $mode_batallunas->batallunasUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
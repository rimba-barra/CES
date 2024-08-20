<?php

class Erems_AktappjbController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_aktappjb = new Erems_Models_Aktappjb();

		$post_data['page']  = $this->getRequest()->getPost('page');
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['aktappjb_id']       = $this->getRequest()->getPost('aktappjb_id');
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['cluster_id']        = $this->getRequest()->getPost('cluster_id');

		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		$post_data['unit_id']  = $this->getRequest()->getPost('unit_id');

		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');

		$post_data['aktappjb_startdate'] = $this->getRequest()->getPost('aktappjb_startdate');
		$post_data['aktappjb_enddate']   = $this->getRequest()->getPost('aktappjb_enddate');

		$post_data['handover_startdate'] = $this->getRequest()->getPost('handover_startdate');
		$post_data['handover_enddate']   = $this->getRequest()->getPost('handover_enddate');

		$post_data['sign_startdate'] = $this->getRequest()->getPost('sign_startdate');
		$post_data['sign_enddate']   = $this->getRequest()->getPost('sign_enddate');

		$result = $model_aktappjb->aktappjbRead($post_data);


        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_aktappjb = new Erems_Models_Aktappjb();
        $result = $model_aktappjb->aktappjbCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_aktappjb = new Erems_Models_Aktappjb();
        $result = $mode_aktappjb->aktappjbUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_aktappjb = new Erems_Models_Aktappjb();
        $result = $mode_aktappjb->aktappjbDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

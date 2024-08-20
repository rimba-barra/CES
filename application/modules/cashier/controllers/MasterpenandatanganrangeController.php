<?php

class Cashier_MasterpenandatanganrangeController extends Zend_Controller_Action {
	
	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_penandatangan = new Cashier_Models_Masterpenandatanganrange();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['range_fromamount'] = $this->getRequest()->getPost('range_fromamount');
        $post_data['range_untilamount'] = $this->getRequest()->getPost('range_untilamount');
        $post_data['penandatangan_inisial'] = $this->getRequest()->getPost('penandatangan_inisial');
        $post_data['penandatangan_name'] = $this->getRequest()->getPost('penandatangan_name');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $result = $model_penandatangan->penandatanganrangeRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_penandatangan = new Cashier_Models_Masterpenandatanganrange();
        $result = $model_penandatangan->penandatanganrangeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_penandatangan = new Cashier_Models_Masterpenandatanganrange();
        $result = $mode_penandatangan->penandatanganrangeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_penandatangan = new Cashier_Models_Masterpenandatanganrange();
        $result = $mode_penandatangan->penandatanganrangeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
}

?>
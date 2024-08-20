<?php

class Erems_MasterfakturpajakcounterController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_fakturpajakcounter = new Erems_Models_Masterfakturpajakcounter();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['fakturpajak_counter_id'] = $this->getRequest()->getPost('fakturpajak_counter_id');
		$post_data['year'] = $this->getRequest()->getPost('year');
		
		$result = $model_fakturpajakcounter->fakturpajakcounterRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_fakturpajakcounter = new Erems_Models_Masterfakturpajakcounter();
        $result = $model_fakturpajakcounter->fakturpajakcounterCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_fakturpajakcounter = new Erems_Models_Masterfakturpajakcounter();
        $result = $mode_fakturpajakcounter->fakturpajakcounterUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_fakturpajakcounter = new Erems_Models_Masterfakturpajakcounter();
        $result = $mode_fakturpajakcounter->fakturpajakcounterDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

}

?>
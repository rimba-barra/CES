<?php 


class Erems_MasteremployeeController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['employee_id'] = $this->getRequest()->getPost('employee_id');
		$post_data['employee_name'] = $this->getRequest()->getPost('employee_name');
		$post_data['employee_nik'] = $this->getRequest()->getPost('employee_nik');
		$post_data['jabatan_code'] = $this->getRequest()->getPost('jabatan_code');
		
		$model_masteremployee = new Erems_Models_Masteremployee();
        $result = $model_masteremployee->masteremployeeRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masteremployee = new Erems_Models_Masteremployee();
        $result = $model_masteremployee->masteremployeeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masteremployee = new Erems_Models_Masteremployee();
        $result = $mode_masteremployee->masteremployeeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masteremployee = new Erems_Models_Masteremployee();
        $result = $mode_masteremployee->masteremployeeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
<?php 


class Erems_MasterakadconfirmationstatusController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['akadconfirmation_status_id'] = $this->getRequest()->getPost('akadconfirmation_status_id');
		
		$model = new Erems_Models_Masterakadconfirmationstatus();
		
		$result = $model->masterakadconfirmationstatusRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masterakadconfirmationstatus = new Erems_Models_Masterakadconfirmationstatus();
        $result = $model_masterakadconfirmationstatus->masterakadconfirmationstatusCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterakadconfirmationstatus = new Erems_Models_Masterakadconfirmationstatus();
        $result = $mode_masterakadconfirmationstatus->masterakadconfirmationstatusUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterakadconfirmationstatus = new Erems_Models_Masterakadconfirmationstatus();
        $result = $mode_masterakadconfirmationstatus->masterakadconfirmationstatusDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/
    
   

}
        ?>
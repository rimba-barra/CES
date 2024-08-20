<?php 


class Erems_MasterutilitystatusController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['utilitystatus_id'] = $this->getRequest()->getPost('utilitystatus_id');
		$post_data['utilitystatus'] = $this->getRequest()->getPost('utilitystatus');
		
		$model_masterutilitystatus = new Erems_Models_Masterutilitystatus();
		
		$result = $model_masterutilitystatus->masterutilitystatusRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masterutilitystatus = new Erems_Models_Masterutilitystatus();
        $result = $model_masterutilitystatus->masterutilitystatusCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterutilitystatus = new Erems_Models_Masterutilitystatus();
        $result = $mode_masterutilitystatus->masterutilitystatusUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterutilitystatus = new Erems_Models_Masterutilitystatus();
        $result = $mode_masterutilitystatus->masterutilitystatusDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
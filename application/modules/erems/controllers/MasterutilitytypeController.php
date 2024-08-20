<?php 


class Erems_MasterutilitytypeController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['utilitytype_id'] = $this->getRequest()->getPost('utilitytype_id');
		$post_data['utilitytype'] = $this->getRequest()->getPost('utilitytype');
		
		$model_masterutilitytype = new Erems_Models_Masterutilitytype();
		
		$result = $model_masterutilitytype->masterutilitytypeRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masterutilitytype = new Erems_Models_Masterutilitytype();
        $result = $model_masterutilitytype->masterutilitytypeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterutilitytype = new Erems_Models_Masterutilitytype();
        $result = $mode_masterutilitytype->masterutilitytypeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterutilitytype = new Erems_Models_Masterutilitytype();
        $result = $mode_masterutilitytype->masterutilitytypeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
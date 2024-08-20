<?php 


class Erems_MastercomplaintstatusController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['complaintstatus_id'] = $this->getRequest()->getPost('complaintstatus_id');
		$post_data['complaintstatus'] = $this->getRequest()->getPost('complaintstatus');
		
		$model_mastercomplaintstatus = new Erems_Models_Mastercomplaintstatus();
        $result = $model_mastercomplaintstatus->mastercomplaintstatusRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_mastercomplaintstatus = new Erems_Models_Mastercomplaintstatus();
        $result = $model_mastercomplaintstatus->mastercomplaintstatusCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercomplaintstatus = new Erems_Models_Mastercomplaintstatus();
        $result = $mode_mastercomplaintstatus->mastercomplaintstatusUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercomplaintstatus = new Erems_Models_Mastercomplaintstatus();
        $result = $mode_mastercomplaintstatus->mastercomplaintstatusDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
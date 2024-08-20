<?php 


class Erems_MastercancelreasonController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['code'] = $this->getRequest()->getPost('code');
		$post_data['cancelreason'] = $this->getRequest()->getPost('cancelreason');
		$post_data['description'] = $this->getRequest()->getPost('description');
		
		$model_mastercancelreason = new Erems_Models_Mastercancelreason();
		
		$result = $model_mastercancelreason->mastercancelreasonRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_mastercancelreason = new Erems_Models_Mastercancelreason();
        $result = $model_mastercancelreason->mastercancelreasonCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercancelreason = new Erems_Models_Mastercancelreason();
        $result = $mode_mastercancelreason->mastercancelreasonUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercancelreason = new Erems_Models_Mastercancelreason();
        $result = $mode_mastercancelreason->mastercancelreasonDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
<?php

class Gl_SubdesccodeController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Gl_Models_Subdesccode();
        
                $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
                $post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['subdsk_id'] = $this->getRequest()->getPost('subdsk_id');
		$post_data['subdsk'] = $this->getRequest()->getPost('subdsk');
		$post_data['description'] = $this->getRequest()->getPost('description');
		
		$result = $model->subdesccodeRead($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subdesccode();
        $result = $model->subdesccodeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subdesccode();
        $result = $model->subdesccodeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Subdesccode();
        $result = $model->subdesccodeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
  

}

?>
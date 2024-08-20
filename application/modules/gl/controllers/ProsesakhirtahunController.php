<?php

class Gl_ProsesakhirtahunController extends Zend_Controller_Action {
    function createAction() {       
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Prosesakhirtahun();
        $result = $model->dataCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
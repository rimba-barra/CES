<?php

class Erems_MastercitraclubController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['clubname'] = $this->getRequest()->getPost('clubname');
        $post_data['description'] = $this->getRequest()->getPost('description');


        $model_mastercitraclub = new Erems_Models_Mastercitraclub();
        $result = $model_mastercitraclub->mastercitraclubRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_mastercitraclub = new Erems_Models_Mastercitraclub();
        $result = $model_mastercitraclub->mastercitraclubCreate($post_data);
        $result = array("status"=>0,"msg"=>"hello");
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_mastercitraclub = new Erems_Models_Mastercitraclub();
        $result = $mode_mastercitraclub->mastercitraclubUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_mastercitraclub = new Erems_Models_Mastercitraclub();
        $result = $mode_mastercitraclub->mastercitraclubDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

<?php 


class Erems_ScheduletypeController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['scheduletype'] = $this->getRequest()->getPost('scheduletype');$post_data['description'] = $this->getRequest()->getPost('description');$model_scheduletype = new Erems_Models_Scheduletype();
        $result = $model_scheduletype->scheduletypeRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_scheduletype = new Erems_Models_Scheduletype();
        $result = $model_scheduletype->scheduletypeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_scheduletype = new Erems_Models_Scheduletype();
        $result = $mode_scheduletype->scheduletypeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_scheduletype = new Erems_Models_Scheduletype();
        $result = $mode_scheduletype->scheduletypeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
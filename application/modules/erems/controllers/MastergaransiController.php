<?php 


class Erems_MastergaransiController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['code'] = $this->getRequest()->getPost('code');$post_data['guaranteetype'] = $this->getRequest()->getPost('guaranteetype');$post_data['period'] = $this->getRequest()->getPost('period');$post_data['description'] = $this->getRequest()->getPost('description');$model_mastergaransi = new Erems_Models_Mastergaransi();
        $result = $model_mastergaransi->mastergaransiRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_mastergaransi = new Erems_Models_Mastergaransi();
        $result = $model_mastergaransi->mastergaransiCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastergaransi = new Erems_Models_Mastergaransi();
        $result = $mode_mastergaransi->mastergaransiUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastergaransi = new Erems_Models_Mastergaransi();
        $result = $mode_mastergaransi->mastergaransiDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
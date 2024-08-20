<?php 


class Erems_MasternotarisController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['code'] = $this->getRequest()->getPost('code');$post_data['notaris'] = $this->getRequest()->getPost('notaris');$post_data['alamat'] = $this->getRequest()->getPost('alamat');$post_data['country_id'] = $this->getRequest()->getPost('country_id');$post_data['city_id'] = $this->getRequest()->getPost('city_id');$model_masternotaris = new Erems_Models_Masternotaris();
        $result = $model_masternotaris->masternotarisRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masternotaris = new Erems_Models_Masternotaris();
        $result = $model_masternotaris->masternotarisCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masternotaris = new Erems_Models_Masternotaris();
        $result = $mode_masternotaris->masternotarisUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masternotaris = new Erems_Models_Masternotaris();
        $result = $mode_masternotaris->masternotarisDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
<?php 


class Erems_MastercomplainttypeController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['code'] = $this->getRequest()->getPost('code');$post_data['complainttype'] = $this->getRequest()->getPost('complainttype');$post_data['description'] = $this->getRequest()->getPost('description');$model_mastercomplainttype = new Erems_Models_Mastercomplainttype();
        $result = $model_mastercomplainttype->mastercomplainttypeRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_mastercomplainttype = new Erems_Models_Mastercomplainttype();
        $result = $model_mastercomplainttype->mastercomplainttypeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercomplainttype = new Erems_Models_Mastercomplainttype();
        $result = $mode_mastercomplainttype->mastercomplainttypeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercomplainttype = new Erems_Models_Mastercomplainttype();
        $result = $mode_mastercomplainttype->mastercomplainttypeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
<?php

class Erems_DocumentpembatalanController extends Zend_Controller_Action {
    
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    
    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $projectId = $this->session->getCurrentProjectId();
        $ptId = $this->session->getCurrentPtId();
        
        $model_documentpembatalan = new Erems_Models_Documentpembatalan();
        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');

        $result = $model_documentpembatalan->documentpembatalanRead($post_data);
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_documentpembatalan = new Erems_Models_Documentpembatalan();
        $result = $model_documentpembatalan->documentpembatalanCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_documentpembatalan = new Erems_Models_Documentpembatalan();
        $result = $mode_documentpembatalan->documentpembatalanUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_documentpembatalan = new Erems_Models_Documentpembatalan();
        $result = $mode_documentpembatalan->documentpembatalanDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function uploadAction() {
        // $app = new Erems_Box_Models_App_Models_Create($this);

        $msg = '???';
        $success = FALSE;        
        $imageUpload = NULL;
        
        $file = $_FILES['file_browse'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/documentpembatalan/", "document_",$ext);
        $imageUpload->runDocument();           
        
        if(!$imageUpload->isSuccess()){
            $msg = $imageUpload->getErrorMsg();
        }else{
            $success = TRUE;
            $msg = $imageUpload->getImageName();
        }

        $result = array('msg' => $msg, 'success' => $success);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
        // $app->setMsg($msg);
        // $app->setSuccess($success);
        // $app->run();
    }
}

?>
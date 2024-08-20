<?php

class Erems_DocumentuploadController extends Zend_Controller_Action {
    
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    
    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $projectId = $this->session->getCurrentProjectId();
        $ptId = $this->session->getCurrentPtId();
        
        $model_documentupload = new Erems_Models_Documentupload();
        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        $post_data['sppjb_id'] = $this->getRequest()->getPost('sppjb_id');

        $result = $model_documentupload->documentuploadRead($post_data);
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_documentupload = new Erems_Models_Documentupload();
        $result = $model_documentupload->documentuploadCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_documentupload = new Erems_Models_Documentupload();
        $result = $mode_documentupload->documentuploadUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_documentupload = new Erems_Models_Documentupload();
        $result = $mode_documentupload->documentuploadDelete($post_data);

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

        $doc_type = $this->getRequest()->getPost('doc_type');
        $filename = ($doc_type == 1) ? 'SPPJB_': 'SURAT_KUASA_';

        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/sppjbdoc/", $filename ,$ext);
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
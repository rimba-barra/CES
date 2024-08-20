<?php

class Erems_UploadcjpController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['data'] = $this->getRequest()->getPost('data');       
        $models = new Erems_Models_Upload_Uploadcjp();
        $paramdata = Zend_Json::decode($post_data['data']);
        $result = $models->RoutesAllActions($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $response = array('success' => false, 'msg' => "no process upload");
        if ($_FILES["uploadfile_cjp"]["error"] > 0) {
            $error = $_FILES["file"]["error"];
            $response = array('success' => false, 'msg' => $error);
        } else {
            $models = new Erems_Models_Upload_Uploadcjp();
            $response = $models->Createupload($_FILES);
        }
        echo json_encode($response);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

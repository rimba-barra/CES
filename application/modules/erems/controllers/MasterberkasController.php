<?php

class Erems_MasterberkasController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_masterberkas = new Erems_Models_Masterberkas();
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');

        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['berkas'] = $this->getRequest()->getPost('berkas');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['berkas_id'] = $this->getRequest()->getPost('berkas_id');

        $mode_read = $this->getRequest()->getPost('mode_read');

        if($mode_read == 'config'){
            $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            $genco   = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getCurrentProjectId(), $session->getCurrentPtId());

            $result['UseBerkasFile'] = $genco->UseBerkasFile();
        }else if($mode_read == 'documents'){
            $result = $model_masterberkas->masterberkasdocumentRead($post_data);
        }else if($mode_read == 'savedocument'){
            $data = $this->getRequest()->getPost('data');
            $result = $model_masterberkas->masterberkasdocumentCreate($data);
        }else if($mode_read == 'deletedocument'){
            $data = $this->getRequest()->getPost('berkasdocument_id');
            $result = $model_masterberkas->masterberkasdocumentDelete($data);
        }else{
            $result = $model_masterberkas->masterberkasRead($post_data);
        }
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $model_masterberkas = new Erems_Models_Masterberkas();
        $result = $model_masterberkas->masterberkasCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterberkas = new Erems_Models_Masterberkas();
        $result = $model_masterberkas->masterberkasUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterberkas = new Erems_Models_Masterberkas();
        $result = $model_masterberkas->masterberkasDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function uploadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $upload = new Zend_File_Transfer_Adapter_Http();
        $files  = $upload->getFileInfo('file_browse');

        foreach ($files as $file => $info) {
            $filename = $info['name'];
            if ($filename) {
                $filetype       = explode('.', $filename);
                $fileallowed    = array('jpg', 'jpeg', 'png', 'tif', 'gif', 'JPG', 'JPEG', 'PNG', 'TIF', 'GIF', 'pdf');
                $dokName        = "berkas_".strtotime(date("H:i:s d-m-Y")).".".$filetype[1];

                if (!(in_array($filetype[1], $fileallowed))) {
                    $msg = 'File type must images or pdf';
                    $dokName = '';
                    $success = false;
                } else {
                    $upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/erems/uploads/berkasdocuments/' . $dokName, 'overwrite' => true));
                    $success = false;
                    $msg = '';

                    try {
                        $upload->receive();
                        $success = true;
                        $msg = 'success';
                    } catch (Zend_File_Transfer_Exception $e) {
                        $msg = $e->message();
                        $dokName = '';
                        $success = false;
                    }
                }
            }
        }

        $result = array(
            'data'      => array(), 
            'total'     => 0, 
            'success'   => $success, 
            'msg'       => $msg, 
            'imageName' => $dokName, 
            'path'      => APPLICATION_PATH . '/../public/app/erems/uploads/berkasdocuments/' . $dokName
        );
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
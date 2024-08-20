<?php

class Erems_MasterclusteroldController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['cluster'] = $this->getRequest()->getPost('cluster');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');

        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {


        
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        /// convert to string with delimeter
        $post_data['detail_id'] = NULL;
        $post_data['detail_title'] = NULL;
        $post_data['detail_image'] = NULL;
        $post_data['detail_is_default'] = NULL;
        $post_data['detail_description'] = NULL;
        $data = $post_data['detail'];
        $data_count = count($data);

        if ($data_count > 0) {

            $delimeter = '';
            for ($i = 0; $i < $data_count; $i++) {
                $delimeter = $data_count - $i > 1 ? '~' : '';

                $post_data['detail_id'] .= $data[$i]['clusterimages_id'] . $delimeter;
                $post_data['detail_title'] .= $data[$i]['title'] . $delimeter;
                $post_data['detail_image'] .= $data[$i]['image'] . $delimeter;
                $post_data['detail_is_default'] .= $data[$i]['is_default'] . $delimeter;
                $post_data['detail_description'] .= $data[$i]['description'] . $delimeter;
            }
        }


        /// end convert to string with delimeter


        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        /// convert to string with delimeter
        $post_data['detail_id'] = NULL;
        $post_data['detail_title'] = NULL;
        $post_data['detail_image'] = NULL;
        $post_data['detail_is_default'] = NULL;
        $post_data['detail_description'] = NULL;
        $data = $post_data['detail'];
        $data_count = count($data);

        if ($data_count > 0) {

            $delimeter = '';
            for ($i = 0; $i < $data_count; $i++) {
                $delimeter = $data_count - $i > 1 ? '~' : '';
                if (intval($data[$i]['clusterimages_id'])==0) {
                    $post_data['detail_id'] .= $data[$i]['clusterimages_id'] . $delimeter;
                    $post_data['detail_title'] .= $data[$i]['title'] . $delimeter;
                    $post_data['detail_image'] .= $data[$i]['image'] . $delimeter;
                    $post_data['detail_is_default'] .= $data[$i]['is_default'] . $delimeter;
                    $post_data['detail_description'] .= $data[$i]['description'] . $delimeter;
                }
            }
        }


        /// end convert to string with delimeter

        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function uploadAction() {
        $upload = new Zend_File_Transfer_Adapter_Http();
        $imageName = time() . '.jpg';
        $imageFolder = $this->getRequest()->getPost('image_folder');
        $upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/'.$imageFolder . $imageName, 'overwrite' => true));
        $success = false;
        $msg = '';

        try {
            $upload->receive();                                                            
            $success = true;
            $msg = 'success';
        } catch (Zend_File_Transfer_Exception $e) {
            $msg = $e->message();
            $imageName = '';
            $success = false;
        }


        $this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
        $result = array('data' => array(), 'total' => 0, 'success' => true, 'msg' => $msg, 'imageName' => $imageName);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function readdetailAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');

        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterImagesRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createdetailAction() {
        
    }

    function updatedetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterUpdateDetail($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deletedetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_mastercluster = new Erems_Models_Mastercluster();
        $result = $model_mastercluster->masterclusterDeleteDetail($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
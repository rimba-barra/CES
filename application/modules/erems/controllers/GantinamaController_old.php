<?php

class Erems_GantinamaController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_gantinama = new Erems_Models_Gantinama();
        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');

        if ($post_data['mode_read'] == 'detail') {
            $post_data['changename_id'] = $this->getRequest()->getPost('changename_id');
            $result = $model_gantinama->gantinamadetailRead($post_data);
        } else {
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['reasonchangename_id'] = $this->getRequest()->getPost('reasonchangename_id');
            $result = $model_gantinama->gantinamaRead($post_data);
        }

        
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));



        $model_gantinama = new Erems_Models_Gantinama();
        $result = $model_gantinama->gantinamaCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_gantinama = new Erems_Models_Gantinama();
        $result = $mode_gantinama->gantinamaUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_gantinama = new Erems_Models_Gantinama();
        $result = $mode_gantinama->gantinamaDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
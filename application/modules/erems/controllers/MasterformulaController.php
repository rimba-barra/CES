<?php

class Erems_MasterformulaController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $mode_read = ($this->getRequest()->getPost('mode_read') ? $this->getRequest()->getPost('mode_read') : '');
        if($mode_read == 'detail'){
            $post_data['billingrules_id'] = $this->getRequest()->getPost('billingrules_id');
            $model_masterformula = new Erems_Models_Masterformula();
            $result = $model_masterformula->masterformuladetailRead($post_data);
        }else{
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['pricetype_id'] = $this->getRequest()->getPost('pricetype_id');
        $post_data['active'] = $this->getRequest()->getPost('active');


        $model_masterformula = new Erems_Models_Masterformula();
        $result = $model_masterformula->masterformulaRead($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterformula = new Erems_Models_Masterformula();
        $result = $model_masterformula->masterformulaCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterformula = new Erems_Models_Masterformula();
        $result = $mode_masterformula->masterformulaCreate($post_data);
//        $result = $mode_masterformula->masterformulaUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterformula = new Erems_Models_Masterformula();
        $result = $mode_masterformula->masterformulaDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

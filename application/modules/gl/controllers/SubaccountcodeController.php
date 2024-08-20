<?php

class Gl_SubaccountcodeController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Gl_Models_Subaccountcode();
       
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsubid_in'] = $this->getRequest()->getPost('kelsubid_in');
        $post_data['fromkelsub'] = $this->getRequest()->getPost('fromkelsub');
        $post_data['untilkelsub'] = $this->getRequest()->getPost('untilkelsub');
        $post_data['fromcoa'] = $this->getRequest()->getPost('fromcoa');
        $post_data['untilcoa'] = $this->getRequest()->getPost('untilcoa');
        $post_data['accountgroup'] = $this->getRequest()->getPost('accountgroup');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['code1'] = $this->getRequest()->getPost('code1');
        $post_data['code2'] = $this->getRequest()->getPost('code2');
        $post_data['code3'] = $this->getRequest()->getPost('code3');
        $post_data['subdsk3'] = $this->getRequest()->getPost('subdsk3');
        $post_data['code4'] = $this->getRequest()->getPost('code4');
        $post_data['subdsk4'] = $this->getRequest()->getPost('subdsk4');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['from'] = $this->getRequest()->getPost('from');
        $post_data['until'] = $this->getRequest()->getPost('until');

        $result = $model->subaccountcodeRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodeCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodeUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodeDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function checkexistAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodecheckexist($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
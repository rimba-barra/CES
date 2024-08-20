<?php

class Cashier_CopyjournalController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');


        $post_data['statusposting'] = $this->getRequest()->getPost('statusposting');
        $post_data['fromprefix_id'] = $this->getRequest()->getPost('fromprefix_id');
        $post_data['untilprefix_id'] = $this->getRequest()->getPost('untilprefix_id');
        $post_data['fromvoucherno'] = $this->getRequest()->getPost('fromvoucherno');
        $post_data['untilvoucherno'] = $this->getRequest()->getPost('untilvoucherno');
        $post_data['voucheryear'] = $this->getRequest()->getPost('voucheryear');
        $post_data['fromvoucherdate'] = $this->getRequest()->getPost('fromvoucherdate');
        $post_data['untilvoucherdate'] = $this->getRequest()->getPost('untilvoucherdate');

        if($post_data['hideparam'] == 'forreport'){
            $model = new Gl_Models_Journal();
            $result = $model->journalRead($post_data);
        }else{
            $model = new Gl_Models_Copyjournal();
            $result = $model->CopyjournalRead($post_data); 
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Copyjournal();
        $result = $model->CopyjournalCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Copyjournal();
        $result = $model->CopyjournalUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Copyjournal();
        $result = $model->CopyjournalDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
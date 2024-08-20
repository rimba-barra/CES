<?php

class Gl_OffsetController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');
        $post_data['prefix'] = $this->getRequest()->getPost('prefix');
        $post_data['dbyear'] = $this->getRequest()->getPost('dbyear');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['is_cashflow'] = $this->getRequest()->getPost('is_cashflow');
        $post_data['is_cashier'] = $this->getRequest()->getPost('is_cashier');
        $post_data['openmonth'] = $this->getRequest()->getPost('openmonth');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');

        $model = new Gl_Models_Offset();
        $result = $model->offsetRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Offset();
        $result = $model->offsetCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Offset();
        $result = $model->offsetUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Offset();
        $result = $model->offsetDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
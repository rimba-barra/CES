<?php

class Gl_AccountvssubController extends Zend_Controller_Action {

    function readAction() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/gl/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');


        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');
        $post_data['is_post'] = $this->getRequest()->getPost('is_post');
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['fromcoa'] = $this->getRequest()->getPost('fromcoa');
        $post_data['untilcoa'] = $this->getRequest()->getPost('untilcoa');
        $post_data['voucher_date'] = $this->getRequest()->getPost('voucher_date');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['flag'] = $this->getRequest()->getPost('flag');
        $post_data['note'] = $this->getRequest()->getPost('note');
        $post_data['amountheader'] = $this->getRequest()->getPost('amountheader');
        $post_data['amountdetail'] = $this->getRequest()->getPost('amountdetail');
        $post_data['amountsubdetail'] = $this->getRequest()->getPost('amountsubdetail');

        $model = new Gl_Models_Accountvssub();
        $result = $model->AccountvssubRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Accountvssub();
        $result = $model->AccountvssubCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Accountvssub();
        $result = $model->AccountvssubUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Gl_Models_Accountvssub();
        $result = $model->AccountvssubDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
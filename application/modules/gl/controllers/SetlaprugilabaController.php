<?php

class Gl_SetlaprugilabaController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['rptformat_id'] = $this->getRequest()->getPost('rptformat_id');
        $post_data['report'] = $this->getRequest()->getPost('report');
        $post_data['report_level'] = $this->getRequest()->getPost('report_level');
        $post_data['sort'] = $this->getRequest()->getPost('sort');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['name'] = $this->getRequest()->getPost('name');
        $post_data['flag'] = $this->getRequest()->getPost('flag');
        $post_data['type'] = $this->getRequest()->getPost('type');
        $post_data['level'] = $this->getRequest()->getPost('level');
        $post_data['realisasi_bln_ini'] = $this->getRequest()->getPost('realisasi_bln_ini');
        $post_data['realisasi_sd_bln_ini'] = $this->getRequest()->getPost('realisasi_sd_bln_ini');
        $post_data['anggaran_bln_ini'] = $this->getRequest()->getPost('anggaran_bln_ini');
        $post_data['realisasi_banding'] = $this->getRequest()->getPost('realisasi_banding');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');

        $model = new Gl_Models_Setlaprugilaba();
        $result = $model->setlaprugilabaRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Setlaprugilaba();
        $result = $model->setlaprugilabaCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Setlaprugilaba();
        $result = $model->setlaprugilabaUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Setlaprugilaba();
        $result = $model->setlaprugilabaDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
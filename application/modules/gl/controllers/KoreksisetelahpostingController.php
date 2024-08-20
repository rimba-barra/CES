<?php

class Gl_KoreksisetelahpostingController extends Zend_Controller_Action {    
    function readAction() {      
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false); 
         //start default
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit'); 
        $post_data['deleted'] = $this->getRequest()->getPost('deleted'); 
        //end default          
        
        //start set your param (like as model extjs from formdata and formsearch
        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');
        $post_data['no_genetate'] = $this->getRequest()->getPost('no_genetate');        
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');        
        $post_data['voucher_date'] = $this->getRequest()->getPost('voucher_date');        
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');        
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');        
        $post_data['monthdate'] = $this->getRequest()->getPost('monthdate');        
        $post_data['sort'] = $this->getRequest()->getPost('sort');        
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');        
        $post_data['prefix'] = $this->getRequest()->getPost('prefix');        
        $post_data['debit_total'] = $this->getRequest()->getPost('debit_total');        
        $post_data['credit_total'] = $this->getRequest()->getPost('credit_total');        
        $post_data['selisih'] = $this->getRequest()->getPost('selisih');        
        $post_data['is_post'] = $this->getRequest()->getPost('is_post');        
        $post_data['is_fromkasih'] = $this->getRequest()->getPost('is_fromkasih');    
        //end set your param (like as model extjs from formdata and formsearch
            
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->dataRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function accountjournalreadAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false); 
        //start default
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit'); 
        $post_data['deleted'] = $this->getRequest()->getPost('deleted'); 
        //end default        
        
        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');        
        $post_data['journaldetail_id'] = $this->getRequest()->getPost('journaldetail_id');        
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');        
        $post_data['coa'] = $this->getRequest()->getPost('coa');        
        $post_data['name'] = $this->getRequest()->getPost('name');        
        $post_data['type'] = $this->getRequest()->getPost('type');        
        $post_data['keterangan'] = $this->getRequest()->getPost('keterangan');        
        $post_data['amount'] = $this->getRequest()->getPost('amount');        
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');        
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');        
        $post_data['sort'] = $this->getRequest()->getPost('sort');        
        $post_data['is_post'] = $this->getRequest()->getPost('is_post');        
              
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalReadAccountKoreksisetelahpostingRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        
    }
    
    function subaccountjournalreadAction(){
         $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false); 
        //start default
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit'); 
        $post_data['deleted'] = $this->getRequest()->getPost('deleted'); 
        //end default        
        
        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');        
        $post_data['journaldetail_id'] = $this->getRequest()->getPost('journaldetail_id');        
        $post_data['journalsubdetail_id'] = $this->getRequest()->getPost('journalsubdetail_id');        
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');        
        $post_data['subgl'] = $this->getRequest()->getPost('subgl');        
        $post_data['description'] = $this->getRequest()->getPost('description');        
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');        
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');        
        $post_data['code1'] = $this->getRequest()->getPost('code1');        
        $post_data['code2'] = $this->getRequest()->getPost('code2');        
        $post_data['code3'] = $this->getRequest()->getPost('code3');        
        $post_data['code4'] = $this->getRequest()->getPost('code4');        
        $post_data['code'] = $this->getRequest()->getPost('code');        
        $post_data['keterangan'] = $this->getRequest()->getPost('keterangan');        
        $post_data['amount'] = $this->getRequest()->getPost('amount');        
        $post_data['is_post'] = $this->getRequest()->getPost('is_post');        
             
              
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalReadSubAccountKoreksisetelahpostingRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function accountjournalcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalaccountjournalCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function subaccountjournalcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalsubaccountjournalCreate($post_data);
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function updateaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalaccountjournalUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function updatesubaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalsubaccountjournalUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function deleteaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalaccountjournalDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function deletesubaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Koreksisetelahposting();
        $result = $model->journalsubaccountjournalDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
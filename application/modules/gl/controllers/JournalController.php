<?php

class Gl_JournalController extends Zend_Controller_Action {

    
    
    
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
        $post_data['dbyear'] = $this->getRequest()->getPost('dbyear');        
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');        
        $post_data['prefix'] = $this->getRequest()->getPost('prefix');        
        $post_data['debit_total'] = $this->getRequest()->getPost('debit_total');        
        $post_data['credit_total'] = $this->getRequest()->getPost('credit_total');        
        $post_data['selisih'] = $this->getRequest()->getPost('selisih');        
        $post_data['is_post'] = $this->getRequest()->getPost('is_post');        
        $post_data['is_posting'] = $this->getRequest()->getPost('is_posting');        
        $post_data['is_fromkasih'] = $this->getRequest()->getPost('is_fromkasih');    
        $post_data['description'] = $this->getRequest()->getPost('description'); 
        //end set your param (like as model extjs from formdata and formsearch
            
        $model = new Gl_Models_Journal();
        $result = $model->journalRead($post_data);
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
        
        $post_data['dbyear'] = $this->getRequest()->getPost('dbyear');     
        $post_data['voucherno'] = $this->getRequest()->getPost('voucherno');
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
              
        $model = new Gl_Models_Journal();
        $result = $model->journalReadAccountJournalRead($post_data);
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
        
        $post_data['dbyear'] = $this->getRequest()->getPost('dbyear');
        $post_data['voucherno'] = $this->getRequest()->getPost('voucherno');
        $post_data['journal_id'] = $this->getRequest()->getPost('journal_id');        
        $post_data['journaldetail_id'] = $this->getRequest()->getPost('journaldetail_id');        
        $post_data['journalsubdetail_id'] = $this->getRequest()->getPost('journalsubdetail_id');        
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');        
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
             
              
        $model = new Gl_Models_Journal();
        $result = $model->journalReadSubAccountJournalRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function uploadAction() {
        
        $post_data['start'] = 0;
        $post_data['limit'] = 10000;
              
        $model = new Gl_Models_Coa();
        $result = $model->defaultRead($post_data);
        $res = $result[1];
        $coa = array();
        foreach ($res as $r) {
            $coa[$r['coa']] = array(
                'coa_id' => $r['coa_id'],
                'coa' => $r['coa'],
                'name' => $r['name'],
                'kelsub_id' => $r['kelsub_id']
            );
        }

        $modelSac = new Gl_Models_Subaccountcode();
        $modelSag = new Gl_Models_Subaccountgroup();

        $tmpName = $_FILES['file-path']['tmp_name'];
        $csvAsArray = array_map('str_getcsv', file($tmpName));
       
        $arrData =  array();
        $accData =  array();
        $subData =  array();
        foreach ($csvAsArray as $c) {
           $arr = explode(';',$c[0]);
           array_push($arrData, $arr);
        }

        array_shift($arrData);

        $i=0;
        $tmpAcc = '';
        $sumSub = 0;
        foreach ($arrData as $a) {

            $acc = array(
                'state_acc'=>'default',
                'journal_id_acc'=> 0,
                'journaldetail_id_acc'=> $i,
                'coa_id_acc'=> $coa[$a[0]]['coa_id'],
                'coa_acc'=> $a[0],               
                'name_acc'=> $coa[$a[0]]['name'],
                'type_acc'=> $a[2],
                'kelsub_id_acc'=> $coa[$a[0]]['kelsub_id'],
                'kelsub_acc'=> $a[4],
                'amount_acc'=> $a[3],
                'keterangan_acc'=> $a[1]
            ); 

            if($tmpAcc !== $a[0]){
                array_push($accData, $acc);
                $sumSub = 0;
                $i++;
            }

            //SUB
            $sub = array(
                'hideparam'=> "default",
                'deleted'=> false,
                'subgl_id_sub' => 0,
                'amount_sub'=> $a[7],
                'code_sub'=> 0,
                'code1_sub'=> 0,
                'code2_sub'=> 0,
                'code3_sub'=> 0,
                'code4_sub'=> 0,
                'kelsub_sub'=> '',
                'keterangan_sub'=> $a[6],
                'journal_id_sub'=> 0,
                'journaldetail_id_sub'=> $i-1,
                'journalsubdetail_id_sub'=> 0
            );

            if($a[4] !== ""){

                $param['subgl_codes'] = preg_replace('/\s+/', '', $a[5]);
                $param['kelsub_id'] = $coa[$a[0]]['kelsub_id'];
                $result = $modelSac->getSubglbycode($param);

                $sub['subgl_id_sub'] = $result[1][0]['subgl_id'];
                $sub['code_sub'] = $result[1][0]['code'];
                $sub['code1_sub'] = $result[1][0]['code1'];
                $sub['code2_sub'] = $result[1][0]['code2'];
                $sub['code3_sub'] = $result[1][0]['code3'];
                $sub['code4_sub'] = $result[1][0]['code4'];
                $sub['kelsub_sub'] = $result[1][0]['description'];

                $sumSub = $sumSub + $a[7];
                $accData[$i-1]['amount_acc'] = $sumSub;
                array_push($subData, $sub);
            }
            


            $tmpAcc = $a[0];
            
        }

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array($accData, $subData), 'total' => 0, 'success' => true);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function accountjournalcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalaccountjournalCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function subaccountjournalcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalsubaccountjournalCreate($post_data);
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function updateaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalaccountjournalUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function updatesubaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalsubaccountjournalUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function deleteaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalaccountjournalDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function deletesubaccountjournalAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Journal();
        $result = $model->journalsubaccountjournalDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
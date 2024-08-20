<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_KasbondeptController extends Zend_Controller_Action {

    function init() {
        $this->session             = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_generaldata        = new Cashier_Helpers_Defaultdata();
        $this->_modeldata          = new Cashier_Models_Kasbondept();
        $this->_modeldatadetail    = new Cashier_Models_Kasbondeptdetail();
        $this->_modeldatasubdetail = new Cashier_Models_Kasbondeptsubdetail();
    }

    function readAction() {
        $ses              = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/Kasbondeptier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page']             = $this->getRequest()->getPost('page');
        $post_data['start']            = $this->getRequest()->getPost('start');
        $post_data['limit']            = $this->getRequest()->getPost('limit');
        $post_data['kasbondept_id']    = $this->getRequest()->getPost('kasbondept_id');
        $post_data['voucherprefix_id'] = $this->getRequest()->getPost('voucherprefix_id');
        $post_data['kasbon_id']        = $this->getRequest()->getPost('kasbon_id');
        $post_data['kasbondept_id']    = $this->getRequest()->getPost('kasbondept_id');
        $post_data['kasbank_id']       = $this->getRequest()->getPost('kasbank_id');
        $post_data['project_id']       = $this->getRequest()->getPost('project_id');
        $post_data['projectcode']      = $this->getRequest()->getPost('projectcode');
        $post_data['projectname']      = $this->getRequest()->getPost('projectname');
        $post_data['pt_id']            = $this->getRequest()->getPost('pt_id');
        $post_data['ptcode']           = $this->getRequest()->getPost('ptcode');
        $post_data['ptname']           = $this->getRequest()->getPost('ptname');
        $post_data['projectpt_id']     = $this->getRequest()->getPost('projectpt_id');
        $post_data['department_id']    = $this->getRequest()->getPost('department_id');
        $post_data['department']       = $this->getRequest()->getPost('department');
        $post_data['coa_id']           = $this->getRequest()->getPost('coa_id');
        $post_data['coaname']          = $this->getRequest()->getPost('coaname');
        $post_data['coa']              = $this->getRequest()->getPost('coa');
        $post_data['prefix_id']        = $this->getRequest()->getPost('prefix_id');
        $post_data['prefix']           = $this->getRequest()->getPost('prefix');
        $post_data['hideparam']        = $this->getRequest()->getPost('hideparam');

        $post_data['approveby_id']             = $this->getRequest()->getPost('approveby_id');
        $post_data['approvename']              = $this->getRequest()->getPost('approvename');
        $post_data['module_id']                = $this->getRequest()->getPost('module_id');
        $post_data['fromdate']                 = $this->getRequest()->getPost('fromdate');
        $post_data['untildate']                = $this->getRequest()->getPost('untildate');
        $post_data['voucher_date']             = $this->getRequest()->getPost('voucher_date');
        $post_data['chequegiro_date']          = $this->getRequest()->getPost('chequegiro_date');
        $post_data['chequegiro_handover_date'] = $this->getRequest()->getPost('chequegiro_handover_date');
        $post_data['cashier_voucher_date']     = $this->getRequest()->getPost('cashier_voucher_date');
        $post_data['trans_yearmonth']          = $this->getRequest()->getPost('trans_yearmonth');
        $post_data['voucher_no']               = $this->getRequest()->getPost('voucher_no');
        $post_data['kasbon_voucher_no']        = $this->getRequest()->getPost('kasbon_voucher_no');
        $post_data['voucher_voucher_no']       = $this->getRequest()->getPost('voucher_voucher_no');
        $post_data['kasbank_voucher_no']       = $this->getRequest()->getPost('kasbank_voucher_no');
        $post_data['chequegiro_no']            = $this->getRequest()->getPost('chequegiro_no');
        $post_data['kasbank']                  = $this->getRequest()->getPost('kasbank');
        $post_data['dataflow']                 = $this->getRequest()->getPost('dataflow');
        $post_data['status']                   = $this->getRequest()->getPost('status');
        $post_data['cashier_note']             = $this->getRequest()->getPost('cashier_note');
        $post_data['description']              = $this->getRequest()->getPost('description');
        $post_data['amount']                   = $this->getRequest()->getPost('amount');
        $post_data['active']                   = $this->getRequest()->getPost('active');
        $post_data['due_date']                 = $this->getRequest()->getPost('due_date');
        $post_data['deparment_id']             = $this->getRequest()->getPost('deparment_id');
        $post_data['ckasbondept_id']           = $this->getRequest()->getPost('ckasbondept_id');
        $post_data['employee_id']              = $this->getRequest()->getPost('employee_id');
        $post_data['made_by_name']             = $this->getRequest()->getPost('made_by_name');
        $post_data['user_id']                  = $this->getRequest()->getPost('user_id');
        $post_data['query']                    = $this->getRequest()->getPost('query');
        $post_data['purchaseletter_reward_id'] = $this->getRequest()->getPost('purchaseletter_reward_id');
        $post_data['globalparam']              = $this->getRequest()->getPost('globalparam');
        $post_data['name']                     = $this->getRequest()->getPost('name');
        $post_data['value']                    = $this->getRequest()->getPost('value');
        $post_data['is_not_tkb']               = $this->getRequest()->getPost('is_not_tkb');


        
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data      = Zend_Json::decode($data['data']);
            $post_data = array_merge($post_data, $data);
        }


        $result                 = $this->_modeldata->KasbondeptRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name']      = $this->session->getCurrentPtName();
        $result['userprint']    = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function printAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldata->Printdata($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        if ( isset($post_data['description']) ) {
            $post_data['description'] = str_replace('Â€“', '-', $post_data['description']);
            $post_data['description'] = str_replace('Â€', '-', $post_data['description']);
            $post_data['description'] = str_replace('Â¾Â€', '-', $post_data['description']);
        }

        if($post_data['hideparam']=='uploadattachment'){
            $tmpName   = $_FILES['file-path-attachment']['tmp_name'];
            $filesPath = $_FILES['file-path-attachment'];
              //$post_data['fileraw'] = file($tmpName);
            $post_data['filespath'] = $filesPath;
        }

        $result = $this->_modeldata->KasbondeptCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldata->KasbondeptUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldata->KasbondeptDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                           = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page']                = $this->getRequest()->getPost('page');
        $post_data['start']               = $this->getRequest()->getPost('start');
        $post_data['limit']               = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id']       = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id']              = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id']           = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub']              = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc']          = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id']       = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata']           = $this->getRequest()->getPost('indexdata');
        $post_data['coa']                 = $this->getRequest()->getPost('coa');
        $post_data['dataflow']            = $this->getRequest()->getPost('dataflow');
        $post_data['remarks']             = $this->getRequest()->getPost('remarks');
        $post_data['amount']              = $this->getRequest()->getPost('amount');
        $post_data['hideparam']           = $this->getRequest()->getPost('hideparam');
        $post_data['active']              = $this->getRequest()->getPost('active');
        $result                           = $this->_modeldatadetail->KasbondeptdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        if ( isset($post_data['description']) ) {
            $post_data['description'] = str_replace('Â€“', '-', $post_data['description']);
            $post_data['description'] = str_replace('Â€', '-', $post_data['description']);
            $post_data['description'] = str_replace('Â¾Â€', '-', $post_data['description']);
        }
        $result = $this->_modeldatadetail->KasbondeptdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldatadetail->KasbondeptdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldatadetail->KasbondeptdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                              = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page']                   = $this->getRequest()->getPost('page');
        $post_data['start']                  = $this->getRequest()->getPost('start');
        $post_data['limit']                  = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptsubdetail_id'] = $this->getRequest()->getPost('kasbondeptsubdetail_id');
        $post_data['kasbondeptdetail_id']    = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id']          = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id']                 = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id']              = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub']                 = $this->getRequest()->getPost('kelsub');
        $post_data['subgl_id']               = $this->getRequest()->getPost('subgl_id');
        $post_data['subgl']                  = $this->getRequest()->getPost('subgl');
        $post_data['indexdata']              = $this->getRequest()->getPost('indexdata');
        $post_data['coa']                    = $this->getRequest()->getPost('coa');
        $post_data['dataflow']               = $this->getRequest()->getPost('dataflow');
        $post_data['remarks']                = $this->getRequest()->getPost('remarks');
        $post_data['amount']                 = $this->getRequest()->getPost('amount');
        $post_data['hideparam']              = $this->getRequest()->getPost('hideparam');
        $post_data['active']                 = $this->getRequest()->getPost('active');
        $result                              = $this->_modeldatasubdetail->KasbondeptsubdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        if ( isset($post_data['description']) ) {
            $post_data['description'] = str_replace('Â€“', '-', $post_data['description']);
            $post_data['description'] = str_replace('Â€', '-', $post_data['description']);
            $post_data['description'] = str_replace('Â¾Â€', '-', $post_data['description']);
        }
        $result = $this->_modeldatasubdetail->KasbondeptsubdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldatasubdetail->KasbondeptsubdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result    = $this->_modeldatasubdetail->KasbondeptsubdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function decvdeptreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                           = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page']                = $this->getRequest()->getPost('page');
        $post_data['start']               = $this->getRequest()->getPost('start');
        $post_data['limit']               = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id']       = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id']              = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id']           = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub']              = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc']          = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id']       = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata']           = $this->getRequest()->getPost('indexdata');
        $post_data['coa']                 = $this->getRequest()->getPost('coa');
        $post_data['dataflow']            = $this->getRequest()->getPost('dataflow');
        $post_data['remarks']             = $this->getRequest()->getPost('remarks');
        $post_data['amount']              = $this->getRequest()->getPost('amount');
        $post_data['hideparam']           = $this->getRequest()->getPost('hideparam');
        $post_data['active']              = $this->getRequest()->getPost('active');
        $result                           = $this->_modeldatadetail->KasbondeptdecvdeptRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaillogreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                           = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page']                = $this->getRequest()->getPost('page');
        $post_data['start']               = $this->getRequest()->getPost('start');
        $post_data['limit']               = $this->getRequest()->getPost('limit');
        $post_data['kasbondeptdetail_id'] = $this->getRequest()->getPost('kasbondeptdetail_id');
        $post_data['kasbondept_id']       = $this->getRequest()->getPost('kasbondept_id');
        $post_data['coa_id']              = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id']           = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub']              = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc']          = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id']       = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata']           = $this->getRequest()->getPost('indexdata');
        $post_data['coa']                 = $this->getRequest()->getPost('coa');
        $post_data['dataflow']            = $this->getRequest()->getPost('dataflow');
        $post_data['remarks']             = $this->getRequest()->getPost('remarks');
        $post_data['amount']              = $this->getRequest()->getPost('amount');
        $post_data['hideparam']           = $this->getRequest()->getPost('hideparam');
        $post_data['active']              = $this->getRequest()->getPost('active');
        $result                           = $this->_modeldatadetail->KasbondeptdetaillogRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_CommonController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses              = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model  = new Cashier_Models_Common();

        $post_data['mode_read']          = $this->getRequest()->getPost('mode_read');
        $post_data['page']               = $this->getRequest()->getPost('page');
        $post_data['start']              = $this->getRequest()->getPost('start');
        $post_data['limit']              = $this->getRequest()->getPost('limit');
        $post_data['projectpt_id']       = $this->getRequest()->getPost('projectpt_id');
        $post_data['project_id']         = $this->getRequest()->getPost('project_id');
        $post_data['projectname']        = $this->getRequest()->getPost('projectname');
        $post_data['pt_id']              = $this->getRequest()->getPost('pt_id');
        $post_data['ptname']             = $this->getRequest()->getPost('ptname');
        $post_data['projectpt_id']       = $this->getRequest()->getPost('projectpt_id');
        $post_data['department_id']      = $this->getRequest()->getPost('department_id');
        $post_data['kelsub_id']          = $this->getRequest()->getPost('kelsub_id');
        $post_data['dbname']             = $this->getRequest()->getPost('dbname');
        $post_data['apps_basename']      = $this->getRequest()->getPost('apps_basename');
        $post_data['hideparam']          = $this->getRequest()->getPost('hideparam');
        $post_data['frompt']             = $this->getRequest()->getPost('frompt');
        $post_data['untilpt']            = $this->getRequest()->getPost('untilpt');
        $post_data['fromdate']           = $this->getRequest()->getPost('fromdate');
        $post_data['untildate']          = $this->getRequest()->getPost('untildate');
        $post_data['fromcompany']        = $this->getRequest()->getPost('fromprojectpt');
        $post_data['untilcompany']       = $this->getRequest()->getPost('untilprojectpt');
        $post_data['pt_pt_id']           = $this->getRequest()->getPost('pt_pt_id');
        $post_data['fromdate']           = $this->getRequest()->getPost('fromdate');
        $post_data['untildate']          = $this->getRequest()->getPost('untildate');
        $post_data['dataflow']           = $this->getRequest()->getPost('dataflow');
        $post_data['kasbank']            = $this->getRequest()->getPost('kasbank');
        $post_data['pt_id_owner']        = $this->getRequest()->getPost('pt_id_owner');
        $post_data['user_id']            = $this->getRequest()->getPost('user_id');
        $post_data['user_user_id']       = $this->getRequest()->getPost('user_user_id');
        $post_data['project_project_id'] = $this->getRequest()->getPost('project_project_id');
        $post_data['voucher_id']         = $this->getRequest()->getPost('voucher_id');
        $post_data['from_project_id']    = $this->getRequest()->getPost('from_project_id');
        $post_data['until_project_id']   = $this->getRequest()->getPost('until_project_id');
        $post_data['from_pt_id']         = $this->getRequest()->getPost('from_pt_id');
        $post_data['until_pt_id']        = $this->getRequest()->getPost('until_pt_id');
        $post_data['coa_id']             = $this->getRequest()->getPost('coa_id');
        $post_data['iddata']             = $this->getRequest()->getPost('iddata');
        $post_data['setupcashflow_id']   = $this->getRequest()->getPost('setupcashflow_id');
        $post_data['tipepajakdetail_id'] = $this->getRequest()->getPost('tipepajakdetail_id');
        $post_data['initamount']         = $this->getRequest()->getPost('initamount');
                  //livesearch
        $post_data['term']        = $this->getRequest()->getPost('term');
        $post_data['query']       = $this->getRequest()->getPost('query');
        $post_data['iscashier']   = $this->getRequest()->getPost('is_cashier');
        $post_data['isactive']    = $this->getRequest()->getPost('is_active');
        $post_data['banktype_id'] = $this->getRequest()->getPost('banktype_id');

                  //attachment
        $post_data['path'] = $this->getRequest()->getPost('path');

         $post_data['fromprefix_id']     = $this->getRequest()->getPost('fromprefix_id');
         $post_data['untilprefix_id']    = $this->getRequest()->getPost('untilprefix_id');
         $post_data['fromvoucher_date']  = $this->getRequest()->getPost('fromvoucher_date');
         $post_data['untilvoucher_date'] = $this->getRequest()->getPost('untilvoucher_date');

        $post_data['type_vendor'] = $this->getRequest()->getPost('type_vendor');

        $post_data['coas'] = $this->getRequest()->getPost('coas');

        $post_data['purchaseletter_reward_id'] = $this->getRequest()->getPost('purchaseletter_reward_id');
        
        if ($post_data['mode_read'] == 'combobox') {
            $result = $this->getDropdownRead($post_data);
        }else{
            $result = $model->dataRead($post_data);
        }

        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name']      = $this->session->getCurrentPtName();
        $result['userprint']    = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_Common();
        $result    = $model->dataCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_Common();
        $result    = $model->dataUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_Common();
        $result    = $model->dataDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function getDropdownRead($post_data){
        $model  = new Cashier_Models_Common();
        $result = $model->dataDropdownRead($post_data);
        return $result;
    }

}

?>
<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_MergesubcoaController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_generaldata = new Cashier_Helpers_Defaultdata();
       // $this->_modeldata = new Cashier_Models_Mergesubcoa();
        $this->_modeldatadetail = new Cashier_Models_Mergesubcoadetail();
        $this->_modeldatasubdetail = new Cashier_Models_Mergesubcoasubdetail();
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/Mergesubcoaier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['projectcode'] = $this->getRequest()->getPost('projectcode');
        $post_data['projectname'] = $this->getRequest()->getPost('projectname');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['ptcode'] = $this->getRequest()->getPost('ptcode');
        $post_data['ptname'] = $this->getRequest()->getPost('ptname');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['module_id'] = $this->getRequest()->getPost('module_id');
        $post_data['description'] = $this->getRequest()->getPost('description');
      
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data = Zend_Json::decode($data['data']);
            $post_data = array_merge($post_data, $data);
        }


        $result = $this->_modeldata->MergesubcoaRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name'] = $this->session->getCurrentPtName();
        $result['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

   

  /*  function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $result = $this->_modeldata->MergesubcoaCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    } */

  

    function detailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc'] = $this->getRequest()->getPost('kelsubdesc');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $this->_modeldatadetail->MergesubcoadetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatadetail->MergesubcoadetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatadetail->MergesubcoadetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['subgl'] = $this->getRequest()->getPost('subgl');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $post_data['subgl_code'] = $this->getRequest()->getPost('subgl_code');
        $post_data['subgl_code_clean'] = $this->getRequest()->getPost('subgl_code_clean');
        $post_data['subgl_desc'] = $this->getRequest()->getPost('subgl_desc');
        $post_data['subgroup_name'] = $this->getRequest()->getPost('subgroup_name');
        $post_data['selected_subgl_id'] = $this->getRequest()->getPost('selected_subgl_id');
        $result = $this->_modeldatasubdetail->MergesubcoasubdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldatasubdetail->MergesubcoasubdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

   

   

}

?>
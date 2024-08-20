<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_WorkgroupemployeeController extends Zend_Controller_Action {

    private $_session;
    private $_modeldata;
    private $_content_type;
    private $_defaultreturn;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_modeldata = new Hrd_Models_Workgroupemployee();
        $this->_defaultreturn = array('data' => array(), 'total' => 0, 'success' => false);
        $this->_content_type = 'application/json';
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['workgroup_id'] = $this->getRequest()->getPost('workgroup_id');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');

        $result = $this->_modeldata->Read($post_data);
        $result['project_name'] = $this->_session->getCurrentProjectName();
        $result['pt_name'] = $this->_session->getCurrentPtName();
        $result['userprint'] = $this->_session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function readdetailAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['workgroup_id'] = $this->getRequest()->getPost('workgroup_id');
        $result = $this->_modeldata->Readdetail($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function readdetailshiftAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['workgroup_id'] = $this->getRequest()->getPost('workgroup_id');
        $result = $this->_modeldata->Readdetailshift($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Create($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createdetailAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Createdetail($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createdetailshiftAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Createdetailshift($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Update($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updatedetailAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Updatedetail($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updatedetailshiftAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Updatedetailshift($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);

        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Delete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deletedetailAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Deletedetail($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deletedetailshiftAction() {
        $this->getResponse()->setHeader('Content-Type', $this->_content_type);
        $result = $this->_defaultreturn;
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $result = $this->_modeldata->Deletedetailshift($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_VendorController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Vendor();
            $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
            $post_data['page'] = $this->getRequest()->getPost('page');
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['project_id'] = $this->getRequest()->getPost('project_id');
            $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
            $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

            $post_data['vendor_id'] = $this->getRequest()->getPost('vendor_id');
            $post_data['code'] = $this->getRequest()->getPost('code');
            $post_data['vendorcode'] = $this->getRequest()->getPost('vendorcode');
            $post_data['vendorname'] = $this->getRequest()->getPost('vendorname');
            $post_data['npwp'] = $this->getRequest()->getPost('npwp');
            $post_data['address'] = $this->getRequest()->getPost('address');
            $post_data['jenisusaha_id'] = $this->getRequest()->getPost('jenisusaha_id');
            $post_data['flag_id'] = $this->getRequest()->getPost('flag_id');
            $post_data['active'] = $this->getRequest()->getPost('active');
            $post_data['office_phone'] = $this->getRequest()->getPost('office_phone');
            $post_data['mobile_phone'] = $this->getRequest()->getPost('mobile_phone');
            $post_data['fax'] = $this->getRequest()->getPost('fax');
            $post_data['contactperson'] = $this->getRequest()->getPost('contactperson');
            $post_data['npwp_name'] = $this->getRequest()->getPost('npwp_name');
            $post_data['npwp_address'] = $this->getRequest()->getPost('npwp_address');
            $post_data['type_pph'] = $this->getRequest()->getPost('type_pph');
            $post_data['kelas_kontraktor'] = $this->getRequest()->getPost('kelas_kontraktor');
            $post_data['pph_final'] = $this->getRequest()->getPost('pph_final');
            $post_data['no_pph'] = $this->getRequest()->getPost('no_pph');
            $post_data['prefix'] = $this->getRequest()->getPost('prefix');
            $post_data['type_pph'] = $this->getRequest()->getPost('type_pph');
            $post_data['kelas_kontraktor'] = $this->getRequest()->getPost('kelas_kontraktor');
            $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
            
 

         
            $result = $model->VendorRead($post_data);
            $result['project_name'] = $this->session->getCurrentProjectName();
            $result['pt_name'] = $this->session->getCurrentPtName();
            $result['userprint'] = $this->session->getUserFullName();
      
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendorbankreadAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Vendorbank();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['vendor_id'] = $this->getRequest()->getPost('vendor_id');

        $result = $model->VendorbankRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendornotereadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Vendornote();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');

        $post_data['vendornote_id'] = $this->getRequest()->getPost('vendornote_id');
        $post_data['vendor_id'] = $this->getRequest()->getPost('vendor_id');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['note'] = $this->getRequest()->getPost('note');
        $result = $model->VendornoteRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendoremailreadAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_Vendoremail();

        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['vendor_id'] = $this->getRequest()->getPost('vendor_id');

        $result = $model->VendoremailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Cashier_Models_Vendor();
        $result = $model->VendorCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendornotecreateAction() {
        
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendornote();
        if (isset($post_data[0])) {
            foreach ($post_data as $pd) {    
                $result = $model->VendornoteCreate($pd);
            }
        } else { 
            $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
            $result = $model->VendornoteCreate($post_data);
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendorbankcreateAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendorbank();
        if (isset($post_data[0])) {
            foreach ($post_data as $pd) {    
                $result = $model->VendorbankCreate($pd);
            }
        } else { 
            $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
            $result = $model->VendorbankCreate($post_data);
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendoremailcreateAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendoremail();
        if (isset($post_data[0])) {
            foreach ($post_data as $pd) {    
                $result = $model->VendoremailCreate($pd);
            }
        } else { 
            $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
            $result = $model->VendoremailCreate($post_data);
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendor();
        $result = $model->VendorUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendornoteupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendornote();
        $result = $model->VendornoteUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendorbankupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $model = new Cashier_Models_Vendorbank();
        $result = $model->VendorbankUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendoremailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $model = new Cashier_Models_Vendoremail();
        $result = $model->VendoremailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendor();
        $result = $model->VendorDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendornotedeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendornote();
        $result = $model->VendornoteDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendorbankdeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendorbank();
        $result = $model->VendorbankDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function vendoremaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_Vendoremail();
        $result = $model->VendoremailDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
<?php

//require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_EremsstockController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $model_pengalihanhak = new Erems_Models_Pengalihanhak();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['page'] = $this->getRequest()->getPost('page');

        $post_data['changeownership_id'] = $this->getRequest()->getPost('changeownership_id');
        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');

        $post_data['block_id'] = $this->getRequest()->getPost('block_id');
        // $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
        // $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
        $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
        $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');

        $post_data['changeownershipreason_id'] = $this->getRequest()->getPost('changeownershipreason_id');

        $post_data['changeownership_startdate'] = $this->getRequest()->getPost('changeownership_startdate');
        $post_data['changeownership_enddate'] = $this->getRequest()->getPost('changeownership_enddate');

        $post_data['description'] = $this->getRequest()->getPost('description');


        $post_data['popup_type'] = $this->getRequest()->getPost('popup_type');
            
        if($post_data['popup_type'] == 'excelpengalihanhak'){
            $result = $this->exportdata($post_data);
        } else if($post_data['popup_type'] == 'change_reason'){
            $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
            $result = $generalConfig->getBiayaPengalihanHakSby($this->getRequest()->getPost('param_person_id'));
        } else if($post_data['popup_type'] == 'access_bph_sby'){
            $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
            $result = $generalConfig->getAccessBiayaPengalihanHakSby($this->getRequest()->getPost('param_person_id'));
        } else {
            $result = $model_pengalihanhak->pengalihanhakRead($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_pengalihanhak = new Erems_Models_Pengalihanhak();
        $result = $model_pengalihanhak->pengalihanhakCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_pengalihanhak = new Erems_Models_Pengalihanhak();
        $result = $mode_pengalihanhak->pengalihanhakUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_pengalihanhak = new Erems_Models_Pengalihanhak();
        $result = $mode_pengalihanhak->pengalihanhakDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    function indexAction() {
//        $this->getResponse()->setHeader('Content-Type', 'application/json');
        
        $model_eremsstock = new Erems_Models_Eremsstock();

        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
        
        $result['block'] = $model_eremsstock->eremsstockIndexBlock($post_data);
        $result['nomor'] = $model_eremsstock->eremsstockIndexNomor($post_data);
        $result['detail'] = $model_eremsstock->eremsstockIndex($post_data);
        
//        $this->view->data['block'] = $model_eremsstock->eremsstockIndexBlock($post_data);
        
//        var_dump($result);        exit();
        
        $this->view->assign('data', $result);
    }
    
    function detailAction() {
        
        $model_eremsstock = new Erems_Models_Eremsstock();
        $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
        $result['dtl'] = $model_eremsstock->eremsstockDetail($post_data);
        $this->view->assign('data', $result);
    }


}

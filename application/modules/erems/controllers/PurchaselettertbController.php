<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_PurchaselettertbController extends Zend_Controller_Action {

    public function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('library', 'library', 'Libraries');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $apiTiket = new Erems_Box_Library_Tiket_ApiTicket();

        $requestorCode = $this->getRequest()->getPost('requestor_code');

        if ($requestorCode == 'pl__tb') { /* request api from tirta */
            $ticketProccesor = new Erems_Box_Library_Customplcontroller();
            $ticketProccesor->setRequest($this->getRequest());
            $apiTiket->addMember($requestorCode, $ticketProccesor);
            echo $apiTiket->getMember($requestorCode)->getJson();
        } else {
            $model_purchaseletter = new Erems_Models_Purchaseletter();

            $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
            if ($post_data['mode_read'] == 'detail') {
                $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
                $result = $model_purchaseletter->purchaseletterdetailRead($post_data);
                // print_r($result);
            } else if ($post_data['mode_read'] == 'schedule') {
                $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
                // $post_data['scheduletype_id'] = $this->getRequest()->getPost('scheduletype_id');
                $result = $model_purchaseletter->purchaseletterScheduleRead($post_data);
            } else if ($post_data['mode_read'] == 'detailv2') {
                $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
                $result = $model_purchaseletter->purchaseletterdetailRead($post_data, 'sp_purchaseletterdetailv2_read');
            } else if ($post_data['mode_read'] == 'berkas') {
                $post_data['start'] = $this->getRequest()->getPost('start');
                $post_data['limit'] = $this->getRequest()->getPost('limit');
                $post_data['page'] = $this->getRequest()->getPost('page');
                $post_data['purchaseletter_no'] = $this->getRequest()->getPost('purchaseletter_no');
                $post_data['purchase_date'] = $this->getRequest()->getPost('purchase_date');
                $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
                $post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
                $post_data['collector_id'] = $this->getRequest()->getPost('collector_id');
                $post_data['salesman_id'] = $this->getRequest()->getPost('salesman_id');
                $post_data['block_id'] = $this->getRequest()->getPost('block_id');
                $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
                $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
                $post_data['cluster_code'] = $this->getRequest()->getPost('cluster_code');
                $post_data['berkas_group'] = $this->getRequest()->getPost('berkas_group');
                $result = $model_purchaseletter->purchaseletterberkasRead($post_data);
            } else {

                $request = $this->getRequest()->getPost();

                $paramRequest = array('start', 'limit', 'cluster_id', 'type_id', 'pt_id', 'productcategory_id',
                    'block_id', 'purpose_id', 'unit_number');
                $fixParam = array();
                for ($i = 0; $i < count($paramRequest); $i++) {
                    $fixParam[$paramRequest[$i]] = key_exists($paramRequest[$i], $request) ? $request[$paramRequest[$i]] : '';
                }

                $result = $model_purchaseletter->purchaseletterRead($fixParam);
            }


            echo Zend_Json::encode($result);

            
        }

        
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_purchaseletter = new Erems_Models_Purchaseletter();
        $result = $model_purchaseletter->purchaseletterCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_purchaseletter = new Erems_Models_Purchaseletter();
        $result = $mode_purchaseletter->purchaseletterUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_purchaseletter = new Erems_Models_Purchaseletter();
        $result = $mode_purchaseletter->purchaseletterDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
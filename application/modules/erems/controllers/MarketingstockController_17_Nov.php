<?php

class Erems_MarketingstockController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $mode_read = $this->getRequest()->getPost('mode_read');
        $model_marketingstock = new Erems_Models_Marketingstock();

        if ($mode_read == 'price') {
            $post_data['marketstock_id'] = $this->getRequest()->getPost('marketstock_id');
            $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
            $result = $model_marketingstock->marketingstockReadPrice($post_data);
        } else if ($mode_read == 'unit_detail') {
            $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
            $result = $model_marketingstock->marketingstockReadUnitDetail($post_data);
        
        } else {
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
            $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
            $post_data['productcategory_id'] = $this->getRequest()->getPost('productcategory_id');
            $post_data['type_id'] = $this->getRequest()->getPost('type_id');
            $post_data['block_id'] = $this->getRequest()->getPost('block_id');
            $post_data['position_id'] = $this->getRequest()->getPost('position_id');
            $post_data['side_id'] = $this->getRequest()->getPost('side_id');
            $post_data['purpose_id'] = $this->getRequest()->getPost('purpose_id');
            $post_data['state_admistrative'] = $this->getRequest()->getPost('state_admistrative');
            $post_data['progress_min'] = $this->getRequest()->getPost('bot_progress');
            $post_data['progress_max'] = $this->getRequest()->getPost('top_progress');
            $result = $model_marketingstock->marketingstockRead($post_data);
        }





        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_marketingstock = new Erems_Models_Marketingstock();
        $result = $model_marketingstock->marketingstockCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_marketingstock = new Erems_Models_Marketingstock();
        $result = $mode_marketingstock->marketingstockUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_marketingstock = new Erems_Models_Marketingstock();
        $result = $mode_marketingstock->marketingstockDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
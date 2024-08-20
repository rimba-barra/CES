<?php

class Cashier_RevenuesharingController extends Zend_Controller_Action
{

    function init()
    {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction()
    {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Cashier_Models_Revenuesharing();
        if ($this->getRequest()->getPost('mode') == 'detail') {
            $post_data['komisi_perhitungan_id'] = $this->getRequest()->getPost('komisi_perhitungan_id');
            $result                             = $model->revenuesharingdetailRead($post_data);
        } else if ($this->getRequest()->getPost('mode') == 'purchaseletter_detail') {
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result                         = $model->revenuesharingpurchaseletterdetailRead($post_data);
        } else if ($this->getRequest()->getPost('mode') == 'lookup') {
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result                         = $model->revenuesharinglookupRead($post_data);
        } else if ($this->getRequest()->getPost('mode') == 'selecteddetail') {
            $post_data['unit_id']           = $this->getRequest()->getPost('unit_id');
            $post_data['rangebagihasil_id'] = $this->getRequest()->getPost('rangebagihasil_id');
            $result                         = $model->revenuesharingselecteddetailRead($post_data);
        } else {
            $result = $model->revenuesharingRead($this->getRequest()->getPost());
        }
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction()
    {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $mode_type = $this->getRequest()->getPost('mode_type');

        $model = new Cashier_Models_Revenuesharing();
        if ($mode_type == 'legalitas') {
            $result = $model->revenuesharingUpdateLegalitas($post_data);
        } else {
            $result = $model->revenuesharingUpdate($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction()
    {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model  = new Cashier_Models_Revenuesharing();
        $result = $model->revenuesharingDelete($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

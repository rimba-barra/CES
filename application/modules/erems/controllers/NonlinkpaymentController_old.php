<?php 


class Erems_NonlinkpaymentController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['payment_date'] = $this->getRequest()->getPost('payment_date');$model_nonlinkpayment = new Erems_Models_Nonlinkpayment();
        $result = $model_nonlinkpayment->nonlinkpaymentRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_nonlinkpayment = new Erems_Models_Nonlinkpayment();
        $result = $model_nonlinkpayment->nonlinkpaymentCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_nonlinkpayment = new Erems_Models_Nonlinkpayment();
        $result = $mode_nonlinkpayment->nonlinkpaymentUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_nonlinkpayment = new Erems_Models_Nonlinkpayment();
        $result = $mode_nonlinkpayment->nonlinkpaymentDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
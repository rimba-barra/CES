<?php 


class Erems_PaymenttypeController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['paymenttype'] = $this->getRequest()->getPost('paymenttype');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $model_paymenttype = new Erems_Models_Paymenttype();
        $result = $model_paymenttype->paymenttypeRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model_paymenttype = new Erems_Models_Paymenttype();
        $result = $model_paymenttype->paymenttypeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $mode_paymenttype = new Erems_Models_Paymenttype();
        $result = $mode_paymenttype->paymenttypeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $mode_paymenttype = new Erems_Models_Paymenttype();
        $result = $mode_paymenttype->paymenttypeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}
?>
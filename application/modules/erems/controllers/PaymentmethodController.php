<?php 


class Erems_PaymentmethodController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['code'] = $this->getRequest()->getPost('code');$post_data['paymentmethod'] = $this->getRequest()->getPost('paymentmethod');$post_data['description'] = $this->getRequest()->getPost('description');$model_paymentmethod = new Erems_Models_Paymentmethod();
        $result = $model_paymentmethod->paymentmethodRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_paymentmethod = new Erems_Models_Paymentmethod();
        $result = $model_paymentmethod->paymentmethodCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_paymentmethod = new Erems_Models_Paymentmethod();
        $result = $mode_paymentmethod->paymentmethodUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_paymentmethod = new Erems_Models_Paymentmethod();
        $result = $mode_paymentmethod->paymentmethodDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    


}
?>
<?php 


class Erems_MasterpaymentflagController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		$post_data['paymentflag_id'] = $this->getRequest()->getPost('paymentflag_id');
		$post_data['paymentflag'] = $this->getRequest()->getPost('paymentflag');
		
		$model_masterpaymentflag = new Erems_Models_Masterpaymentflag();
        $result = $model_masterpaymentflag->masterpaymentflagRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masterpaymentflag = new Erems_Models_Masterpaymentflag();
        $result = $model_masterpaymentflag->masterpaymentflagCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterpaymentflag = new Erems_Models_Masterpaymentflag();
        $result = $mode_masterpaymentflag->masterpaymentflagUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterpaymentflag = new Erems_Models_Masterpaymentflag();
        $result = $mode_masterpaymentflag->masterpaymentflagDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/
    
   

}
        ?>
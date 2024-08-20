<?php

class Hrd_PopuphcmsController extends Zend_Controller_Action {

    function init() {
        $this->_model = new Hrd_Models_Popuphcms();
    }
    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $data = $this->getRequest()->getPost();
        if (isset($data['data'])) {
            $data = Zend_Json::decode($data['data']);
        }
        $result = $this->_model->RoutesAllActions($data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>

<?php

class Erems_Models_Oldcontroller_SourcemoneyController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = array();
        $model_sourcemoney = new Erems_Models_Sourcemoney();
        $result = $model_sourcemoney->sourcemoneyRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
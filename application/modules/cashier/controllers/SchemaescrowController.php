<?php

class Cashier_SchemaescrowController extends Zend_Controller_Action {
	
	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_schemaescrow = new Cashier_Models_Schemaescrow();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $result = $model_schemaescrow->generateschemaescrowRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function detailAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $model_schemaescrow = new Cashier_Models_Schemaescrow();

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['inisial'] = $this->getRequest()->getPost('inisial');
        $post_data['name'] = $this->getRequest()->getPost('name');
        
        $result = $model_schemaescrow->getprojectptbyuseridRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
}

?>
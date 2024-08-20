<?php 


class Erems_MastercontractorController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');$post_data['code'] = $this->getRequest()->getPost('code');$post_data['contractorname'] = $this->getRequest()->getPost('contractorname');$post_data['address'] = $this->getRequest()->getPost('address');$post_data['country_id'] = $this->getRequest()->getPost('country_id');$post_data['city_id'] = $this->getRequest()->getPost('city_id');$post_data['PIC'] = $this->getRequest()->getPost('PIC');$model_mastercontractor = new Erems_Models_Mastercontractor();
        $result = $model_mastercontractor->mastercontractorRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_mastercontractor = new Erems_Models_Mastercontractor();
        $result = $model_mastercontractor->mastercontractorCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercontractor = new Erems_Models_Mastercontractor();
        $result = $mode_mastercontractor->mastercontractorUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_mastercontractor = new Erems_Models_Mastercontractor();
        $result = $mode_mastercontractor->mastercontractorDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
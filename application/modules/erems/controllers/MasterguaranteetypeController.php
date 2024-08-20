<?php 


class Erems_MasterguaranteetypeController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['code'] = $this->getRequest()->getPost('code');
		$post_data['guaranteetype'] = $this->getRequest()->getPost('guaranteetype');
		$post_data['description'] = $this->getRequest()->getPost('description');
		$post_data['guarantee'] = $this->getRequest()->getPost('guarantee');
		$post_data['period'] = $this->getRequest()->getPost('period');
		
		$model_masterguaranteetype = new Erems_Models_Masterguaranteetype();
		
		$result = $model_masterguaranteetype->masterguaranteetypeRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$model_masterguaranteetype = new Erems_Models_Masterguaranteetype();
        $result = $model_masterguaranteetype->masterguaranteetypeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterguaranteetype = new Erems_Models_Masterguaranteetype();
        $result = $mode_masterguaranteetype->masterguaranteetypeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_masterguaranteetype = new Erems_Models_Masterguaranteetype();
        $result = $mode_masterguaranteetype->masterguaranteetypeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
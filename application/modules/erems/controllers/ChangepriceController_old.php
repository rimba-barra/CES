<?php 


class Erems_ChangepriceController extends Zend_Controller_Action {

    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        
        
        $model_changeprice = new Erems_Models_Changeprice();
        
        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
        if($post_data['mode_read']=='detail'){
            $post_data['changeprice_id'] = $this->getRequest()->getPost('changeprice_id');
            $result = $model_changeprice->changepricedetailRead($post_data);
        }else{
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $result = $model_changeprice->changepriceRead($post_data);
        }
        
        
        
        
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
       
        
        $model_changeprice = new Erems_Models_Changeprice();
        $result = $model_changeprice->changepriceCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_changeprice = new Erems_Models_Changeprice();
        $result = $mode_changeprice->changepriceUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_changeprice = new Erems_Models_Changeprice();
        $result = $mode_changeprice->changepriceDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
   

}
        ?>
<?php 


class Erems_PurchaseletterController extends Zend_Controller_Action {
    
    public function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('library', 'library', 'Libraries');
        
    }
    
    function readAction() {
 
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $apiTiket = new Erems_Libraries_Tiket_ApiTicket();
        $ticketProccesor = new Erems_Libraries_MyTicketProccesor();
        $ticketProccesor->setPostData($this->getRequest()->getPost());
        $requestorCode = 'as535__fhhvvbn';
        $apiTiket->addMember($requestorCode,$ticketProccesor);
        echo $apiTiket->getMember($requestorCode)->getJson();
        
        $this->_helper->viewRenderer->setNoRender(true);
        die();
        
        $model_purchaseletter = new Erems_Models_Purchaseletter();
        
        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
        if($post_data['mode_read']=='detail'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result = $model_purchaseletter->purchaseletterdetailRead($post_data);
            
        }else if($post_data['mode_read']=='schedule'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
           // $post_data['scheduletype_id'] = $this->getRequest()->getPost('scheduletype_id');
            $result = $model_purchaseletter->purchaseletterScheduleRead($post_data);
        }else if($post_data['mode_read']=='detailv2'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result = $model_purchaseletter->purchaseletterdetailRead($post_data,'sp_purchaseletterdetailv2_read');
        
        }else{
           
            $request = $this->getRequest()->getPost();
        
            $paramRequest = array('start','limit','cluster_id','type_id','pt_id','productcategory_id',
                    'block_id','purpose_id','unit_number');
            $fixParam = array();
            for($i=0;$i<count($paramRequest);$i++){
                $fixParam[$paramRequest[$i]] = key_exists($paramRequest[$i], $request)?$request[$paramRequest[$i]]:'';
            }
         
            $result = $model_purchaseletter->purchaseletterRead($fixParam);
        }
        
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        
        
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
      
       
$model_purchaseletter = new Erems_Models_Purchaseletter();
        $result = $model_purchaseletter->purchaseletterCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_purchaseletter = new Erems_Models_Purchaseletter();
        $result = $mode_purchaseletter->purchaseletterUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

$mode_purchaseletter = new Erems_Models_Purchaseletter();
        $result = $mode_purchaseletter->purchaseletterDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    

    
   

}
        ?>
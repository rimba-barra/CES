<?php

class Cashier_ProsespostingController extends Zend_Controller_Action {

	function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }  

    function createAction() {       
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => true);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Prosesposting();
        $result = $model->dataCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function readAction() {       
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => true);
        
        $mode_read = $this->getRequest()->getPost('mode_read');
        
        if($mode_read=='default'){
            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
            $model = new Cashier_Models_Prosesposting();
            $result = $model->getvoucherbyrangedateRead($post_data);
        }else if ($mode_read=='subdetailcheck'){
            $post_data['kasbank_id'] = $this->getRequest()->getPost('kasbank_id');
            $model = new Cashier_Models_Prosesposting();
            $result = $model->checksubdetail($post_data);
            $result2 = array();
            $result2[0][0]['ERROR'] = $result;

            if(!isset($result[0][0])){
                $result[0][0]['ERROR'] = 0;
            }
            $result = array(
                "data" => array(
                    "ERROR" => ($result[0][0]['ERROR']==0?false:true),
                ),
            );
        }else if ($mode_read=='checkcoatampungan'){
            $post_data['kasbank_id'] = $this->getRequest()->getPost('kasbank_id');
            $model = new Cashier_Models_Prosesposting();
            $result = $model->checkcoatampungan($post_data);
            
            if(!isset($result[0]['ERROR'])){
                $result[0]['ERROR'] = 0;
            }
            $result = array(
                "data" => array(
                    "ERROR" => ($result[0]['ERROR']==0?false:true),
                ),
            );
        }
        
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    function updateAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => true);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $model = new Cashier_Models_Prosesposting();
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $payment = '';
        $user = $this->session->getUserId();
        $id = '';
        if(!isset($post_data['tipeposting'])){
            $tipeposting = $post_data[0]['tipeposting'];
        }else{
            $tipeposting = $post_data['tipeposting'];
        }
        
        if($tipeposting=='Voucher'){
            for($i=0;$i<count($post_data);$i++){
                $id .= $post_data[$i]['kasbank_id'];
                if(($i+1)!=count($post_data)){
                    $id .= "~";
                }
            }
            //posting voucher
            $result = $dao->prosesPosting($user, $id, $payment);
//            //posting summary
            $result = $dao->prosesSummary($user, $id, $payment);
        }else if($tipeposting=='Journal'){
            if($post_data['projectpt_id']==0){
                $result = $model->prosesPostingJournal2($post_data);
            }else{
                $result = $model->prosesPostingJournal($post_data);
            }
        }
        
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    

}

?>
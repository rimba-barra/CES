<?php

class Cashier_SlipsetoranController extends Zend_Controller_Action {

	function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }  

    function readAction() {       
//        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $mode_read = $this->getRequest()->getPost('mode_read');
        $result = array('data' => array(), 'total' => 0, 'success' => true);
        if($mode_read=='upload'){

            $post_data['start'] = 0;
            $post_data['limit'] = 10000;
            $tmpName = $_FILES['file-path']['tmp_name'];
//            $csvAsArray = array_map(function($v){return str_getcsv($v, ",");}, file($tmpName));
//
            $arrData =  array();
            $accData =  array();
//            $subData =  array();
//            foreach ($csvAsArray as $c) {
//               $arr = explode(';',$c[0]);
//               array_push($arrData, $arr);
//            }
//
//            array_shift($arrData);
            $csvAsArray = fopen($tmpName, "r");
            while ($line = fgets($csvAsArray)) {
               $line = str_replace('"',"",$line);
               $line = str_replace("\t",";",$line);
               $arr = explode(';',$line);
               array_push($arrData, $arr);
            }
            
            fclose($csvAsArray);
            $i=0;
            $tmpAcc = '';
            $sumSub = 0;
            $vid = '';
            foreach ($arrData as $key => $a) {
                if($key!=0){
                    $acc = array(
                        'project_id'=> $a[0],
                        'pt_id'=> $a[1],
                        'uploaduniquenumber'=> $a[2],
                        'seq_detail'=> $a[7],
                        'voucher_no'=> $a[3],
                        'voucher_date'=> $a[4],
                        'prefix'=> $a[5],
                        'description'=> $a[6],
                        'coa_detail'=> $a[8],
                        'type'=> $a[9],
                        'kawasan'=> $a[10],
                        'sub_unit'=> $a[11],
                        'amount_detail'=> $a[12],
                    ); 

                    array_push($accData, $acc);
                    $tmpAcc = $a[0];
                    
                }

            }
            $result = array('data' => array($accData), 'total' => 0, 'success' => true);

        }else if($mode_read=='validation'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

            $model = new Cashier_Models_Slipsetoran();

            $result = $model->iscoaexistRead($post_data);
        }else if($mode_read=='validationprojectpt'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

            $model = new Cashier_Models_Slipsetoran();

            $result = $model->isprojectptexistRead($post_data);
        }else{

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
            $model = new Cashier_Models_Slipsetoran();
            $result = $model->juploadRead($post_data);
        }
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
                
        $model = new Cashier_Models_Slipsetoran();
        $vid = $model->getlastvidRead($post_data);
        $post_data['vid'] = $vid[0][0][''];
        $result = $model->juploadCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function validationAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $model = new Cashier_Models_Slipsetoran();
                
        $result = $model->iscoaexistRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
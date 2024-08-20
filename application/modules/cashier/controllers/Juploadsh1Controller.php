<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Cashier_Juploadsh1Controller extends Zend_Controller_Action {

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
            $i = 1;
            while ($line = fgets($csvAsArray)) {
               $line = str_replace("\t",";",$line);
               $line = str_replace("\r\n","",$line);
               $line = str_replace("\r","",$line);
               $line = str_replace("\n","",$line);
               $line = str_replace("\"","",$line);
               $line = str_replace("'","`",$line);
               $line = preg_replace('/[[:^print:]]/', ' ', $line);
               $arr = explode(';',$line);
               if ( sizeof($arr) != 15 ) {
                $result = array('data' => array('msg' => 'Format csv salah, silahkan periksa kembali pada baris '. $i .'. <br />"' . $line . '"'), 'total' => 0, 'success' => false);
                echo Zend_Json::encode($result);
                $this->_helper->viewRenderer->setNoRender(true);
                die;
               }
               array_push($arrData, $arr);
               $i++;
            }
            
            fclose($csvAsArray);
            $i=0;
            $tmpAcc = '';
            $sumSub = 0;
            $vid = '';
            $upuniqnumber = array();
            $amountDebet = 0;
            $amountCredit = 0;
            foreach ($arrData as $key => $a) {
                if($key!=0){
                    if(!isset($upuniqnumber[$a[3]])){
                        if($a[2]==""){
                            $upuniqnumber[$a[3]] = mt_rand(10000000, 99999999);
                        }else{
                            if ( strlen($a[2]) > 9 ) {
                                $result = array('data' => array('msg' => 'Maximum ID/Unique Number : 9 digits'), 'total' => 0, 'success' => false);
                                echo Zend_Json::encode($result);
                                $this->_helper->viewRenderer->setNoRender(true);
                                die;
                            }
                            $upuniqnumber[$a[3]] = $a[2];
                        }
                    }else{
                        
                    }
                    // BUAT NGECEK KALO ADA BARIS KOSONG JADI BACA PROJECT ID ATAU PT ID NYA (KALAU ERROR LEPAS DULU AJA IF NYA)
                    if ( $a[0] != '' && $a[1] != '' ) {
                        $acc = array(
                            'project_id'=> $a[0],
                            'pt_id'=> $a[1],
                            'uploaduniquenumber'=> $upuniqnumber[$a[3]],
                            'seq_detail'=> $a[7],
                            'voucher_no'=> $a[3],
                            'voucher_date'=> $a[4],
                            'prefix'=> $a[5],
                            // 'description'=> str_replace("'","`",$a[6]),
                            'description'=> preg_replace('/[[:^print:]]/', ' ', $a[6]), // remove non print character
                            'coa_detail'=> $a[8],
                            'type'=> $a[9],
                            'cashflow'=> (!isset($a[13])?"":$a[13]),
                            'kawasan'=> $a[10],
                            'sub_unit'=> $a[11],
                            'sub_description'=> str_replace("\r\n","",(!isset($a[14])?"":str_replace("'","`",$a[14]))),
                            'amount_detail'=> $a[12],
                        ); 

                        if ( $a[9] == 'D' ) {
                            $amountDebet+=$a[12];
                        }else if( $a[9] == 'C' ){
                            $amountCredit+=$a[12];
                        }

                        array_push($accData, $acc);
                    }
                    // BATAS IF NYA DISINI
                    $tmpAcc = $a[0];
                    
                }

            }
            $result = array('data' => array($accData), 'amountDebet'=>$amountDebet, 'amountCredit'=>$amountCredit, 'total' => 0, 'success' => true);

        }else if($mode_read=='validation'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

            $model = new Cashier_Models_Juploadsh1();

            $result = $model->iscoaexistRead($post_data);
            $result2 = $model->isprojectptexistRead($post_data);
            $result3 = $model->checkuploadidRead($post_data);
            $result4 = $model->checkcashflowRead($post_data);
            $result5 = $model->checksubRead($post_data);
            $result6 = $model->checkprefixRead($post_data);
            $result7 = $model->isjournalnumberexistsRead($post_data); 
            $result8 = $model->isprefixactive($post_data);
            
            $result['data']['IS_EXIST_PROJECTPT'] = $result2['data']['IS_EXIST'];
            $result['data']['IS_EXIST_UPLOADID'] = $result3['data']['voucher_no'];
            $result['data']['IS_CLOSING'] = $result3['data']['closing'];
            $result['data']['IS_EXIST_CASHFLOW'] = $result4['data']['IS_EXIST'];
            $result['data']['IS_EXIST_CASHFLOW_COA'] = $result4['data']['IS_EXIST_COA'];
            $result['data']['IS_EXIST_SUB'] = $result5['data']['IS_EXIST'];
            $result['data']['IS_EXIST_PREFIX'] = $result6['data']['IS_EXIST'];
            $result['data']['IS_CASHIER_PREFIX'] = $result6['data']['is_cashier'];
            $result['data']['IS_EXIST_JOURNAL_NO'] = $result7['data']['IS_EXIST'];
            $result['data']['IS_ACTIVE_PREFIX'] = $result8['data']['allowed'];
        }else if($mode_read=='checkbalance'){


            $model = new Cashier_Models_Juploadsh1();

            $result = $model->checkbalanceRead($this->getRequest()->getPost('uploadunique'));
            
        }else if($mode_read=='validationprojectpt'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

            $model = new Cashier_Models_Juploadsh1();
            $result = $model->isprojectptexistRead($post_data);

        }else if($mode_read=='checkjournalnotbalance'){ //Add 09/03/2022
            require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

            $session = Apli::getSession();
            $user = $session->getUser()->getId();

            $model = new Cashier_Models_Juploadsh1();
            $myParams = $this->getRequest()->getPost();
            
            if (isset($myParams['source'])) {
                $result = $model->checkjournalnotbalance($myParams['pt_id'],$myParams['project_id']);
            }else{
                $result = $model->checkjournalnotbalance($session->getPt()->getId(),$session->getProject()->getId());
            }

        }else if($mode_read == 'validationV2'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
            // echo json_encode($post_data);die;
            $res = [];
            for ( $i = 0; $i < sizeof($post_data); $i++) {
                $model = new Cashier_Models_Juploadsh1();
                $tempResult = $model->iscoaexistRead($post_data[$i]);
                $tempResult2 = $model->isprojectptexistRead($post_data[$i]);
                $tempResult3 = $model->checkuploadidRead($post_data[$i]);
                $tempResult4 = $model->checkcashflowRead($post_data[$i]);
                $tempResult5 = $model->checksubRead($post_data[$i]);
                $tempResult6 = $model->checkprefixRead($post_data[$i]);
                $tempResult7 = $model->isjournalnumberexistsRead($post_data[$i]); 
                $tempResult8 = $model->isprefixactive($post_data[$i]);
                $res[$i] = $tempResult;
                $res[$i]['data']['post_data'] = $post_data[$i];
                $res[$i]['data']['IS_EXIST_PROJECTPT'] = $tempResult2['data']['IS_EXIST'];
                $res[$i]['data']['IS_EXIST_UPLOADID'] = $tempResult3['data']['voucher_no'];
                $res[$i]['data']['IS_CLOSING'] = $tempResult3['data']['closing'];
                $res[$i]['data']['IS_EXIST_CASHFLOW'] = $tempResult4['data']['IS_EXIST'];
                $res[$i]['data']['IS_EXIST_CASHFLOW_COA'] = $tempResult4['data']['IS_EXIST_COA'];
                $res[$i]['data']['IS_EXIST_SUB'] = $tempResult5['data']['IS_EXIST'];
                $res[$i]['data']['IS_EXIST_PREFIX'] = $tempResult6['data']['IS_EXIST'];
                $res[$i]['data']['IS_CASHIER_PREFIX'] = $tempResult6['data']['is_cashier'];
                $res[$i]['data']['IS_EXIST_JOURNAL_NO'] = $tempResult7['data']['IS_EXIST'];
                $res[$i]['data']['IS_ACTIVE_PREFIX'] = $tempResult8['data']['allowed'];
            }
            $result['data'] = $res;

        }else if($mode_read=='checkjournalbeforeupload'){

            $res = [];
            $model = new Cashier_Models_Juploadsh1();
            $temp_post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
            $post_data['project_id'] = $temp_post_data[0]['project_id'];
            $post_data['pt_id'] = $temp_post_data[0]['pt_id'];
            $post_data['mode_query'] = $this->getRequest()->getPost('mode_query');
            $post_data['journal_ids'] = $this->getRequest()->getPost('journal_ids');
            $post_data['uploaduniquenumber'] = '';
            for ($i=0; $i < sizeof($temp_post_data); $i++) { 
                $post_data['uploaduniquenumber'] .= $temp_post_data[$i]['uploaduniquenumber'];
                if ( $i == (sizeof($temp_post_data)-1) ) {
                }else{
                    $post_data['uploaduniquenumber'] .= '~';
                }
            }
            $result = $model->checkJournalBeforeUpload($post_data);
            
        }else if($mode_read == 'downloadsample'){
            $project_id = $this->getRequest()->getPost('project_id');
            $pt_id = $this->getRequest()->getPost('pt_id');
            $rows = [];
            $example = APPLICATION_PATH . '/../public/contohformatimportdata/module cashier/contoh_csv_upload_journal_new.csv';
            $file_handle = fopen($example, 'r');
            while ( ($data = fgetcsv($file_handle, 1024, ";")) !== FALSE ) {
                $rows[] = $data;
            }
            fclose($file_handle);
            for ( $i = 0; $i < sizeof($rows); $i++) { 
                if ( $i > 0 ) {
                    $rows[$i][0] = trim($project_id);
                    $rows[$i][1] = trim($pt_id);
                }
            }

            $filename = "contoh_csv_upload_journal_new.csv";
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            $f = fopen($newFilePath, 'w');
            foreach ($rows as $line) {
                fputcsv($f, $line, ";");
            }
            fclose($f);

            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'.$newFilePath.'"');
            header('Cache-Control: max-age=0');
            $result['data'] = $path;
        }else{

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
            $model = new Cashier_Models_Juploadsh1();
            $result = $model->juploadRead($post_data);
        }
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $mode_create = $this->getRequest()->getPost('mode_create');

        if ( $mode_create == 'createV2' ) {
            $model = new Cashier_Models_Juploadsh1();
            for ( $i = 0; $i < sizeof($post_data); $i++) { 
                $vid = $model->getlastvidRead($post_data[$i]);
                $post_data[$i]['vid'] = $vid[0][0][''];
                $post_data[$i]['is_merge_coa'] = $this->getRequest()->getPost('is_merge_coa');
                $result = $model->juploadCreate($post_data[$i]);
            }
        }else{
            $model = new Cashier_Models_Juploadsh1();
            $vid = $model->getlastvidRead($post_data);
            $post_data['vid'] = $vid[0][0][''];
            $post_data['is_merge_coa'] = $this->getRequest()->getPost('is_merge_coa');
            $result = $model->juploadCreate($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function validationAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $model = new Cashier_Models_Juploadsh1();
                
        $result = $model->iscoaexistRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
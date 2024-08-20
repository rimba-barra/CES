<?php

class Cashier_VuploadController extends Zend_Controller_Action {

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
               $line = str_replace("'","`",$line);
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
                if($key!=0 && $a[19]>0 && $a[20]>0){
                    $acc = array(
                        'uploaduniquenumber'=> $a[0],
                        'department'=> $a[1],
                        'coa_header'=> $a[2],
                        'dataflow'=> $a[3],
                        'amount_header'=> $a[4],
                        // 'note'=> str_replace("'","`",$a[5]),
                        'note'=> preg_replace('/[[:^print:]]/', '', $a[5]), // remove non print character
                        'is_customer'=> $a[6],
                        'is_vendor'=> $a[7],
                        'vendor_name'=> $a[8],
                        'pengajuandate'=> $a[9],
                        'kwitansidate'=> $a[10],
                        'duedate'=> $a[11],
                        'receipt_no'=> $a[12],
                        'status'=> '',
                        'vid'=> $vid,
                        'seq_detail'=> $a[13],
                        'coa_detail'=> $a[14],
                        'is_posting'=> 0,
                        'amount'=> $a[15],
                        // 'description'=> str_replace("'","`",$a[16]),
                        'description'=> preg_replace('/[[:^print:]]/', '', $a[16]), // remove non print character
                        'sub_unit'=> (!isset($a[17])?"":$a[17]),
                        'kawasan'=> (!isset($a[18])?"":$a[18]),
                        'project_id'=>(!isset($a[19])?"":$a[19]),
                        'pt_id'=>(!isset($a[20])?"":$a[20]),
                        'spk'=> (!isset($a[21])?"":$a[21]),
                        'paymentdate'=> (!isset($a[22])?"":str_replace("\r\n","",$a[22])),
                    ); 

                    array_push($accData, $acc);
                    $tmpAcc = $a[0];
                    
                }

            }
            $result = array('data' => array($accData), 'total' => 0, 'success' => true);

        }else if($mode_read=='validation'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
            $isallowed = true;
            $model = new Cashier_Models_Vupload();

            $result = $model->iscoaexistRead($post_data);
            
            $result2 = $model->isprojectptexistRead($post_data);
            $result3 = $model->checkvuploadidRead($post_data);
            $result4 = $model->checksubRead($post_data);
            $result5 = $model->validasiprefixRead($post_data);
            $result6 = $model->checkvoucheridexists($post_data);
            $result7 = $model->checkdepartmentexists($post_data);

            $result['data']['IS_EXIST_PROJECTPT'] = $result2['data']['IS_EXIST'];
            $result['data']['allowedvuploadid'] = $result3['data']['allowed'];
            $result['data']['IS_EXIST_SUB'] = $result4['data']['IS_EXIST'];
            $result['data']['allowedprefix'] = $result5['data']['allowed'];
            $result['data']['IS_EXISTS_UPLOADID'] = $result6['data']['is_exists'];
            $result['data']['IS_NOT_EXISTS_DEPARTMENTID'] = $result7['data']['is_not_exists'];
            
        }else if($mode_read=='validationprojectpt'){

            $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

            $model = new Cashier_Models_Vupload();

            $result = $model->isprojectptexistRead($post_data);
        }else if($mode_read == 'downloadsample'){
            $project_id = $this->getRequest()->getPost('project_id');
            $pt_id = $this->getRequest()->getPost('pt_id');
            $rows = [];
            $example = APPLICATION_PATH . '/../public/contohformatimportdata/module cashier/contoh_csv_upload_voucher.csv';
            $file_handle = fopen($example, 'r');
            while ( ($data = fgetcsv($file_handle, 1024, ";")) !== FALSE ) {
                $rows[] = $data;
            }
            fclose($file_handle);
            
            for ( $i = 0; $i < sizeof($rows); $i++) { 
                if ( $i > 0 ) {
                    $rows[$i][19] = $project_id;
                    $rows[$i][20] = $pt_id;
                }
            }

            $filename = "contoh_csv_upload_voucher.csv";
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
            $model = new Cashier_Models_Vupload();
            $result = $model->vuploadRead($post_data);
        }
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['is_merge_coa'] = $this->getRequest()->getPost('is_merge_coa');
        
        $model = new Cashier_Models_Vupload();
        $vid = $model->getlastvidRead($post_data);
        $post_data['vid'] = $vid[0][0][''];
        $result = $model->vuploadCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function validationAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        $model = new Cashier_Models_Vupload();
                
        $result = $model->iscoaexistRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>
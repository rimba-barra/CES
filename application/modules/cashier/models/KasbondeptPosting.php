<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_KasbondeptPosting extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;
    private $_mail = null;
    private $_templatemsg = null;
    private $datamodule = null;
    private $cashadvance = null;
    private $common = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
    $this->_mail = new Cashier_Helpers_Email();
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_templatemsg = new Cashier_Helpers_Templatemail;
        $this->_user_id = $this->_session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time = date('H:i:s');

        $this->setting = new Cashier_Models_General_Setdata;
        $this->cashadvance = new Cashier_Models_Tcashadvance;
        $this->common = new Cashier_Models_Common;
        $this->generaldata = new Cashier_Models_General_Generaldata;
        $this->function = new Cashier_Models_Function_Vouchertransaction;
        $this->datamodule = $this->generaldata->moduledata('T-CBD'); //TRANCATION CASHBON DEPARTMENT
        $this->setting->_storeprocedure = 'sp_th_kasbondept_request';
    }

    function KasbondeptPostingRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                /* untuk mendapatkan id departement, approve by otomatis,harus di isi terlebih dahulu 
                  employee_id di table sec_user di dbwebsec, berikut query untuk updatenya :

                  update dbwebsec.dbo.sec_user set employee_id = (select employee_id from hrd.dbo.m_employee where employee_name like '%ahmad riadi%') where user_id = (select user_id from dbwebsec.dbo.sec_user where user_fullname like '%ahmad riadi%')
                  select * from hrd.dbo.m_employee where employee_name like '%ahmad riadi%'
                  select * from dbwebsec.dbo.sec_user where user_fullname like '%ahmad riadi%'

                 */
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $param['pt_id'] = $projectpt['pt_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                     case 'posting_only':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'getprefixposting':
                        $result = $this->setting->getPrefixPosting($param);
                        $counter = 1;
                        if (!empty($result[0][0]['RESULT'])) {
                            $data = $result[0][0]['RESULT'];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;


                    case 'getemployee':
                        $resultemployee = $this->setting->getEmployeedata();
                        $pt_id = $employee_id = $department_id = $manager_id = 0;
                        if (!empty($resultemployee)) {
                            $pt_id = $resultemployee['pt_id'];
                            $employee_id = $resultemployee['employee_id'];
                            $department_id = $resultemployee['department_id'];
                            $manager_id = $resultemployee['manager_id'];
                        }
                        $data = array();
                        $data['pt_id'] = $pt_id;
                        $data['employee_id'] = $employee_id;
                        $data['department_id'] = $department_id;
                        $data['manager_id'] = $manager_id;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                      case 'getprojectforpayment':
                        $resultproject = $this->generaldata->getGlobalparamV2($param['project_id'] ,'payment_type_cashbon');

                        $data = $resultproject;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                     case 'getprojectforprefix':
                        $resultproject = $this->generaldata->getGlobalparam($param['project_id'] ,$param['pt_id'],'prefix_cashbon');
                        $getdataprefix = $this->generaldata->getPrefixCoa($resultproject);

                        $data = $getdataprefix;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                     case 'checkcoaconfig':

                        $result = $this->setting->getPindahCoaV2($param);   
                       
                        if($result[0][0]['RESULT'] == 'GO ON'){
                            $data = null;
                            $valid = true;
                            $counter = 0;
                            $message = $result[0][0]['RESULT'];

                        }else{
                            $data = null;
                            $valid = true;
                            $counter = 0;
                            $message = $result[0][0]['RESULT'];


                          
                          }
                        
                       
                    
                        break;
                    case 'getkasbonpayment':
                        $this->setting->_paramsql = 'getkasbonpayment';
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_iddata = $param['kasbondept_id'];
                        $this->setting->_storeprocedure = 'sp_kasbondeptposting';
                        $result = $this->setting->executeSP();
                        $data = $result[0][0]['RESULT'];
                        $counter = 0;
                        $message = null;
                        $valid = true;
                        break;
                    case 'is_cgg':
                        $this->setting->_paramsql = 'is_cgg';
                        $result = $this->setting->executeSP();
                        $data = $result[0][0]['result'];
                        $counter = 0;
                        $message = null;
                        $valid = true;
                        break;
                    break;
                    case 'getsettingglobalparam': 
                        $this->setting->_paramsql   = 'getsettingglobalparam';
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $data                       = $result[3];
                        $counter                    = $result[1][0]['RECORD_TOTAL'];
                        $message                    = $result[2][0]['MSG'];
                        $valid                      = $result[0][0]['VALIDDATA'];
                        break;
                    default:
                        $resultemployee = $this->setting->getEmployeedata();
                        //print_r($resultemployee);                        
                        $employee_id = $department_id = $manager_id = 0;
                        if (!empty($resultemployee)) {
                            $employee_id = $resultemployee['employee_id'];
                            $department_id = $resultemployee['department_id'];
                            $manager_id = $resultemployee['manager_id'];
                        }
                        $data = array();
                        $data['employee_id'] = $employee_id;
                        $data['department_id'] = $department_id;
                        $data['manager_id'] = $manager_id;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                }


                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    public function sendmaildata($param) {
        $param['dataflow'] = 'O';
        $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
        $rowvoucher = $this->getdataVoucherbyid($param);
        $statusemailrequest = $rowvoucher['requestmail'];
        if (!empty($rowemployee) and $statusemailrequest == 0) {
            $rowuser = $this->generaldata->getUserdatabyid($rowvoucher['addby']);
            if ($rowuser !== null) {
                $rowuseremployee = $this->generaldata->getEmployeebyId($rowuser['employee_id']);
                if (!empty($rowuseremployee)) {
                    $nameuserrequest = $rowuseremployee['employee_name'];
                } else {
                    $nameuserrequest = 'undefined employee id';
                }

                $emailapproval = $rowemployee['email'];
                $employeename = $rowemployee['employee_name'];
                $setfrom = 'info.testerdata@gmail.com';
                $addto = $emailapproval;
                $addtoalias = $employeename;
                $subject = strtoupper($nameuserrequest) . 'TEST VOUHCER DEPARTMENT REQUEST APPROVAL';
                $message = $this->_templatemsg->htmlvoucherrequest($param);
                $this->_mail->setData()->setFrom('testerdev72@gmail.com');
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo($addto, $addtoalias);
                $this->_mail->setData()->setSubject($subject);
                if ($this->_mail->setData()->send()) {
                    //echo 'succes send mail';
                    $this->updateFlagrequestmail($param);
                } else {
                    //echo 'failed send mail';
                }
            }
        }
    }

    private function updateFlagrequestmail($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['kasbondept_id'];
        $this->setting->_param = array(
            "hideparam" => 'updateflagrequestmail',
        );
        $result = $this->setting->executeSP();
    }

    private function getdataVoucherbyid($param) {
        $pt = $param['pt_id'];
        $project = $this->_project_id;
        $kasbondept_id = $param['kasbondept_id'];
        $department_id = $param['department_id'];

        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'read',
            "start" => 0,
            "limit" => 1,
            "project_id" => $project,
            "pt_id" => $pt,
            "department_id" => $department_id,
            "kasbondept_id" => $kasbondept_id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function KasbondeptPostingCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_lastquery);
                        if ($result[1] == 1) {
                            $valid = $result[2][0]['VALIDDATA'];
                        } else {
                            $valid = $result[1][0]['VALIDDATA'];
                        }
                        if ($valid == 'false') {
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                            $idheader = 0;
                        } else {
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                            $idheader = $result[5][0]['kasbondept_id'];
                            //$this->sendmaildata($param);
                        }
                        break;
                    case 'sendrequestmail':
                        $this->sendmaildata($param);
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'sending email';
                        break;

                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'data error';
                }
                $result['idheader'] = $idheader;
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function KasbondeptPostingUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {               
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbondept_id'];
                $this->setting->_storeprocedure = 'sp_kasbondeptposting';
                switch ($this->setting->_param['hideparam']) {
                    case 'update':   
                        $this->setting->_param['hideparam']='updatefromposting';
                        $result = $this->setting->executeSP();

                        if($result[0][0]['VALIDDATA'] == 'true'){
                            $result['idheader'] = $result[3][0]['kasbondept_id'];
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                        }else{
                            if ($result[0][0]['VALIDDATA'] == 'false' && $result[1][0]['MSG'] == 'NOTREALIZED'){
                                $result['idheader'] = $result[5][0]['kasbondept_id'];
                                $valid = $result[0][0]['VALIDDATA'];
                                $counter = $result[3][0]['RECORD_TOTAL'];
                                $message = 'Please Release Fund Transfer Voucher First'; 
                                $kasbankid_out = null;
                                $kasbankid_in = null;   



                            }else{
                                $result['idheader'] = $result[7][0]['kasbondept_id'];
                                $valid = $result[2][0]['VALIDDATA'];
                                $counter = $result[5][0]['RECORD_TOTAL'];
                                $message = $result[3][0]['MSG']; 
                                $kasbankid_out = null;
                                $kasbankid_in = null;   

                            }


                           
                        }

                        if($valid=='true'){
                           $this->createPostingdata($param);
                        }                        
                        break;
                    case 'savedraft':     
                        //$this->setting->_param['hideparam']='updatefromposting';
                    $this->setting->_param['hideparam']='saveasdraft';
                        $result = $this->setting->executeSP();
                        if(sizeof($result)>3){
                            $result['idheader'] = $result[4][0]['kasbondept_id'];
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                        }else{
                            $result['idheader'] = $result[4][0]['kasbondept_id'];
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];  
                            $kasbankid_out = null;
                            $kasbankid_in = null;  
                        }                                           
                        break;
                    case 'applybank':          
                        $this->setting->_param['hideparam'] = 'applybank';
                        $result = $this->setting->executeSP();


                        if(sizeof($result)>5){
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                        }else{
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;           
                        }

                        break;
                    case 'unapplybank':          
                        $this->setting->_param['hideparam'] = 'unapplybank';
                        $result = $this->setting->executeSP();
                        if ($result[0][0]['VALIDDATA'] == 'true') {
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = $result[1][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null; 
                              
                        }

                        break;
                    case 'apply':                        
                        if($param['kasbank']=='K'){
                            $this->ApplyTransactionCash($param);
                        }else if($param['kasbank']=='B'){
                            $this->ApplyTransactionBank($param);
                        }
                        exit;
                       
                        break;
                     case 'cashback':             
                         $this->setting->_param['hideparam'] = 'cashback';
                        $result = $this->setting->executeSP();
                       if (!isset($result[0][0]['FAILED'])) {
                            if (isset($result[0][0]['kasbankid_out']) || isset($result[1][0]['kasbankid_in'])){
                                $kasbankid_out = $result[0][0]['kasbankid_out'];
                                $kasbankid_in = $result[1][0]['kasbankid_in'];
                                $valid = $result[2][0]['VALIDDATA'];
                                $counter = $result[3][0]['RECORD_TOTAL'];
                                $message = $result[4][0]['MSG'];
                                //}

                            }else{
                                $kasbankid_out = 'EMPTY';
                                $kasbankid_in = 'EMPTY';
                                $valid = $result[0][0]['VALIDDATA'];
                                $counter = $result[1][0]['RECORD_TOTAL'];
                                $message = $result[2][0]['MSG'];
                            }
                          
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'Unable to save data';
                            $kasbankid_out = null;
                            $kasbankid_in = null; 
                              
                        }
                       
                        break;
                     case 'uncashback':                        
                         $this->setting->_param['hideparam'] = 'uncashback';
                        $result = $this->setting->executeSP();
                       if (!isset($result[2][0]['FAILED'])) {
                            $valid = $result[5][0]['VALIDDATA'];
                            $counter = $result[6][0]['RECORD_TOTAL'];
                            $message = $result[7][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'Unable to save data'; 
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                              
                        }
                       
                        break;
                     case 'saveprojectclaimdate':   
                        $this->setting->_param['hideparam']='saveprojectclaimdate';
                        $result = $this->setting->executeSP();
                        if(sizeof($result)>3){
                            $result['idheader'] = $result[5][0]['kasbondept_id'];
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                            $kasbankid_out = null;
                            $kasbankid_in = null;
                        }else{
                            $result['idheader'] = $result[4][0]['kasbondept_id'];
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG']; 
                            $kasbankid_out = null;
                            $kasbankid_in = null;   
                        }                                           
                        break;
                      case 'generatevoucher':   
                        $this->setting->_param['hideparam']='generatevoucher';
                        $result = $this->setting->executeSP();
                        if (!isset($result[0][0]['FAILED'])) {
                                $kasbankid_out = $result[0][0]['kasbankid_out'];
                                $kasbankid_in = $result[1][0]['kasbankid_in'];
                                $valid = $result[2][0]['VALIDDATA'];
                                $counter = $result[3][0]['RECORD_TOTAL'];
                                $message = $result[4][0]['MSG'];
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'Unable to save data';
                            $kasbankid_out = null;
                            $kasbankid_in = null; 
                              
                        }                 
                        break;
                     case 'generatevouchermulti':   
                        $this->setting->_param['hideparam']='generatevouchermulti';
                        $result = $this->setting->executeSP();
                        if (!isset($result[0][0]['FAILED'])) {
                                $kasbankid_out = $result[0][0]['kasbankid_out'];
                                $kasbankid_in = $result[1][0]['kasbankid_in'];
                                $valid = $result[2][0]['VALIDDATA'];
                                $counter = $result[3][0]['RECORD_TOTAL'];
                                $message = $result[4][0]['MSG'];
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'Unable to save data';
                            $kasbankid_out = null;
                            $kasbankid_in = null; 
                              
                        }                 
                        break;
                        // SEFTIAN ALFREDO 03/02/2022
                    case 'editremaining':             
                    $this->setting->_param['hideparam'] = 'editremaining';
                    $result = $this->setting->executeSP();
                    if ( $result[0][0]['VALIDDATA'] ) {
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $result = $result[3][0];
                        $kasbankid_in = null;
                        $kasbankid_out = null;
                    }else{
                        $valid = false;
                        $counter = 1;
                        $message = 'Unable to save data';
                        $kasbankid_out = null;
                        $kasbankid_in = null; 
                    }
                        break;
                    case 'resetkasbon':             
                    $this->setting->_param['hideparam'] = 'resetkasbon';
                    $result = $this->setting->executeSP();
                    if ( $result[0][0]['VALIDDATA'] ) {
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $result = $result[3][0];
                        $kasbankid_in = null;
                        $kasbankid_out = null;
                    }else{
                        $valid = false;
                        $counter = 1;
                        $message = 'Unable to reset data';
                        $kasbankid_out = null;
                        $kasbankid_in = null; 
                    }
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $idheader = null;
                        $counter = 1;
                        $message = 'data error';
                        $kasbankid_out = null;
                        $kasbankid_in = null;
                }
                $result['kasbankid_out'] = $kasbankid_out;
                $result['kasbankid_in'] = $kasbankid_in;
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }   
    
    public function createPostingdata($param) {
        if ($param['kasbank'] == 'K') {
            $this->ApplyTransactionCash($param);
        } else if ($param['kasbank'] == 'B') {
            //bank penyelesaiannya tidak boleh di cash advannce kasir harus lewat voucher
        }
    }
    
    public function ApplyTransactionCash($param) {  
       //voucherprefix data tidak dibutuhkan
       //$datavoucherprefix = $this->setting->getbyid_voucherprefix($param['voucherprefix_id']);
       //$dataprefix = $this->setting->getbyid_prefix($datavoucherprefix['prefix_id']);
       
       $dataprefix['prefix'] = $param['kasbank'];
       $datavoucherprefix['coa_id'] = 0;
       if(intval($param['made_by'])>0){
           $dataemployee =$this->setting->getEmployeedatabyid($param['made_by']);
           $made_by = $dataemployee['employee_name'];         
       }else{
           $made_by = $param['other_made_by'];
       }
       //$datacoa = $this->setting->getbyid_coa($datavoucherprefix['coa_id']);

       //data-data ini tidak dibutuhkan
       $datacoa['name'] = '';
       $datavoucherprefix['fixed_coa'] = '';
       $datacoa['coa'] = '';
       $datavoucherprefix['prefix_id'] = 0;
       $prefix = $dataprefix['prefix'];
       $param['prefix'] =$prefix;  
        $record = array(
            "kasbondept_id" => $param['kasbondept_id'],
        );  
        $resultcashadvance = $this->setting->getdata_bytableparam_v2($this->setting->_th_kasbon, $record);
        if ($param['kasbon_voucher_no'] != '') {
            $transno = $resultcashadvance[0][0]['transno'];
            $voucherno_cashadvance = $param['kasbon_voucher_no'];
        }else{
            $transno = $this->TransnoCashAdvance($param);
            $voucherno_cashadvance = $this->VouchernoCashAdvance($param); 
        }
       $record = array(
           "project_id"=>$param['project_id'],
           "pt_id"=>$param['pt_id'],
           "cashbon_projectpt_id"=>0,
           "cashbon_create_by"=>0,
           "is_posting"=>null,
           "due_date"=>null,
           "coa_desc"=>$datacoa['name'],
           "department_id"=>$param['department_id'],
           "kasbondept_id"=>$param['kasbondept_id'],
           "kasbongiro"=>"CASHBON",         
           "voucherprefix_id"=>$param['voucherprefix_id'],
          // "prefix_id"=>$datavoucherprefix['prefix_id'],
           "prefix_id"=>$param['prefix_id'],
           "prefix"=>$prefix,
           "fixed_coa"=>$datavoucherprefix['fixed_coa'],
         //  "coa_id"=>$datavoucherprefix['coa_id'],
           "coa_id"=>$param['coa_id'],
           "coa"=>$datacoa['coa'],
           "coaname"=>$datacoa['name'],
           "transno"=>$transno,          
           "department_id"=>$param['department_id'],
           "accept_date"=>$param['cashier_voucher_date'],
           "claim_date"=>$param['claim_date'],
           "status"=>"T",
           "status_special"=>"N",
           "voucher_no"=>$voucherno_cashadvance,
           "description"=>$param['description'],
           "kasbank"=>"K",
           "made_by"=>$made_by,
           "amount"=>$param['amount'],
           "cashback"=>0,
           "paid"=>0,
           "balance"=>$param['amount'],
           "applyamount"=>0,
           "dataflow"=>'O',
           "realisation_expence"=>0,
           "monitoring"=>0,
           "chequegiro_reject_by"=>0,
           "seq_no"=>0,
       );
       
        $this->setting->_storeprocedure = 'sp_th_kasbon';           
        $this->setting->_param = $record;
        $this->setting->_paramsql = 'create';
        $this->setting->_pt_id = $record['pt_id'];
        $result = $this->setting->executeSP();


        
        if (isset($result[1][0]['VALIDDATA'])) {
            $valid = $result[1][0]['VALIDDATA'];
            $counter = $result[2][0]['RECORD_TOTAL'];
            $message = $result[3][0]['MSG'];
        } else {
            $valid = $result[2][0]['VALIDDATA'];
            $counter = $result[3][0]['RECORD_TOTAL'];
            $message = $result[4][0]['MSG'];
        }      
        
        if ($valid == true && $param['kasbondept_id'] > 0) {
            $this->cashadvance->update_kasbankdepartment($record);
        }      
    }

   

    public function VouchernoCashAdvance($param) {
        $data['project_id'] = $param['project_id'];
        $data['pt_id'] = $param['pt_id'];
        $data['param_date'] = $param['cashier_voucher_date'];
        $data['module'] = "CASH ADVANCE";
        $data['prefix'] = $param['prefix'];
        $data['flag'] = '1';
        $exp = explode("-", $data['param_date']);
        $this->setting->_schema_gl = 'gl_' . $exp[0] . '.dbo.';
        $voucherno_kasbon = $this->common->docNumberbyparam($data);
        return $voucherno_kasbon;
    }

     public function TransnoCashAdvance($param) {
        $param['accept_date'] = $param['cashier_voucher_date'];
        $transno = $this->cashadvance->getTransnocashbonbyparam($param);
        return $transno;
    }
    
    public function ApplyTransactionBank($param) {
        
    }

    function KasbondeptPostingDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kasbondept_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP();
                $valid = $result[3][0]['VALIDDATA'];
                $counter = $result[4][0]['RECORD_TOTAL'];
                $message = $result[5][0]['MSG'];

                $return = array(
                    "success" => $valid,
                    "total" => $counter,
                    "msg" => $message,
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    public function Printdata($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_storeprocedure = 'sp_report_transaction_voucher';
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'report':
                        $resulttotal = $this->function->totalAmount($param);
                        $totalamount = $resulttotal['total_amount'];
                        $terbilang = $resulttotal['terbilang'];

                        $arraydata = array(
                            "parametersql" => 'read',
                            "kasbondept_id" => $param['kasbondept_id'],
                        );
                        $resultuseraccess = $this->setting->getUserdata();
                        $this->setting->_param = $arraydata;
                        $result = array(
                            "totalamount" => $totalamount,
                            "terbilang" => $terbilang,
                            "ptname" => $param['ptname'],
                            "dibuatoleh" => $resultuseraccess['user_fullname'],
                            "paramxml" => trim(preg_replace('/\s\s+/', ' ', $this->setting->converttoXml())),
                            "voucher_date" => $this->checkDate(date('d-m-Y', strtotime($param['voucher_date']))),
                            "chequegiro_date" => $this->checkDate(date('d-m-Y', strtotime($param['chequegiro_date']))),
                            "voucher_no" => $param['voucher_no'],
                            "cashier_voucher_no" => $param['cashier_voucher_no'],
                            "vendorname" => $param['vendorname'],
                            "cashier_note" => $param['cashier_note'],
                            "vendor_note" => $param['vendor_note'],
                        );
                        $valid = true;
                        $counter = 0;
                        $message = 'data success generate';
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'data error';
                }
                $this->setDefaultsp();
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function setDefaultsp() {
        $this->setting->_storeprocedure = 'sp_th_kasbondept_request';
    }

    public function checkDate($date) {
        if ($date == '01-01-1970') {
            $cleardate = '';
        } else if ($date == '01-01-1990') {
            $cleardate = '';
        } else {
            $cleardate = $date;
        }
        return $cleardate;
    }

    public function KasbondeptPostingPosting($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
               
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $param['voucher_date']=date('Y-m-d', strtotime($param['voucher_date']));
                $param['status']='2';
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbondept_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[4][0]['kasbondept_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function KasbondeptPostingUnapprove($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $param['voucher_date']=date('Y-m-d', strtotime($param['voucher_date']));
                $param['status']='1';
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbondept_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[4][0]['kasbondept_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

}

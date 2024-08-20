<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Kasbondept extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;
    private $_mail = null;
    private $_templatemsg = null;
    private $datamodule =null;
    private $_minio = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
	    $this->_mail = new Cashier_Helpers_Email();
        $this->_minio = new Cashier_Helpers_Minio();
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_templatemsg = new Cashier_Helpers_Templatemail;
        $this->_user_id = $this->_session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time = date('H:i:s');

        $this->setting = new Cashier_Models_General_Setdata;
        $this->generaldata = new Cashier_Models_General_Generaldata;
        $this->function = new Cashier_Models_Function_Vouchertransaction;
        $this->datamodule = $this->generaldata->moduledata('T-CBD'); //TRANCATION CASHBON DEPARTMENT
        $this->setting->_storeprocedure = 'sp_th_kasbondept_request';
    }

    function KasbondeptRead($param) {
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
                    case 'getdataapproveposting':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];                         
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdataapplyposting':
                        if($param['department_id']==null){
                            $message = null;
                            $valid = true;
                            $data = null;
                            $counter = 0;
                        }else{
                            if($param['query'] == NULL || $param['query'] == ''){
                                if((int)$param['ckasbondept_id'] == 0){
                                    die('Please Cashbon No / Description');
                                }
                            }
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
                        }

                        break;
                    case 'search':
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
                      case 'report':
                       // $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
                       $cashbondept_tpl = $this->generaldata->getGlobalparam($param['project_id'], $param['pt_id'], 'cashbondept_tpl');
                       // $username = $this->setting->getUserdatabyid($param['addby']);
                       // $resulttotal = $this->totalAmount($param);  
                        //$totalamount = $resulttotal['total_amount'];
                        /*if(isset($rowemployee['employee_name'])){
                            $approval_name = $rowemployee['employee_name'];
                        }else{
                            $approval_name = 'NO NAME';
                        }
                        if(isset($param['made_by_name'])){
                            $made_by_name = $param['made_by_name'];
                        }else{
                            $made_by_name = '';
                        }
                        
                        $rowkasbon = $this->setting->getbyid_kasbondept($param['kasbondept_id']);
                        if(!empty($rowkasbon['currency_word'])){
                            $terbilang = $resulttotal['terbilang'].' '.$rowkasbon['currency_word'];
                        }else{
                            $terbilang = $resulttotal['terbilang'];
                        } */

                        
                        $data = array(
                           /* "kasbondept_id" =>$param['kasbondept_id'],
                            "total_amount" =>$totalamount,
                            "terbilang" => $terbilang,
                            "ptname" => $param['ptname'],
                            "projectname" => $param['projectname'],
                            "projectpt_name" => $param['projectname']. ' / '.$param['ptname'],
                            "department" => $param['department'],
                            "employee_name" => $param['employee_name'],
                            "voucher_date" => $this->checkDate(date('d-m-Y', strtotime($param['voucher_date']))),
                            "voucher_no" => $param['voucher_no'],
                            "waktu_cetak" => date('d-m-Y H:i'),
                            "approval" => $approval_name,
                            "postingby" => $param['postingby'],*/
                            "cashbondept_tpl" => $cashbondept_tpl,
                            //"made_by_name" => $made_by_name,
                            "project_id" => $param['project_id'],
                            "pt_id" => $param['pt_id'],
                            //"addby_name" => $username['user_fullname']*/
                        );    
                        
                        $counter=1;  
                        $message = null;
                        $valid = true;
                        break;  
                    case 'printextension':
                        $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
                        $cashbondept_tpl = $this->generaldata->getGlobalparam($param['project_id'], $param['pt_id'], 'cashbondept_tpl_extend');
                        $username = $this->setting->getUserdatabyid($param['addby']);
                        $resulttotal = $this->totalAmount($param);  
                        $totalamount = $resulttotal['total_amount'];
                        if(isset($rowemployee['employee_name'])){
                            $approval_name = $rowemployee['employee_name'];
                        }else{
                            $approval_name = 'NO NAME';
                        }
                        if(isset($param['made_by_name'])){
                            $made_by_name = $param['made_by_name'];
                        }else{
                            $made_by_name = '';
                        }
                        
                        $rowkasbon = $this->setting->getbyid_kasbondept($param['kasbondept_id']);
                        if(!empty($rowkasbon['currency_word'])){
                            $terbilang = $resulttotal['terbilang'].' '.$rowkasbon['currency_word'];
                        }else{
                            $terbilang = $resulttotal['terbilang'];
                        }

                        
                        $data = array(
                            "kasbondept_id" =>$param['kasbondept_id'],
                            "total_amount" =>$totalamount,
                            "terbilang" => $terbilang,
                            "ptname" => $param['ptname'],
                            "projectname" => $param['projectname'],
                            "projectpt_name" => $param['projectname']. ' / '.$param['ptname'],
                            "department" => $param['department'],
                            "employee_name" => $param['employee_name'],
                            "voucher_date" => $this->checkDate(date('d-m-Y', strtotime($param['voucher_date']))),
                            "voucher_no" => $param['voucher_no'],
                            "waktu_cetak" => date('d-m-Y H:i'),
                            "approval" => $approval_name,
                            "postingby" => $param['postingby'],
                            "cashbondept_tpl" => $cashbondept_tpl,
                            "made_by_name" => $made_by_name,
                            "project_id" => $param['project_id'],
                            "pt_id" => $param['pt_id'],
                            "addby_name" => $username['user_fullname'],
                            "reason" => $param['reason'],
                             "extension_days" => $param['extension_days'],
                               "counter_extension" => $param['counter_extension']
                        );    
                        
                        $counter=1;  
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

                     case 'gethod':
                        $resultemployee = $this->setting->getEmployeedatabyid($param['employee_id']);    
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
                        break;
                    case 'getemployeebypt':
                        $resultemployee = $this->setting->getemployeebypt($param['pt_id']);    
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

                    case 'checkoscashbon':

                        $resultoscashbon = $this->setting->getOsCashbon($param);   

                        if($resultoscashbon[0][0]['RESULT'] == 'NO LIMIT' || $resultoscashbon[0][0]['RESULT'] == 'LIMIT AVAILABLE'){
                            $data = null;
                            $valid = true;
                            $counter = 0;
                            $message = $resultoscashbon[0][0]['RESULT'];

                        }else{
                            $data = null;
                            $valid = true;
                            $counter = 0;
                            $message = $resultoscashbon[0][0]['RESULT'];


                          
                          }
                        
                       
                    
                        break;
                    case 'checkpindahcoa':

                        $result = $this->setting->getPindahCoa($param);   
                       
                        if($result[0][0]['RESULT'] == 'GO ON' || $result[0][0]['RESULT'] == 'NOT_KKB'){
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
                    case 'getdataproject':
                        $resultproject = $this->generaldata->getGlobalparamV2($param['project_id'] ,'proyek_sh1_cr');

                        $data = $resultproject;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                      case 'remainingcashbonforextend':
                        $this->setting->_storeprocedure = 'sp_kasbondeptposting';
                        $this->setting->_paramsql = 'update';
                        $this->setting->_iddata = $param['kasbondept_id'];
                        $result = $this->setting->executeSP();
               
                      

                        $data = $result[0][0]['remainingkasbon'];
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatereward':
                        $this->setting->_paramsql = 'generatereward';
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[0];
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'getglobalparam':
                        $this->setting->_paramsql = 'getglobalparam';
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        $data = $result;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'getreferencecashbon':
                        $this->setting->_paramsql = 'getreferencecashbon';
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        if($param['query'] == NULL || $param['query'] == ''){
                            die('Please type something');
                        }
                        $result = $this->setting->executeSP();
                        // echo json_encode($result);die;
                        $total = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $valid = true;
                        $counter = 0;
                        $message = null;
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
    
    function totalAmount($param){        
        $this->setting->_storeprocedure = 'sp_th_kasbondept_request';
        $this->setting->_paramsql = 'totalamount';
        $this->setting->_param = $param;
        $this->setting->_iddata = $param['kasbondept_id'];
        $result = $this->setting->executeSP();
        return $result[0][0];
    }
    
    public function sendmaildata($param) {
        $param['dataflow']='O';
        $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
        $rowvoucher = $this->getdataVoucherbyid($param);
        $statusemailrequest = $rowvoucher['requestmail'];
        if (!empty($rowemployee) and $statusemailrequest == 0) {
            $rowuser = $this->generaldata->getUserdatabyid($rowvoucher['addby']);
            if ($rowuser !== null) {                
               
                $rowuseremployee = $this->generaldata->getEmployeebyId($param['made_by']);
                $madeby = $this->generaldata->getEmployeebyId($param['made_by']);
                if(!empty($rowuseremployee)){
                    $nameuserrequest = $rowuseremployee['employee_name'];
                    $email_user = $rowuseremployee['email_ciputra'];
                }else{
                    $email_user = $rowuser['user_fullname'];
                    $nameuserrequest = 'undefined employee id';               
                }
                
                if(!empty($madeby['email_ciputra'])){
                    $emailcc = $madeby['email_ciputra'];  
                }else{
                    $emailcc = $madeby['email'];  
                } 
                                             
                $param['userrequest'] = $nameuserrequest;
                $emailapproval = $rowemployee['email_ciputra'];
                $employeename = $rowemployee['employee_name'];
                //$setfrom = 'info.testerdata@gmail.com';
                $addto = $emailapproval;
                $addtoalias = $employeename;
                $param['approvename'] = $employeename;
                $subject = 'KASBON DEPARTMENT REQUEST APPROVAL FOR'.strtoupper($nameuserrequest);
                
                $message = $this->_templatemsg->htmlkasbonrequest($param);
                $this->_mail->setData()->setFrom($this->_mail->emailuser);
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo($addto, $addtoalias);
                if(!empty($emailcc)){
                    $this->_mail->setData()->addCc($emailcc);
                }                
                $this->_mail->setData()->setSubject($subject);

                //NO EMAILS
                if (true) {
                    //if ($this->_mail->setData()->send()) {
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

    public function KasbondeptCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();  

                       /* if ($result[1] == 1) {
                            $valid = $result[3][0]['VALIDDATA'];
                        } else {
                            $valid = $result[1][0]['VALIDDATA'];
                        }*/
                        $valid = $result[0][0]['VALIDDATA'];
                        
                        if ($valid == 'false') {
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                            $idheader = 0;
                            $voucherno_deptout = 'EMPTY';
                            $voucherno_deptin = 'EMPTY';
                            $voucherno_deptout_kp = 'EMPTY';
                        } else {
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                            $idheader = $result[3][0]['kasbondept_id'];
                            if (isset($result[4][0]['voucherno_deptout']) && isset($result[5][0]['voucherno_deptin'])){
                            	// if($result[7][0]['voucherno_deptout'] != '' || $result[8][0]['voucherno_deptin'] != ''){
                            	$voucherno_deptout = $result[4][0]['voucherno_deptout'];
                            	$voucherno_deptin = $result[5][0]['voucherno_deptin'];
                                $voucherno_deptout_kp = 'EMPTY';
                            	//}

                            }else if (isset($result[4][0]['voucherno_deptout_kp'])){
                                $voucherno_deptout_kp = $result[4][0]['voucherno_deptout_kp'];
                                $voucherno_deptout = 'EMPTY';
                                $voucherno_deptin = 'EMPTY';
                            }else{
                            	$voucherno_deptout = 'EMPTY';
                            	$voucherno_deptin = 'EMPTY';
                                $voucherno_deptout_kp = 'EMPTY';
                            }
                           
                            //$this->sendmaildata($param);
                        }
                        break;
                    case 'sendrequestmail':
                        //NO EMAILS
                        //$this->sendmaildata($param);
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'sending email';
                         $voucherno_deptout = null;
                        $voucherno_deptin = null;
                        $voucherno_deptout_kp = null;
                        break;

                     case 'uploadattachment':
                        //$rawfile = $param['fileraw']; // File Raw Image / Pdf
                        $filesPath = $param['filespath']; // Field Name Path
                        $this->setting->_paramsql = 'uploadattachment';
                        $module = 'kasbondept'; // vdrequest, cashbon, voucher, journal;
                        $result = $this->_minio->upload($filesPath, $module);
                        $valid = 1;
                        $idheader = 1;
                        $counter = 1;
                        $message = 'SUCCESS';
                        $voucherno_deptout = null;
                        $voucherno_deptin = null;
                        $voucherno_deptout_kp = null;
                        break;
                  

                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'data error';
                        $voucherno_deptout = null;
                        $voucherno_deptin = null;
                        $voucherno_deptout_kp = null;
                }
                $result['idheader'] = $idheader;
                $result['voucherno_deptout'] = $voucherno_deptout;
                $result['voucherno_deptin'] = $voucherno_deptin;
                $result['voucherno_deptout_kp'] = $voucherno_deptout_kp;
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

    public function KasbondeptUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbondept_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $result = $this->setting->executeSP();
                        
                        if(isset($result[0][0]['VALIDDATA'])){
                            if ($result[0][0]['VALIDDATA'] == 'true'){
                                $result['idheader'] = $result[3][0]['kasbondept_id'];
                                $valid = $result[0][0]['VALIDDATA'];
                                $counter = $result[1][0]['RECORD_TOTAL'];
                                $message = $result[2][0]['MSG'];
                            }else if ($result[0][0]['VALIDDATA'] == 'false' && $result[2][0]['MSG'] == 'HASPAYMENT'){
                                $result['idheader'] = $result[6][0]['kasbondept_id'];
                                $valid = $result[0][0]['VALIDDATA'];
                                $counter = $result[1][0]['RECORD_TOTAL'];
                                $message = 'Please Unrelease Fund Transfer Voucher First';
                             }else{   
                                $result['idheader'] = $result[6][0]['kasbondept_id'];
                                $valid = $result[0][0]['VALIDDATA'];
                                $counter = $result[1][0]['RECORD_TOTAL'];
                                $message = $result[2][0]['MSG'];

                            }


                        }else{

                            if (isset($result[0][0]['voucherno_deptout_kp'])){
                                $result['idheader'] = $result[4][0]['kasbondept_id'];
                                $valid = $result[1][0]['VALIDDATA'];
                                $counter = $result[2][0]['RECORD_TOTAL'];
                                $message = $result[3][0]['MSG'];
                            }else{   
                                $result['idheader'] = $result[6][0]['kasbondept_id'];
                                $valid = $result[0][0]['VALIDDATA'];
                                $counter = $result[1][0]['RECORD_TOTAL'];
                                $message = $result[2][0]['MSG'];

                            }

                        }
                       
                     
                        break;
                     case 'copycashbon':
                        $this->setting->_storeprocedure = 'sp_kasbondeptposting';
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['kasbondept_id'];
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;
                     case 'extendcashbon':
                        $this->setting->_storeprocedure = 'sp_kasbondeptposting';
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['kasbondept_id'];
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;
                    case 'updatereasondelete':
                        // fitur reason delete
                        $result = $this->setting->executeSP();
                        $message = '';
                        $valid = true;
                        $result = [];
                        $counter = 0;
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $idheader = null;
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

    function KasbondeptDelete($param = array()) {
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
                $char = substr($param[$key_name], -1);
                if($char == ','){
                    $param[$key_name] = substr($param[$key_name], 0, -1);
                }else{
                    $param[$key_name];
                }
                $this->setting->_param['reasondelete'] = $param['reason_delete'];
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP();

              //  die(print_r($result));
               
                if($result[0][0]['VALIDDATA'] == 'false' && $result[2][0]['MSG'] == 'HASPAYMENT'){
                     $valid = $result[0][0]['VALIDDATA'];
                    $counter = $result[1][0]['RECORD_TOTAL'];
                    $message = 'Please Unrelease Fund Transfer Voucher First';


                }else if($result[0][0]['VALIDDATA'] == 'false' && $result[2][0]['MSG'] == 'NOTUSER'){
                     $valid = $result[0][0]['VALIDDATA'];
                    $counter = $result[1][0]['RECORD_TOTAL'];
                    $message = 'Delete Failed! You are not Cashbon Creator!';


                }else if ($result[0][0]['VALIDDATA'] == 'true') {
                     $valid = $result[0][0]['VALIDDATA'];
                    $counter = $result[1][0]['RECORD_TOTAL'];
                    $message = $result[2][0]['MSG'];


                }else if ($result[0] = -1 ){
                    $valid = 'false';
                    $counter = 1;
                    $message = 'The data may have been used';

                }
                
                /*$valid = $result[4][0]['VALIDDATA'];
                $counter = $result[5][0]['RECORD_TOTAL'];
                $message = $result[6][0]['MSG'];
                */
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
                        $rowkasbon = $this->setting->getbyid_kasbondept($param['kasbondept_id']);
                        if(!empty($rowkasbon['currency_word']) && $rowkasbon['currency_word'] !=='Rupiah'){
                            $terbilang = $resulttotal['terbilang'].' '.$rowkasbon['currency_word'];
                        }else{
                            $terbilang = $resulttotal['terbilang'];
                        }
                        
                                                                      
                        $data = array(
                            "kasbondept_id" =>$param['kasbondept_id'],
                            "totalamount" =>$totalamount,
                            "terbilang" => $terbilang,
                            "ptname" => $param['ptname'],
                            "department" => $param['department'],
                            "employee_name" => $resultuseraccess['user_fullname'],
                            "voucher_date" => $this->checkDate(date('d-m-Y', strtotime($param['voucher_date']))),
                            "voucher_no" => $param['voucher_no'],
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
        if($date=='01-01-1970'){
            $cleardate ='';
        }else if($date=='01-01-1990'){
            $cleardate ='';
        }else{
             $cleardate =$date;
        }
        return $cleardate;
    }

}

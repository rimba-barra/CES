<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

require_once dirname(__DIR__) . '../box/library/EmailKasbank.php';

class Cashier_Models_VDRequest extends Zend_Db_Table_Abstract {

    private $setting      = null;
    private $generaldata  = null;
    private $_mail        = null;
    private $_templatemsg = null;
    private $datamodule   = null;
    private $session      = null;
    private $_minio       = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
          //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email'); //request tommy, untuk merubah ke masing2 module setting emailnya 23-01-2018
        $this->_mail        = new Cashier_Box_Library_Emailkasbank();
        $this->_minio       = new Cashier_Helpers_Minio();
        $this->_project_id  = $this->_session->getCurrentProjectId();
        $this->_pt_id       = $this->_session->getCurrentPtId();
        $this->_templatemsg = new Cashier_Helpers_Templatemail;
        $this->_user_id     = $this->_session->getUserId();
        $this->_curdate     = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time        = date('H:i:s');

        $this->setting                  = new Cashier_Models_General_Setdata;
        $this->generaldata              = new Cashier_Models_General_Generaldata;
        $this->function                 = new Cashier_Models_Function_Vouchertransaction;
        $this->datamodule               = $this->generaldata->moduledata('T-VCH');
        $this->setting->_storeprocedure = 'sp_th_voucher_request';

        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }

    function VDRequestRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                  /* untuk mendapatkan id departement, approve by otomatis,harus di isi terlebih dahulu 
                  employee_id di table sec_user di dbwebsec, berikut query untuk updatenya: 

                  update dbwebsec.dbo.sec_user set employee_id = (select employee_id from hrd.dbo.m_employee where employee_name like '%ahmad riadi%') where user_id = (select user_id from dbwebsec.dbo.sec_user where user_fullname like '%ahmad riadi%')
                  select * from hrd.dbo.m_employee where employee_name like '%ahmad riadi%'
                  select * from dbwebsec.dbo.sec_user where user_fullname like '%ahmad riadi%'

                 */
                $projectpt = $this->setting->setDefaultProjectPt($param);


                $this->setting->get_groupid();  //untuk mendapatkan data group user akses
                if($this->setting->_group_id==58 ||
                   $this->setting->_group_id == 73
                   ){
                      //jika hak akses level admin akan di bukakan seluruh datanya
                      //58=Administrator Cashier
                      //73=Developer - Cashier
                     $param['fordata'] = '';
                }else{
                     $param['fordata'] = 'fordatauserid';
                }


                $param['project_id']            = $projectpt['project_id'];
                $param['fordata']               = 'madebyreguestuser';
                // $this->setting->_storeprocedure = 'sp_th_voucher_request_read';
                $this->setting->_param          = $param;
                $this->setting->_paramsql       = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default': 
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        //   echo json_encode($result);die;
                        // $counter = $result[0][0]['RECORD_TOTAL'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        // if (!empty($result[0][0]['RECORD_TOTAL'])) {
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid   = true;
                        break;
                    case 'search': 
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $counter                    = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid   = true;
                        break;

                    case 'getemployee': 
                        $resultemployee = $this->setting->getEmployeedata();
                        $employee_id    = $department_id = $manager_id = 0;
                        if (!empty($resultemployee)) {
                            $employee_id   = $resultemployee['employee_id'];
                            $department_id = $resultemployee['department_id'];
                            $manager_id    = $resultemployee['manager_id'];
                            
                        }
                        $data                  = array();
                        $data['employee_id']   = $employee_id;
                        $data['department_id'] = $department_id;
                        $data['manager_id']    = $manager_id;
                        $valid                 = true;
                        $counter               = 0;
                        $message               = null;
                        break;
                    case 'checkaccountnumber': 
                        
                        $result  = $this->execSP3('cashier.dbo.sp_validator_read', array('checkaccountnumbervendor', '', 0, 0, $param['vendor_id'], $param['bank_account_no']));
                        $data    = $result[0][0];
                        $valid   = true;
                        $message = "";
                        $counter = 0;
                        
                        break;
                    case 'checkhasapprove': 
                        $result  = $this->execSP3('cashier.dbo.sp_validator_read', array('checkhasapprove', 'vdrequest', $param['project_id'], $param['pt_id'], $param['voucher_id'], $param['user_id'], $param['approval_type'] ));
                        $data    = $result[0][0];
                        $valid   = true;
                        $message = "";
                        $counter = 0;
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
                    case 'getamountreal': 
                        $this->setting->_paramsql   = 'getamountreal';
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $data                       = $result[0][1]['result'] ? $result[0][1]['result'] : $result[0][0]['result'];
                        $counter                    = 0;
                        $message                    = 'success';
                        $valid                      = true;
                        break;
                    case 'getreward': 
                        $this->setting->_paramsql   = 'getreward';
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $counter                    = $result[0][0]['RECORD_TOTAL'];
                        $data                       = $result[1];
                        $message                    = 'success';
                        $valid                      = true;
                        break;
                    case 'breakdownreward': 
                        $this->setting->_paramsql   = 'breakdownreward';
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $data                       = $result[2];
                        $counter                    = sizeof($data);
                        $message                    = $result[1][0]['MSG'];
                        $valid                      = $result[0][0]['valid'];
                        break;
                    case 'generatereward': 
                        $this->setting->_paramsql   = 'generatereward';
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $data                       = isset($result[2]) ? $result[2] : null;
                        $counter                    = sizeof($data);
                        $message                    = $result[1][0]['MSG'];
                        $valid                      = $result[0][0]['valid'];
                        break;
                    case 'getnofaktur': 
                        $this->setting->_paramsql   = 'getnofaktur';
                        $this->setting->_pt_id      = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result                     = $this->setting->executeSP();
                        $counter                    = $result[1][0]['RECORD_TOTAL'];
                        $data                       = $result[3][0]['RESULT'];
                        $message                    = $result[2][0]['MSG'];
                        $valid                      = $result[0][0]['VALIDDATA'];
                        break;
                    case 'getAttachmentByVoucherId':
                        $result  = $this->setting->getAttachment($param['voucher_id']);
                        $counter = count($result);
                        $data    = isset($result) ? $result : null;
                        $message = '';
                        $valid   = '';
                        break;
                    default: 
                        $resultemployee = $this->setting->getEmployeedata();
                          //print_r($resultemployee);                        
                        $employee_id = $department_id = $manager_id = 0;
                        if (!empty($resultemployee)) {
                            $employee_id   = $resultemployee['employee_id'];
                            $department_id = $resultemployee['department_id'];
                            if(isset($resultemployee['deptcode'])){
                                $department_name = $resultemployee['department'];
                                $department_code = $resultemployee['deptcode'];
                            }else{
                                $department_name = '';
                                $department_code = '';
                            }

                            $manager_id = $resultemployee['manager_id'];
                            if(isset($resultemployee['usertax_id'])){
                                $usertax_id = (int)$resultemployee['usertax_id'];
                            }else{
                                $usertax_id = 0;
                            }
                            
                        }
                        $data                    = array();
                        $data['employee_id']     = $employee_id;
                        $data['department_id']   = $department_id;
                        $data['manager_id']      = $manager_id;
                        $data['usertax_id']      = $usertax_id;
                        $data['department_name'] = $department_name;
                        $data['department_code'] = $department_code;
                        $valid                   = true;
                        $counter                 = 0;
                        $message                 = null;
                }


                $return = array(
                    "success"   => $valid,
                    "data"      => $data,
                    "msg"       => $message,
                    "total"     => $counter,
                    "counter"   => $counter,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                  //var_dump($e);
            }
        }
        return $return;
    }

    public function sendmaildata_old($param) {
        $rowemployee        = $this->generaldata->getEmployeebyId($param['approveby_id']);
        $rowvoucher         = $this->getdataVoucherbyid($param);
        $statusemailrequest = $rowvoucher['requestmail'];
        if (!empty($rowemployee) and $statusemailrequest == 0) {
            $rowuser = $this->generaldata->getUserdatabyid($rowvoucher['addby']);
            if ($rowuser !== null) {
                $rowuseremployee = $this->generaldata->getEmployeebyId($rowuser['employee_id']);

                if (!empty($rowuseremployee)) {
                    $nameuserrequest = $rowuseremployee['employee_name'];
                    $email_user      = $rowuseremployee['email_ciputra'];
                } else {
                    $nameuserrequest = 'undefined employee id';
                    $email_user      = $rowuser['user_email'];
                }


                $emailapproval = $rowemployee['email'];
                $employeename  = $rowemployee['employee_name'];
                $setfrom       = $email_user;
                $addto         = $emailapproval;
                $addtoalias    = $employeename;
                $subject       = strtoupper($nameuserrequest) . 'VOUHCER DEPARTMENT REQUEST APPROVAL';
                $message       = $this->_templatemsg->htmlvoucherrequest($param);
                $this->_mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo($addto, $addtoalias);
                $this->_mail->setData()->addCc($addto, $addtoalias);
                $this->_mail->setData()->setSubject($subject);
                if ($this->_mail->setData()->send()) {
                      //echo 'succes send mail';
                      // $this->updateFlagrequestmail($param);
                } else {
                      //echo 'failed send mail';
                }
            }
        }
    }


    public function sendmaildatav2($param) {

        $common             = new Cashier_Models_Common();
        $param['hideparam'] = 'getuserapproval';
        $approval_list      = $common->dataRead($param);
     
        $is_pajak = $param['is_pajak'];

        $isWithNotif = $this->generaldata->getGlobalParam(0, 0, 'email_notification_approval_vdrequest');

        if ($isWithNotif == 1) {
            
            try {
                foreach ($approval_list['data'] as $approver) {
                    $rowvoucher         = $this->getdataVoucherbyid($param);
                    $statusemailrequest = $rowvoucher['requestmail'] == "" ? 0 : $rowvoucher['requestmail'];
                    
                    if ($approver['approval_type'] == 'hod_approve') {
                        $mail = new Cashier_Box_Library_EmailKasbank();
                        if ($statusemailrequest == 0) {
                            $addby   = $rowvoucher['addby'] == '' ? $this->_session->getUserId() : $rowvoucher['addby'];
                            $rowuser = $this->generaldata->getUserdatabyid($addby);
                            if ($rowuser !== null) {
        
                                $nameuserrequest = $rowuser['user_fullname'];
                                $email_user      = $rowuser['user_email'];
                                
                                $setfrom = $email_user;
                                                
                                if($this->_project_id==1 && $this->_pt_id==1){
                                    $emailcc = array($email_user);
                                }else{
                                    $emailcc = array($email_user);
                                }
        
                                $subject = 'VOUCHER DEPARTMENT REQUEST APPROVAL FOR '.strtoupper($nameuserrequest);
        
                                $nip_approver    = $approver['approval_by'];
                                $rowuserApproval = $this->generaldata->getUserdatabyid($nip_approver);
        
                                $emailapproval        = $rowuserApproval['user_email'];
                                $employeename         = $rowuserApproval['user_fullname'];
                                $param['approvename'] = $employeename;
                                  // if($param['approvename']=="") {
                                    
                                  // }
                                
                                $addto      = $emailapproval;
                                $addtoalias = $employeename;
                                
                                $param['amount'] = str_replace(',', '', $param['amount']);
                                $param['userrequest'] = $nameuserrequest;
                                $message              = $this->_templatemsg->htmlvoucherrequest($param);
                                $mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
                                $mail->setData()->setBodyHtml($message);
                                $mail->setData()->addTo($addto, $addtoalias);
                                $mail->setData()->addCc($emailcc);
                                $mail->setData()->setSubject($subject);   
        
                                $mail->setData()->send();
                                
                            }
                        }
                    }
                } 
            } catch (Zend_Mail_Exception $e) {
                return "email not sent! [2] ".$e;
            }
            
        } else {
            return "email notification not active";
        }
    }

    public function sendmaildata($param) { 

        $is_pajak = $param['is_pajak'];
        
        $rowemployee        = $this->generaldata->getEmployeebyId($param['approveby_id']);
        $rowvoucher         = $this->getdataVoucherbyid($param);
        $statusemailrequest = $rowvoucher['requestmail'];
        if (!empty($rowemployee) and $statusemailrequest == 0) {
            $rowuser = $this->generaldata->getUserdatabyid($rowvoucher['addby']);
            if ($rowuser !== null) {
                $rowuseremployee = $this->generaldata->getEmployeebyId($rowuser['employee_id']);

                if (!empty($rowuseremployee)) {
                    $nameuserrequest = $rowuseremployee['employee_name'];
                    $email_user      = $rowuseremployee['email_ciputra'];
                } else {
                    $nameuserrequest = $rowuser['user_fullname'];
                    $email_user      = $rowuser['user_email'];
                }
                
                $emailapproval = $rowemployee['email_ciputra'];
                $employeename  = $rowemployee['employee_name'];
                $setfrom       = $email_user;
                                
                if($this->_project_id==1 && $this->_pt_id==1){
                    $emailcc = array($email_user);
                }else{
                    $emailcc = array($email_user);
                }
                
                if($param['approvename']=="") {
                $param['approvename'] = $employeename;
                }
                
                $addto      = $emailapproval;
                $addtoalias = $employeename;
                $subject    = 'VOUCHER DEPARTMENT REQUEST APPROVAL FOR '.strtoupper($nameuserrequest);

                if($is_pajak == 1){
                    $rowemployeepajak = $this->generaldata->getEmployeebyId($param['approvetaxby_id']);
                    array_push($emailcc,$rowemployeepajak['email_ciputra']);
                    $subject = 'VOUCHER DEPARTMENT REQUEST (TAX) APPROVAL FOR '.strtoupper($nameuserrequest);
                }
                $param['userrequest'] = $nameuserrequest;
                $message              = $this->_templatemsg->htmlvoucherrequest($param);
                $this->_mail->setData()->setFrom($this->_mail->emailuser);
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo($addto, $addtoalias);
                $this->_mail->setData()->addCc($emailcc);
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


    public function validateAmount($param) { 
        $this->updateAmountValidate($param);
    }

    private function updateFlagrequestmail($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata   = $param['voucher_id'];
        $this->setting->_param    = array(
            "hideparam" => 'updateflagrequestmail',
        );
        $result = $this->setting->executeSP();
    }

    private function updateAmountValidate($param) {
        $this->setting->_storeprocedure = 'sp_th_voucher_request_update';
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata   = $param['voucher_id'];
        $this->setting->_param    = array(
            "hideparam" => 'updateamountvalidate',
        );
        $result = $this->setting->executeSP();

        if ($result) {
            if ($param['approval_rules'] == "hod_approve") {
                return $this->sendmaildatav2($param);
            }   
        }
    }


    private function getdataVoucherbyid($param) {
        $pt            = $param['pt_id'];
        $project       = $this->_project_id;
        $voucher_id    = $param['voucher_id'];
        $department_id = $param['department_id'];

        $this->setting->_paramsql = 'read';
        $this->setting->_param    = array(
            "hideparam"     => 'read',
            "start"         => 0,
            "limit"         => 1,
            "project_id"    => $project,
            "pt_id"         => $pt,
            "department_id" => $department_id,
            "voucher_id"    => $voucher_id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function VDRequestCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id']          = $this->datamodule['module_id'];
                $this->setting->_storeprocedure = 'sp_th_voucher_request_create';
                $this->setting->_param          = $param;
                $this->setting->_paramsql       = 'create';
                $this->setting->_pt_id          = $param['pt_id'];
                $this->setting->_project_id     = $param['project_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'create': 
                        $result = $this->setting->executeSP();
                        // echo json_encode($result);die;
                        $valid = $result[0][0]['VALIDDATA'];
                        if ($valid == 'false') {
                            $counter  = $result[1][0]['RECORD_TOTAL'];
                            $message  = $result[2][0]['MSG'];
                            $idheader = 0;
                        } else {
                            $counter  = $result[1][0]['RECORD_TOTAL'];
                            $message  = $result[2][0]['MSG'];
                            $idheader = $result[3][0]['voucher_id'];
                        }
                        break;
                        
                    case 'createvendornote': 
                        $this->setting->_paramsql = 'createvendornote';
                        $result                   = $this->setting->executeSP();
                        $valid                    = 1;
                        if(isset($result[1][0]['vendornote_id'])){
                            $vendornote_id = (int)$result[1][0]['vendornote_id'];
                        }else{
                            $vendornote_id = 0;
                        }
                        $result = array(
                            'vendornote_id' => $vendornote_id,
                        );
                        $idheader = $result['vendornote_id'];
                        $counter  = 1;
                        $message  = 'SUCCESS';
                        break;
                    case 'uploadattachment': 
                        //$rawfile = $param['fileraw']; // File Raw Image / Pdf
                        $filesPath                = $param['filespath'];                         // Field Name Path
                        $this->setting->_paramsql = 'uploadattachment';
                        $module                   = 'vdrequest';                                 // vdrequest, cashbon, voucher, journal;
                        $result                   = $this->_minio->upload($filesPath, $module);
                        $valid                    = 1;
                        $idheader                 = 1;
                        $counter                  = 1;
                        $message                  = 'SUCCESS';
                        break;
                    case 'copyatt':
                        $filesPath                = $param['filespath'];
                        $this->setting->_paramsql = 'copyatt';                                   // Field Name Path
                        $module                   = 'vdrequest';                                 // vdrequest, cashbon, voucher, journal;
                        $result                   = $this->_minio->upload($filesPath, $module);
                        $valid                    = 1;
                        $idheader                 = 1;
                        $counter                  = 1;
                        $message                  = 'SUCCESS';
                        unlink($filesPath['tmp_name']);
                        break;
                    case 'upload': 
                        $this->setting->_paramsql = 'upload';
                          //$result = $this->setting->executeSP();
                        $valid    = 1;
                        $cleaneds = array();
                        $raw      = $param['csvraw'];
                        foreach ($raw as $r) {
                            // $rclean = str_replace(",","~",$r);
                            // array_push($cleaneds, $rclean);
                            $tmp = explode(";", $r);
                            for ($x = 0; $x < sizeof($tmp); $x++) { 
                                if ($x != 4) {
                                    $tmp[$x] = str_replace(",","~",$tmp[$x]);
                                }
                            }

                            $rclean = implode(";", $tmp);
                            array_push($cleaneds, $rclean);
                        }

                          //$csvAsArray = array_map('str_getcsv', file($tmpName));
                        $csvAsArray = array_map('str_getcsv', $cleaneds);
                        
                        $arrData  = array();
                        $accData  = array();
                        $subData  = array();
                        $errormsg = array();
                          //jika format csv titik koma ';'
                        $i = 0;
                        foreach ($csvAsArray as $c) {
                           if($i>0){
                               $arr = explode(';',$c[0]);
                               array_push($arrData, $arr);
                           }
                           $i++;
                        }

                          //jika format csv koma ','
            
                        $i = 0;
                        if(sizeof($arrData[0])==1){
                            $csvAsArray = array();
                            $arrData    = array();
                            $file       = fopen($tmpName, "r");
                            while (!feof($file)) {
                                $csvAsArray[] = fgetcsv($file, null, ',');
                            }
                            foreach ($csvAsArray as $c) {
                               $coa_acc = $c[8];
                               if($i>0 && $coa_acc!=='' && $coa_acc!==null ){
                                array_push($arrData, $c);
                               }
                               $i++;
                            }
                        }

                        $post_data      = $param;
                        $voucher_id     = $post_data['voucher_id'];
                        $hdataflow      = $post_data['dataflow'];
                        $modelvoucher   = new Cashier_Models_VDRequest();
                        $modeldetail    = new Cashier_Models_VDRequestdetail();
                        $modelsubdetail = new Cashier_Models_VDRequestsubdetail();
                        $modelSac       = new Gl_Models_Subaccountcode();

                          //GET ALL COA
                        $post_data['start'] = 0;
                        $post_data['limit'] = 10000;
                        $modelcoa           = new Gl_Models_Coa();
                        $result             = $modelcoa->coaupoladRead($post_data);
                        $res                = $result[1];
                        $coa                = array();
                        $accData            = array();
                        $subData            = array();
                        $coaData            = array();
                        foreach ($res as $r) {
                            $coa[$r['coa']] = array(
                                'coa_id'    => $r['coa_id'],
                                'coa'       => $r['coa'],
                                'name'      => $r['name'],
                                'kelsub_id' => $r['kelsub_id'],
                                'kelsub'    => $r['kelsub']
                            );
                        }

                        $groupingdata = (isset($post_data['groupingdata'])?$post_data['groupingdata']:0);
                                    
                        $post_data = array(
                            "project_id"            => $param["project_id"],
                            "pt_id"                 => $param["pt_id"],
                            "department_id"         => $param["department_id"],
                            "voucher_id"            => $voucher_id,
                            "voucherdetail_id"      => 0,
                            "coa_id"                => 0,
                            "coa"                   => "",
                            "coaname"               => "",
                            "kelsub_id"             => 0,
                            "kelsub"                => "",
                            "kelsubdesc"            => "",
                            "subcashier_id"         => 0,
                            "subcashierdesc"        => "upload",
                            "indexdata"             => 1,
                            "dataflow"              => "I",
                            "amount"                => "0",
                            "remarks"               => "",
                            "active"                => false,
                            "addon"                 => null,
                            "addby"                 => "",
                            "modion"                => null,
                            "modiby"                => "",
                            "deleted"               => false,
                            "hideparam"             => "detailcreate",
                            "statedata"             => "create",
                            "kasbondept_id"         => 0,
                            "kasbondeptdetail_id"   => 0,
                            "typetransdetail"       => "upload",
                            "cashier_note"          => "upload",
                            "setupcashflow_id"      => 0,
                            "checkppn"              => false,
                            "checkpph"              => false,
                            "tipepajakdetailppn_id" => 0,
                            "tipepajakdetailpph_id" => 0,
                            "persentaseppn"         => "",
                            "persentasepph"         => "",
                            "cashflowtype"          => "",
                            "balancecoa"            => "",
                            "parametersql"          => "create"
                        );

                        $post_data_sub = array(
                           "voucher_id"             => $voucher_id,
                           "voucherdetail_id"       => 0,
                           "vouchersubdetail_id"    => 0,
                           "coa_id"                 => 0,
                           "subgl_id"               => 0,
                           "coa"                    => "",
                           "subcode"                => "",
                           "code"                   => "",
                           "code1"                  => "",
                           "code2"                  => "",
                           "code3"                  => "",
                           "code4"                  => "",
                           "coaname"                => "",
                           "kelsub_id"              => 0,
                           "kelsub"                 => "B",
                           "subcashier_id"          => 0,
                           "subcashierdesc"         => "",
                           "indexdata"              => 1,
                           "dataflow"               => "",
                           "amount"                 => "0",
                           "remarks"                => "",
                           "active"                 => false,
                           "addon"                  => null,
                           "addby"                  => "",
                           "modion"                 => null,
                           "modiby"                 => "",
                           "deleted"                => false,
                           "hideparam"              => "subdetailcreate",
                           "statedata"              => "create",
                           "indexsubdata"           => 1,
                           "indexdataheader"        => 1,
                           "kasbondeptdetail_id"    => 0,
                           "kasbondeptsubdetail_id" => 0,
                           "parametersql"           => "create"
                        );

                          //DELETEALL
                        $resultdetaildel = $modeldetail->VDRequestdetailDeleteAll($post_data);

                          //MULAI INSERT
                        $i       = 0;
                        $tmpAcc  = '';
                        $sumSub  = 0;
                        $total_d = 0;
                        $total_c = 0;
                        foreach ($arrData as $a) {
                            
                            $coa_acc     = trim($a[1]);
                            $remarks_acc = trim($a[3]);
                            $kawasan_sub = trim($a[5]);
                            $subgL_codes = trim($a[4]);
                            $amount_acc  = trim($a[2]);
                            $cashflow    = trim($a[6]);
                            $remarks_sub = trim((isset($a[3])?$a[3]:''));
                            if($hdataflow == "O"){
                                $dataflow = "I";
                                if(floatval($amount_acc)<0){
                                    $dataflow = "O";
                                }
                            }
                            if($hdataflow == "I"){
                                $dataflow = "O";
                                if(floatval($amount_acc)<0){
                                    $dataflow = "I";
                                }
                            }

                            if(isset($coa[$coa_acc])){
                                $i                      = $i+1;
                                $post_data["indexdata"] = $i;
                                $post_data["coa"]       = $coa_acc;
                                $post_data["coa_id"]    = $coa[$coa_acc]['coa_id'];
                                $post_data["kelsub_id"] = $coa[$coa_acc]['kelsub_id'];
                                $post_data["kelsub"]    = $coa[$coa_acc]['kelsub'];
                                $post_data["coaname"]   = $coa[$coa_acc]['name'];
                                $post_data["remarks"]   = $remarks_acc;
                                $post_data["amount"]    = abs($amount_acc);
                                $post_data["dataflow"]  = $dataflow;
                                $post_data["cashflow"]  = $cashflow;
                                $coa_kelsub             = $coa[$coa_acc]['kelsub'];

                                  //CF
                                $rescf = $modelcoa->getSetupcashflowbycoa($post_data);
                                $rescf = $rescf['result'][0];
                                if(sizeof($rescf)==0){
                                    $cashflowtype_id  = 0;
                                    $setupcashflow_id = 0;
                                }else{
                                    $cashflowtype_id  = $rescf[0]['cashflowtype_id'];
                                    $setupcashflow_id = $rescf[0]['setupcashflow_id'];
                                }

                                if(strlen($cashflow)>2){
                                      //CF
                                    $rescf = $modelcoa->getSetupcashflowbydept($post_data);
                                    $rescf = $rescf['result'][0];
                                    if(sizeof($rescf)==0){
                                        $msg = "Cashflow : ".$cashflow.' '.$coa_acc." tidak ada di Setup Cashflow";
                                        array_push($errormsg, $msg);
                                        $cashflowtype_id  = 0;
                                        $setupcashflow_id = 0;
                                    }else{
                                        $cashflowtype_id  = $rescf[0]['cashflowtype_id'];
                                        $setupcashflow_id = $rescf[0]['setupcashflow_id'];
                                    }
                                }

                                $post_data["cashflowtype_id"]  = $cashflowtype_id;
                                $post_data["setupcashflow_id"] = $setupcashflow_id;

                                $resultdetail         = $modeldetail->VDRequestdetailCreate($post_data);
                                $param['subgl_codes'] = preg_replace('/\s+/', '', $subgL_codes);
                                $param['kelsub_id']   = (int)$coa[$coa_acc]['kelsub_id'];
                                $voucherdetail_id     = $resultdetail['data'][6][0]['voucherdetail_id'];
                                
                                  //jika ada kelsub
                                if($param['kelsub_id']>0){
                                    $result = $modelSac->getSubglbycode2($param);
                                    $result = $result['result'];
                                    if(isset($result[1][0])){
                                        if(sizeof($result[1][0])==0){
                                            $msg = 'Kelsub : '.$coa_kelsub.' ('.$param['kelsub_id'].') '.$param['subgl_codes']." tidak ada di master";
                                            array_push($errormsg, $msg);
                                        }else{
                                            $subgl_id                           = $result[1][0]['subgl_id'];
                                            $kelsub_id                          = $result[1][0]['kelsub_id'];
                                            $post_data_sub["voucherdetail_id"]  = $voucherdetail_id;
                                            $post_data_sub["voucher_id"]        = $voucher_id;
                                            $post_data_sub["coa_id"]            = $coa[$coa_acc]['coa_id'];
                                            $post_data_sub["amount"]            = abs($amount_acc);
                                            $post_data_sub["kelsub_id"]         = $kelsub_id;
                                            $post_data_sub["subgl_id"]          = $subgl_id;
                                            $post_data_sub["code"]              = $subgL_codes;
                                            $post_data_sub["code1"]             = $subgL_codes;
                                            $post_data_sub["code3"]             = $kawasan_sub;
                                            $post_data_sub["remarks"]           = $remarks_sub;
                                            $post_data_sub['is_refund']         = 0;
                                            $post_data_sub['purchaseletter_id'] = 0;
                                            $resultsubdetail                    = $modelsubdetail->VDRequestsubdetailCreate($post_data_sub);
                                        }
                                    }else{
                                        $msg = 'Kelsub : '.$coa_kelsub.' ('.$param['kelsub_id'].') '.$param['subgl_codes']." tidak ada di master";
                                            array_push($errormsg, $msg);
                                    }
                                }
                            }else{
                                $msg = "Coa : ".$coa_acc." tidak ada di master";
                                    array_push($errormsg, $msg);
                            }
                        }

                        if($groupingdata == 1){
                            $resultjoin = $modeldetail->VDRequestdetailMultisubConvert($post_data);
                        }
                        
                        if(sizeof($errormsg)>0){
                              //DELETE
                            $modelvoucher->VDRequestDelete($post_data);
                        }

                        $result = array(
                            'voucher_id' => $voucher_id,
                            'error'      => $errormsg
                        );
                        $idheader = $voucher_id;

                        $counter = 1;
                        $message = 'SUCCESS';
                    break;
                    case 'sendrequestmail': 
                          //NO EMAILS
                          //$this->sendmaildata($param);
                          //$this->validateAmount($param);
                        $result   = null;
                        $valid    = false;
                        $counter  = 1;
                        $idheader = 0;
                        $message  = 'sending email';
                        break;
                    case 'validateamount': 
                          //NO EMAILS                     
                          //change with validate
                        $x        = $this->validateAmount($param);
                        $result   = null;
                        $valid    = false;
                        $counter  = 1;
                        $idheader = 0;
                        $message  = 'sending email : '.$x;
                        break;
                    case 'inputcheckingdata': 
                        $param['user_id'] = $this->_user_id;
                        $result           = $this->execSP3('cashier.dbo.sp_th_voucher_checking', array($param['project_id'], $param['pt_id'], $param['voucher_id'], $param['user_id'], $param['notes'], $param['approval_type']));

                        $message  = $result[0][0]['result'];
                        $valid    = 'true';
                        $counter  = 1;
                        $idheader = 0;

                        break;
                    default: 
                        $result   = null;
                        $valid    = false;
                        $counter  = 1;
                        $idheader = 0;
                        $message  = 'data error';
                }
                $result['idheader'] = $idheader;
                $return             = array(
                    "parameter" => $param['hideparam'],
                    "msg"       => $message,
                    "success"   => $valid,
                    "data"      => $result,
                    "total"     => $counter,
                    "model"     => array()
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function VDRequestUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id']          = $this->datamodule['module_id'];
                $this->setting->_storeprocedure = 'sp_th_voucher_request_update';
                $this->setting->_param          = $param;
                $this->setting->_paramsql       = 'update';
                $this->setting->_pt_id          = $param['pt_id'];
                $this->setting->_iddata         = $param['voucher_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'update': 
                        $result             = $this->setting->executeSP();
                        // echo json_encode($result);die;
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'copyvoucher': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $result['idbefore'] = $param['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'pindahptvoucher': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'updatereasondelete': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'vd_send_to_finance': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'receivefinance': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'needrevise': 
                        $result = $this->setting->executeSP();
                        $this->sendEmailRevisetoMaker($param);
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'unsentfinance': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'unreceivefinance': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'uncheckapprove': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    case 'unapprovesby': 
                        $result             = $this->setting->executeSP();
                        $result['idheader'] = $result[3][0]['voucher_id'];
                        $valid              = $result[0][0]['VALIDDATA'];
                        $counter            = $result[1][0]['RECORD_TOTAL'];
                        $message            = $result[2][0]['MSG'];
                        break;
                    default: 
                        $result   = null;
                        $valid    = false;
                        $idheader = null;
                        $counter  = 1;
                        $message  = 'data error';
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg"       => $message,
                    "success"   => $valid,
                    "data"      => $result,
                    "total"     => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function VDRequestDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name         = 'voucher_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_storeprocedure        = 'sp_th_voucher_request_delete';
                // $this->setting->_param['reasondelete'] = $param['reasondelete'];
                $this->setting->_iddata                = $param[$key_name];
                $this->setting->_paramsql              = 'delete';
                $result                                = $this->setting->executeSP();
                $valid                                 = $result[0][0]['VALIDDATA'];
                $counter                               = $result[1][0]['RECORD_TOTAL'];
                $message                               = $result[2][0]['MSG'];
                $return                                = array(
                    "success" => $valid,
                    "total"   => $counter,
                    "msg"     => $message,
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

      //NEW TERBILANG
    private function penyebut($nilai) {
        $nilai = abs($nilai);
        $huruf = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
        $temp  = "";
        if ($nilai < 12) {
            $temp = " ". $huruf[$nilai];
        } else if ($nilai <20) {
            $temp = $this->penyebut($nilai - 10). " belas";
        } else if ($nilai < 100) {
            $temp = $this->penyebut($nilai/10)." puluh". $this->penyebut($nilai % 10);
        } else if ($nilai < 200) {
            $temp = " seratus" . $this->penyebut($nilai - 100);
        } else if ($nilai < 1000) {
            $temp = $this->penyebut($nilai/100) . " ratus" . $this->penyebut($nilai % 100);
        } else if ($nilai < 2000) {
            $temp = " seribu" . $this->penyebut($nilai - 1000);
        } else if ($nilai < 1000000) {
            $temp = $this->penyebut($nilai/1000) . " ribu" . $this->penyebut($nilai % 1000);
        } else if ($nilai < 1000000000) {
            $temp = $this->penyebut($nilai/1000000) . " juta" . $this->penyebut($nilai % 1000000);
        } else if ($nilai < 1000000000000) {
            $temp = $this->penyebut($nilai/1000000000) . " milyar" . $this->penyebut(fmod($nilai,1000000000));
        } else if ($nilai < 1000000000000000) {
            $temp = $this->penyebut($nilai/1000000000000) . " trilyun" . $this->penyebut(fmod($nilai,1000000000000));
        }     
        return $temp;
    }

    private function terbilang($nilai) {
        if($nilai<0) {
            $hasil = "minus ". trim($this->penyebut($nilai));
        } else {
            $hasil = trim($this->penyebut($nilai));
        }           
        return $hasil;
    }

public function Printdata($param) {

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_storeprocedure = 'sp_report_transaction_voucher';
                $this->setting->_param          = $param;
                $this->setting->_paramsql       = 'read';

                  //override
                $this->setting->_pt_id      = $param['pt_id'];
                $this->setting->_project_id = $param['project_id'];

                switch ($this->setting->_param['hideparam']) {
                    case 'report': 
                        $attachment = $this->setting->getdata_bytableparam($this->setting->_t_attachment, array(
                            'transaction_id' => $param['voucher_id'],
                            'module'         => 'vdrequest',
                            'deleted'        => 0
                        ));

                        $path   = (isset($attachment[0][0]['path']) ? $attachment[0][0]['path'] : '');
                        $srcAtt = [];
                        if ($path != '') {
                            $minio  = new Cashier_Helpers_Minio();
                            $srcAtt = $minio->view($path);
                        }

                        $selectedProject  = [4065, 5104, 5105];
                        $resulttotal      = $this->function->totalAmount($param);
                        $totalamount      = $resulttotal['total_amount'];
                        $rowvoucher       = $this->setting->getbyid_voucherdepartment($param['voucher_id']);
                        $remarks          = '';
                        $for_project_name = '';

                        if ( $param['vendor_bankacc_id'] && $param['vendor_bankacc_id'] != 0 ) {
                            $rowvendorbankacc = $this->setting->getbyid_vendorbankacc($param['vendor_bankacc_id']);

                            $remarks .= $param['vendor_bank_name'] . ' ; ' . $rowvendorbankacc['bank_account_no'] . ' ; ' . $rowvendorbankacc['bank_account_name'];

                            if (in_array($this->setting->_project_id, $selectedProject)) {
                                $remarks .= " ; " . str_replace("\n", ' ', $rowvendorbankacc['remarks']);
                            }
                        }

                        $is_cgg            = 0;
                        $made_by           = 0;
                        $kasbondeptreff_id = ( $rowvoucher['kasbondeptreff_id'] ? $rowvoucher['kasbondeptreff_id'] : 0);

                        if ($kasbondeptreff_id > 0) {
                            $is_cgg     = $this->setting->getbyid_is_cgg($param['project_id'], $param['pt_id']);
                            $kasbondept = $this->setting->getbyid_kasbondept($kasbondeptreff_id);
                            $made_by    = $kasbondept['made_by'];
                        }


                        $rowkasbank = $this->setting->getbyidvoucher_kasbank($rowvoucher['voucher_id']);
                        
                        $rowmultisign = $this->generaldata->getMultisign($rowvoucher['department_id']);

                        $resulttotal['terbilang'] = $this->terbilang($totalamount);
                       
                        if(!empty($rowvoucher['currency_word']) && $rowvoucher['currency_word'] !=='Rupiah'){
                            $terbilang = ucfirst($resulttotal['terbilang'].' '.$rowvoucher['currency_word']);
                        }else{
                             $terbilang = ucfirst($resulttotal['terbilang'].' Rupiah');
                        }


                        $arraydata = array(
                            "parametersql" => 'read',
                            "voucher_id"   => $param['voucher_id'],
                        );

                        if($param['addby']==""){
                            
                            if($param['modiby']==""){
                                $param['addby'] = 99;
                            }else{
                                $param['addby'] = $param['modiby'];
                            }
                            
                        }

                        $rowmadebydata = $this->setting->getUserdatabyid($param['addby']);

                        $madeby         = null;
                        $madeby_initial = null;
                        if (isset($rowmadebydata['user_fullname'])) {
                            $madeby         = $rowmadebydata['user_fullname'];
                            $madeby_initial = $rowmadebydata['initial_name'];
                        }
                        
                        $glblname = "";
                        if($param['dataflow']=="O"){
                            $glblname = "voucherdept_tpl_O";
                        }else{
                            $glblname = "voucherdept_tpl_I";
                        }
                        $voucherdept_tpl = $this->generaldata->getGlobalparam($param['project_id'], $param['pt_id'], $glblname);

                        $userapprove = null;
                        if (!empty($param['approveby_id'])) {
                            $rowuserapprovedata = $this->setting->getEmployeedatabyid($param['approveby_id']);
                            if (isset($rowapprovedata['employee_name'])) {
                                $userapprove = $rowapprovedata['employee_name'];
                            }
                        }                        
                     
                        $rowapprovedata = $this->setting->getEmployeedatabyid($param['approveby_id']);
                        $approvename    = null;
                        if (isset($rowapprovedata['employee_name'])) {
                            $approvename = $rowapprovedata['employee_name'];
                        }
                        if(!isset($rowkasbank['vid'])){
                            $rowkasbank['vid'] = '';
                        }
                        if(!isset($rowkasbank['voucher_no'])){
                            $rowkasbank['voucher_no'] = '';
                        }

                        $resultuseraccess = $this->setting->getUserdata();

                          //by option
                        if($userapprove==null){
                            $userapprove = $approvename;
                        }

                        if(isset($param['tipenotevoucher'])){
                            $tipenotevoucher = $param['tipenotevoucher'];
                        }else{
                            $tipenotevoucher = 3;
                        }

                        if ( $rowvoucher['for_projectpt_id'] != NULL && $rowvoucher['for_projectpt_id'] > 0 ) {
                            $for_project_name = $this->setting->getPtnamebyprojectpt($rowvoucher['for_projectpt_id']);
                        }else{
                            $for_project_name = $param['projectname'];
                        }
                        switch ($tipenotevoucher) {
                            case '1': 
                                $notes = json_encode($param['description']);
                                $notes = str_replace('"','',$notes);
                                break;
                            case '2': 
                                $notes = json_encode($param['description']);
                                $notes = str_replace('"','',$notes);
                                $vnote = $param['vendor_note'];
                                $vnote = json_encode($vnote);
                                $vnote = str_replace('"','',$vnote);
                                $notes = $notes.' ; '.$vnote.' '.$remarks;
                                break;
                            case '3': 
                                $notes = $param['vendor_note'];
                                $notes = json_encode($notes);
                                $notes = str_replace('"','',$notes);
                                $notes = $notes.' ; '.$remarks;

                                break;
                            case '4': 
                                $notes = '';
                                break;
                            default: 
                                $notes = $param['vendor_note']. ' ; '.$remarks;
                                break;
                        }

                        $this->setting->_param = $arraydata;
                          //jika self approve
                        if($madeby == $userapprove){
                              /*
                            $userapprove = '';
                            if((int)$param['pt_id']==1){
                                $userapprove = $madeby;
                            }
                            */
                        }

                        $vendor     = $this->setting->getbyid_vendor($param['vendor_id']);
                        $vendorname = ($vendor ? $vendor['vendorname'] : '');
                        if ( $is_cgg != NULL && $kasbondeptreff_id > 0 ) {
                            $employee   = $this->setting->getbyid_employeename( (int) $made_by);
                            if ( $param['dataflow'] == "O" ) {
                                $vendorname = $employee['employee_name'];
                            }else{
                                $vendorname = $param['projectname'];
                            }
                        }

                        $use_qr = $this->setting->getdata_bytableparam($this->setting->_m_globalparam, array(
                            'project_id' => $param['project_id'],
                            'pt_id'      => $param['pt_id'],
                            'name'       => 'USE_ATTACHMENT_QR',
                            'deleted'    => 0
                        ));
                        $qr = 0;
                        if (!empty($use_qr[0])) {
                            $qr = 1;
                        }else{
                            $qr = 0;
                        }

                        $result = array(
                            "totalamount"          => abs($totalamount),                                                            //gak boleh minus kata pak iwan
                            "terbilang"            => $terbilang,
                            "ptname"               => $param['ptname'],
                            "dibuatoleh"           => $madeby,
                            "disetujui"            => $userapprove,
                            "multisign_dibuatoleh" => $madeby_initial,
                            "multisign1"           => (isset($rowmultisign[0]) ? $rowmultisign[0] : ''),
                            "multisign2"           => (isset($rowmultisign[1]) ? $rowmultisign[1] : ''),
                            "multisign3"           => (isset($rowmultisign[2]) ? $rowmultisign[2] : ''),
                            "paramxml"             => trim(preg_replace('/\s\s+/', ' ', $this->setting->converttoXml())),
                            "voucher_date"         => $this->checkDate(date('d-m-Y', strtotime($param['voucher_date']))),
                            "chequegiro_date"      => $this->checkDate(date('d-m-Y', strtotime($param['chequegiro_date']))),
                            "voucher_no"           => $param['voucher_no'],
                            "cashier_voucher_no"   => $param['cashier_voucher_no'],
                            "cashier_voucher_date" => $this->checkDate(date('d-m-Y', strtotime($param['cashier_voucher_date']))),
                            "vendorname"           => $vendorname,
                            "cashier_note"         => $param['cashier_note'],
                            "vendor_note"          => $notes,
                            "project_name"         => $param['projectname'],
                            "kasbank_id"           => $param['voucher_id'],
                            "description"          => json_encode(str_replace("\n", '', $param['description'])),
                            "duedate"              => $this->checkDate(date('d-m-Y', strtotime($param['due_date']))),
                            "create_date"          => $this->checkDate(date('d-m-Y H:i:s', strtotime($param['addon']))),
                            "approve_date"         => $this->checkDate(date('d-m-Y H:i:s', strtotime($param['approve_date']))),
                            "voucherdept_tpl"      => $voucherdept_tpl,
                            "vid"                  => $rowkasbank['vid'],
                            "is_multi"             => isset($param['is_multi'])?$param['is_multi']:0,
                            "voucher_ids"          => isset($param['voucher_ids'])?$param['voucher_ids']:'',
                            "userprint"            => $this->session->getUserFullName(),
                            "print_counter"        => $rowvoucher['print_counter'],
                            "status_reprint"       => $rowvoucher['print_counter']>0?'(REPRINT)':'',
                            "for_project_name"     => $for_project_name,
                            "tipenotevoucher"      => $param['tipenotevoucher']
                        );

                        if ($qr == 1) {
                            $result['signedUrl'] = 'https://attachmentqr.ciputragroup.com:73/?v='.$this->encrypt_decrypt('encrypt', $param['voucher_id']);
                        }

                        $valid   = true;
                        $counter = 0;
                        $message = 'data success generate';
                        break;
                    default: 
                        $result   = null;
                        $valid    = false;
                        $counter  = 1;
                        $idheader = 0;
                        $message  = 'data error';
                }
                $this->insertLogPrint($param);
                $this->setDefaultsp();
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg"       => $message,
                    "success"   => $valid,
                    "data"      => $result,
                    "total"     => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }


    public function Printdata_old($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_storeprocedure = 'sp_report_transaction_voucher';
                $this->setting->_param          = $param;
                $this->setting->_paramsql       = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'report': 
                        $resulttotal = $this->function->totalAmount($param);
                        $totalamount = $resulttotal['total_amount'];
                        $terbilang   = $resulttotal['terbilang'];

                        $arraydata = array(
                            "parametersql" => 'read',
                            "voucher_id"   => $param['voucher_id'],
                        );

                        $rowmadebydata  = $this->setting->getUserdatabyid($param['addby']);
                        $madeby         = null;
                        $madeby_initial = null;
                        if (isset($rowmadebydata['user_fullname'])) {
                            $madeby         = $rowmadebydata['user_fullname'];
                            $madeby_initial = $rowmadebydata['initial_name'];
                        }

                        $rowapprovedata = $this->setting->getEmployeedatabyid($param['approveby_id']);
                        $approvename    = null;
                        if (isset($rowapprovedata['employee_name'])) {
                            $approvename = $rowapprovedata['employee_name'];
                        }

                        $resultuseraccess      = $this->setting->getUserdata();
                        $this->setting->_param = $arraydata;
                        $result                = array(
                            "totalamount"        => $totalamount,
                            "terbilang"          => $terbilang,
                            "ptname"             => $param['ptname'],
                            "dibuatoleh"         => $madeby,
                            "disetujui"          => $approvename,
                            "paramxml"           => trim(preg_replace('/\s\s+/', ' ', $this->setting->converttoXml())),
                            "voucher_date"       => $this->checkDate(date('d-m-Y', strtotime($param['voucher_date']))),
                            "chequegiro_date"    => $this->checkDate(date('d-m-Y', strtotime($param['chequegiro_date']))),
                            "voucher_no"         => $param['voucher_no'],
                            "cashier_voucher_no" => $param['cashier_voucher_no'],
                            "vendorname"         => $param['vendorname'],
                            "cashier_note"       => $param['cashier_note'],
                            "vendor_note"        => $param['vendor_note'],
                        );
                        $valid   = true;
                        $counter = 0;
                        $message = 'data success generate';
                        break;
                    default: 
                        $result   = null;
                        $valid    = false;
                        $counter  = 1;
                        $idheader = 0;
                        $message  = 'data error';
                }
                $this->setDefaultsp();
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg"       => $message,
                    "success"   => $valid,
                    "data"      => $result,
                    "total"     => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function setDefaultsp() {
        $this->setting->_storeprocedure = 'sp_th_voucher_request';
    }

    public function checkDate($date) {
        if ($date == '01-01-1970') {
            $cleardate = '';
        } else if ($date == '01-01-1990') {
            $cleardate = '';
        }else if ($date == '01-01-1970 07:00:00') {
            $cleardate = '';
        }else if ($date == '01-01-1990 07:00:00') {
            $cleardate = '';
        }else {
            $cleardate = $date;
        }
        return $cleardate;
    }

    public function setStatusvoucher_id_inkasbondept($voucher_id) {
        $resultvoucher = $this->setting->getdata_bytableparam($this->setting->_th_voucher, array(
            'voucher_id' => $voucher_id
        ));
        $row           = $resultvoucher[0][0];
        $kasbondept_id = $row['kasbondept_id'];
        if ($kasbondept_id > 0) {
            $recordupdate = array(
                "voucher_id" => $voucher_id
            );
            $this->setting->update_bytableparam_v2($this->setting->_th_kasbondept, $recordupdate, array("kasbondept_id" => $kasbondept_id));
        }
    }

    public function sendEmailRevisetoMaker($param)
    {
        $user_maker_id = $param['addby'];
        $approver_id   = $param['user_id'];
        $rowuser       = $this->generaldata->getUserdatabyid($user_maker_id);
        $rowapprover   = $this->generaldata->getUserdatabyid($approver_id);
        if ($rowuser !== null) {
            $mail             = new Cashier_Box_Library_EmailKasbank();
            $user_maker_email = $rowuser['user_email'];
            $user_maker_name  = $rowuser['user_fullname'];
            $approver_email   = $rowapprover['user_email'];
            $approver_name    = $rowapprover['user_fullname'];

            $subject = 'VOUCHER DEPARTMENT REQUEST '.$param['voucher_no'].' has been revise by '.strtoupper($approver_name);

            $param['approvename'] = $approver_email;
            $param['vid']         = $param['vid'];

            $message = $this->_templatemsg->htmlvoucherdeptneedrevise($param);

            $mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
            $mail->setData()->setBodyHtml($message);
            $mail->setData()->addTo($user_maker_email, $user_maker_name);
            $mail->setData()->setSubject($subject);   
            $mail->setData()->send();
        }
    }
    
    private function insertLogPrint($param){
        $this->setting->_storeprocedure = 'sp_th_voucher_request';
        $this->setting->_param          = $param;
        $this->setting->_paramsql       = 'createlogprint';
        $this->setting->_pt_id          = $param['pt_id'];
        $this->setting->_project_id     = $param['project_id'];
        $this->setting->_user_id        = $this->_user_id;
        $result                         = $this->setting->executeSP();
    }
    
	private function encrypt_decrypt($action, $string){
		/* =================================================
		* ENCRYPTION-DECRYPTION
		* =================================================
		* ENCRYPTION: encrypt_decrypt('encrypt', $string);
		* DECRYPTION: encrypt_decrypt('decrypt', $string) ;
		*/
		$output = false;
		$encrypt_method = "AES-256-CBC";
		$secret_key = 'WS-SERVICE-KEY';
		$secret_iv = 'WS-SERVICE-VALUE';
		// hash
		$key = hash('sha256', $secret_key);
		// iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
		$iv = substr(hash('sha256', $secret_iv), 0, 16);
		if ($action == 'encrypt') {
			$output = base64_encode(openssl_encrypt($string, $encrypt_method, $key, 0, $iv));
		} else {
			if ($action == 'decrypt') {
				$output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
			}
		}
		return $output;
	}


}

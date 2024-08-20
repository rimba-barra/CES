<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

require_once dirname(__FILE__) . '/../box/library/EmailKasbank.php';

class Cashier_Models_VDApprove extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;
    private $_mail = null;
    private $_templatemsg = null;

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
        $this->generaldata = new Cashier_Models_General_Generaldata;
        $this->setting->_storeprocedure = 'sp_th_voucher_approve';
    }

    function VDApproveRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];

                $this->setting->get_groupid(); //untuk mendapatkan data group user akses
                if ($this->setting->_group_id == 58 ||
                        $this->setting->_group_id == 73
                ) {
                    //jika hak akses level admin akan di bukakan seluruh datanya
                    //58=Administrator Cashier
                    //73=Developer - Cashier
                    $this->setting->_param = $param;
                    $param['fordata'] = '';
                } else {
                    $param['fordata'] = 'dataapproval';
                    $resultemployee = $this->setting->getEmployeedata();
                    $this->setting->_param = $param;
                    $this->setting->_param['approveby_id'] = $resultemployee['employee_id'];
                }


                $this->setting->_storeprocedure = 'sp_th_voucher_approve_read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_pt_id = ( isset($param['pt_id']) ? $param['pt_id'] : $this->_pt_id );
                        $this->setting->_param['hideparam'] = 'default';
                        $this->setting->_param['start'] = 0;
                        $this->setting->_param['limit'] = 25;
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
                    case 'approve_only':
                        $this->setting->_pt_id = ( isset($param['pt_id']) ? $param['pt_id'] : $this->_pt_id );
                        $this->setting->_param['hideparam'] = 'approve_only';
                        $this->setting->_param['desc'] = $param['desc'];
                        $this->setting->_param['start'] = $param['start'];
                        $this->setting->_param['limit'] = 25;
                        $result = $this->setting->executeSP();
                        // echo json_encode($result);die;
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
                        $this->setting->_pt_id = ( isset($param['pt_id']) ? $param['pt_id'] : $this->_pt_id );
                        $this->setting->_param['start'] = 0;
                        $this->setting->_param['limit'] = 25;
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
                    case 'getdataonlyapprove':
                        $this->setting->_param['hideparam'] = 'approve_only';
                        $this->setting->_param['limit'] = '100000';
                        $this->setting->_param['status'] = 2;
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
                    case 'getemployee':
                        $resultemployee = $this->setting->getEmployeedata();
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

                    default:
                        $resultemployee = $this->setting->getEmployeedata();
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

    public function sendemailtax($param) 
    {        
        $common = new Cashier_Models_Common();

        $rowvoucher = $this->getdataVoucherbyid($param); 
        $this->updateStatusmail($param);

        $param['hideparam'] = 'getuserapproval';
        $approval_list = $common->dataRead($param);
        
        $need_approval_hod = array_filter($approval_list['data'], function ($approve) {
            return ($approve['approval_type'] == 'hod_approve' && $approve['in_approval'] == 1);
        });

        $isWithNotif = $this->generaldata->getGlobalParam(0, 0, 'email_notification_approval_vdrequest');

        if ($isWithNotif == 1) {

            try {
                foreach ($approval_list['data'] as $approver) {
                    
                    $statusemailrequest = $rowvoucher['requestmail'] == "" ? 0 : $rowvoucher['requestmail'];
                    
                    if ($approver['approval_type'] == 'tax_approve') {
                        $mail = new Cashier_Box_Library_EmailKasbank();
                        if ($statusemailrequest == 0) {
                            $addby = $rowvoucher['addby'] == '' ? $this->_session->getUserId() : $rowvoucher['addby'];
                            $rowuser = $this->generaldata->getUserdatabyid($addby);
                            if ($rowuser !== null) {
        
                                $nameuserrequest = $rowuser['user_fullname'];
                                $email_user = $rowuser['user_email'];
                                
                                $setfrom = $email_user;   
                                                
                                if($this->_project_id==1 && $this->_pt_id==1){
                                    $emailcc = array($email_user);
                                }else{
                                    $emailcc = array($email_user);
                                }
        
                                $subject = 'VOUCHER DEPARTMENT REQUEST APPROVAL (TAX) FOR '.strtoupper($nameuserrequest);
        
                                $nip_approver = $approver['approval_by'];
                                $rowuserApproval = $this->generaldata->getUserdatabyid($nip_approver);
        
                                $emailapproval = $rowuserApproval['user_email'];            
                                $employeename = $rowuserApproval['user_fullname'];
                                $param['approvename'] = $employeename;
                                // if($param['approvename']=="") {
                                    
                                // }
                                
                                $addto = $emailapproval;
                                $addtoalias = $employeename;
        
                                $param['userrequest']=$nameuserrequest;
                                $message = $this->_templatemsg->htmlvoucherrequest($param);

                                $mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
                                $mail->setData()->setBodyHtml($message);
                                $mail->setData()->addTo($addto, $addtoalias);
                                $mail->setData()->addCc($emailcc);
                                $mail->setData()->setSubject($subject);   
        
                                if (count($need_approval_hod) == 0) {
                                    $mail->setData()->send();
                                }
                                
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
        if(!isset($param['approveby_id'])){
            $param['approveby_id']=0;
        }
        if (!isset($param['addby'])){
            $param['addby']= $param['approveby_id'];
        }
        if($param['addby']==null || $param['addby']=='' || $param['addby']==0){
            $param['addby']= $param['approveby_id'];
        }
        $rowuser = $this->generaldata->getUserdatabyid($param['addby']);
        if ($rowuser !== null) {
            $rowemployeeuser = $this->generaldata->getEmployeebyId($rowuser['employee_id']);
            $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
            $rowvoucher = $this->getdataVoucherbyid($param);
            $statusemail = $rowvoucher['approvemail'];
            if (!empty($rowemployee)) {

                $user_request = 'NO NAME';
                $email_user = null;
                $emailapproval = null;
                $employeename = 'NO NAME';

                if(isset($rowemployeeuser['employee_name'])){
                    $user_request = $rowemployeeuser['employee_name'];
                    $email_user = $rowemployeeuser['email_ciputra'];
                    if(isset($rowemployee['employee_name'])){
                        $emailapproval = $rowemployee['email_ciputra'];
                        $employeename = $rowemployee['employee_name'];
                    }
                }else{
                    $user_request = 'NO NAME';
                    $email_user = null;
                    $emailapproval = null;
                    $employeename = 'NO NAME';
                }


//                if($this->_project_id==1 && $this->_pt_id==1){           
//                    $app = array($emailapproval);
//		    $email_auth = new Cashier_Box_GlobalParams();
//                    $emailcc = array_filter(array_merge($email_auth->emailcc_1pt1,$app),'strlen');
//
//                }else{
//                    $emailcc = array($emailapproval);
//                }

                if ($param['hideparam'] == 'approve') {
                    $app = array($emailapproval);
                    $email_auth = new Cashier_Box_GlobalParams();
                    $conf = 'emailcc_' . $this->_project_id . 'pt' . $this->_pt_id;
                    try {
                        if (isset($email_auth->$conf)) {
                            $emailcc = array_filter(array_merge($email_auth->$conf, $app), 'strlen');
                        } else {
                            $emailcc = array($emailapproval);
                        }
                    } catch (Exception $e) {
                        $emailcc = array($emailapproval);
                    }

                } else {
                    $emailcc = array($emailapproval);
                }

                if ($param['hideparam'] == 'approve') {
                    $subject = ' VOUCHER DEPARTMENT HAS APPRPOVED FOR ' . strtoupper($user_request);
                } elseif ($param['hideparam'] == 'reject') {
                    $subject = ' VOUCHER DEPARTMENT HAS BEEN REJECTED FOR ' . strtoupper($user_request);
                } else {
                    $subject = ' VOUCHER DEPARTMENT HAS UNAPPROVED FOR ' . strtoupper($user_request);
                }

                $param['userrequest'] = $user_request;
                $param['approvename'] = $employeename;



                $message = $this->_templatemsg->htmlvoucherapprove($param);
                //$this->_mail->setData()->setFrom($emailapproval); //bermasalah klo di set ke $emailapproval

                $this->_mail->setData()->setFrom($this->_mail->emailuser);
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo($email_user, $user_request);
                $this->_mail->setData()->addCc($emailcc);
                $this->_mail->setData()->setSubject($subject);

                //if ($this->_mail->setData()->send()) {

                //DEACTIVATE EMAILS
                if (true) {
                //if ($this->_mail->setData()->send()) {
                    //echo 'succes send mail';
                    $this->updateStatusmail($param);
                } else {
                    //echo 'failed send mail';
                }
            }
        }
    }

    public function sendmaildata_old($param) {
        $rowuser = $this->generaldata->getUserdatabyid($param['addby']);
        if ($rowuser !== null) {
            $rowemployee = $this->generaldata->getEmployeebyId($rowuser['employee_id']);
            $rowvoucher = $this->getdataVoucherbyid($param);
            $statusemail = $rowvoucher['approvemail'];
            if (!empty($rowemployee)) {
                $emailapproval = $rowemployee['email'];
                $employeename = $rowemployee['employee_name'];
                $setfrom = 'info.testerdata@gmail.com';
                $addto = $emailapproval;
                $addtoalias = $employeename;
                $subject = strtoupper($employeename) . ' - VOUHCER DEPARTMENT ' . strtoupper($param['hideparam']);
                $message = $this->_templatemsg->htmlvoucherrequest($param);
                $this->_mail->setData()->setFrom('testerdev72@gmail.com');
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo('ahmadriadi.ti@gmail.com', 'Ahmad Riadi');
                $this->_mail->setData()->setSubject($subject);
                if ($this->_mail->setData()->send()) {
                    //echo 'succes send mail';
                    $this->updateStatusmail($param);
                } else {
                    //echo 'failed send mail';
                }
            }
        }
    }

    private function updateStatusmail($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['voucher_id'];
        $this->setting->_param = array(
            "hideparam" => $param['hideparam'],
            "approval_notes" => isset($param['approval_notes']) ? $param['approval_notes'] : ""
        );
        $result = $this->setting->executeSP();
        // UNTUK SEND EMAIL KE PEMBUAT VOUCHER KALAU SUDAH DIAPPROVE
        $check = $this->getRules($param);
        if ( $check[0][0]['TOTAL'] > 0 ) {
            $this->sendEmailtoMaker($param);
        }
        return $result;
    }

    private function getdataVoucherbyid($param) {
        $pt = $param['pt_id'];
        $project = $this->_project_id;
        $voucher_id = $param['voucher_id'];
        $department_id = $param['department_id'];

        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'read',
            "start" => 0,
            "limit" => 1,
            "project_id" => $project,
            "pt_id" => $pt,
            "department_id" => $department_id,
            "voucher_id" => $voucher_id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = null;
        }
        return $return;
    }

    public function VDApproveCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_storeprocedure = 'sp_th_voucher_approve_create';
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();
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
                            $idheader = $result[5][0]['voucher_id'];
                            $this->sendmaildata($param);
                        }
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

    public function VDApproveUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['voucher_id'];
                $this->setting->_storeprocedure = 'sp_th_voucher_approve_update';
                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[4][0]['voucher_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'approve':
                        $this->sendmaildata($param);
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'sending email approve';
                        break;
                    case 'approvesby':
                        $this->sendemailtax($param); 
                        $result = null;
                        $valid = true;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'sending email approve';
                        break;
                    case 'approvepajak':
                        $this->sendmaildata($param);
                        $result = null;
                        $valid = true;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'sending email approve tax';
                        break;
                    case 'unapprove':
                        $this->sendmaildata($param);
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $idheader = 0;
                        $message = 'sending email unapprove';
                        break;
                    case 'reject':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[0][0]['voucher_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'pending':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[0][0]['voucher_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'revise':

                        $result = $this->setting->executeSP();
                        $message = $result[5][0]['MSG'];
                        $valid = $result[3][0]['VALIDDATA'];
                        $counter = $result[4][0]['RECORD_TOTAL'];

                        if ($valid == 'true') {

                            $valid = $this->sendEmailRevise($result[0][0]['EMAIL_CONTENT'], $result[1][0]['EMAIL_TO'], $result[2]);
                            
                        }

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

    function VDApproveDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'voucher_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_storeprocedure = 'sp_th_voucher_approve_delete';
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
    function sendEmailRevise($email, $to, $cc) {
        try {
            $mail = new Cashier_Box_Library_EmailKasbank();
            $mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
            $mail->setData()->addTo($to, $to);
            $mail->setData()->setBodyHtml($email);

            foreach ($cc as $c) {
                $mail->setData()->addCc($c['approval_by'], $c['approval_by']);
            }

            if ($_SERVER['SERVER_NAME'] == "localhost" || $_SERVER['SERVER_NAME'] == "ces-cashier.ciputragroup.com") {
                $subject = "[TESTING] Voucher Department Request Need Revision";
            } else {
                $subject = "Voucher Department Request Need Revision";
            }

            $mail->setData()->setSubject($subject);
            $mail->setData()->send();

            return true;
        } catch (Zend_Mail_Exception $e) {
            return false;
        }
    }

    function sendEmailtoMaker($param)
    {
        $user_maker_id = $param['addby'];
        $approver_id = $param['approveby_id'];
        $rowuser = $this->generaldata->getUserdatabyid($user_maker_id);
        $rowapprover = $this->generaldata->getUserdatabyid($approver_id);
        $rowvoucher = $this->getVid($param);
        if ($rowuser !== null) {
            $mail = new Cashier_Box_Library_EmailKasbank();
            $user_maker_email = $rowuser['user_email'];
            $user_maker_name = $rowuser['user_fullname'];
            $approver_email = $rowapprover['user_email'];
            $approver_name = $rowapprover['user_fullname'];

            $subject = 'VOUCHER DEPARTMENT REQUEST '.$param['voucher_no'].' has been approved by '.strtoupper($approver_name);

            $param['approvename'] = $approver_email;
            $param['vid'] = ( $rowvoucher[0][0]['vid'] ? $rowvoucher[0][0]['vid'] : '' );

            $message = $this->_templatemsg->htmlvoucherrequesthasapproved($param);

            $mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
            $mail->setData()->setBodyHtml($message);
            $mail->setData()->addTo($user_maker_email, $user_maker_name);
            $mail->setData()->setSubject($subject);   
            $mail->setData()->send();
        }
    }

    private function getRules($param) {
        // $result = $this->generaldata->customefromquery("SELECT TOP 1 COUNT(voucher_approval_id) AS TOTAL FROM cashier.dbo.td_voucher_approval WHERE voucher_id = ".$param['voucher_id']." AND deleted = 0 ");
        $result = $this->generaldata->customefromquery("SELECT TOP 1 COUNT(*) AS TOTAL FROM cashier.dbo.m_globalparam WHERE deleted = 0 AND project_id = ".$param['project_id']." AND pt_id = ".$param['pt_id']." AND name = ''approval_rules'' AND value = ''hod_approve'' ");
        return $result;
    }

    private function getVid($param) {
        $result = $this->generaldata->customefromquery("SELECT vid FROM cashier.dbo.th_voucher WHERE voucher_id = ".$param['voucher_id']." ");
        return $result;
    }

    function getVIDbyAPI($param){
        $result = $this->generaldata->customefromquery("SELECT vid FROM cashier.dbo.th_voucher WHERE voucher_id = ".$param['voucher_id']." ");
        $vid = 0;
        if (isset($result[0][0])) {
            $vid = $result[0][0]['vid'];
        }
        
        return $vid;
    }

    function LogAPISelfApprove($info, $params,$response){
        $notes = "API SELF APPROVE ".strtoupper($params['datasource']);
        // $result = $this->_db->query("EXEC cashier..sp_logAPI 'VOUCHER_DEPARTEMENT','".$params['datasource']."','".$info['http_code']."','".$info['url']."','".json_encode($info)."','".json_encode($params)."', '".json_encode($response)."', '".$notes."' ");
        $result = $this->_db->query("EXEC cashier..sp_logAPI 'VOUCHER_DEPARTEMENT','".$params['datasource']."','".$info['http_code']."','".$info['url']."','".json_encode($info)."','', '".json_encode($response)."', '".$notes."' ");
        
        return true;
    }
}

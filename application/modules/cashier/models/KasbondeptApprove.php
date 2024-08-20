<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_KasbondeptApprove extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;
    private $_mail = null;
    private $_templatemsg = null;
    private $datamodule = null;

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
        $this->function = new Cashier_Models_Function_Vouchertransaction;
        $this->datamodule = $this->generaldata->moduledata('T-CBD'); //TRANCATION CASHBON DEPARTMENT
        $this->setting->_storeprocedure = 'sp_kasbondeptapprove';
    }

    function KasbondeptApproveRead($param) {
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
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
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
           
                
       $param['dataflow']='O';
        $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
       
        $rowvoucher = $this->getdataVoucherbyid($param);
        $statusemailrequest = $rowvoucher['requestmail'];
        
     
        
        if (!empty($rowemployee) ) {
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

                $emailpproval = $rowemployee['email_ciputra'];

                if(!isset($emailapproval)){
                    $emailapproval = '';
                }

                if( $param['hideparam']=='approve'){           
                    $app = array($emailapproval);
		            $email_auth = new Cashier_Box_GlobalParams();
                    $conf = 'emailcc_'.$this->_project_id.'pt'.$this->_pt_id;
                    $emailcc = array_filter(array_merge($email_auth->$conf,$app),'strlen');

                }else{
                    $emailcc = array($emailapproval);
                }
                
               

                
                $param['userrequest'] = $nameuserrequest;
                $emailapproval = $rowemployee['email_ciputra'];
                $employeename = $rowemployee['employee_name'];
                //$setfrom = 'info.testerdata@gmail.com';
                $addto = $email_user;
                $addtoalias = $nameuserrequest;
                $param['approvename'] = $employeename;
                if($param['hideparam']=='approve'){
                     $subject = ' KASBON DEPARTMENT HAS APPRPOVED FOR '.strtoupper($nameuserrequest);
                }else{
                    $subject = ' KASBON DEPARTMENT HAS UNAPPROVED FOR '.strtoupper($nameuserrequest);
                }
               
              
                   
                $message = $this->_templatemsg->htmlkasbonapprove($param);
                
                
                
                $this->_mail->setData()->setFrom($this->_mail->emailuser);
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo($addto, $addtoalias);
                $this->_mail->setData()->addCc($emailcc);
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

    public function KasbondeptApproveCreate($param) {
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

    public function KasbondeptApproveUpdate($param) {
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
                        //Override, ini resultnya jadi hanya 4, index arraynya kurangi dari sebelumnya.
                        if(sizeof($result)>4){
                            $result['idheader'] = $result[4][0]['kasbondept_id'];
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                        }else{
                            $result['idheader'] = $result[3][0]['kasbondept_id'];
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                        }

                        break;
                    case 'decline':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[5][0]['kasbondept_id'];
                        $valid = $result[2][0]['VALIDDATA'];
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        $message = $result[4][0]['MSG'];
                        break;
                    case 'unapprove':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[5][0]['kasbondept_id'];
                        $valid = $result[2][0]['VALIDDATA'];
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        $message = $result[4][0]['MSG'];
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

    function KasbondeptApproveDelete($param = array()) {
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

    public function KasbondeptApproveApprove($param) {
     
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
               
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $param['voucher_date']=date('Y-m-d', strtotime($param['voucher_date']));
                //$param['status']='2';
                $param['status']='69';  //bedakan approve action dengan posting
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbondept_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'approve':
                        //$this->sendmaildata($param);
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[5][0]['kasbondept_id'];
                        $valid = $result[2][0]['VALIDDATA'];
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        $message = $result[4][0]['MSG'];
                       // $this->sendmaildata($param);
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

    public function KasbondeptApproveUnapprove($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['moduletrx_id'] = $this->datamodule['module_id'];
                $param['voucher_date']=date('Y-m-d', strtotime($param['voucher_date']));
                //$param['status']='1';
                $param['status']='99'; //bedakan unapprove action dengan belum diapprove
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbondept_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'decline':
                    die(print_r($param));
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[4][0]['kasbondept_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                     case 'unapprove':
                    die(print_r($param));
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

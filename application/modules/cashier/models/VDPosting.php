<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_VDPosting extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;
    private $_mail = null;
    private $_templatemsg = null;
    private $vdatadetail = null;
    private $kasbank_id = 0;
    private $datamodule = null;
    private $voucherfomgrid = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        //$this->_mail = Zend_Controller_Action_HelperBroker::getStaticHelper('Email');
        $this->_mail = new Cashier_Helpers_Email();
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_templatemsg = new Cashier_Helpers_Templatemail;
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time = date('H:i:s');

        $this->setting = new Cashier_Models_General_Setdata;
        $this->generaldata = new Cashier_Models_General_Generaldata;
        $this->payment = new Cashier_Models_Payment;
        $this->datamodule = $this->generaldata->moduledata('T-VCH');
        $this->setting->_storeprocedure = 'sp_th_voucher_posting';
    }

    function VDPostingRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';

                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
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
                    case 'search':
                        $resultemployee = $this->setting->getEmployeedata();
                        $this->setting->_param = $param;
                        $this->setting->_pt_id = $param['pt_id'];
                        //$this->setting->_param['department_id'] = $resultemployee['department_id'];
                        $this->setting->_storeprocedure = 'sp_th_voucher_posting';
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

    public function sendmaildata($param) {
        $rowuser = $this->generaldata->getUserdatabyid($param['addby']);
        if ($rowuser !== null) {
            $rowemployee = $this->generaldata->getEmployeebyId($rowuser['employee_id']);
            $rowparent = $this->generaldata->getEmployeebyId($param['approveby_id']);
            $rowvoucher = $this->getdataVoucherbyid($param);
            $statusemail = $rowvoucher['approvemail'];
            if (!empty($rowemployee)) {
                $emailapproval = $rowemployee['email'];
                $employeename = $rowemployee['employee_name'];
                $setfrom = 'info.testerdata@gmail.com';
                $addto = $emailapproval;
                $addtoalias = $employeename;

                $this->updateStatusmail($param);

                $param['approvename'] = $employeename;
                $subject = strtoupper($employeename) . ' - VOUHCER DEPARTMENT ' . strtoupper($param['hideparam']);
                $message = $this->_templatemsg->htmlvoucherrequest($param);
                $this->_mail->setData()->setFrom('testerdev72@gmail.com');
                $this->_mail->setData()->setBodyHtml($message);
                $this->_mail->setData()->addTo('ahmadriadi.ti@gmail.com', 'Ahmad Riadi');
                $this->_mail->setData()->setSubject($subject);

                /* if ($this->_mail->setData()->send()) {
                  //echo 'succes send mail';
                  $this->updateStatusmail($param);
                  } else {
                  //echo 'failed send mail';
                  }
                 * 
                 */
            }
        }
    }

    private function updateStatusmail($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['voucher_id'];
        $this->setting->_param = array(
            "hideparam" => $param['hideparam'],
        );
        $result = $this->setting->executeSP();
        return $result;
    }

    public function VDPostingCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];
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
                            //$this->sendmaildata($param);
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

    private function getdataVoucherbyid($param) {
        $pt = $param['pt_id'];
        $project = $param['project_id'];
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
        $this->setting->_param = $param;

        return $return;
    }

    private function getdataVoucherdetailbyheader($param) {
        $this->setting->_storeprocedure = 'sp_td_voucherdetail';
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'read',
            "start" => 0,
            "limit" => 1000,
            "voucher_id" => $param['voucher_id'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2];
        } else {
            $return = null;
        }
        $this->setting->_param = $param;
        $this->vdatadetail = $return;
    }

    private function checkPostingCash($param) {
        $this->setting->_paramsql = 'checkdata';
        $this->setting->_iddata = $param['voucher_id'];
        $this->setting->_param = array(
            "project_id" => $this->_project_id,
            "pt_id" => $param['pt_id'],
            "hideparam" => 'checkcash',
            "department_id" => $param['department_id'],
            "voucherprefix_id" => $param['voucherprefix_id'],
            "cashier_voucher_no" => $param['cashier_voucher_no'],
            "cashier_voucher_date" => date('Y-m-d', strtotime($param['cashier_voucher_date'])),
            "dataflow" => $param['dataflow'],
        );

        $result = $this->setting->executeSP();
        $total = $result[1][0]['RECORD_TOTAL'];
        if (!empty($result[2])) {
            $data = $result[2];
        } else {
            $data = null;
        }
        $return = array("total" => $total, "data" => $data);
        $this->setting->_param = $param;
        return $return;
    }

    public function getTransnocash($param) {
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_paramsql = 'read';
        $record = array(
            "hideparam" => 'gettransnocash',
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "kasbank" => 'KAS',
            "accept_date" => date('Y-m-d', strtotime($param['cashier_voucher_date'])),
        );
        $this->setting->_param = $record;
        $result = $this->setting->executeSP();
        $this->setting->_param = $param;
        return $result[1][0]['RECORD_TOTAL'];
    }

    public function getvendorbyid($vendor_id) {
        $this->setting->_tabledata = $this->setting->_m_vendor;
        $result = $this->setting->getdata_standard_v2(array(
            "vendor_id" => $vendor_id,
            "deleted" => 0,
        ));
        if (!empty($result[0])) {
            return $result[0][0];
        } else {
            return null;
        }
    }

    private function createdataCash($param) {
        $transno = $this->getTransnocash($param);
        $this->setting->_paramsql = 'postingformvoucherdepartment';
        $this->setting->_param['hideparam'] = 'create';
        $this->setting->_storeprocedure = 'sp_th_kasbank_cash';

        $vendor_id = $param['vendor_id'];
        $vendorname = null;
        if (intval($vendor_id) > 0) {
            $rowvendor = $this->getvendorbyid($vendor_id);
            $vendorname = $rowvendor['vendorname'];
        }
        
        if($param['kasbondept_id'] > 0){
            $description = strtoupper($vendorname . ":" . $param['description'] . ':' . $param['cashier_note'].': CASH ADVANCE, CA DEPT NO : '.$param['kasbondept_no'].',Request Amount :'.$param['kasbondept_amount']);
        }else{
            $description = strtoupper($vendorname . ":" . $param['description'] . ':' . $param['cashier_note']);
        }
        

        $this->setting->_param = array(
            "hideparam" => 'createfromvoucherdepartment',
            "moduletrx_id" => $this->datamodule['module_id'],
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "department_id" => $param['department_id'],
            "transno" => $transno,
            "voucherprefix_id" => $param['voucherprefix_id'],
            "prefix_id" => $param['prefix_id'],
            "coa_id" => $param['coa_id'],
            "grouptrans_id" => 0,
            "cashbon_project_id" => 0,
            "made_by" => $param['made_by'],
            "cashbon_project_id" => null,
            "kasbon_paid" => 0,
            "cashbon_paid" => 0,
            "voucher_no" => $param['cashier_voucher_no'],
            "dataflow" => $param['dataflow'],
            "kasbank" => "KAS",
            "kasbank_date" => date('Y-m-d', strtotime($param['cashier_voucher_date'])),
            "accept_date" => date('Y-m-d', strtotime($param['cashier_voucher_date'])),
            "amount" => $param['amount'],
            // "description" => $param['description'] .','.$vendorname. ' , ' . $param['cashier_note'],
            "description" =>$description, //dikonfirmasi ole putri 
        );
        $result = $this->setting->executeSP();
        $validation = $result[1][0]['VALIDDATA'];
        if ($validation == 'true') {
            $data = $result[3][0];
            $this->createKasbankdetail($data, $param, "sp_td_kasbankdetail_cashdetail");
            $total = $result[4][0]['RECORD_TOTAL'];
            $msg = $result[5][0]['MSG'];
            $this->kasbank_id = $data['kasbank_id'];
        } else {
            $total = $result[2][0]['RECORD_TOTAL'];
            $msg = $result[3][0]['MSG'];
            $data = $result[4][0];
        }

        $this->setting->_param = $param;
        $return = array("total" => $total, "msg" => $msg, "data" => $data, "valid" => $validation);
        return $return;
    }

    public function getdata_kasbondept($param) {
        if (isset($param['kasbondept_id'])) {
            if (!empty($param['kasbondept_id']) && intval($param['kasbondept_id']) > 0) {
                $kasbondept_id = $param['kasbondept_id'];
                $datakasbondept = $this->setting->getbyid_kasbondept($kasbondept_id);
                if (!empty($datakasbondept)) {
                    $amount_in_voucher = floatval($param['amount']);
                    $amount_in_kasbondept = floatval($datakasbondept['amount']);
                    $amount_in_kasbondept_bayar = floatval($datakasbondept['amount_bayar']);
                    $amount_in_kasbondept_selisih = floatval($datakasbondept['amount_selisih']);
                    $status_in_kasbondept = $datakasbondept['status'];

                    $amount_realisasi = floatval($datakasbondept['amount_bayar'])+floatval($amount_in_voucher);                   
                    $amount_balance = floatval($amount_in_kasbondept) - floatval($amount_realisasi);
                    //jika status belum di closing, maka masih bisa di proses kasbonnya  
                    //closng di tandai dengan flag 5, atau amount_balance = 
                    if ($status_in_kasbondept !== 5) {

                        if ($amount_balance == 0) {
                            $statuskasbonkasir = "PROCESSED";
                            $statuskasbonkasirflag = "Y";
                            $statusrealisasikasbondept = 5;
                        } else {
                            $statuskasbonkasir = "BEINGPROCESSED";
                            $statuskasbonkasirflag = "T";
                            $statusrealisasikasbondept = 4;
                        }

                        $recordforkasbondept = array(
                            "amount_bayar" => $amount_realisasi,
                            "amount_selisih" => $amount_balance,
                            "status" => $statusrealisasikasbondept,
                        );


                        $this->setting->update_bytableparam_v2($this->setting->_th_kasbondept, $recordforkasbondept, array('kasbondept_id' => $kasbondept_id));

                        $datakasbonkasir = $this->setting->getbyid_kasbonkasirforkasbondept($kasbondept_id);
                        if (!empty($datakasbonkasir)) {
                            if ($datakasbonkasir['statusdata'] !== 'PROCESSED' || $datakasbonkasir['status'] !== 'Y') {
                                $kasbonkasir_id = $datakasbonkasir['kasbon_id'];

                                $recordforkasbonkasir = array(
                                    "paid" => $amount_realisasi,
                                    "balance" => $amount_balance,
                                    "status" => $statuskasbonkasirflag,
                                    "statusdata" => $statuskasbonkasir,
                                );
                                $this->setting->update_bytableparam_v2($this->setting->_th_kasbon, $recordforkasbonkasir, array('kasbon_id' => $kasbonkasir_id));
                            }
                        }
                    }
                }
            }
        }
    }

    public function createdataBank($param) {
        $data = $param;
        $transno = $this->getTransnobank();
        $this->setting->_param['hideparam'] = 'create';
        $this->setting->_paramsql = 'postingformvoucherdepartment';
        $this->setting->_storeprocedure = 'sp_th_kasbank_bank';
        $status = 'PROCESSED';
        //cashbon_create_by untuk mengakali made_by

        $vendor_id = $param['vendor_id'];
        $vendorname = null;
        if (intval($vendor_id) > 0) {
            $rowvendor = $this->getvendorbyid($vendor_id);
            $vendorname = $rowvendor['vendorname'];
        }
        
        if($param['kasbondept_id'] > 0){
            $description = strtoupper($vendorname . ":" . $param['description'] . ':' . $param['cashier_note'].': CASH ADVANCE, CA DEPT NO : '.$param['kasbondept_no'].',Request Amount :'.$param['kasbondept_amount']);
        }else{
            $description = strtoupper($vendorname . ":" . $param['description'] . ':' . $param['cashier_note']);
        }


        $this->setting->_param = array(
            "parametersql" => "create",
            "statedata" => "create",
            "hideparam" => "createfromvoucherdepartment",
            "moduletrx_id" => $this->datamodule['module_id'],
            "project_id" => $data['project_id'],
            "pt_id" => $data['pt_id'],
            "department_id" => $data['department_id'],
            "transno" => $transno,
            "voucherprefix_id" => $data['voucherprefix_id'],
            "prefix_id" => $data['prefix_id'],
            "coa_id" => $data['coa_id'],
            "cashbon_create_by" => $data['made_by'],
            "voucher_no" => $data['cashier_voucher_no'],
            "chequegiro_no" => $data['chequegiro_no'],
            "dataflow" => $data['dataflow'],
            "kasbank" => 'BANK',
            "kasbank_date" => date('Y-m-d', strtotime($data['cashier_voucher_date'])),
            "accept_date" => date('Y-m-d', strtotime($data['cashier_voucher_date'])),
            "chequegiro_date" => date('Y-m-d', strtotime($data['chequegiro_date'])),
            "chequegiro_status" => $status,
            //"description" => $param['description'] .','.$vendorname. ' , ' . $param['cashier_note'],
            "description" =>$description, //dikonfirmasi ole putri 
            "amount" => $data['amount'],
        );
        $result = $this->setting->executeSP();
        $validation = $result[1][0]['VALIDDATA'];
        if ($validation == 'true') {
            $data = $result[3][0];
            $this->createKasbankdetail($data, $param, "sp_td_kasbankdetail_bankdetail");
            $total = $result[4][0]['RECORD_TOTAL'];
            $msg = $result[5][0]['MSG'];
            $this->kasbank_id = $data['kasbank_id'];
        } else {
            $total = $result[2][0]['RECORD_TOTAL'];
            $msg = $result[3][0]['MSG'];
            $data = $result[4][0];
        }

        $this->setting->_param = $param;
        $return = array("total" => $total, "msg" => $msg, "data" => $data, "valid" => $validation);
        return $return;
    }

    private function createKasbankdetail($data, $param, $sp) {
        $this->setting->_paramsql = 'create';
        $this->setting->_storeprocedure = $sp;
        if (!empty($this->vdatadetail)) {
            foreach ($this->vdatadetail as $row) {

                /*
                  if ($param['dataflow'] == 'I') {
                  $dataflow = 'O';
                  } else {
                  $dataflow = 'I';
                  }
                 */


                $this->setting->_param = array(
                    "project_id" => $data['project_id'],
                    "pt_id" => $data['pt_id'],
                    "kasbank_id" => $data['kasbank_id'],
                    "coa_id" => $row['coa_id'],
                    "coa_tmp" => $row['coa'],
                    "seq" => $row['indexdata'],
                    "kasbankdetail_date" => date('Y-m-d', strtotime($data['accept_date'])),
                    "dataflow" => $row['dataflow'],
                    "amount" => $row['amount'],
                    "description" => strtoupper($row['remarks']),
                );

                $this->setting->executeSP();
            }
        } else {
            if ($param['dataflow'] == 'I') {
                $dataflow = 'O';
            } else {
                $dataflow = 'I';
            }

            $this->setting->_param = array(
                "project_id" => $data['project_id'],
                "pt_id" => $data['pt_id'],
                "kasbank_id" => $data['kasbank_id'],
                "coa_id" => 0,
                "coa_tmp" => $param['fixed_coa'],
                "seq" => 1,
                "kasbankdetail_date" => date('Y-m-d', strtotime($data['accept_date'])),
                "dataflow" => $dataflow,
                "amount" => $data['amount'],
                "description" => strtoupper($data['description']),
            );
            $this->setting->executeSP();
        }

        $this->setting->_param = $param;
    }

    private function checkPostingBank($param) {
        $this->setting->_paramsql = 'checkdata';
        $this->setting->_iddata = $param['voucher_id'];
        $this->setting->_param = array(
            "project_id" => $this->_project_id,
            "pt_id" => $param['pt_id'],
            "hideparam" => 'checkbank',
            "department_id" => $param['department_id'],
            "voucherprefix_id" => $param['voucherprefix_id'],
            "cashier_voucher_no" => $param['cashier_voucher_no'],
            "chequegiro_no" => $param['chequegiro_no'],
            "cashier_voucher_date" => date('Y-m-d', strtotime($param['cashier_voucher_date'])),
            "dataflow" => $param['dataflow'],
        );
        $result = $this->setting->executeSP();
        $total = $result[1][0]['RECORD_TOTAL'];
        if (!empty($result[2])) {
            $data = $result[2];
        } else {
            $data = null;
        }
        $this->setting->_param = $param;
        $return = array("total" => $total, "data" => $data);
        return $return;
    }

    public function getTransnobank() {
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_paramsql = 'read';
        $data = $this->setting->_param;
        $record = array(
            "hideparam" => 'gettransnobank',
            "project_id" => $data['project_id'],
            "pt_id" => $data['pt_id'],
            "kasbank" => 'BANK',
            "accept_date" => date('Y-m-d', strtotime($data['cashier_voucher_date'])),
        );
        $this->setting->_param = $record;
        $result = $this->setting->executeSP();
        $this->setting->_param = $data;
        return $result[1][0]['RECORD_TOTAL'];
    }

    public function Datainform($param) {
        if (!empty($param) && is_array($param)) {
            $datavoucherprefix = $this->setting->getdata_bytableparam($this->setting->_m_voucherprefix, array('voucherprefix_id' => $param['voucherprefix_id']));
            if (!empty($datavoucherprefix[0])) {
                //print_r($param);
                $this->ProsesPosting($param);
                $rowvouchersetup = $datavoucherprefix[0][0];
                $param['module'] = ($param['kasbank'] == 'B') ? 'BANK' : 'KAS';
                $param['flag'] = '1';
                $prefixfromform = substr($param['cashier_voucher_no'], 0, -7);
                if (!empty($rowvouchersetup['temp_prefix']) && $param['kasbank'] == 'B') {
                    if (!empty($rowvouchersetup['temp_prefix'])) {
                        $param['prefix'] = $rowvouchersetup['temp_prefix'];
                    } else {
                        $param['prefix'] = $prefixfromform;
                    }
                } else {
                    $param['prefix'] = $prefixfromform;
                }
                $voucher_no = $this->docNumbervoucher($param);
                $param['cashier_voucher_no'] = $voucher_no;
                $this->setting->_param = $param;
                if ($param['kasbank'] == 'K') {
                    $result = $this->createdataCash($param);
                } else {
                    $result = $this->createdataBank($param);
                }

                if ($result['valid'] == true) {
                    $this->kasbank_id = $result['data']['kasbank_id'];
                    if (!empty($this->voucherfomgrid) && is_array($this->voucherfomgrid)) {
                        foreach ($this->voucherfomgrid as $rowvoucher) {
                            $this->updateVoucher($rowvoucher, 3, 'posting');
                            $this->getdata_kasbondept($rowvoucher);
                        }
                    }
                }
                return $result;
            }
        }
    }

    public function Datafromgrid($param) {
        $arraydetail = array();
        if (!empty($param) && is_array($param)) {
            $seq = 0;
            foreach ($param as $row) {
                $this->getdataVoucherdetailbyheader($row);
                if (!empty($this->vdatadetail[0]) && is_array($this->vdatadetail[0])) {
                    foreach ($this->vdatadetail as $rowdetail) {
                        $seq++;
                        $rowdetail['indexdata'] = $seq;
                        $arraydetail[] = $rowdetail;
                    }
                }
            }
        }
        $this->vdatadetail = $arraydetail;
    }

    public function VDPostingUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['voucher_id'];


                switch ($this->setting->_param['hideparam']) {
                    case 'postingfromgrid':
                        //print_r($param); 
                        $this->voucherfomgrid = $param['datafromgrid'];
                        $param['datainform']['vendor_id'] = $param['vendor_id'];
                        $this->Datafromgrid($param['datafromgrid']);
                        $result = $this->Datainform($param['datainform']);
                        $valid = $result['valid'];
                        $counter = $result['total'];
                        $message = $result['msg'];
                        $result['kasbank_id'] = $this->kasbank_id;
                        break;

                    case 'update':
                        $this->setting->_param['chequegiro_date'] = date('Y-m-d', strtotime($param['chequegiro_date']));
                        $this->setting->_param['cashier_voucher_date'] = date('Y-m-d', strtotime($param['cashier_voucher_date']));
                        $this->setting->_param['chequegiro_handover_date'] = date('Y-m-d', strtotime($param['chequegiro_handover_date']));

                        if ($this->setting->_param['status'] == '3') {
                            $this->setting->_param['hideparam'] = 'posting';
                            $this->setting->executeSP();
                        }

                        $this->setting->_param['hideparam'] = 'update';
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[4][0]['voucher_id'];
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'checkpostingcash':
                        $result = $this->checkPostingCash($param);
                        $counter = $result['total'];
                        $valid = true;
                        if ($counter > 0) {
                            $valid = false;
                        }
                        $result = $result;
                        $idheader = 0;
                        $message = 'check data';
                        break;
                    case 'postingcash':
                        $this->getdataVoucherdetailbyheader($param);
                        $result = $this->createdataCash($param);
                        $valid = $result['valid'];
                        if ($valid == true) {
                            $datavoucherdept = $this->setting->getbyid_voucherdepartment($param['voucher_id']);
                            $this->getdata_kasbondept($datavoucherdept);
                        }
                        $counter = $result['total'];
                        $message = $result['msg'];
                        $result['kasbank_id'] = $this->kasbank_id;
                        break;
                    case 'checkpostingbank':
                        $result = $this->checkPostingBank($param);
                        $counter = $result['total'];
                        $valid = true;
                        if ($counter > 0) {
                            $valid = false;
                        }
                        $result = $result;
                        $idheader = 0;
                        $message = 'check data';
                        break;
                    case 'postingbank':
                        $this->getdataVoucherdetailbyheader($param);
                        $result = $this->createdataBank($param);
                        $valid = $result['valid'];
                        if ($valid == true) {
                            $datavoucherdept = $this->setting->getbyid_voucherdepartment($param['voucher_id']);
                            $this->getdata_kasbondept($datavoucherdept);
                        }
                        $counter = $result['total'];
                        $message = $result['msg'];
                        $result['kasbank_id'] = $this->kasbank_id;
                        break;
                    case 'posting':
                        if ($param['kasbank'] == 'K') {
                            $param['module'] = 'KAS';
                            $param['flag'] = '1';
                            //$voucher_no = $this->docNumbervoucher($param);
                            //$param['cashier_voucher_no'] = $voucher_no;
                            $resultcash = $this->checkPostingCash($param);
                            $counter = $resultcash['total'];
                        } else {
                            $param['module'] = 'BANK';
                            $param['flag'] = '1';
                            //$voucher_no = $this->docNumbervoucher($param);
                            //$param['cashier_voucher_no'] = $voucher_no;
                            $resultbank = $this->checkPostingBank($param);
                            $counter = $resultbank['total'];
                        }

                        if ($counter < 1) {
                            $this->getdataVoucherdetailbyheader($param);
                            if ($param['kasbank'] == 'K') {
                                $result = $this->createdataCash($param);
                                $valid = $result['valid'];
                            } else {
                                $result = $this->createdataBank($param);
                                $valid = $result['valid'];
                            }

                            if ($valid == true) {
                                $resultvoucher = $this->updateVoucher($param, '3', 'posting');
                                $valid = $resultvoucher[1][0]['VALIDDATA'];
                                $counter = $resultvoucher[2][0]['RECORD_TOTAL'];
                                $msg = $resultvoucher[3][0]['MSG'];
                                $this->getdata_kasbondept($param);
                            } else {
                                $resultvoucher = null;
                                $valid = false;
                                $counter = 0;
                                $msg = "failed to update voucher flag posting";
                            }

                            $result = $resultvoucher;
                            $success = $valid;
                            $counter = $counter;
                            $msg = $msg;
                        } else {
                            $result = null;
                            $success = false;
                            $counter = 1;
                            $msg = "data already posting";
                        }

                        $result = $result;
                        $valid = $success;
                        $counter = $counter;
                        $idheader = 0;
                        $message = $msg;
                        break;
                    case 'unposting':
                        //$this->setting->_param['hideparam'] = 'unposting';
                        //$this->setting->executeSP();
                        $resultkasbank = $this->getKasBankbyID($param);

                        if (!empty($resultkasbank)) {
                            if ($resultkasbank['is_posting'] !== 2) {
                                $resultposting = $this->unPosting($param);
                                if ($resultposting[2][0]['VALIDDATA'] == true) {
                                    $this->setting->_param = $param;
                                    $this->setting->_paramsql = 'update';
                                    $this->setting->_storeprocedure = 'sp_th_voucher_posting';
                                    $this->setting->_param['hideparam'] = 'unposting';
                                    $this->setting->_iddata = $param['voucher_id'];
                                    $result = $this->setting->executeSP();
                                    $valid = true;
                                    $counter = 1;
                                    $idheader = 0;
                                    $message = 'Unposting success';
                                }
                            } else {
                                $result = null;
                                $valid = false;
                                $counter = 2;
                                $idheader = 0;
                                $message = 'Data has been closed';
                            }
                        } else {
                            $result = null;
                            $valid = false;
                            $counter = 1;
                            $idheader = 0;
                            $message = 'Data not exist on transaction cash or bank';
                        }

                        $result = $result;
                        $valid = $valid;
                        $counter = $counter;
                        $idheader = $idheader;
                        $message = $message;

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

    private function docNumbervoucher($param) {
        $_docdate = new DateTime(date('Y-m-d', strtotime($param['cashier_voucher_date'])));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);
        return $_docNo;
    }

    private function updateVoucher($param, $status, $hideparam) {
        $this->setting->_paramsql = 'update';
        $this->setting->_storeprocedure = 'sp_th_voucher_posting';
        $this->setting->_iddata = $param['voucher_id'];
        $this->setting->_pt_id = $param['pt_id'];
        $this->setting->_param['chequegiro_date'] = date('Y-m-d', strtotime($param['chequegiro_date']));
        $this->setting->_param['cashier_voucher_date'] = date('Y-m-d', strtotime($param['cashier_voucher_date']));
        $this->setting->_param['chequegiro_handover_date'] = date('Y-m-d', strtotime($param['chequegiro_handover_date']));
        $this->setting->_param['kasbank_id'] = $this->kasbank_id;

        if ($status == '3') {
            $this->setting->_param['hideparam'] = 'posting';
            $this->setting->executeSP();
        }
        $this->setting->_param['hideparam'] = 'update';
        $result = $this->setting->executeSP();
        return $result;
    }

    private function getKasBankbyID($param) {
        if ($param['kasbank'] == 'K') {
            $this->setting->_storeprocedure = 'sp_th_kasbank_cash';
            $kasbank = "KAS";
        } else {
            $this->setting->_storeprocedure = 'sp_th_kasbank_bank';
            $kasbank = "BANK";
        }

        $this->setting->_paramsql = 'read';

        $this->setting->_param = array(
            "hideparam" => 'read',
            "start" => 0,
            "limit" => 1000,
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "kasbank" => $kasbank,
        );
        $this->setting->_iddata = $param['kasbank_id'];
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = null;
        }
        $this->setting->_param = $param;
        return $return;
    }

    private function ProsesPosting($param) {
        if ($param['kasbank'] == 'K') {
            $this->setting->_storeprocedure = 'sp_th_kasbank_cash';
        } else {
            $this->setting->_storeprocedure = 'sp_th_kasbank_bank';
        }
    }

    private function unPosting($param) {
        $this->setting->_param['hideparam'] = 'delete';
        $this->setting->_paramsql = 'delete';
        $this->setting->_storeprocedure = 'sp_th_kasbank_cash';

        $this->setting->_iddata = $param['kasbank_id'];
        $result = $this->setting->executeSP();
        $this->setting->_param = $param;
        return $result;
    }

    function VDPostingDelete($param = array()) {
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

}

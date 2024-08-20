<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Common extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $counterdoc = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();
        $this->setting->_storeprocedure = 'sp_commondata';
    }

    public function clean_blackdiamondquestion($data) {
        $arraydata = array();
        $result = $data;
        foreach ($result as $row) {
            foreach ($row as $index => $value) {
                $row[$index] = utf8_encode($value);
            }
            $arraydata[] = $row;
        }
        return $arraydata;
    }

    function dataRead($param) {
      
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($param['hideparam']) {
                    case 'projectpt':
                        if ($param['project_id'] > 0) {
                            $this->setting->_project_id = $param['project_id'];
                        } else {
                            $this->setting->_project_id = $this->_project_id;
                        }
                        break;
                    case 'getcoabyprojectpt':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getcoabyprojectptall':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getcoabyprojectptdept':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getcoabyprojectptdeptV2':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getprefixbyprojectpt':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getprefixdistinct':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getdatakasbank':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getptbyproject':
                        $this->setting->_param['hideparam'] = 'ptbyproject';
                        $this->setting->_project_id = $param['project_id'];
                        break;
                    case 'getptbyprojectV2':
                        $this->setting->_param['hideparam'] = 'ptbyprojectV2';
                        $this->setting->_project_id = $param['project_id'];
                        break;
                    case 'getptbyuserproject':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_user_id = $param['user_id'];
                        break;                
                    case 'filterprefixbypt':
                        break;
                    case 'ptbydefaultproject':
                        break;
                    case 'getvendor':
                        //terlalu berat kalo show all
                        //$this->setting->_project_id = '';
                        //$this->setting->_pt_id = '';
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        //harus ada query ketiknya
                        if($param['query'] == NULL || $param['query'] == ''){
                            die('Please type vendor');
                        }
                        if($param['type_vendor']=='' || $param['type_vendor']=='external' || $param['type_vendor']=='internal'){
                            $param['type_vendor']='all';
                        }

                        break;
                    case 'getvendorbyproject':
                        $this->setting->_project_id = $param['project_id'];
                        //harus ada query ketiknya
                        if($param['query'] == NULL || $param['query'] == ''){
                            die('Please type vendor');
                        }

                        break;
                    case 'getvendorbyid':
                        $this->setting->_iddata = $param['iddata'];
                        break;
                    case 'getfirstandlastvendor':
                            $this->setting->_pt_id = $param['pt_id'];
                            $this->setting->_project_id = $param['project_id'];
                        break;
                    case 'filtercoabypt':
                        $projectptid = $this->setting->setDefaultProjectPt();
                        $this->setting->_project_id = $projectptid['project_id'];
                        break;
                    case 'filtercopykasbank':
                        break;
                    case 'getdatacurrency':
                        break;
                    case 'getdepartmentbyparam':
                        $this->setting->_param['hideparam'] = 'getdepartment';
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getdepartment':
                        $this->setting->_project_id = ((isset($param['project_id']))?$param['project_id']:$this->_project_id);
                        $this->setting->_pt_id = ((isset($param['pt_id']))?$param['pt_id']:$this->_pt_id);
                        $this->setting->_user_id = ((isset($param['user_id']))?$param['user_id']:$this->_user_id);
                        break;
                    case 'getdepartmentbyuser':
                        $this->setting->_project_id = ((isset($param['project_id']))?$param['project_id']:$this->_project_id);
                        $this->setting->_pt_id = ((isset($param['pt_id']))?$param['pt_id']:$this->_pt_id);
                        $this->setting->_user_id = ((isset($param['user_id']))?$param['user_id']:$this->_user_id);
                        break;
                    case 'getdepartmentbyuserv2':
                        $this->setting->_project_id = ((isset($param['project_id']))?$param['project_id']:$this->_project_id);
                        $this->setting->_pt_id = ((isset($param['pt_id']))?$param['pt_id']:$this->_pt_id);
                        $this->setting->_user_id = ((isset($param['user_id']))?$param['user_id']:$this->_user_id);
                        break;
                    case 'getdepartmentbyprojectpt':
                        $this->setting->_param['hideparam'] = 'getdepartment';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_user_id = ((isset($param['user_id']))?$param['user_id']:$this->_user_id);
                        break;
                    case 'getcoabyuseridnothave';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_user_id = $param['user_id'];
                        break;
                    case 'getvoucherprefixsetup';
                        $this->setting->_pt_id = $this->_pt_id;
                        break;
                    case 'validatebeforedeletecoa';
                        $this->setting->_iddata = $param['iddata'];
                        break;
                    case 'getprefixjournalbypt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_lastactiveyear = 2018; //pakai GL2018
                        break;
                    case 'usermodulecashier';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    break;
                    case 'getemployee';
                        if(isset($param['pt_id'])){
                            $this->setting->_pt_id = $param['pt_id'];
                        }
                        if(isset($param['project_id'])){
                            $this->setting->_project_id = $param['project_id'];
                        }
                    break;
                    case 'getemployeehod';
                        if(isset($param['pt_id'])){
                            $this->setting->_pt_id = $param['pt_id'];
                        }
                        if(isset($param['project_id'])){
                            $this->setting->_project_id = $param['project_id'];
                        }
                    break;
                    case 'getemployeebypt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        break;
                    case 'getemployeehodbypt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        break;
                    case 'getemployeebydept';
                        if(isset($param['pt_id'])){
                            $this->setting->_pt_id = $param['pt_id'];
                        }
                        if(isset($param['project_id'])){
                            $this->setting->_project_id = $param['project_id'];
                        }
                    case 'getemployeedatabyuserid':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        break;
                    case 'coagridbyuserpt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id_owner'];

                    case 'getsubglbykelsub';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        break;
                    case 'getsubglbyprojectpt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getpurchaseletter';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    break;
                    case 'getcluster';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    break;
                    case 'getclusterV2';
                        $this->setting->_project_id = ((isset($param['project_id']))?$param['project_id']:$this->_project_id);
                        $this->setting->_pt_id = ((isset($param['pt_id']))?$param['pt_id']:$this->_pt_id);
                        break;
                    break;
                    case 'getcoabyprojectptvoucher';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    break;
                    case 'getcoabyprojectptnotin';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        break;
                     case 'getstatusbyprojectpt':
                        break;
                    case 'getcoainsetupcashflow';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        break;
                    case 'getsetupcashflowbypt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        break;
                     case 'coagridbyuserptv2';
                       $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id_owner'];

                        break;
                    case 'getStaffNameCashAdvance':
                            $this->setting->_project_id = $param['project_id'];
                            $this->setting->_pt_id = $param['pt_id'];

                        break;
                    case 'getvoucherprefixcashback';
                        $this->setting->_pt_id = $this->_pt_id;

                        break;
                    case 'getpaymentmethod':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                    break;
                     case 'getcashbontype':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                    break;
                     case 'getgroupcashbontype':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                    break;
                    case 'getallcoawithsubaccount':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                    break;
                    case 'getdata_automailmodule':
                     $this->setting->_param['hideparam'] = 'getdata_automailmodule';
                    break;
                      case 'getdata_automailtype':
                     $this->setting->_param['hideparam'] = 'getdata_automailtype';
                    break;
                    case 'getjournalbyprojectpt':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getvoucherprefixsetupV3';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getaccountnumberbyprojectpt';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                     case 'coagridbypt';
                        $this->setting->_pt_id = $param['pt_id_owner'];
                     case 'coagridbyprojectpt_isjournal';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id_owner'];
                    case 'getvouchermaker':
                        $this->setting->_project_id = ((isset($param['project_id']))?$param['project_id']:$this->_project_id);
                        $this->setting->_pt_id = ((isset($param['pt_id']))?$param['pt_id']:$this->_pt_id);
                        break;
                    case 'validatecoaexistcpmsorems';
                        $this->setting->_iddata = $param['iddata'];
                        break;
                    case 'getcoaall':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        break;
                    case 'getreward':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        if($param['query'] == NULL || $param['query'] == ''){
                            die('Please type something');
                        }
                        break;


                        
                }
                $result = $this->setting->executeSP();
                // print_r($result);die;

                if ($param['hideparam'] == 'getemployeecashbon') {
                    if (!empty($result[2][0]['RECORD_TOTAL'])) {
                        $data = $result[3];
                        $total = $result[2][0]['RECORD_TOTAL'];
                    } else {
                        $data = null;
                        $total = 0;
                    }
                    $data = $data;
                    $total = $total;
                } else {
                    if (!empty($result[1][0]['RECORD_TOTAL'])) {
                        $data = $result[2];
                        $total = $result[1][0]['RECORD_TOTAL'];
                    } else {
                        $data = null;
                        $total = 0;
                    }
                    $data = $data;
                    $total = $total;
                }
                if ($param['hideparam'] == 'getemployeecashbonnew') {
                    if (!empty($result[0][0]['RECORD_TOTAL'])) {
                        $data = $result[1];
                        $total = $result[0][0]['RECORD_TOTAL'];
                    } else {
                        $data = null;
                        $total = 0;
                    }
                    $data = $data;
                    $total = $total;
                } else {
                    if (!empty($result[1][0]['RECORD_TOTAL'])) {
                        $data = $result[2];
                        $total = $result[1][0]['RECORD_TOTAL'];
                    } else {
                        $data = null;
                        $total = 0;
                    }
                    $data = $data;
                    $total = $total;
                }

                if ($param['hideparam'] == 'getdatacurrency') {
                    $datacurr = $this->setting->executeSP();
                    $result = $this->clean_blackdiamondquestion($datacurr[2]);
                    $data = $result;
                    $total = $datacurr[1][0]['RECORD_TOTAL'];
                }

                if ($param['hideparam'] == 'getsubglbykelsub') {
                    $data = $result[2];
                }

                if (
                        $param['hideparam'] == 'coagrid' || 
                        $param['hideparam'] == 'coagridbyuserpt' || 
                        $param['hideparam'] == 'getstatusbyprojectpt' || 
                        $param['hideparam'] == 'getpurchaseletter' || 
                        $param['hideparam'] == 'consolidation' || 
                        $param['hideparam'] == 'consolidationv2' || 
                        $param['hideparam'] == 'consolidationcombo' || 
                        $param['hideparam'] == 'coagridbyuserptv2' || 
                        $param['hideparam'] == 'getStaffNameCashAdvance' ||
                        $param['hideparam'] == 'getaccounttype' ||
                        $param['hideparam'] == 'getaccountnumberbyprojectpt' ||
                        $param['hideparam'] == 'consolesupportcombobox' ||
                        $param['hideparam'] == 'coagridbypt' ||
                        $param['hideparam'] == 'coagridbyprojectpt_isjournal' 
                    ) 
                {
                    $data = $result[1];
                    $total = $result[0][0]['RECORD_TOTAL'];
                }

                if ($param['hideparam'] == "cashflowsetupcombobox") {
                    $data = $result[2];
                    $total = $result[1][0]['RECORD_TOTAL'];
                }

                if ($param["hideparam"] == "getpaymentmethod") {
                    $x = array('dataflow' => 'O');
                    $func = new Cashier_Helpers_Functionmodule();
                    $xmlData = $func->array_to_xml($x);

                    
                    $result = $this->setting->execSP3(
                                'sp_all_read', 
                                'paymentmethod', 
                                'voucher', 
                                $this->setting->_param['project_id'],
                                $this->setting->_param['pt_id'],
                                $this->setting->_param['page'],
                                $this->setting->_param['limit'],
                                $xmlData,
                                $this->setting->_param['project_id'],
                                $this->setting->_param['user_id']
                    );
                }

                if ($param['hideparam'] == 'getprefixbyprojectpt' && $param['banktype_id'] > 0) {
                    $data = $result[3];
                    $total = $result[2][0];
                }

                if (
                    $param['hideparam'] == 'getfirstandlastvendor' || 
                    $param['hideparam'] == 'getlastmonthclosing' || 
                    $param['hideparam'] == 'validatebeforedeletecoa' ||
                    $param['hideparam'] == 'getuserapproval' ||
                    $param['hideparam'] == 'getstatusvoucher' ||
                    $param['hideparam'] == 'validatecoaexistcpmsorems' ||
                    $param['hideparam'] == 'isLinkCoaCf'
                ) {
                    $data = $result[0];
                    $total = 2;
                }

                //Minio Attachment Viewer
                //David Prasetyo 07/01/2021
                if ($param['hideparam'] == 'getattachmentfile') {
                    $minio = new Cashier_Helpers_Minio();
                    $data = $minio->view($param['path']);
                    //$data = $url;
                    //echo $url;
                    //die(); //tidak perlu diencode ke JSON karena URL nya tidak bisa diencode
                }

                if ( $param['hideparam'] == 'getcustomptcombobox' ) {
                    $data = $result[3];
                    $total = $result[2][0]['RECORD_TOTAL'];
                }

                if ($param['hideparam'] == 'getreward') {
                    $total = $result[0][0]['RECORD_TOTAL'];
                    $data = $result[1];
                }

                if ($param['hideparam'] == 'getclusterV2') {
                    $total = $result[0][0]['RECORD_TOTAL'];
                    $data = $result[1];
                }

                if ($param['hideparam'] == 'getvendor') {
                    $total = count($result[1]);
                    $data = $result[1];
                }

                if ($param["hideparam"] == "getpaymentmethod") {
                    $x = array('dataflow' => 'O');
                    $func = new Cashier_Helpers_Functionmodule();
                    $xmlData = $func->array_to_xml($x);

                    
                    $result = $this->setting->execSP3(
                                'sp_all_read', 
                                'paymentmethod', 
                                'voucher', 
                                $this->setting->_param['project_id'],
                                $this->setting->_param['pt_id'],
                                $this->setting->_param['page'],
                                $this->setting->_param['limit'],
                                $xmlData,
                                $this->setting->_param['project_id'],
                                $this->setting->_param['user_id']
                    );
                }

                $this->setting->get_defaultpt();

                $return = array(
                    "success" => true,
                    "data" => $data,
                    "msg" => null,
                    "total" => $total,
                    "counter" => $total,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    public function dataCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = null;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'getprojectpt':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[0][0];
                        $counter = 0;
                        $message = null;
                        break;
                    case 'getvendorid':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getdepartement':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getdeptaccessbyuser':
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_user_id = ((isset($param['user_id']))?$param['user_id']:$this->_user_id);
                        $result = $this->setting->executeSP();
                        $data = $result[0];
                        $counter = sizeof($data);
                        $message = null;
                        break;
                    case 'getcoabyprojectpt':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getprefixbyprojectpt':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'gettransnocashbon':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'gettransnobank':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'gettransnocash':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'generatevouchernocashadvance':
                        $result = $this->docNoVoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevouchernobank':

                        $result = $this->docNoVoucherv2();
                        $data = $result;

                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevouchernocash':
                        $result = $this->docNoVoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevouchernocashv2':
                        $result = $this->docNoVoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevouchernoloan':
                        $result = $this->docNoVoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevoucherrequest':
                        $result = $this->docNoVoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatecasbonrequest':
                        $result = $this->setting->getLastCashbonNo($param);   
                        $data = $result[0][0]['RESULT'];
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevoucherposting':
                        $result = $this->docNumbervoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'generatevoucherpostinglookup':
                        $result = $this->docNumbervoucher();
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        break;
                    case 'getprefixsetup':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2][0];
                        $counter = $result[1][0];
                        $message = null;
                        break;
                    case 'global_param':
                        $this->setting->_paramsql = 'read';
                        if((int)$param['project_id']>0){
                            $this->setting->_project_id = $param['project_id'];
                        }
                        if((int)$param['pt_id']>0){
                            $this->setting->_pt_id = $param['pt_id'];
                        }
                        $result = $this->setting->executeSP();
                        if(isset($result[1][0])){
                            $data = $result[1][0];
                        }else{
                            $data = null;
                        }
                        if(isset($result[0][0])){
                            $counter = $result[0][0];
                        }else{
                            $data = null;
                        }                        
                        
                        $message = null;
                        break;
                    case 'getfield':
                        $dynamicmodel = new Cashier_Helpers_Dynamicmodelextjs();
                        $field = $dynamicmodel->buildExtModel($param['table']);
                        $data = array('fields' => $field);
                        $counter = 0;
                        $message = null;
                        break;
                    case 'filterprefixbypt':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'filterprefixbybank':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getdatacurrency':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        //print_r($result);
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getstatusbyprojectpt':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getpajakcoa':
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getpajakprogresif':
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'getkomisibreakdown':
                        //breakdown konfigurasi komisi
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                     case 'gettotalkomisi':
                        //total komisi
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[0][0];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                     case 'global_paramV2':
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        if(isset($result[1][0])){
                            $data = $result[1][0];
                        }else{
                            $data = null;
                        }
                        if(isset($result[0][0])){
                            $counter = $result[0][0];
                        }else{
                            $data = null;
                        }                        
                        
                        $message = null;
                        break;
                     case 'deleteshortcutattachment':
                        $this->setting->_paramsql = 'read';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_user_id;
                        $result = $this->setting->executeSP();
                       
                              $message = 'Data deleted Succesfully!';
                              $data = null;
                              $counter = 0;
                      
                         
                        
                      
                        break;
                     case 'getjournalbyprojectpt':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        break;
                    case 'tracking_voucher':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = $param['globalname'];
                        break;
                    case 'is_cgg':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[0][0]['TOTAL'];
                        $counter = 0;
                        $message = $param['hideparam'];
                    break;
                    case 'tracking_voucherV2':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = $param['globalname'];
                        break;
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => true,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function docNumber() {
        $param = $this->setting->_param;
        $_docdate = new DateTime(date('Y-m-d'));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);

        return $_docNo;
    }

    public function docNumberbyparam($param) {
        $_docdate = new DateTime(date('Y-m-d', strtotime($param['param_date'])));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();

        $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);

        return $_docNo;
    }

    public function docNoVoucher() {

        $param = $this->setting->_param;
        $_docdate = new DateTime(date('Y-m-d', strtotime($param['param_date'])));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);
        return $_docNo;
    }

    public function docNoVoucherv2() {

        $param = $this->setting->_param;

        $_docdate = new DateTime(date('Y-m-d', strtotime($param['param_date'])));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        if ($param['flag'] > 0) {
            $_docNo = $this->counterdoc->get_advanceNoNew($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);

            
        } else {
            $param['module'] = $param['module'];
            $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);
        }
        return $_docNo;
    }

    public function docNumbervoucher() {
        $param = $this->setting->_param;
        $_docdate = new DateTime(date('Y-m-d', strtotime($param['acceptdate'])));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $this->_module_id, $param['module'], $_var1, $_var2, $_docdate, $param['flag']);

        return $_docNo;
    }

    function dataDropdownRead($param){
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                switch ($param['hideparam']) {
                    case 'getblock':
                        $send_param = [
                            '',
                            '',
                            '',
                            '',
                            $this->_project_id,
                            $this->_pt_id,
                            $param['page'],
                            $param['limit']
                        ];
                        $result            = $this->execSP3('cashier.dbo.sp_block_read', $send_param);
                        $return['total']   = $result[0][0]['RECORD_TOTAL'];
                        $return['data']    = $result[1];
                        $return['success'] = true;
                    break;
                    case 'getcluster':
                        $send_param = [
                            '',
                            '',
                            '',
                            $this->_project_id,
                            $this->_pt_id,
                            $param['page'],
                            $param['limit'],
                            0
                        ];
                        $result            = $this->execSP3('cashier.dbo.sp_cluster_read', $send_param);
                        $return['total']   = $result[0][0]['RECORD_TOTAL'];
                        $return['data']    = $result[1];
                        $return['success'] = true;
                    break;
                    
                    default:
                        break;
                }
            } catch (Exception $e) {
            }
        }
        return $return;
    }


   
}

<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Journalsalesbooking extends Zend_Db_Table_Abstract {

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
        //$this->datamodule = $this->generaldata->moduledata('T-CBD'); //TRANCATION CASHBON DEPARTMENT
        $this->setting->_storeprocedure = 'sp_th_journalsalesbooking';
        $this->datamodule = array();
        $this->datamodule['module_id'] = 0;
    }

    function JournalsalesbookingRead($param) {
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

                if($param['pt_id']<=0 || $param['pt_id']==''):
                    $param['pt_id'] = $this->_pt_id;
                    $param['project_id'] = $this->_project_id;
                    $date = strtotime(date("Y-m-d").' -3 year');
                    $param['sales_fromdate'] = date('Y-m-d', $date); 
                    $param['sales_untildate'] = date("Y-m-d");
                    $param['handover_fromdate'] = date('Y-m-d', $date); 
                    $param['handover_untildate'] = date("Y-m-d");
                endif;

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $data = null;
                $message = null;
                $valid = true;
                $counter = 0;

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
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
                     case 'posting_only':
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
                    case 'unbooked_only':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
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
                        $this->setting->_pt_id = $param['pt_id'];
                         $this->setting->_project_id = $param['project_id'];
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


    public function JournalsalesbookingCreate($param) {
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
                    case 'proccessbooking':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $idheader = $counter;
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
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

    public function JournalsalesbookingUpdate($param) {
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

                        $this->setting->_param['hideparam']='updatefromposting';
                        $result = $this->setting->executeSP();


                        if(sizeof($result)>5){
                            $result['idheader'] = $result[5][0]['kasbondept_id'];
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                        }else{
                            $result['idheader'] = $result[4][0]['kasbondept_id'];
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];    
                        }

                        if($valid=='true'){
                           $this->createPostingdata($param);
                        }                        
                        break;
                    case 'savedraft':     
                        $this->setting->_param['hideparam']='updatefromposting';
                        $result = $this->setting->executeSP();
                        if(sizeof($result)>5){
                            $result['idheader'] = $result[5][0]['kasbondept_id'];
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                        }else{
                            $result['idheader'] = $result[4][0]['kasbondept_id'];
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];    
                        }                                           
                        break;
                    case 'applybank':          
                        $this->setting->_param['hideparam'] = 'applybank';
                        $result = $this->setting->executeSP();

                        if(sizeof($result)>5){
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                        }else{
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];           
                        }

                        break;
                    case 'unapplybank':          
                        $this->setting->_param['hideparam'] = 'unapplybank';
                        $result = $this->setting->executeSP();
                        if (!isset($result[1][0]['FAILED'])) {
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'This data may have been used'; 
                              
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
                       if (!isset($result[1][0]['FAILED'])) {
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'Unable to save data'; 
                              
                        }
                       
                        break;
                     case 'uncashback':                        
                         $this->setting->_param['hideparam'] = 'uncashback';
                        $result = $this->setting->executeSP();
                       if (!isset($result[1][0]['FAILED'])) {
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                           
                        }else{
                            $valid = false;
                            $counter = 1;
                            $message = 'Unable to save data'; 
                              
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
    


}

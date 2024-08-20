<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_KasbondeptExtend extends Zend_Db_Table_Abstract {
    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;        
        $this->setting->_storeprocedure = 'sp_kasbondept_extension';
        $this->generaldata = new Cashier_Models_General_Generaldata;
    }

    function KasbondeptExtendRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                 if(isset($param['pt_id'])){
                            if($param['pt_id'] != ''){
                                $this->setting->_pt_id = $param['pt_id'];
                                $this->setting->_project_id = $param['project_id'];
                            }else{
                                $this->setting->_project_id = $this->_session->getCurrentProjectId();
                                $this->setting->_pt_id = $this->_session->getCurrentPtId();
                            }
                        }else{

                            $param['project_id'] = $this->_session->getCurrentProjectId();
                            $param['pt_id'] = $this->_session->getCurrentPtId();
                        } 
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                       // die(print_r($result));
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    
                    default:
                        $result = null;
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

    public function KasbondeptExtendCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];                         
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;
                    case 'report':
                    //die(print_r($param));
                        $rowemployee = $this->generaldata->getEmployeebyId($param['approveby_id']);
                        $cashbondept_tpl = $this->generaldata->getGlobalparam($param['project_id'], $param['pt_id'], 'cashbondept_tpl_extend');
                        $username = $this->setting->getUserdatabyid($param['addby_id']);
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

                        
                        $result = array(
                            "kasbondept_id" =>$param['kasbondept_id'],
                            "total_amount" =>$totalamount,
                            "terbilang" => $terbilang,
                            "ptname" => $param['ptname'],
                            "projectname" => $param['projectname'],
                            "projectpt_name" => $param['projectname']. ' / '.$param['ptname'],
                            "department" => $param['department'],
                            "employee_name" => $param['employee_name'],
                            "voucher_date" => $this->checkDate(date('d-m-Y', strtotime($rowkasbon['voucher_date']))),
                            "voucher_no" => $param['voucher_no'],
                            "waktu_cetak" => date('d-m-Y H:i'),
                            "approval" => $approval_name,
                          //  "postingby" => $param['postingby'],
                            "cashbondept_tpl" => $cashbondept_tpl,
                            "made_by_name" => $made_by_name,
                            "project_id" => $param['project_id'],
                            "pt_id" => $param['pt_id'],
                            "addby_name" => $param['addby'],
                            "extension_days" => $param['extension_days'],
                            "approval_notes" => $param['approval_notes'],
                            "reason" => $param['reason'],
                            "counter_extension" => $param['counter_extension']

                        );   

                      
                        $counter=1;  
                        $message = null;
                        $valid = true;
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

    public function KasbondeptExtendUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['kasbon_extension_id'];
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];               
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;
                     case 'approveextend': 
                        $this->setting->_param['hideparam']='approveextend';
                        $result = $this->setting->executeSP();
                      
                        if($result[0][0]['VALIDDATA'] == 'true'){
                           
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = 'Data saved successfully';
                        }else{
                          
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[5][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG']; 
                        }

                                            
                        break;
                      case 'decline_extension': 
                        $this->setting->_param['hideparam']='decline_extension';
                        $result = $this->setting->executeSP();
                      
                      
                        if($result[0][0]['VALIDDATA'] == 'true'){
                           
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = 'Data saved successfully';
                        }else{
                          
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[5][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG']; 
                        }

                                            
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

    function logautomailDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'employee_id';
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
                $valid = $result[0][0]['VALIDDATA'];
                $counter = $result[1][0]['RECORD_TOTAL'];
                $message = $result[2][0]['MSG'];
                
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

     function totalAmount($param){        
        $this->setting->_storeprocedure = 'sp_th_kasbondept_request';
        $this->setting->_paramsql = 'totalamount';
        $this->setting->_param = $param;
        $this->setting->_iddata = $param['kasbondept_id'];
        $result = $this->setting->executeSP();
        return $result[0][0];
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

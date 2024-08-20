<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Tbankbon extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_td_kasbank_kasbon';
    }

    function bonRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();   
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                            $total_amount = $result[3][0]['total_amount'];
                        } else {
                            $data = null;
                            $total_amount = $result[3][0]['total_amount'];
                        }
                        
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                            $total_amount = $result[3][0]['total_amount'];
                        } else {
                            $data = null;
                            $total_amount = 0;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $total_amount = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "total_amount" => $total_amount,
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
    public function readCIA() {
        $data = $this->setting->_param;
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_paramsql = 'read';
        $this->setting->_param['hideparam'] = 'getcia';
        $this->setting->_pt_id = $data['pt_id'];
        $this->setting->_iddata = $data['kasbon_id'];
        $result = $this->setting->executeSP();
        $rowdata = $result[2][0];
        return $rowdata;
    }
    
    public function updateCIA() {
        $rowcia = $this->readCIA();
        $data = $this->setting->_param;
        $this->setting->_storeprocedure = 'sp_th_kasbon';
        $this->setting->_paramsql = 'update';
        $this->setting->_pt_id = $data['pt_id'];
        $this->setting->_iddata = $data['kasbon_id'];
        
        if ($rowcia['status'] == 'T') {  
            $amount = $rowcia['amount'];
            $cashback = $rowcia['cashback'];            
            $paid = $rowcia['paid']+$data['applyamount'];            
            $balance = $amount - ($paid + $cashback);
            
            if ($balance < 0) {
                $cashback = abs($balance);
            }
            
            if ($balance < 1) {
                $status = 'Y';
                $statusdata ="PROCESSED";
            } else {
                $status = 'T';
                $statusdata ="BEINGPROCESSED";
            }
            $this->setting->_param['hideparam'] = 'bytransactioncash';
            $this->setting->_param['cashback'] = $cashback;
            $this->setting->_param['paid'] = $paid;
            $this->setting->_param['balance'] = $balance;
            $this->setting->_param['status'] = $status;
            $this->setting->_param['statusdata'] = $statusdata;
            $result = $this->setting->executeSP();
            return $result;
        }
    }
    
    
//    public function updateCIA(){
//        $data = $this->setting->_param;       
//        $this->setting->_storeprocedure = 'sp_th_kasbon';
//        $this->setting->_paramsql = 'update';
//        $this->setting->_pt_id = $data['pt_id'];
//        $this->setting->_iddata = $data['kasbon_id'];
//        $amount = $data['amount'];   
//        $cashback = $data['applyamount'];   
//        $paid = $amount-$cashback;        
//        
//        
//        if($paid==0){
//            $status='Y';
//            $statusdata ="PROCESSED";
//        }else{
//            $status='T';
//            $statusdata ="BEINGPROCESS";
//        } 
//        
//        $record = array(
//            "hideparam"=>'bytransactioncash',
//            "cashback"=>$cashback,
//            "paid"=>$paid,
//            "balance"=>$paid,
//            "status"=>$status,
//            "statusdata"=>$statusdata,
//        );        
//        //print_r($record);
//        $this->setting->_param = $record;
//        $this->setting->executeSP();          
//    }
    public function bonCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];              
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        if($valid=='true'){
                            $this->updateCIA();
                        }else {
                            $message = $result[3][0]['MSG'];
                            $rowdata = $result[4][0];                          
                            $iddata = $rowdata['kasbank_kasbon_id'];
                            $appliedamount = $rowdata['amount'] + $param['applyamount'];
                            $param['amount'] = $appliedamount;
                            $param['kasbank_kasbon_id'] = $iddata;
                            $param['statedata'] = "update";
                            $this->bonUpdate($param);
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

    public function bonUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbank_kasbon_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        if($valid=='true'){
                            $this->updateCIA();
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

    function bonDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kasbank_kasbon_id';
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
                $valid = $result[1][0]['VALIDDATA'];
                $counter = $result[2][0]['RECORD_TOTAL'];
                $message = $result[3][0]['MSG'];

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

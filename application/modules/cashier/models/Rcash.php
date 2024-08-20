<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Rcash extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();        
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time = date('H:i:s');

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_th_kasbank_rev';
    }

    function RcashRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {     
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        if ($param['status'] == 'OPEN') {
                            $this->setting->_param['is_posting'] = 0;
                        } else if ($param['status'] == 'APPROVE') {
                            $this->setting->_param['is_posting'] = 1;
                        } else if ($param['status'] == 'CLOSE') {
                            $this->setting->_param['is_posting'] = 2;
                        }
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
                        if ($param['status'] == 'OPEN') {
                            $this->setting->_param['is_posting'] = 0;
                        } else if ($param['status'] == 'APPROVE') {
                            $this->setting->_param['is_posting'] = 1;
                        } else if ($param['status'] == 'CLOSE') {
                            $this->setting->_param['is_posting'] = 2;
                        }
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
                     case 'getkasbankrevision':
                         if ($param['status'] == 'OPEN') {
                            $this->setting->_param['is_posting'] = 0;
                        } else if ($param['status'] == 'APPROVE') {
                            $this->setting->_param['is_posting'] = 1;
                        } else if ($param['status'] == 'CLOSE') {
                            $this->setting->_param['is_posting'] = 2;
                        }
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

    public function RcashCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];
           
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        if($valid =='false'){
                             $counter = $result[2][0]['RECORD_TOTAL'];
                             $message = $result[3][0]['MSG'];
                             $idheader = null;
                        }else{
                             $idheader = $result[3][0]['kasbank_id'];
                             $counter = $result[4][0]['RECORD_TOTAL'];
                             $message = $result[5][0]['MSG'];                             
                        }    
                        
                        $result['idheader'] = $idheader; 
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

    public function RcashUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbank_id'];
            
                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];  
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

    function RcashDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kasbank_id';
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
                $valid = $result[2][0]['VALIDDATA'];
                $counter = $result[3][0]['RECORD_TOTAL'];
                $message = $result[4][0]['MSG'];

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

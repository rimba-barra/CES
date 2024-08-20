<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Coauseraccess extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_coauseraccess';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if (!isset($param['hideparam'])) {
                     $param['hideparam'] ='default';
                 }
                 

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';

                if (isset($param['coauseraccess_id'])) {
                    if ($param['coauseraccess_id'] > 0) {
                        $this->setting->_iddata = $param['coauseraccess_id'];
                        $this->setting->_param['hideparam'] = 'update';
                    } else {
                        $this->setting->_param['hideparam'] = 'create';
                    }
                }
                
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $param['user_id_login'] = $param['user_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $param['user_id_login'] = $param['user_id']; 
                        $this->setting->_param = $param;
                        $this->setting->_project_id = $param['project_id']; 
                        $this->setting->_pt_id = $param['pt_id']; 
                        $this->setting->_user_id = $param['user_id']; 
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'create':  
                        $param['user_id_login'] = $param['paramdata'][0]['user_id'];  
                        $this->createdata($param['paramdata']);    
                        $data = array();
                        $counter = 1;
                        $message = 'Process create user access coa finish';
                        $valid = true;
                        break;
                    case 'update':
                        $param['user_id_login'] = $param['paramdata'][0]['user_id'];  
                        $this->setting->_paramsql = 'update';
                        $result = $this->setting->executeSP();
                        $data = array();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                     case 'copycoa':
                        $this->setting->_paramsql = 'copycoa';
                        $this->setting->_project_id = $param['project_id']; 
                        $this->setting->_pt_id = $param['pt_id']; 
                        $result = $this->setting->executeSP();
                        $data = array();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'grantallcoa':
                        $this->setting->_paramsql = 'grantallcoa';
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $data = array();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];

                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
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
                
            }
        }
        return $return;
    }
    
    public function createdata($array) {
        if (is_array($array) && !empty($array)) {

            //execute once, delete old
            $array[0]['user_id_login'] = $array[0]['user_id'];
            $this->setting->_param = $array[0];
            $this->setting->_project_id = $array[0]['project_id'];
            $this->setting->_pt_id = $array[0]['pt_id'];
            $this->setting->_paramsql = 'deleteoncreate';
            $result = $this->setting->executeSP();



            foreach ($array as $row) {
                $row['user_id_login'] =$row['user_id'];
                $this->setting->_param = $row;
                $this->setting->_project_id = $row['project_id'];
                $this->setting->_pt_id = $row['pt_id'];
                $this->setting->_paramsql = 'create';
                $result = $this->setting->executeSP();
            }
            
            
            //execute once, delete old
            $array[0]['user_id_login'] = $array[0]['user_id'];
            $this->setting->_param = $array[0];
            $this->setting->_project_id = $array[0]['project_id'];
            $this->setting->_pt_id = $array[0]['pt_id'];
            $this->setting->_paramsql = 'deleteduplicate';
            $result = $this->setting->executeSP();
        }
    }

    function deleteData($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'coauseraccess_id';
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

}

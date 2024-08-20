<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Masterbankrate extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_masterbankrate';
    }

    function masterbankrateRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                // $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'] == "" ? $this->_project_id : $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'] == "" ? $this->_pt_id : $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
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

    function masterbankrateCreate($param) {
        
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create'; 
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_param['user_id'] = $this->_user_id;

                        $result = $this->setting->executeSP(); 
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
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

    public function masterbankrateUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_param['user_id'] = $this->_user_id;

                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
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

    function masterbankrateDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'bank_rate_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {

                $this->setting->_iddata = rtrim($param[$key_name], ',');
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP(); 
                $valid = true;
                $counter = count(explode(',', $this->setting->_iddata));
                $message = "ok";

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

    function getkelsubcoa($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                // $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'getkelsubbycoa';
                switch ($this->setting->_param['hideparam']) {
                    case 'getkelsubbycoa':
                        $this->setting->_project_id = $param['project_id'] == "" ? $this->_project_id : $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'] == "" ? $this->_pt_id : $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $data = $result[0];
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

}

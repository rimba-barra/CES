<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Masterfixedasset extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        $this->setting = new Cashier_Models_General_Setdata;

        $this->setting->_storeprocedure = 'sp_m_fixedasset';
    }

    public function MasterfixedassetRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $this->setting->_project_id = $param['project_id'] == "" ? $this->_project_id : $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'] == "" ? $this->_pt_id : $param['pt_id'];
                $common = new Cashier_Models_Common();
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP(); 
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
                        $data = null;
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

    public function MasterfixedassetCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                       
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $data = null;

                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                        $data = null;
                }
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function MasterfixedassetUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['fixedasset_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'default':
                            $result = $this->setting->executeSP();
                            
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                            $data = null;

                            break;
                        default:
                            $result = null;
                            $valid = false;
                            $counter = 1;
                            $message = 'data error';
                            $data = null;
                    }
                } else {
                    $result = null;
                    $valid = false;
                    $counter = 1;
                    $message = 'data error';
                    $data = null;
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function MasterfixedassetDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'fixedasset_id';
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

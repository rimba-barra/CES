<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Masterformatreportlr extends Zend_Db_Table_Abstract {
    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;        
        $this->setting->_storeprocedure = 'sp_masterformatreportlr';
    }

    function masterformatreportlrRead($param) {
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
                        //print_r($result);
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getreportlevel': 
                        $result = $this->setting->executeSP();
                        $data = $result[0];
                        $counter  = count($data);
                        $message = null;
                        $valid = true;
                        break;
                    case 'searchdata': 
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter  = $result[0][0]['RECORD_TOTAL'];
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

    public function masteremployeeCreate($param) {
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

    public function masterformatreportlrUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];                   
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        $detail = $param['detail'];
                        unset($param['detail']);
                        $xml = $this->setting->createdatawithdetailXML($param, $detail);
                        $this->_schema = 'cashier.dbo';
                        $result = $this->execSP3('sp_masterformatreportlr', $xml);
                        
                        $valid = true;
                        $counter = 1;
                        $message = $result[0][0]['result'];
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

    function masteremployeeDelete($param = array()) {
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

}

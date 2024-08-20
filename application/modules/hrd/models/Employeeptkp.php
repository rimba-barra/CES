<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Employeeptkp extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup;
        $this->setting->_storeprocedure = 'sp_employeeptkp';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';


                switch ($this->setting->_param['mode_read']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'searching':
                        if(isset($param['sort'])){
                            $sort = $param['sort'];
                            $sort = json_decode($sort);                
                            $param['sortby'] = $sort[0]->property;
                            $param['sortdir'] = $sort[0]->direction;
                        }
                        $this->setting->_param = $param;        
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'update':
                        $result = $this->updateData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'checked':
                        $result = $this->checkedData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'unchecked':
                        $result = $this->uncheckedData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'checkedf':
                        $result = $this->checkedallData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'uncheckedf':
                        $result = $this->uncheckedallData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'updateselected':
                        $result = $this->updateselectedData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'updateall':
                        $result = $this->updateallData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'generate':
                        $result = $this->generateData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
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
                    "parameter" => $param['mode_read'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    public function updateData($param) {
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['employeeptkp_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function updateselectedData($param) {
        $this->setting->_paramsql = 'updateselected';
        $this->setting->_iddata = $param['employeeptkp_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function updateallData($param) {
        $this->setting->_paramsql = 'updateall';
        $this->setting->_iddata = 0;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function generateData($param) {
        $this->setting->_paramsql = 'generate';
        $this->setting->_iddata = 0;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function checkedallData($param) {
        $this->setting->_paramsql = 'checkedall';
        $this->setting->_iddata = 0;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function uncheckedallData($param) {
        $this->setting->_paramsql = 'uncheckedall';
        $this->setting->_iddata = 0;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function checkedData($param) {
        $this->setting->_paramsql = 'checked';
        $this->setting->_iddata = $param['employeeptkp_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }
    
    public function uncheckedData($param) {
        $this->setting->_paramsql = 'unchecked';
        $this->setting->_iddata = $param['employeeptkp_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

}

<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Masterdisctanahapartment extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup;
        $this->setting->_storeprocedure = 'sp_masterdisctanahapartment';
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
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'create':
                        $result = $this->createData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'update':
                        $result = $this->updateData($param);
                        $data = $result[2][0]['MSG'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'validateapprove':
                        $this->setting->_paramsql = 'validateapprove';
                        $this->setting->_param = $param;
                        $result = $this->setting->executeSP();
                        $data = $result[0][0]['RECORD_TOTAL'];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'approve':
                        $this->setting->_paramsql = 'approve';
                        $this->setting->_iddata = $param['disctanah_apartment_id'];
                        $this->setting->_param = $param;
                        $result = $this->setting->executeSP();
                        $data = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'reject':
                        $this->setting->_paramsql = 'reject';
                        $this->setting->_iddata = $param['disctanah_apartment_id'];
                        $this->setting->_param = $param;
                        $result = $this->setting->executeSP();
                        $data = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
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

    public function createData($param) {     
        $this->setting->_paramsql = 'create';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    public function updateData($param) {       
        $this->setting->_paramsql = 'update';
        $this->setting->_iddata = $param['disctanah_apartment_id'];
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result;
    }

    function deleteData($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'disctanah_apartment_id';
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

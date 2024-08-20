<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Popupduedatevoucherdepartment extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $fromdate = null;
    private $untildate = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_popupvoucherdepartment';
        $this->getglobalparam();
    }

    public function getglobalparam() {
        $this->setting->_tabledata = $this->setting->_m_globalparam;
        $param = array('name' => 'voucherdepartment_reminder_max_duedate_days', 'deleted' => 0);
        $result = $this->setting->getdata_standard_v2($param);
        if (is_array($result[0])) {
            if (!empty($result[0])) {
                $row = $result[0][0];
                $minusdays = $row['value'];
                $this->fromdate = date("Y-m-d", strtotime("-$minusdays day", strtotime($this->_curdate)));
                $this->untildate = $this->_curdate;
            }
        }
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $param['fromduedate'] = $this->fromdate;
                $param['untilduedate'] = $this->untildate;


                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'create':
                        $this->setting->_paramsql = 'create';
                        $result = $this->setting->executeSP();
                        $data = array();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'update':
                        $this->setting->_paramsql = 'update';
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

    function deleteData($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'param_id';
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

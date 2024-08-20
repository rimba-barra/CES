<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Tcash extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_time = date('H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->function = new Cashier_Models_Function_Tcashbank;
        $this->setting->_storeprocedure = 'sp_th_kasbank_cash';
    }

    function cashRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
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
                    case 'search':
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

    public function cashCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_param['accept_date'] = date('Y-m-d', strtotime($param['accept_date'])) . ' ' . $this->_time;
                $this->setting->_param['kasbank_date'] = date('Y-m-d', strtotime($param['kasbank_date'])) . ' ' . $this->_time;
                $this->setting->_param['cashbon_date'] = date('Y-m-d', strtotime($param['cashbon_date'])) . ' ' . $this->_time;
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        if ($valid == 'false') {
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                            $idheader = null;
                        } else {
                            $idheader = $result[3][0]['kasbank_id'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                        }

                        $result['idheader'] = $idheader;
                        break;
                    case 'report':
                        $total = $this->function->totalAmount($param);
                        $this->setting->_param = $param;
                        $result = array(
                            "totalamount" => $total['totalamount'],
                            "format_totalamount" => $total['format_totalamount'],
                            "paramxml" => $this->setting->converttoXml(),
                            "voucher_date" => date('d/m/Y', strtotime($param['accept_date'])),
                            "voucher_no" => $param['voucher_no'],
                        );
                        $valid = true;
                        $counter = 0;
                        $message = 'data success generate';
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

    public function cashUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbank_id'];
                $this->setting->_param['accept_date'] = date('Y-m-d', strtotime($param['accept_date'])) . ' ' . $this->_time;
                $this->setting->_param['kasbank_date'] = date('Y-m-d', strtotime($param['kasbank_date'])) . ' ' . $this->_time;
                $this->setting->_param['cashbon_date'] = date('Y-m-d', strtotime($param['cashbon_date'])) . ' ' . $this->_time;
                switch ($this->setting->_param['hideparam']) {
                    case 'update':
                        $result = $this->setting->executeSP();
                        $result['idheader'] = $result[1][0]['kasbank_id'];
                        $valid = $result[2][0]['VALIDDATA'];
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        $message = $result[4][0]['MSG'];
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

    function cashDelete($param = array()) {
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

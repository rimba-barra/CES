<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Pengajuanserahterima extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;

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
        $this->setting->_storeprocedure = 'sp_th_pengajuanserahterima';
    }

    public function PengajuanserahterimaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $this->setting->_project_id = $param['project_id'] == "" ? $this->_project_id : $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'] == "" ? $this->_pt_id : $param['pt_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP(); 
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getunit':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        if($param['query'] == NULL || $param['query'] == ''){
                            die('Please type unit number');
                        }

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

    public function PengajuanserahterimaCreate($param) {
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

    public function PengajuanserahterimaUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['pengajuanserahterima_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'default':
                            $this->setting->_project_id = $param['project_id'];
                            $this->setting->_pt_id = $param['pt_id'];
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

    public function PengajuanserahterimaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'pengajuanserahterima_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            /*foreach ($param as $key => $val) {
                if (is_array($key)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }*/
            $pengajuanserahterima_id = '';
            for ( $i = 0; $i < sizeof($param['pengajuanserahterima_id']); $i++) { 
                    $pengajuanserahterima_id .= $param['pengajuanserahterima_id'][$i] . ',';
            }
            try {
                $this->setting->_iddata = rtrim($pengajuanserahterima_id, ',');
                $this->setting->_param['hideparam'] = $param['hideparam'];
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

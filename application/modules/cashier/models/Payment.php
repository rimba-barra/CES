<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Payment extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

        $this->setting->_storeprocedure = 'sp_payment';
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_time = date('H:i:s');
    }

    function paymentRead($param) {

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $param['pt_id'] = $projectpt['pt_id'];
                $this->_pt_id = $param['pt_id'];
                $param['pt_pt_id'] =  $param['pt_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_param['pt_id'] = $param['pt_id'];
                       
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
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

    public function Paymentselected() {
        $arraydata = $this->setting->_param['kasbank_id'];
        foreach ($arraydata as $row) {
            $iddata = $row;
            if ($iddata !== 'undefined') {
                $this->setting->_paramsql = 'update';
                $this->setting->_param['voucher_no'] = $this->checkvoucher_no(array('kasbank_id' => $iddata));
                $this->setting->_param['kasbank_id'] = $iddata;
                $this->setting->_param['chequegiro_status'] = 'PAID';
                $this->setting->_param['chequegiro_payment_date'] = date('Y-m-d', strtotime($this->setting->_param['chequegiro_payment_date'])) . ' ' . $this->_time;
                ;
                $this->setting->executeSP();
            }
        }
    }

    public function paymentCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'payfromview':
                        $this->setting->_param['voucher_no'] = $this->checkvoucher_no($param);
                        $this->setting->_param['chequegiro_payment_date'] = date('Y-m-d', strtotime($param['chequegiro_payment_date'])) . ' ' . $this->_time;
                        $this->setting->_paramsql = 'update';
                        $this->setting->_param['chequegiro_status'] = 'PAID';
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'payfromform':
                        $this->setting->_param['voucher_no'] = $this->checkvoucher_no($param);
                        $this->setting->_param['chequegiro_payment_date'] = date('Y-m-d', strtotime($param['chequegiro_payment_date'])) . ' ' . $this->_time;
                        $this->setting->_paramsql = 'update';
                        $this->setting->_param['chequegiro_status'] = 'PAID';
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_lastquery);
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'payfromselected':
                        $this->Paymentselected();
                        $result = null;
                        $valid = 'true';
                        $counter = 1;
                        $message = 'Process Payment from selected data, success';
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

    public function paymentUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['payment_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
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

    function paymentDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'payment_id';
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
                $valid = $result[1][0]['VALIDDATA'];
                $counter = $result[2][0]['RECORD_TOTAL'];
                $message = $result[3][0]['MSG'];

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

    public function checkvoucher_no($param) {
        $common = new Cashier_Models_Common();
        $datakasbank = $this->setting->getdata_bytableparam($this->setting->_th_kasbank, array('kasbank_id' => $param['kasbank_id']));
        $datavoucherprefix = $this->setting->getdata_bytableparam($this->setting->_m_voucherprefix, array('voucherprefix_id' => $datakasbank[0][0]['voucherprefix_id']));

        $voucher_no = $datakasbank[0][0]['voucher_no'];
        $tmp_voucher = $datavoucherprefix[0][0]['temp_prefix'];
        $prefix_in_voucher = substr($voucher_no, 0, strlen($tmp_voucher));
        if (strlen($tmp_voucher) > 0) {
            if ($prefix_in_voucher == $tmp_voucher) {
                $param['project_id'] = $datakasbank[0][0]['project_id'];
                $param['pt_id'] = $datakasbank[0][0]['pt_id'];
                $param['param_date'] = date('Y-m-d', strtotime($datakasbank[0][0]['accept_date']));
                $param['module'] = $datakasbank[0][0]['kasbank'];
                $exp = explode("-", $param['param_date']);
                $this->setting->_schema_gl = 'gl_' . $exp[0] . '.dbo.';
                $dataprefix = $this->setting->getdata_bytableparam($this->setting->_schema_gl . 'm_prefix', array('prefix_id' => $datavoucherprefix[0][0]['prefix_id']));
                if (sizeof($dataprefix) > 0) {
                    $param['prefix'] = $dataprefix[0][0]['prefix'];
                } else {
                    $param['prefix'] = 'UNSET_';
                }

                $param['flag'] = '1';
                $change_voucher_no = $common->docNumberbyparam($param);
            } else {
                $change_voucher_no = $voucher_no;
            }
        } else {
            $change_voucher_no = $voucher_no;
        }
        return $change_voucher_no;
    }

}

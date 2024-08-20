<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Tcashadvance extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $counterdoc = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_th_kasbon';
    }

    function cashadvanceRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
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
                    case 'filterforcopycia':
                        $this->setting->_paramsql = 'filterforcopycia';
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

    public function getTransnocashbonbyparam($param) {
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_paramsql = 'read';
        $record = array(
            "hideparam" => 'gettransnocashbon',
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "accept_date" => date('Y-m-d', strtotime($param['accept_date'])),
        );
        $this->setting->_param = $record;
        $result = $this->setting->executeSP();
        return $result[1][0]['RECORD_TOTAL'];
    }

    public function getTransnogiro() {
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_paramsql = 'read';
        $data = $this->setting->_param;
        $record = array(
            "hideparam" => 'gettransnobank',
            "project_id" => $data['project_id'],
            "pt_id" => $data['pt_id'],
            "kasbank" => 'BANK',
            "accept_date" => date('Y-m-d', strtotime($data['accept_date'])),
        );
        $this->setting->_param = $record;
        $result = $this->setting->executeSP();
        $this->setting->_param = $data;
        return $result[1][0]['RECORD_TOTAL'];
    }

    function getKasbon() {
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_paramsql = 'read';
        $data = $this->setting->_param;
        $record = array(
            "hideparam" => 'getkasbon',
            "project_id" => $data['project_id'],
            "pt_id" => $data['pt_id'],
            "department_id" => $data['department_id'],
            "voucherprefix_id" => $data['voucherprefix_id'],
            "voucher_no" => $data['voucher_no'],
            "dataflow" => $data['dataflow'],
            "accept_date" => date('Y-m-d', strtotime($data['accept_date'])),
        );
        $this->setting->_param = $record;
        $result = $this->setting->executeSP();
        $this->setting->_param = $data;
        return $result[2][0];
    }

    function docNumberGiro() {
        $param = $this->setting->_param;
        $_docdate = new DateTime(date('Y-m-d'));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        $_docNo = $this->counterdoc->get_advanceNo(
                $param['project_id'], $param['pt_id'], $this->_module_id, 'BANK', $_var1, $_var2, $_docdate, 1
        );
        return $_docNo;
    }

    public function createGiro() {
        $data = $this->setting->_param;
        $rowkasbon = $this->getKasbon();
        $kasbon_id = $rowkasbon['kasbon_id'];
        $transno = $this->getTransnogiro();
        $voucherno = $this->docNumberGiro();
        $this->setting->_paramsql = 'create';
        $this->setting->_param['hideparam'] = 'create';
        $this->setting->_storeprocedure = 'sp_th_kasbank_bank';

        $record = array(
            "parametersql" => "create",
            "statedata" => "create",
            "hideparam" => "creategiro",
            "project_id" => $data['project_id'],
            "pt_id" => $data['pt_id'],
            "department_id" => $data['department_id'],
            "transno" => $transno,
            "voucherprefix_id" => $data['voucherprefix_id'],
            "prefix_id" => $data['prefix_id'],
            "coa_id" => $data['coa_id'],
            "kasbon_id" => $kasbon_id,
            "grouptrans_id" => 0,
            "kasbon_paid" => 0,
            "chequegiro_accured" => 0,
            "accept_date" => date('Y-m-d', strtotime($data['accept_date'])),
            "chequegiro_date" => date('Y-m-d', strtotime($data['chequegiro_date'])),
            "chequegiro_payment_date" => date('Y-m-d', strtotime($data['chequegiro_payment_date'])),
            "chequegiro_receive_date" => date('Y-m-d', strtotime($data['chequegiro_receive_date'])),
            "chequegiro_release_date" => date('Y-m-d', strtotime($data['chequegiro_release_date'])),
            "chequegiro_status" => $data['chequegiro_status'],
            "chequegiro_no" => $data['chequegiro_no'],
            "kasbank" => 'BANK',
            "dataflow" => $data['dataflow'],
            "voucher_no" => $voucherno,
            "description" => $data['description'],
            "amount" => $data['amount'],
        );
        $this->setting->_param = $record;
        $result = $this->setting->executeSP();
        $this->setting->_param = $data;
        $valid = $result[1][0]['VALIDDATA'];

        if ($valid == true) {
            $rowdata = $result[3][0];
            $this->setting->_param['kasbank_id'] = $rowdata['kasbank_id'];
            $this->createGirodetail();
        }
    }

    function createGirodetail() {
        $data = $this->setting->_param;
        $this->setting->_paramsql = 'create';
        $this->setting->_param['hideparam'] = 'create';
        $this->setting->_storeprocedure = 'sp_td_kasbankdetail_bankdetail';

        $record = array(
            "project_id" => $data['project_id'],
            "pt_id" => $data['pt_id'],
            "kasbank_id" => $data['kasbank_id'],
            "coa_id" => 0,
            "coa_tmp" => $data['fixed_coa'],
            "seq" => 1,
            "kasbankdetail_date" => date('Y-m-d', strtotime($data['accept_date'])),
            "dataflow" => ($data['dataflow'] == 'O') ? 'I' : $data['dataflow'],
            "amount" => $data['amount'],
            "description" => $data['description'],
        );
        $this->setting->_param = $record;
        $this->setting->executeSP();
    }

    public function cashadvanceCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_param['accept_date'] = date('Y-m-d', strtotime($param['accept_date']));
                $this->setting->_param['claim_date'] = date('Y-m-d', strtotime($param['claim_date']));
                $this->setting->_param['status'] = 'T';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        if (isset($result[1][0]['VALIDDATA'])) {
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                        } else {
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                        }

                        if ($valid == true && $param['kasbondept_id'] > 0) {
                            $this->update_kasbankdepartment($param);
                        }

                        if ($valid == true && $counter < 1 && $param['kasbongiro'] == 'GIRO') {
                            $this->createGiro();
                        }
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

    public function cashadvanceUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['kasbon_id'];
                $this->setting->_param['accept_date'] = date('Y-m-d', strtotime($param['accept_date']));
                $this->setting->_param['claim_date'] = date('Y-m-d', strtotime($param['claim_date']));
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        if ($valid == true && $param['kasbondept_id'] > 0) {
                            $this->update_kasbankdepartment($param);
                            $this->cashback_kasbondepartment($param);
                        }
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

    public function cashback_kasbondepartment($param) {
        $kasbondept_id = $param['kasbondept_id'];
        $cashback = floatval($param['cashback']);
        $balance = floatval($param['balance']);
        $paid = floatval($param['paid']);
        if ($cashback > 0) {
            $rowkasbondept = $this->setting->getbyid_kasbondept($kasbondept_id);
            if ($rowkasbondept) {
                $record = array(
                    "amount_bayar" => $paid,
                    "amount_selisih" => $balance,
                    "amount_kembali" => $cashback,
                    "status" => 5,
                );
                $this->setting->update_bytableparam_v2($this->setting->_th_kasbondept, $record, array("kasbondept_id" => $kasbondept_id));
            }
        }
    }

    function cashadvanceDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kasbon_id';
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

                if ($valid == true) {
                    $this->restore_kasbondept($param[$key_name]);
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    public function update_kasbankdepartment($param) {
       /* $record = array(
            "kasbongiro" => $param['kasbongiro'],
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "transno" => $param['transno'],
            "voucher_no" => $param['voucher_no'],
        );*/
         $record = array(
            "kasbongiro" => $param['kasbongiro'],
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "kasbondept_id" => $param['kasbondept_id'],
        );
        $resultcashadvance = $this->setting->getdata_bytableparam_v2($this->setting->_th_kasbon, $record);
        if (!empty($resultcashadvance[0])) {
            $rowcashadvance = $resultcashadvance[0][0];
            $recordupdate = array(
                "kasbon_id" => $rowcashadvance['kasbon_id'],
                "status" => 3, //apply
            );
            $this->setting->update_bytableparam($this->setting->_th_kasbondept, $recordupdate, array("kasbondept_id" => $rowcashadvance['kasbondept_id']));
        }
    }

    public function restore_kasbondept($param) {
        $data = explode(",", $param);
        foreach ($data as $row) {
            $kasbon_id = $row;
            $record = array(
                "kasbon_id" => $kasbon_id,
                "deleted" => '1'
            );
            if (!empty($kasbon_id)) {
                $resultcashadvance = $this->setting->getdata_bytableparam($this->setting->_th_kasbon, $record);

                if (!empty($resultcashadvance[0])) {
                    $rowcashbon = $resultcashadvance[0][0];

                    if ($rowcashbon['kasbondept_id'] > 0) {
                        $recordupdate = array(
                            "kasbon_id" => 0,
                            "status" => 2, //Kembali menjadi approve
                        );
                        $this->setting->update_bytableparam_v2($this->setting->_th_kasbondept, $recordupdate, array("kasbondept_id" => $rowcashbon['kasbondept_id']));
                    }
                }
            }
        }
    }

}

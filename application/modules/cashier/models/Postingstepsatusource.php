<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Postingstepsatusource extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $generaldata = null;
    private $_project_id = 0;
    private $_pt_id = 0;

    function init() {
        $this->setting = new Cashier_Models_General_Setdata;
        $this->generaldata = new Cashier_Models_General_Generaldata;
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->setting->_storeprocedure = 'sp_postingstepsatu_source';
    }

    function postingstepsatuRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
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

    public function postingstepsatuCreate($param) {
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
                    case 'posting':
                        $data = $this->getdataKasbank($param);
                        $this->setting->_project_id = $this->_project_id;
                        $this->setting->_pt_id = $this->_pt_id;
                        $result = $data['data'];
                        $valid = $data['valid'];
                        $counter = $data['total'];
                        $message = $data['msg'];
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

    private function getdataKasbank($param) {
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_param['hideparam'] = 'getkasbankbyid';
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $data = $result[2][0];
            $result = $this->createJournalheader($param, $data);
            return $result;
        }
    }

    private function createJournalheader($param, $data) {
        $this->setting->_project_id = $param['project_id'];
        $this->setting->_pt_id = $param['pt_id'];
        $this->setting->_param = array(
            "kasbank_id" => $data['kasbank_id'],
            "prefix_id" => $param['prefix_id_gl'],
            "sort" => $param['sort'],
            "is_post" => 0,
            "is_fromkasir" => 1,
            "is_postingstep2" => 0,
            "voucher_date" => $param['voucher_date_gl'],
            "voucher_no" => $param['voucher_no'],
            "debet_total" => $data['amount'],
            "credit_total" => $data['amount'],
            "selisih" => 0
        );
        $this->setting->_paramsql = 'create';
        $this->setting->_storeprocedure = 'sp_th_journal';
        $this->setting->_param['hideparam'] = 'journalheader';
        $result = $this->setting->executeSP();
        if ($result[1][0]['VALIDDATA'] !== 'false') {
            $resultdetail = $this->createJournaldetail($data, $result[5][0]);
            $this->setstatusPostingsatu($param);
            return $resultdetail;
        } else {
            return array("valid" => false, "data" => $param, "msg" => $result[3][0]['MSG'], "total" => $result[2][0]['RECORD_TOTAL']);
        }
    }

    private function createJournaldetail($param, $data) {   
        $this->setting->_project_id = $data['project_id'];
        $this->setting->_pt_id = $data['pt_id'];
        $rowcoa = $this->generaldata->getcoabyid($param['coa_id']);
        if ($rowcoa > 0) {
            $coa = $rowcoa['coa'];
            $kelsub_id = $rowcoa['kelsub_id'];
            $kelsub = $rowcoa['kelsub'];
        } else {
            $coa = '';
            $kelsub_id = 0;
            $kelsub = '';
        }
        $dataflow = $param['dataflow'];
        if ($dataflow == 'I') {
            $type = "D";
        } else {
            $type = "C";
        }

        $this->setting->_param = array(
            "kasbank_id" => $data['kasbank_id'],
            "journal_id" => $data['journal_id'],
            "coa_id" => $param['coa_id'],
            "kelsub_id" => $kelsub_id,
            "kelsub" => $kelsub,
            "sort" => 1,
            "is_post" => 0,
            "coa" => $coa,
            "type" => $type,
            "amount" => $param['amount'],
            "description" => $param['description'],
        );        
        
        $this->setting->_paramsql = 'create';
        $this->setting->_storeprocedure = 'sp_th_journal';
        $this->setting->_param['hideparam'] = 'journaldetail';
        $this->setting->executeSP();       
        
        $module_id = $param['module_id'];
        if ($module_id == '0') {
            $result = $this->createNormaldetail($param, $data);
            return $result;
        } else {
            $result = $this->createCustomedetail($param, $data);
            return $result;
        }
    }

    private function createNormaldetail($param, $data) {
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_param['hideparam'] = 'getkasbankdetail';
        $resultdetail = $this->setting->executeSP();
        $counter = $resultdetail[1][0]['RECORD_TOTAL'];
        if ($counter > 0) {
            $project_id = $data['project_id'];
            $pt_id = $data['pt_id'];
            $journal_id = $data['journal_id'];
            $kasbank_id = $data['kasbank_id'];
            $this->setting->_project_id = $project_id;
            $this->setting->_pt_id = $pt_id;            
            foreach ($resultdetail[2] as $row) {
                $dataflow = $row['dataflow'];
                if ($dataflow == 'I') {
                    $type = "D";
                } else {
                    $type = "C";
                }

                $coa = $row['coa_tmp'];
                $tmp = explode(".", $coa);
                $coa_tmp = $tmp[0] . $tmp[1] . $tmp[2];

                if ($coa_tmp == 9999999) {
                    $coa_id = 0;
                    $resultcoa = $this->generaldata->getcoa($coa);
                    if ($resultcoa > 0) {
                        $coa_id = $resultcoa['coa_id'];
                    }
                } else {
                    $coa_id = $row['coa_id'];
                }
                
                $this->setting->_param = array(
                    "kasbank_id" => $kasbank_id,
                    "journal_id" => $journal_id,
                    "coa_id" => $coa_id,
                    "kelsub_id" => 0,
                    "kelsub" => "",
                    "sort" => $row['seq'],
                    "is_post" => 0,
                    "coa" => $coa,
                    "type" => $type,
                    "amount" => $row['amount'],
                    "description" => $row['description'],
                );

                $this->setting->_paramsql = 'create';
                $this->setting->_storeprocedure = 'sp_th_journal';
                $this->setting->_param['hideparam'] = 'journaldetail';
                $this->setting->executeSP();
            }
        }

        return array("valid" => true, "data" => $this->setting->_param, "msg" => "process create journal detail finish", "total" => 0);
    }

    private function createCustomedetail($param, $data) {
        $rowmodule = $this->generaldata->moduledata_byid($param['module_id']);
        if ($rowmodule > 0) {
            $modulename = $rowmodule['modulename'];
            $tablemodule = explode(",", $rowmodule['tablename']);
            $tableheader = $tablemodule[0];

            if (!empty($tableheader)) {
                $rowheader = $this->generaldata->getdatawithdynamictable($tableheader, "kasbank_id", $data['kasbank_id']);
                if ($rowheader > 0) {
                    $tabledetail = $tablemodule[1];
                    $arrayassosiatif = array_keys($rowheader);
                    $arraynumeric = array_values($rowheader);

                    $idkeyheader = $arrayassosiatif[0]; //capture key / index in array assosiatif
                    $idheader = $arraynumeric[0]; //capture value in array numeric

                    $this->setting->_paramsql = 'read';
                    $this->setting->_iddata = $param['kasbank_id'];
                    $this->setting->_storeprocedure = 'sp_commondata';
                    $this->setting->_param['hideparam'] = 'getkasbankdetail';
                    $resultdetail = $this->setting->executeSP();
                    $counterdetail = $resultdetail[1][0]['RECORD_TOTAL'];
                    if ($counterdetail > 0) {
                        $project_id = $data['project_id'];
                        $pt_id = $data['pt_id'];
                        $journal_id = $data['journal_id'];
                        $kasbank_id = $data['kasbank_id'];
                        $this->setting->_project_id = $project_id;
                        $this->setting->_pt_id = $pt_id;
                        foreach ($resultdetail[2] as $row) {
                            $dataflow = $row['dataflow'];

                            if ($dataflow == 'I') {
                                $type = "D";
                            } else {
                                $type = "C";
                            }

                            $coa = $row['coa_tmp'];
                            $tmp = explode(".", $coa);
                            $coa_tmp = $tmp[0] . $tmp[1] . $tmp[2];

                            if ($coa_tmp == 9999999) {
                                $coa_id = 0;
                                $resultcoa = $this->generaldata->getcoa($coa);
                                if ($resultcoa > 0) {
                                    $coa_id = $resultcoa['coa_id'];
                                }
                            } else {
                                $coa_id = $row['coa_id'];
                            }

                            $rowkelasub = $this->generaldata->getdatawithdynamictabledetailwithsort($tabledetail, $idkeyheader, $idheader, 'coa', $coa, 'indexdata', $row['seq']);
                            if ($rowkelasub > 0) {
                                $kelsub_id = $rowkelasub['kelsub_id'];
                                $rowkelsub = $this->generaldata->getKelsubbyid($kelsub_id);
                                $kelsub = $rowkelsub['kelsub'];
                                $arrayassosiatifdetail = array_keys($rowkelasub);
                                $arraynumericdetail = array_values($rowkelasub);
                                $iddetailkey = $arrayassosiatifdetail[0];
                                $iddetaildata = $arraynumericdetail[0];
                            } else {
                                $kelsub_id = 0;
                                $kelsub = '';
                                $iddetailkey = 0;
                                $iddetaildata = 0;
                            }

                           
                            $this->setting->_param = array(
                                "kasbank_id" => $kasbank_id,
                                "journal_id" => $journal_id,
                                "coa_id" => $coa_id,
                                "kelsub_id" => $kelsub_id,
                                "kelsub" => $kelsub,
                                "sort" => $row['seq'],
                                "is_post" => 0,
                                "coa" => $coa,
                                "type" => $type,
                                "amount" => $row['amount'],
                                "description" => $row['description'],
                            );

                            $this->setting->_paramsql = 'create';
                            $this->setting->_storeprocedure = 'sp_th_journal';
                            $this->setting->_param['hideparam'] = 'journaldetail';
                            $result1 = $this->setting->executeSP();

                            if ($result1[1][0]['VALIDDATA'] == 'true') {
                                $this->createJournalsubdetail($param, $data, $result1[5][0], $iddetailkey, $iddetaildata);
                                $valid = true;
                                $message = "Create journal detail success";
                                $total = 0;
                            } else {
                                $valid = false;
                                $message = "Create journal detail failed";
                                $total = 1;
                            }
                        }
                    }
                }
            }
        }

        return array("valid" => true, "data" => $this->setting->_param, "msg" => "process create journal detail finish", "total" => 0);
    }

    private function createJournalsubdetail($param, $data, $journaldetail, $keyheader, $idheader) {
        $kelsub_id = $journaldetail['kelsub_id'];
        $coa = $journaldetail['coa'];
        $sort = $journaldetail['sort'];
        if ($kelsub_id > 0) {
            $rowmodule = $this->generaldata->moduledata_byid($param['module_id']);
            if ($rowmodule > 0) {
                $tablemodule = explode(",", $rowmodule['tablename']);
                $tablesubdetail = $tablemodule[2];
                if (!empty($tablesubdetail)) {
                    $rowsubdetail = $this->generaldata->getdatawithdynamictableall($tablesubdetail, $keyheader, $idheader);
                    if ($rowsubdetail !== 0) {
                        foreach ($rowsubdetail as $row) {
                            $this->setting->_project_id = $journaldetail['project_id'];
                            $this->setting->_pt_id = $journaldetail['pt_id'];
                            $rowsubgl = $this->generaldata->getSubglbyid($row['subgl_id']);
                            $this->setting->_param = array(
                                "project_id" => $journaldetail['project_id'],
                                "pt_id" => $journaldetail['pt_id'],
                                "kasbank_id" => $data['kasbank_id'],
                                "journal_id" => $journaldetail['journal_id'],
                                "journaldetail_id" => $journaldetail['journaldetail_id'],
                                "coa_id" => $journaldetail['coa_id'],
                                "kelsub_id" => $journaldetail['kelsub_id'],
                                "subgl_id" => $row['subgl_id'],
                                "is_post" => 0,
                                "code" => $rowsubgl['code'],
                                "code1" => $rowsubgl['code1'],
                                "code2" => $rowsubgl['code2'],
                                "code3" => $rowsubgl['code3'],
                                "code4" => $rowsubgl['code4'],
                                "description" => $row['remarks'],
                                "amount" => $row['amount'],
                            );

                            $this->setting->_paramsql = 'create';
                            $this->setting->_storeprocedure = 'sp_th_journal';
                            $this->setting->_param['hideparam'] = 'journalsubdetail';
                            $result = $this->setting->executeSP();

                            if ($result[1][0]['VALIDDATA'] == 'true') {
                                $valid = true;
                                $message = "Create journal detail success";
                                $total = 0;
                            } else {
                                $valid = false;
                                $message = "Create journal detail failed";
                                $total = 1;
                            }
                        }
                    }
                }
            }
        } else {
            $valid = false;
            $message = "Create journal sub detail no extst data";
            $total = 1;
        }
    }

    public function postingstepsatuUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['journal_id'];
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

    private function setstatusPostingsatu($param) {
        $this->setting->_param = array(
            "is_post" => 1
        );
        $this->setting->_storeprocedure = 'sp_th_journal';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_paramsql = 'update';
        $this->setting->executeSP();
    }

    function postingstepsatuDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = '[journal_id]';
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

}

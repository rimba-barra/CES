<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Postingstepdua extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->setting = new Cashier_Models_General_Setdata;
        $this->generaldata = new Cashier_Models_General_Generaldata;
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->setting->_storeprocedure = 'sp_postingstepdua';
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');
    }

    function postingstepduaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        /* pada saat menu ini diakses. defaultnya tampilkan seluruh 
                           data yang ada dijournal temporary
                         */
                        //$this->setting->_project_id = 0;
                        $this->setting->_pt_id = 0;
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        /* dicustome sesuai kebutuhan
                           jika checkall di pilih maka filter seluruh data
                         */
                        //$this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
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

    private function docNumbervoucher($param) {
        $_docdate = new DateTime(date('Y-m-d', strtotime($param['voucher_date'])));
        $_var1 = array();
        $_var1['PREFIX'] = $param['prefix'];
        $_var2 = array();
        $_docNo = $this->counterdoc->get_advanceNo($param['project_id'], $param['pt_id'], $param['apps_id'], $param['module'], $_var1, $_var2, $_docdate, $param['flag']);
        return $_docNo;
    }

    private function createJournalheadergl($param) {
         //VOUCHER NO DARI KASIR TETAP
        $staticNo = 1;

        if($staticNo==1){
            $voucher_no = $param['voucher_no'];
        }else{
            // START SET VOUCHER NUMBER FROM MASTER DECUMENT NUMBERING
            $dataconfig = $this->generaldata->getconfig('gl');
            $param['apps_id'] = $dataconfig['module_id'];
            $param['module'] = 'JOURNAL';
            $param['flag'] = '1';
            //print_r($param);
            //exit;
            $voucher_no = $this->docNumbervoucher($param);
            // END SET VOUCHER NUMBER FROM MASTER DECUMENT NUMBERING       
            $this->setting->_project_id = $param['project_id'];
            $this->setting->_pt_id = $param['pt_id'];    
        }

        $this->setting->_param = array(
            "prefix_id" => $param['prefix_id'],
            "sort" => $param['seq'],
            "is_post" => 0,
            "is_fromkasir" => 1,
            "voucher_date" => $param['voucher_date'],
            "voucher_no" => $voucher_no,
            "debet_total" => $param['debet_total'],
            "credit_total" => $param['credit_total'],
            "selisih" => $param['selisih'],
        );


        $this->setting->_paramsql = 'create';
        $this->setting->_storeprocedure = 'sp_th_journaltogl';
        $this->setting->_param['hideparam'] = 'journalheader';
        $result = $this->setting->executeSP();

        if ($result[1][0]['VALIDDATA'] !== 'false') {
            $this->createJournaldetail($param, $result[5][0]);
            $this->setstatusPostingdua($param);
            return array("valid" => true, "data" => $param, "msg" => "Generate voucher to GL finish", "total" => 0);
        } else {
            return array("valid" => false, "data" => $param, "msg" => $result[3][0]['MSG'], "total" => $result[2][0]['RECORD_TOTAL']);
        }
    }

    private function getJournaldetailoncashier($journal_id) {
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $journal_id;
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_param['hideparam'] = 'getjournaldetailcashier';
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            return $result[2];
        } else {
            return null;
        }
    }

    private function createJournaldetail($param, $rowjournalheader) {
        $rowjournaldetailcashier = $this->getJournaldetailoncashier($param['journal_id']);
        if ($rowjournaldetailcashier !== null) {
            foreach ($rowjournaldetailcashier as $row) {
                $journaldetail_idcashier = $row['journaldetail_id'];
                $this->setting->_project_id = $rowjournalheader['project_id'];
                $this->setting->_pt_id = $rowjournalheader['pt_id'];
                $this->setting->_param = array(
                    "journal_id" => $rowjournalheader['journal_id'],
                    "coa_id" => $row['coa_id'],
                    "kelsub_id" => $row['kelsub_id'],
                    "kelsub" => $row['kelsub'],
                    "sort" => $row['sort'],
                    "is_post" => $row['is_post'],
                    "coa" => $row['coa'],
                    "type" => $row['type'],
                    "description" => $row['description'],
                    "amount" => $row['amount']
                );

                $this->setting->_paramsql = 'create';
                $this->setting->_storeprocedure = 'sp_th_journaltogl';
                $this->setting->_param['hideparam'] = 'journaldetail';
                $result = $this->setting->executeSP();
                if ($result[1][0]['VALIDDATA'] !== 'false') {
                    if ($row['kelsub_id'] > 0) {
                        $this->createJournalsubdetailgl($param, $result[5][0], $journaldetail_idcashier);
                    }
                }
            }
        }
    }

    private function getJournalsubdetailoncashier($journaldetail_idcashier) {
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $journaldetail_idcashier;
        $this->setting->_storeprocedure = 'sp_commondata';
        $this->setting->_param['hideparam'] = 'getjournalsubdetailcashier';
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            return $result[2];
        } else {
            return null;
        }
    }

    private function createJournalsubdetailgl($param, $rowjournaldetail, $journaldetail_idcashier) {
        $rowjournalsubdetailcashier = $this->getJournalsubdetailoncashier($journaldetail_idcashier);
        if ($rowjournalsubdetailcashier !== null) {
            foreach ($rowjournalsubdetailcashier as $row) {
                $journaldetail_id = $rowjournaldetail['journaldetail_id'];
                $this->setting->_project_id = $rowjournaldetail['project_id'];
                $this->setting->_pt_id = $rowjournaldetail['pt_id'];
                $rowsubgl = $this->generaldata->getSubglbyid($row['subgl_id']);
                $this->setting->_param = array(
                    "journal_id" => $rowjournaldetail['journal_id'],
                    "journaldetail_id" => $journaldetail_id,
                    "coa_id" => $row['coa_id'],
                    "kelsub_id" => $row['kelsub_id'],
                    "subgl_id" => $row['subgl_id'],
                    "is_post" => $row['is_post'],
                    "code" => $rowsubgl['code'],
                    "code1" => $rowsubgl['code1'],
                    "code2" => $rowsubgl['code2'],
                    "code3" => $rowsubgl['code3'],
                    "code4" => $rowsubgl['code4'],
                    "description" => $row['keterangan'],
                    "amount" => $row['amount']
                );

                $this->setting->_paramsql = 'create';
                $this->setting->_storeprocedure = 'sp_th_journaltogl';
                $this->setting->_param['hideparam'] = 'journalsubdetail';
                $result = $this->setting->executeSP();
                if ($result[1][0]['VALIDDATA'] !== 'false') {
                    
                }
            }
        }
    }
    private function setstatusPostingdua($param) {        
        $this->setting->_param = array(
            "is_post" => 2,
            "is_posting_gl" => 1,
            "chequegiro_status" => "APPROVE"
        );
        $this->setting->_storeprocedure = 'sp_th_journaltogl';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_paramsql = 'update';
        $result = $this->setting->executeSP();
    }

    private function setstatusPostingsatuunposting($param) {
        $this->setting->_param = array(
            "is_post" => 0,
            "is_posting_gl" => 0,
            "chequegiro_status" => "PAID"
        );
        $this->setting->_storeprocedure = 'sp_th_journal';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_paramsql = 'unposting';
        $result = $this->setting->executeSP();
        $valid = $result[2][0]['VALIDDATA'];
        $counter = $result[3][0]['RECORD_TOTAL'];
        $message = $result[4][0]['MSG'];
        return array(
            "parameter" => $param['hideparam'],
            "msg" => $message,
            "success" => $valid,
            "valid" => $valid,
            "data" => $result,
            "total" => $counter,
        );
    }

    public function postingstepduaCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $data = $this->createJournalheadergl($param);
                        $this->setting->_project_id = $this->_project_id;
                        $this->setting->_pt_id = $this->_pt_id;                       
                        $result = $data['data'];
                        $valid = $data['valid'];
                        $counter = $data['total'];
                        $message = $data['msg'];
                        break;
                    case 'unposting':
                        $data = $this->setstatusPostingsatuunposting($param);
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

    public function postingstepduaUpdate($param) {
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

    function postingstepduaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'journal_id';
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

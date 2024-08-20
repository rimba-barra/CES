<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Gl_Models_Journal extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_jurnal';
    protected $_accountjournal = 'td_jurnaldetail';
    protected $_subaccountjournal = 'td_jurnalsubdetail';
    protected $_summary = 'th_summary';
    protected $session;
    protected $_pt_id = 0;
    protected $_project_id = 0;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_queryj = new Gl_Models_Query_Journal();
        $this->_phpExcel  = new PHPExcel();
    }

    function defaultjournalRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            0,
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_journal_readall', $data);
        // var_dump($this->sqlStr);
        return $result;
    }

    function reportjournalRead($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_journal_all', $data);
        return $result;
    }

    function changeyearRead($param) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $this->_schema = $tmp[0] . '_' . $param['dbyear'] . '.dbo';

        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_journal_all', $data);
        return $result;
    }

    function searcjournalRead($param) {
        if ($param['hideparam'] == 'customereset') {
            $posting = 0;
        } else {
            $posting = $param['is_posting'];
        }
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['voucher_no'],
            $param['prefix_id'],
            $param['fromdate'],
            $param['untildate'],
            $posting,
            $param['start'],
            $param['limit'],
            $param['description']
        );

        $result = $this->execSP3('sp_journal_search', $data);

        if ($result[1][0]['RECORD_TOTAL'] > 0) {
            return array($result[1], $result[2]);
        } else {
            return array(0, null);
        }
    }

    function koreksijournalRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            1, //is post
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_journal_readall', $data);
        return $result;
    }

    function journalRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'default':
                        $result = $this->defaultjournalRead($param);
                        $arraydata = $result[1];
                        break;
                    case 'koreksi':
                        $result = $this->koreksijournalRead($param);
                        $arraydata = $result[1];
                        break;
                    case 'forreport':
                        $result = $this->reportjournalRead($param);
                        $arraydata = $result[1];
                        break;
                    case 'changeyear':
                        $result = $this->changeyearRead($param);
                        $arraydata = $result[1];
                        break;
                    case 'customesearch':
                        $result = $this->_model->customesearchjournal($param);
                        $arraydata = $result[1];
                        break;
                    case 'livesearch':
                        $result = $this->searcjournalRead($param);
                        $arraydata = $result[1];
                        break;
                }
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function journalReadAccountJournalRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if ($param['hideparam'] == 'changeyear') {
                    $tmp = explode("_", $this->session->getSelectedDbApp());
                    $this->_schema = $tmp[0] . '_' . $param['dbyear'] . '.dbo';
                    if (!empty($param['voucherno'])) {
                        if ($param['journal_id'] == '') {
                            $journal_id = $this->getVoucherid($param['voucherno']);
                        }
                        $param['journal_id'] = $journal_id;
                    }
                } else {
                    $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
                }


                $data = array(
                    1,
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['start'],
                    $param['limit']
                );
                $result = $this->execSP3('sp_journaldetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }

        return $return;
    }

    function journalReadSubAccountJournalRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if ($param['hideparam'] == 'changeyear') {
                    $tmp = explode("_", $this->session->getSelectedDbApp());
                    $this->_schema = $tmp[0] . '_' . $param['dbyear'] . '.dbo';
                    if (!empty($param['voucherno'])) {
                        if ($param['journal_id'] == '') {
                            $journal_id = $this->getVoucherid($param['voucherno']);
                        }
                        $param['journal_id'] = $journal_id;
                    }
                } else {
                    $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
                }

                $data = array(
                    1,
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['journaldetail_id'],
                    $param['start'],
                    $param['limit']
                );
                $result = $this->execSP3('sp_journalsubdetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        return $return;
    }

    function journalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {

            try {
                $parameter = $param['hideparam'];
                if ($parameter == 'checkexist') {
                    $result = $this->checkExist($param);
                } else if ($parameter == 'generatevoucher') {
                    $result = $this->generateVoucher($param);
                } else if ($parameter == 'autovalaccountjournal') {
                    $result = $this->autoValAccountJournal($param);
                } else if ($parameter == 'copyjournal'){
                    $result = $this->copyJournal($param);
                } else {
                    $result = $this->createData($param);
                }


                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['data'] = $result;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['data'] = $result;
                }
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        return $return;
    }

    function getVoucherid($voucher) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $voucher
        );

        $result = $this->execSP3("sp_journal_getvoucher", $data);
        $journalid = $result[0][0]['journal_id'];
        return $journalid;
    }

    function getCoaid($coa) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        );

        $result = $this->execSP3("sp_coa_getbycoa", $data);
        $coa_id = $result[0][0]['coa_id'];
        return $coa_id;
    }

    function getJournalDetailid($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['journal_id'],
            $param['kelsub_id'],
            $param['coa_id'],
            $param['kelsub'],
            $param['coa'],
            $param['type'],
            $param['keterangan'],
            $param['amount']
        );
        $result = $this->execSP3("sp_journaldetail_getafterinsert", $data);
        if (!empty($result[0][0])) {
            $hasil = $result[0][0];
        } else {
            $hasil = '';
        }

        return $hasil;
    }

    function accountjournalCreate($param) {
        
        $param['keterangan'] = str_replace("'","`",$param['keterangan']); //cleaning
        
        if ($param['deleted'] == false) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $journal_id = $this->getVoucherid($param['voucherno']),
                $param['sort'],
                $param['kelsub_id'],
                $coa_id = $this->getCoaid($param['coa']),
                $param['kelsub'],
                $param['coa'],
                $param['type'],
                $param['keterangan'],
                $param['amount'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journaldetail_create", $data);
        } else {
            $result = null;
        }

        return $result;
    }

    function accountjournalUpdate($param) {
        
        $param['keterangan'] = str_replace("'","`",$param['keterangan']); //cleaning

        if ($param['state'] == 'loaddata' and $param['deleted'] == false) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['sort'],
                $param['journal_id'],
                $param['journaldetail_id'],
                $param['kelsub_id'],
                $param['coa_id'],
                $param['coa'],
                $param['kelsub'],
                $param['type'],
                $param['keterangan'],
                $param['amount'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journaldetail_update", $data);
        } else if ($param['state'] == 'loaddata' && $param['deleted'] == true) {
            $result = $this->accountjournalDelete($param);
        } else if ($param['state'] !== 'loaddata' && $param['deleted'] == false) {
            $result = $this->accountjournalCreate($param);
        }

        return $result;
    }

    function accountjournalDirectCreate($param) {
        
        $param['remarks'] = str_replace("'","`",$param['remarks']); //cleaning
        
        if ($param['deleted'] == false) {
            $data = array(
                $param['project_id'],
                $param['pt_id'],
                $param['journal_id'],
                $param['indexdata'],
                $param['kelsub_kelsub_id'],
                $param['coa_coa_id'],
                $param['kelsub_kelsub'],
                $param['coa_coa'],
                $param['type_acc'],
                $param['remarks'],
                $param['amount'],
                $param['cashflowtype_cashflowtype_id'],  // setup_cashflow_id
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journaldetaildirect_create", $data);
        } else {
            $result = null;
        }

        return $result;
    }

    function accountjournalDirectReserveCreate($param) {
        
        $param['remarks'] = str_replace("'","`",$param['remarks']); //cleaning
        
        if ($param['deleted'] == false) {
            $data = array(
                $param['project_id'],
                $param['pt_id'],
                $param['journal_id'],
                $param['indexdata'],
                $param['kelsub_kelsub_id'],
                $param['coa_coa_id'],
                $param['kelsub_kelsub'],
                $param['coa_coa'],
                $param['type_acc'],
                $param['remarks'],
                $param['amount'],
                $param['cashflowtype_cashflowtype_id'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journaldetaildirectreserve_create", $data);
        } else {
            $result = null;
        }

        return $result;
    }


    function accountjournalDirectUpdate($param) {
        
        $param['keterangan'] = str_replace("'","`",$param['remarks']); //cleaning
 
        if (true) {
            $data = array(
                $param['project_id'],
                $param['pt_id'],
                $param['indexdata'],
                $param['journal_id'],
                $param['voucherdetail_id'],
                $param['kelsub_kelsub_id'],
                $param['coa_coa_id'],
                $param['coa_coa'],
                $param['kelsub_kelsub'],
                $param['type_acc'],
                $param['remarks'],
                $param['amount'],
                $param['cashflowtype_cashflowtype_id'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journaldetaildirect_update", $data);
        } else if ($param['state'] == 'loaddata' && $param['deleted'] == true) {
            $result = $this->accountjournalDelete($param);
        } else if ($param['state'] !== 'loaddata' && $param['deleted'] == false) {
            $result = $this->accountjournalCreate($param);
        }

        return $result;
    }

    function accountjournalDirectDelete($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['journaldetail_id'],
            1,
            $this->session->getUserId(),
        );

        $result = $this->execSP3("sp_journaldetail_delete", $data);
        return $result;
    }

    function accountjournalDirectDeleteAll($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['journal_id']
        );
        $result = $this->execSP3("sp_journaldetail_deleteall", $data);
        return $result;
    }

    function singledetailmultisubConvert($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['journal_id']
        );
        $result = $this->execSP3("sp_singledetailmultisub_convert", $data);
        return $result;
    }

    function accountjournalDelete($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['journaldetail_id'],
            $param['deleted'],
            $this->session->getUserId(),
        );

        $result = $this->execSP3("sp_journaldetail_delete", $data);
        return $result;
    }

    function journalaccountjournalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];

                switch ($parameter) {
                    case "default";
                        $result = $this->accountjournalCreate($param);
                        $hasil = $this->getdata_account($param, 'create');
                        break;
                    case "update";
                        $result = $this->accountjournalUpdate($param);
                        $hasil = $this->getdata_account($param, 'update');
                        break;
                }

                $return['total'] = $result[0];
                $return['success'] = true;
                $return['data'] = $result;
                $return['parameter'] = $parameter;
                $return['hasil'] = $hasil;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['data'] = $result;
                    $return['hasil'] = $hasil;
                }
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        return $return;
    }

//    function getdata_account($param) {
//        $datadetail = array(
//            "journal_id" => $this->getVoucherid($param['voucherno']),
//            "kelsub_id" => $param['kelsub_id'],
//            "coa_id" => $this->getCoaid($param['coa']),
//            "kelsub" => $param['kelsub'],
//            "coa" => $param['coa'],
//            "type" => $param['type'],
//            "keterangan" => $param['keterangan'],
//            "amount" => $param['amount']
//        );
//
//        $hasil = $this->getJournalDetailid($datadetail);
//        return $hasil;
//    }
    function getdata_account($param, $flag) {
        $datadetail = array(
            "journal_id" => $this->getVoucherid($param['voucherno']),
            "kelsub_id" => $param['kelsub_id'],
            "flag" => $flag,
            "sort" => $param['sort'],
            "coa_id" => $this->getCoaid($param['coa']),
            "kelsub" => $param['kelsub'],
            "coa" => $param['coa'],
            "type" => $param['type'],
            "keterangan" => $param['keterangan'],
            "amount" => $param['amount'],
            "journaldetail_id" => $param['journaldetail_id'],
        );

        $hasil = $this->_queryj->getjournaldetail_id($datadetail);
        return $hasil;
    }

    function subaccountCreate($param) {
        if ($param['deleted'] == false) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['journal_id'],
                $param['journaldetail_id'],
                $param['coa_id'],
                $param['subgl_id'],
                $param['kelsub_id'],
                $param['code'],
                $param['code1'],
                $param['code2'],
                $param['code3'],
                $param['code4'],
                $param['keterangan'],
                $param['amount'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journalsubdetail_create", $data);
        } else {
            $result = null;
        }
        return $result;
    }

    function subaccountUpdate($param) {
        if ($param['state'] == 'loaddata' && $param['deleted'] == false) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['journal_id'],
                $param['journaldetail_id'],
                $param['journalsubdetail_id'],
                $param['coa_id'],
                $param['subgl_id'],
                $param['kelsub_id'],
                $param['code'],
                $param['code1'],
                $param['code2'],
                $param['code3'],
                $param['code4'],
                $param['keterangan'],
                $param['amount'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journalsubdetail_update", $data);
        } else if ($param['state'] == 'loaddata' && $param['deleted'] == true) {
            $result = $this->subaccountDelete($param);
        } else if ($param['state'] !== 'loaddata' && $param['deleted'] == false) {
            $result = $this->subaccountCreate($param);
        }

        return $result;
    }

    function subaccountDelete($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['journalsubdetail_id'],
            $param['deleted'],
            $this->session->getUserId(),
        );
        $result = $this->execSP3("sp_journalsubdetail_delete", $data);
        return $result;
    }

    function subaccountDirectCreate($param) {
        if (true) {
            $data = array(
                (isset($param['project_id']))?$param['project_id']:$this->session->getCurrentProjectId(),
                (isset($param['pt_id']))?$param['pt_id']:$this->session->getCurrentPtId(),
                $param['journal_id'],
                $param['journaldetail_journaldetail_id'],
                $param['coa_id'],
                $param['subgl_subgl_id'],
                $param['kelsub_kelsub_id'],
                $param['subgl_code'],
                $param['subgl_code1'],
                $param['subgl_code2'],
                $param['subgl_code3'],
                $param['subgl_code4'],
                $param['remarks'],
                $param['amount'],
                $this->session->getUserId(),
                '1',
                $param['journaldetail_indexdata'],
                $param['indexsubdata']
            );
            $result = $this->execSP3("sp_journalsubdetaildirect_create", $data);
        } else {
            $result = null;
        }
        return $result;
    }

    function subaccountDirectUpdate($param) {
        if (true) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['journal_id'],
                $param['journaldetail_id'],
                $param['journalsubdetail_id'],
                $param['coa_id'],
                $param['subgl_subgl_id'],
                $param['kelsub_kelsub_id'],
                $param['subgl_code'],
                $param['subgl_code1'],
                $param['subgl_code2'],
                $param['subgl_code3'],
                $param['subgl_code4'],
                $param['remarks'],
                $param['amount'],
                $this->session->getUserId(),
                '1',
                $param['journaldetail_indexdata'],
                $param['indexsubdata']
            );
            $result = $this->execSP3("sp_journalsubdetaildirect_update", $data);
        } else if ($param['state'] == 'loaddata' && $param['deleted'] == true) {
            $result = $this->subaccountDelete($param);
        } else if ($param['state'] !== 'loaddata' && $param['deleted'] == false) {
            $result = $this->subaccountCreate($param);
        }

        return $result;
    }

    function subaccountDirectDelete($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['journalsubdetail_id'],
            1,
            $this->session->getUserId(),
        );
        $result = $this->execSP3("sp_journalsubdetail_delete", $data);
        return $result;
    }

    function journalsubaccountjournalCreate($param = array()) {
        
        $param['keterangan'] = str_replace("'","`",$param['keterangan']); //cleaning

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];

                switch ($parameter) {
                    case 'default':
                        $result = $this->subaccountCreate($param);
                        break;
                    case 'update':
                        $result = $this->subaccountUpdate($param);
                        break;
                }

                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['data'] = $result;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['data'] = $result;
                }
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }

        return $return;
    }

    function checkExist($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['voucher_no']
        );
        return $this->execSP3("sp_journal_checkexist", $data);
    }

    function createData($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['no_generate'],
            date('Y-m-d', strtotime($param['voucher_date'])),
            $param['prefix_id'],
            $param['debit_total'],
            $param['credit_total'],
            $param['selisih'],
            $this->session->getUserId(),
            '1'
        );

        return $this->execSP3("sp_journal_create", $data);
        //var_dump($this->sqlStr);
    }

    function copyJournal($param) {

        $data = array(
            $param['journal_id'],
            $param['voucher_no'],
            $param['voucher_date'],
            $this->session->getUserId()
        );

        return $this->execSP3("sp_journalcopy_create", $data);
        //var_dump($this->sqlStr);
    }

    function generateVoucher($param) {
        
        //IF DYNAMIC PT, INIT $this->_pt_id 
        if(isset($param['pt_id'])){
            $this->_pt_id = $param['pt_id'];
        }else{
            $this->_pt_id = $this->session->getCurrentPtId();
        }
        if(isset($param['project_id'])){
            $this->_project_id = $param['project_id'];
        }else{
            $this->_project_id = $this->session->getCurrentProjectId();
        }

        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $param['prefix_id'],
        );

        $result = $this->execSP3("sp_journal_generate_voucher", $data);

        $counter = $result[0][0]['counterprefix'] + 1;
        $prefix_id = $result[1][0]['prefix_id'];
        $prefix = $result[1][0]['prefix'];
        $description = $result[1][0]['description'];
        $temp = "0000" . $counter;
        //month override 

        $month = date("m",strtotime($param['docdate']));

        $nomor_urut = $prefix . substr($temp, -4) . '/' . $month;
        
        $_docNo = $this->docNumber($prefix_id, $param['flagdocument'], $param['docdate']);  //nomor docoment for preview             
        return $_docNo . "#" . $description . "#" . $month;
    }

    function docNumber($prefix_id, $flag, $docdate) {
        
        if($this->_pt_id>0){
           $data = array(
                $this->_project_id,
                $this->_pt_id,
                $prefix_id,
            );
        }else{
           $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $prefix_id,
            );
        }

        $result = $this->execSP3("sp_journal_generate_voucher", $data);
        $prefix = $result[1][0]['prefix'];

        $_docdate = new DateTime(date($docdate)); // sesuaikan dengan form tanggal voucher
        $_project_id = $this->_project_id;
        $_pt_id = $this->_pt_id;
        $_apps_id = $this->session->getCurrentModuleId();

        //Override meski datang dari kasir apps id tetap 10;
        if($_apps_id == 11) {
            $_apps_id = 10;
        }
        $_module = "JOURNAL";

        $_var1 = array();
        $_var1['PREFIX'] = $prefix;

        $_var2 = array();

        $_docNo = $this->counterdoc->get_advanceNo($_project_id, $_pt_id, $_apps_id, $_module, $_var1, $_var2, $_docdate, $flag);

        return $_docNo;
    }

    function docNumberprojectpt($prefix_id, $flag, $docdate,$param) {
        //IF DYNAMIC PT, INIT $this->_pt_id 
        $this->_pt_id = $param['pt_pt_id'];
        $this->_project_id = $param['project_project_id'];

        if($prefix_id==""){ //jika kosong get prefix id by journal_no
            $data = array(
                $this->_project_id,
                $this->_pt_id,
                $param['journal_no']
            );

           $result = $this->execSP3("sp_getprefixid", $data);
           $prefix_id = $result[0][0]['prefix_id'];
        }
        //GOTOHERE
        $this->docNumber($prefix_id, $flag, $docdate);

    }

    function autoValAccountJournal($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['coa_id'],
        );

        $result = $this->execSP3("sp_journal_getval_coa", $data);

        $counter = $result[0][0]['counterkelsub'];
        $coa_id = $result[1][0]['coa_id'];
        $kelsub_id = $result[1][0]['kelsub_id'];
        $kelsub = $result[1][0]['kelsub_acc'];
        $type = $result[1][0]['type'];
        $coaname = $result[1][0]['name'];

        return $counter . "|" . $coa_id . "|" . $kelsub_id . "|" . $kelsub . "|" . $coaname . "|" . $type;
    }

    function journalUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['no_generate'],
                    date('Y-m-d', strtotime($param['voucher_date'])),
                    $param['prefix_id'],
                    $param['debit_total'],
                    $param['credit_total'],
                    $param['selisih'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journal_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalDirectUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['project_project_id'],
                    $param['pt_pt_id'],
                    $param['journal_id'],
                    $param['journal_no'],
                    date('Y-m-d', strtotime($param['journal_date'])),
                    $param['prefix_prefix_id'],
                    $param['sum_total_detail'],
                    $param['sum_totalc_detail'],
                    0,
                    $param['description'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journaldirect_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalaccountjournalUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['journaldetail_id'],
                    $param['coa_id'],
                    $param['coa'],
                    $param['type'],
                    $param['keterangan'],
                    $param['amount'],
                    $param['kelsub_id'],
                    $param['kelsub'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journalaccountjournal_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalsubaccountjournalUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journaldetail_id'],
                    $param['journalsubdetail_id'],
                    $param['subgl_id'],
                    $param['kelsub_id'],
                    $param['code'],
                    $param['code1'],
                    $param['code2'],
                    $param['code3'],
                    $param['code4'],
                    $param['amount'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journalsubaccountjournal_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalDelete($param = array()) {
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
                $paramdata = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param[$key_name]
                );

                $rcheck = $this->execSP3('sp_journal_getbyid', $paramdata);
                $statusposting = $rcheck[0][0]['is_post'];

                //BOLEH DELETE WALAU SUDAH POSTING - SH3A - 6/11/2018
                if (true) {
                    $data = array(
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param[$key_name],
                        1,
                        $this->session->getUserId()
                    );

                    $result = $this->execSP3('sp_journal_delete', $data);
                    if ($statusposting == 0) {
                        $status = "not posted";
                    }else{
                        $status = "posted but deleted";
                    }
                    $msg = "";
                }
                /*
                if ($statusposting == 0) {
                    $data = array(
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param[$key_name],
                        1,
                        $this->session->getUserId()
                    );

                    $result = $this->execSP3('sp_journal_delete', $data);
                    $status = "not used";
                    $msg = "";
                } else {
                    $result = NUll;
                    $status = "used";
                    $msg = "Sorry the data cannot deleted, because data has been posting";
                }
                */

                $return['status'] = $status;
                $return['msg'] = $msg;
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalaccountjournalDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'journaldetail_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_journalaccountjournal_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalsubaccountjournalDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'journalsubdetail_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_journalsubaccountjournal_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function accountDirectSumdebetcredit($param) {
        $data = array(
            $param['journal_id']
        );
        $result = $this->execSP3("sp_journalsumdebetcredit_read", $data);
        return $result;
    }
    
    function accountDirectSumdetailfromsub($param) {
        $data = array(
            $param['journaldetail_id']
        );
        $result = $this->execSP3("sp_journalsumdetailfromsub_read", $data);
        return $result;
    }


     function generatepphjo($param) {
        $data = array(
            $param['pt_id'],
            $param['project_id'],
            date('Y-m-d', strtotime($param['vdate_from'])),
            date('Y-m-d', strtotime($param['vdate_until'])),
        );

        return $this->execSP3("sp_generatePPhJO", $data);
        //var_dump($this->sqlStr);
    }


      function exportdetailjournal($param){

        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
      /*  $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];
    */
       
        //$additional['header'] = array( $ptname, 'CASHFLOW STATEMENT REPORT', '', 'PERIOD : '.$param['subfromdate'].' UNTIL '.$param['subuntildate']);
        $additional['title_report'] = array('DETAIL JOURNAL');
      

        $sheetname = '';
        $titles = '';
        $sheet = 0 ; 


        $sql = "sp_export_detailjournal";
        $col = array( 'project_id', 'pt_id','journal_id','journal_no', 'journal_date', 'prefix', 'keterangan', 'no_urut','coa','tipe','kawasan','sub','amount_detail','cashflow','sub_description');
        $titles = array( 'PROJECT ID', 'PT ID','JOURNAL ID','JOURNAL NO', 'JOURNAL DATE', 'PREFIX', 'KETERANGAN', 'NO. URUT','COA','TIPE','KAWASAN','SUB','AMOUNT DETAIL','CASHFLOW','SUB DESCRIPTION'); 
        $paramdata = array($param['journal_id']);

        $sheetname = "ExportDetailJournal";
           
        $doc = $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        $lastrecord = $doc->getActiveSheet()->getHighestRow();


            $titleArraystyle = array(
                'font' => array(
                    'bold' => true,
                    'color' => array('rgb' => '2F4F4F'),
                    'size' => 10
                ),
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                ),
                'borders' => array(
                      'allborders' => array(
                          'style' => PHPExcel_Style_Border::BORDER_THIN
                      )
                  )
            );

            $ContentArraystyle = array(
                'font' => array(
                  
                    'size' => 10
                ),
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                ),
               
            );
            $doc->getActiveSheet()->getStyle("A1:O1")->applyFromArray($titleArraystyle);
            $doc->getActiveSheet()->getStyle("A2:O".$lastrecord)->applyFromArray($ContentArraystyle);
            $doc->getActiveSheet()->getColumnDimension('A')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('B')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('D')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('E')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('F')->setWidth(15);
            $doc->getActiveSheet()->getStyle("A1:O1")->getFont()->setBold(true);
            $doc->getActiveSheet()->getStyle('M2:M'.$lastrecord)->getNumberFormat()->setFormatCode('#,##0.00');


      
        

        
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


        return $this->_tmpparam;

    }


      function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        $voucherno = str_replace('/', '_', $param['voucher_no']);
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";

            $dataArray = $this->execSP3($sql, $paramdata); 

            $datas = $dataArray[0];
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }

           

            $tmp = array();
            $final = array();
           // array_push($final, $additional['title_report']);
            array_push($final, $titles);

            foreach ($datas as $d) {

                //HARUS URUT SESUAI QUERY
                foreach ($arrayKeys as $key) {
                    if(in_array($key, $col)){
                        array_push($tmp, $d[$key]);
                    }
                }
                array_push($final, $tmp);
                $tmp = array();
            }

           // array_push($final, $additional['footer']);

            $finaldata = $final;


            if($sheet>0){
                if($doc->getActiveSheetIndex()!==$sheet){
                    $doc->createSheet($sheet);
                }
            }
            
          
                $sheetname = "ExportDetailJournal";
          
             
            $doc->setActiveSheetIndex($sheet);
            $doc->getActiveSheet()->fromArray($finaldata);
            $doc->getActiveSheet()->setTitle($sheetname);

            foreach(range('A','Z') as $columnID) {
                $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);

            }
        }
        

        if($isReady == TRUE){


          

            $filename = "ExportDetailJournal_".$voucherno.".xls";
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            //READY TO WRITE
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
             
            $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel5');
            $param['url'] = $path;
            //force user to download the Excel file without writing it to server's HD
            $objWriter->save($newFilePath);   
        }

        $this->_tmpparam = $param;

        return $doc;
    }

    public function checkSubglImport($params,$codeKelsub,$journal_id, $mode,$kawasan) {
        $data = array(
            $params['pt'],
            $params['project'],
            $params['coa'],
            $params['kelsub_id'],
            $codeKelsub,
            $journal_id,
            $kawasan,
            $mode
        );
        
        $result = $this->execSP3('sp_subjournal_cek_import', $data);
        
        return $result;
    }


}

?>
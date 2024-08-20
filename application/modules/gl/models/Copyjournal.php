<?php

class Gl_Models_Copyjournal extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_prefix';
    protected $session;
    private $_param;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_module_id = $this->session->getCurrentModuleId();
        $this->_curdate = date('Y-m-d');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_modelsp = new Gl_Models_Generalmodel_Modelsp();
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_qcopy = new Gl_Models_Query_Copyjournal();
    }

    function CopyjournalRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $hideparam = $param['hideparam'];
                switch ($hideparam) {
                    case 'defaultrange':
                        $result = $this->_helperdata->rangeActiveYear();
                        $total = 1;
                        $data = $result;
                        break;
                    case 'listyear':
                        $result = $this->_modelsp->listYeargl();
                        $total = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        break;
                    default:
                        break;
                }
                $return['total'] = $total;
                $return['parameter'] = $hideparam;
                $return['data'] = $data;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function CopyjournalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->_param = $param;

                switch ($parameter) {
                    case 'create':
                        $result = $this->createData($param);
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

    function createData($param) {
        $year = $param['year'];
        $voucherno_old = $param['voucher_no_old'];
        $prefix = $param['prefix'];  
        $rowprefix = $this->_qcopy->getprefixbycode($prefix);
        if(!empty($rowprefix[0])){
            $prefix_id_new = $rowprefix[0][0]['prefix_id'];
        }else{
            $prefix_id_new = 0;
        }  
        
        $voucherdate_new = date('Y-m-d', strtotime($param['voucherdate']));
        //$voucherno_new = $this->docNumber($prefix_id_new, $voucherdate_new, 1);

        $voucherno_new = $param['untilvoucherno']; //target
        $resultold = $this->getjournalData_old($year, $voucherno_old);
        $rowjournalold = $resultold[0][0];
        $journal_id_old = $rowjournalold['journal_id'];

        $recordjournal = array(
            "voucherno" => $voucherno_new,
            "voucherdate" => $voucherdate_new,
            "prefix_id" => $prefix_id_new,
            "debit_total" => $rowjournalold['debit_total'],
            "credit_total" => $rowjournalold['credit_total'],
            "selisih" => $rowjournalold['selisih'],
        );

        $res = $this->_modelsp->createjournal($recordjournal);


        if($res[0] == 1){
            //go if success
        }else if($res[0][0]['total_row'] == 0){
            //stop if fails
            return $res;
        }

        $resuljournalnew = $this->getjournalData_new($voucherno_new);
        $rowjournalnew = $resuljournalnew[0][0];
        $journal_id_new = $rowjournalnew['journal_id'];


        $resultaccount_old = $this->getaccountjournal_old($year, $journal_id_old);
        $counteraccount_ol = $resultaccount_old[0][0]['counterdata'];

        if ($counteraccount_ol > 0) {
            foreach ($resultaccount_old[1] as $rowaccountold) {

                $journaldetail_id_old = $rowaccountold['journaldetail_id'];

                if ($rowaccountold['kelsub'] == '' or $rowaccountold['kelsub'] == null) {
                    $kelsub_id = 0;
                } else {
                    $kelsub_id = $this->getKelsubid($rowaccountold['kelsub']);
                }

                $recordaccountjournal = array(
                    "journal_id" => $journal_id_new,
                    "sort" => 0,
                    "kelsub_id" => $kelsub_id,
                    "coa_id" => $this->getCoaid($rowaccountold['coa']),
                    "kelsub" => $rowaccountold['kelsub'],
                    "coa" => $rowaccountold['coa'],
                    "type" => $rowaccountold['type'],
                    "keterangan" => $rowaccountold['keterangan'],
                    "amount" => $rowaccountold['amount'],
                );
                $this->_modelsp->createaccountjournal($recordaccountjournal);

                $resulaccountjournalnew = $this->getaccountjournal_new($journal_id_new, $rowaccountold['coa'], $rowaccountold['type']);
                $rowaccountjournalnew = $resulaccountjournalnew[1][0];

                $journaldetail_id_new = $rowaccountjournalnew['journaldetail_id'];

                $resultsubaccount_old = $this->getsubaccountjournal_old($year, $journal_id_old, $journaldetail_id_old);
                $countersubaccount_ol = $resultsubaccount_old[0][0]['counterdata'];

                if ($countersubaccount_ol > 0) {
                    foreach ($resultsubaccount_old[1] as $rowsubaccountold) {

                        if ($rowaccountold['kelsub'] == '' or $rowaccountold['kelsub'] == null) {
                            $kelsub_id = 0;
                        } else {
                            $kelsub_id = $this->getKelsubid($rowaccountold['kelsub']);
                        }

                        $recordsubaccountjournal = array(
                            "journal_id" => $journal_id_new,
                            "journaldetail_id" => $journaldetail_id_new,
                            "subgl_id" => $this->getSubglid($this->getKelsubid($rowaccountold['kelsub']), $rowsubaccountold['code']),
                            "kelsub_id" => $kelsub_id,
                            "code" => $rowsubaccountold['code'],
                            "code1" => $rowsubaccountold['code1'],
                            "code2" => $rowsubaccountold['code2'],
                            "code3" => $rowsubaccountold['code3'],
                            "code4" => $rowsubaccountold['code4'],
                            "keterangan" => $rowsubaccountold['keterangan'],
                            "amount" => $rowsubaccountold['amount'],
                            "coa_id" => $rowsubaccountold['coa_id']
                        );
                        $this->_modelsp->createsubaccountjournal($recordsubaccountjournal);
                    }
                }
            }
        }

        $resultf = array(
            1
        );
        return $resultf;
    }

    function getjournalData_old($year, $voucherno_old) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $this->_schema = $tmp[0] . '_' . $year . '.dbo';
        $result = $this->execSP3('sp_journal_getbyvoucherno', array(
            $this->_project_id,
            $this->_pt_id,
            $voucherno_old,
        ));
        return $result;
    }

    function getjournalData_new($voucherno) {
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $result = $this->execSP3('sp_journal_getbyvoucherno', array(
            $this->_project_id,
            $this->_pt_id,
            $voucherno,
        ));
        return $result;
    }

    function getaccountjournal_old($year, $journal_id) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $this->_schema = $tmp[0] . '_' . $year . '.dbo';
        $result = $this->execSP3('sp_journaldetail_getbyjournal_id', array(
            $this->_project_id,
            $this->_pt_id,
            $journal_id,
        ));
        return $result;
    }

    function getaccountjournal_new($journal_id, $coa, $type) {
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $result = $this->execSP3('sp_journaldetail_getbyjournalidcoatype', array(
            $this->_project_id,
            $this->_pt_id,
            $journal_id,
            $coa,
            $type,
        ));
        return $result;
    }

    function getsubaccountjournal_old($year, $journal_id, $journaldetail_id) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $this->_schema = $tmp[0] . '_' . $year . '.dbo';
        $result = $this->execSP3('sp_journalsubdetail_getbyjournaldjournaldetail', array(
            $this->_project_id,
            $this->_pt_id,
            $journal_id,
            $journaldetail_id
        ));
        return $result;
    }

    function getCoaid($coa) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $coa
        );

        $result = $this->execSP3("sp_coa_getbycoa", $data);
        $coa_id = $result[0][0]['coa_id'];
        return $coa_id;
    }

    function getKelsubid($kelsub) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $kelsub
        );

        if($kelsub==""){
            return 0;
        }

        var_dump($kelsub);

        if($kelsub!==NULL){
            if($kelsub!==""){
                $result = $this->execSP3("sp_subaccountgroup_getkelsub", $data);
                $id = $result[0][0]['kelsub_id'];
            }else{
                $id = 0;
            }
        }else{
            $id = 0;
        }
		
        return $id;
    }

    function getSubglid($kelsub_id, $code) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $kelsub_id,
            $code,
        );

        if($kelsub_id==NULL || $code==NULL || $kelsub_id==0){
            $id = 0;
        }else{
            $result = $this->execSP3("sp_subaccountcode_getbykelsubandcode", $data);
            $id = $result[1][0]['subgl_id']; 
        }
		
        return $id;
    }

    function docNumber($prefix_id, $date, $flag) {
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';

        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $prefix_id,
        );
        $result = $this->execSP3("sp_journal_generate_voucher", $data);

        $prefix = $result[1][0]['prefix'];
        $_docdate = new DateTime($date);
        $_project_id = $this->_project_id;
        $_pt_id = $this->_pt_id;
        $_apps_id = $this->_module_id;
        $_module = "JOURNAL";

        $_var1 = array();
        $_var2 = array();

        $_var1['PREFIX'] = $prefix;

        $_docNo = $this->counterdoc->get_advanceNo($_project_id, $_pt_id, $_apps_id, $_module, $_var1, $_var2, $_docdate, $flag);
        return $_docNo;
    }

}

?>
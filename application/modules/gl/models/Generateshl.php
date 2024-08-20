<?php

class Gl_Models_Generateshl extends Zend_Db_Table_Abstract {

    protected $_schema;
    private $_param = null;
    private $_loop = null;
    private $_filterreport = null;
    private $_data = null;
    private $_coalr = null;
    private $_amountshl = null;
    private $_untilmonth = null;
    private $_untildate = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_query = new Gl_Models_Generalmodel_Builtquery();
        $this->_queryshl = new Gl_Models_Query_Bungashl();
        $this->_db = $this->session->getSelectedDbApp();
    }

    function dataCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

                $parameter = $param['hideparam'];
                $this->_param = $param;

                switch ($parameter) {
                    case 'defaultrange':
                        $result = $this->_helperdata->rangeActiveYear();
                        $counter = 0;
                        $message = null;
                        break;
                    case 'checkdata':
                        $result = $this->checkData();
                        $counter = $result['counter'];
                        $message = $result['message'];
                        break;
                    case 'generatedata':
                        $this->createReport();
                        $result = $this->Journal();
                        $counter = 0;
                        $message = null;
                        break;
                    default:
                        $result = null;
                        $counter = 0;
                        $message = null;
                        break;
                }



                if ($param['hideparam'] == 'default') {
                    $count = $counter['counter'];
                    $msg = $counter['mesg'];
                } else {
                    $count = $counter;
                    $msg = '';
                }

                $return['parameter'] = $parameter;
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    public function getKelsubbyid($kelsub_id) {
        $data = array(
            $this->_project_id,
            $this->_pt_id,
            $kelsub_id
        );

        $result = $this->execSP3("sp_subaccountgroup_getkelsubbyid", $data);
        return $result[0][0];
    }

    public function create_header($param) {
        $resultprefixmjb = $this->_queryshl->check_prefixmjb();
        $voucher_no = $resultprefixmjb['prefix'] . "0001/" . date('m', strtotime($this->_data['enddatemonth']));
        $voucher_date = $this->_data['reportdate'];
        $amountdebet = $param['grand_endbalance'];
        $amountcredit = $param['grand_endbalance'];
        $selisih = $amountdebet - $amountcredit;

        $recordjournal = array(
            "voucherno" => $voucher_no,
            "voucherdate" => $voucher_date,
            "prefix_id" => $resultprefixmjb['prefix_id'],
            "debit_total" => $amountdebet,
            "credit_total" => $amountcredit,
            "selisih" => $selisih,
        );
        $this->_model->createjournal($recordjournal);
    }

    public function create_accountjournal($param) {
        $result = $this->_queryshl->getbungashl('H', $this->_filterreport['untildate'], $this->_filterreport['untildate']);
        $coa1 = $this->_coalr['coa_bungaloan1'];
        $coa2 = $this->_coalr['coa_bungaloan2'];
        $rowcoa1 = $this->_model->getcoa($coa1);
        $rowcoa2 = $this->_model->getcoa($coa2);
        $countercoa1 = $rowcoa1[0][0]['counterdata'];
        $countercoa2 = $rowcoa2[0][0]['counterdata'];

        if ($countercoa1 > 0 & $countercoa2 > 0) {
            $last_code = '';
            $counter = 0;
            $countersub = 1;
            foreach ($result[0] as $row) {
                if ($last_code !== $row['code'] and $counter > 0) {
                    $countersub++;
                    $this->insert_to_account($param, $rowcoa1[1][0], $rowcoa2[1][0], $row, $countersub);
                    //echo 'test 2'.$countersub.' <br/>';
                } else {
                    //untuk counter pertama
                    $this->insert_to_account($param, $rowcoa1[1][0], $rowcoa2[1][0], $row, $countersub);
                    //echo 'test 1'.$countersub.' <br/>';
                }
                $counter++;
                $last_code = $row['code'];
            }

            $this->create_summary($param);
        }
    }

//    public function insert_to_account($param, $rowcoa1, $rowcoa2, $row, $countersub) {
//        $voucher_no = $param['voucher_no'];
//        $voucher_date = $param['voucher_date'];
//
//        $resultjournal = $this->_model->getjournalbyvoucherno($voucher_no);
//        $rowh = $resultjournal[0][0];
//        $journal_id = $rowh['journal_id'];
//
//        $coa1 = $this->_coalr['coa_bungaloan1'];
//        $coa2 = $this->_coalr['coa_bungaloan2'];
//
//        $kelsub_id1 = $rowcoa1['kelsub_id'];
//        $rowkelsub1 = $this->_model->getkelsubbyid($rowcoa1['kelsub_id']);
//        $kelsub1 = $rowkelsub1[0][0]['kelsub'];
//        $coa_id1 = $rowcoa1['coa_id'];
//
//        $kelsub_id2 = $rowcoa2['kelsub_id'];
//        $rowkelsub2 = $this->_model->getkelsubbyid($rowcoa2['kelsub_id']);
//        $kelsub2 = $rowkelsub2[0][0]['kelsub'];
//        $coa_id2 = $rowcoa2['coa_id'];
//
//        $month = date('F', strtotime($voucher_date));
//        $year = date('Y', strtotime($voucher_date));
//        $desc1 = 'Shareholder Loan ' . $month . ' ' . $year . ' with sum day of year :' . $param['sumyearday'] . ' rate interest :' . $param['interest'];
//        $desc2 = 'Biaya bungan SHL ' . $month . ' ' . $year . ' with sum day of year :' . $param['sumyearday'] . ' rate interest :' . $param['interest'];
//
//        if ($row['total_amountinterest_decimal'] > 0) {
//            $record1 = array(
//                "journal_id" => $journal_id,
//                "sort" => $countersub,
//                "kelsub_id" => $kelsub_id1,
//                "coa_id" => $coa_id1,
//                "kelsub" => $kelsub1,
//                "coa" => $coa1,
//                "type" => 'C',
//                "keterangan" => $desc1,
//                "amount" => $row['total_amountinterest_decimal'],
//            );
//
//            $record2 = array(
//                "journal_id" => $journal_id,
//                "sort" => $countersub,
//                "kelsub_id" => $kelsub_id2,
//                "coa_id" => $coa_id2,
//                "kelsub" => $kelsub2,
//                "coa" => $coa2,
//                "type" => 'D',
//                "keterangan" => $desc2,
//                "amount" => $row['total_amountinterest_decimal'],
//            );
//
//            
//            //mengacu pada excel family
//                            
//            $this->_model->createaccountjournal($record2);
//            $this->_model->createaccountjournal($record1);
//            $this->create_subaccountjournal($record2, $row,$row['total_amountinterest_decimal']);
//            $this->create_subaccountjournal($record1, $row,$row['total_amountinterest_decimal']);
//          
//        } else {
//            $tmpamount = explode('-', $row['total_amountinterest_decimal']);
//            $totalamountinterest = $tmpamount[1];
//            
//            
//            $record1 = array(
//                "journal_id" => $journal_id,
//                "sort" => $countersub,
//                "kelsub_id" => $kelsub_id2,
//                "coa_id" => $coa_id2,
//                "kelsub" => $kelsub2,
//                "coa" => $coa2,
//                "type" => 'C',
//                "keterangan" => $desc2,
//                "amount" => $totalamountinterest,
//            );
//
//            $record2 = array(
//                "journal_id" => $journal_id,
//                "sort" => $countersub,
//                "kelsub_id" => $kelsub_id1,
//                "coa_id" => $coa_id1,
//                "kelsub" => $kelsub1,
//                "coa" => $coa1,
//                "type" => 'D',
//                "keterangan" => $desc1,
//                "amount" => $totalamountinterest,
//            );
//
//            
//             
//            $this->_model->createaccountjournal($record2);
//            $this->_model->createaccountjournal($record1);
//           
//
//            $this->create_subaccountjournal($record2, $row,$totalamountinterest);
//            $this->create_subaccountjournal($record1, $row,$totalamountinterest);
//           
//        }
//        
//      
//            
//    }

    public function insert_to_account($param, $rowcoa1, $rowcoa2, $row, $countersub) {
        $voucher_no = $param['voucher_no'];
        $voucher_date = $param['voucher_date'];

        $resultjournal = $this->_model->getjournalbyvoucherno($voucher_no);
        $rowh = $resultjournal[0][0];
        $journal_id = $rowh['journal_id'];

        $coa1 = $this->_coalr['coa_bungaloan1'];
        $coa2 = $this->_coalr['coa_bungaloan2'];

        $kelsub_id1 = $rowcoa1['kelsub_id'];
        $rowkelsub1 = $this->_model->getkelsubbyid($rowcoa1['kelsub_id']);
        $kelsub1 = $rowkelsub1[0][0]['kelsub'];
        $coa_id1 = $rowcoa1['coa_id'];

        $kelsub_id2 = $rowcoa2['kelsub_id'];
        $rowkelsub2 = $this->_model->getkelsubbyid($rowcoa2['kelsub_id']);
        $kelsub2 = $rowkelsub2[0][0]['kelsub'];
        $coa_id2 = $rowcoa2['coa_id'];

        $month = date('F', strtotime($voucher_date));
        $year = date('Y', strtotime($voucher_date));
        $desc1 = 'Shareholder Loan ' . $month . ' ' . $year . ' with sum day of year :' . $param['sumyearday'] . ' rate interest :' . $param['interest'];
        $desc2 = 'Biaya bungan SHL ' . $month . ' ' . $year . ' with sum day of year :' . $param['sumyearday'] . ' rate interest :' . $param['interest'];

        if ($row['total_amountinterest'] > 0) {
            $record1 = array(
                "journal_id" => $journal_id,
                "sort" => $countersub,
                "kelsub_id" => $kelsub_id1,
                "coa_id" => $coa_id1,
                "kelsub" => $kelsub1,
                "coa" => $coa1,
                "type" => 'C',
                "keterangan" => $desc1,
                "amount" => $row['total_amountinterest'],
            );

            $record2 = array(
                "journal_id" => $journal_id,
                "sort" => $countersub,
                "kelsub_id" => $kelsub_id2,
                "coa_id" => $coa_id2,
                "kelsub" => $kelsub2,
                "coa" => $coa2,
                "type" => 'D',
                "keterangan" => $desc2,
                "amount" => $row['total_amountinterest'],
            );


            //mengacu pada excel family
            $datajournaldetail1 = $this->_queryshl->get_journaldetailbyjournalidtypecoa($record1);
            $datajournaldetail2 = $this->_queryshl->get_journaldetailbyjournalidtypecoa($record2);

            //START COA 1
            if ($datajournaldetail1['counter'] > 0) {
                $rowjournaldetail1 = $datajournaldetail1['result'];
                $record1['sort'] = $rowjournaldetail1['sort'];
                $record1['type'] = $rowjournaldetail1['type'];
                $this->create_subaccountjournal($record1, $row, $row['totalabs_amountinterest']);
            } else {
                $this->_model->createaccountjournal($record1);
                $this->create_subaccountjournal($record1, $row, $row['totalabs_amountinterest']);
            }
            //END COA 1
            
            //START COA 2
            if ($datajournaldetail2['counter'] > 0) {
                $rowjournaldetail2 = $datajournaldetail2['result'];
                $record2['sort'] = $rowjournaldetail2['sort'];
                $record2['type'] = $rowjournaldetail2['type'];
                $this->create_subaccountjournal($record2, $row, $row['totalabs_amountinterest']);
            } else {
                $this->_model->createaccountjournal($record2);
                $this->create_subaccountjournal($record2, $row, $row['totalabs_amountinterest']);
            }
            //END COA 2
        } else {
            $tmpamount = explode('-', $row['total_amountinterest']);
            $totalamountinterest = $tmpamount[1];


            $record1 = array(
                "journal_id" => $journal_id,
                "sort" => $countersub,
                "kelsub_id" => $kelsub_id2,
                "coa_id" => $coa_id2,
                "kelsub" => $kelsub2,
                "coa" => $coa2,
                "type" => 'C',
                "keterangan" => $desc2,
                "amount" => $totalamountinterest,
            );

            $record2 = array(
                "journal_id" => $journal_id,
                "sort" => $countersub,
                "kelsub_id" => $kelsub_id1,
                "coa_id" => $coa_id1,
                "kelsub" => $kelsub1,
                "coa" => $coa1,
                "type" => 'D',
                "keterangan" => $desc1,
                "amount" => $totalamountinterest,
            );

            //mengacu pada excel family
            $datajournaldetail2 = $this->_queryshl->get_journaldetailbyjournalidtypecoa($record2);
            $datajournaldetail1 = $this->_queryshl->get_journaldetailbyjournalidtypecoa($record1);


            //START COA 1
            if ($datajournaldetail2['counter'] > 0) {
                $rowjournaldetail2 = $datajournaldetail2['result'];
                $record2['sort'] = $rowjournaldetail2['sort'];
                $record2['type'] = $rowjournaldetail2['type'];
                $this->create_subaccountjournal($record2, $row, $row['totalabs_amountinterest']);
            } else {
                $this->_model->createaccountjournal($record2);
                $this->create_subaccountjournal($record2, $row, $row['totalabs_amountinterest']);
            }
            //END COA 1
            
            //START COA 2
            if ($datajournaldetail1['counter'] > 0) {
                $rowjournaldetail1 = $datajournaldetail1['result'];
                $record1['sort'] = $rowjournaldetail1['sort'];
                $record1['type'] = $rowjournaldetail1['type'];
                $this->create_subaccountjournal($record1, $row, $row['totalabs_amountinterest']);
            } else {
                $this->_model->createaccountjournal($record1);
                $this->create_subaccountjournal($record1, $row, $row['totalabs_amountinterest']);
            }
            //END COA 2
        }
    }

    function accountjournal($record) {
        $where = array(
            "journal_id" => $record['journal_id'],
            "coa_id" => $record['coa_id'],
            "kelsub_id" => $record['kelsub_id'],
            "sort" => $record['sort'],
            "type" => $this->istext($record['type'])
        );

        $resultaccount = $this->_queryshl->getaccountjournal_bycoakelsubsort($where);
        return $resultaccount;
    }
    
    function txt($param){
        return "'".$param."'";
    }

    function create_subaccountjournal($record, $row, $totalamountinterest) {
        ini_set('max_execution_time', 1200);
        $result = $this->accountjournal($record);
        if (!empty($result)) {
            $rowaccount = $result[0];
            $journal_id = $rowaccount['journal_id'];
            $journaldetail_id = $rowaccount['journaldetail_id'];
            $kelsub_id = $record['kelsub_id'];
            $kelsub = $record['kelsub'];
            $code = trim($row['code']);
            $code1 = trim($row['code1']);
            $code2 = trim($row['code2']);
            $code3 = trim($row['code3']);
            $code4 = trim($row['code4']);
            $desc = trim($record['coa'] . ' kelsub :' . $kelsub . ' code :' . $code . ' ' . $record['keterangan']);

            $recordsub = array(
                "journal_id" => $journal_id,
                "journaldetail_id" => $journaldetail_id,
                "coa_id" => $record['coa_id'],
                "subgl_id" => $row['subgl_id'],
                "kelsub_id" => $kelsub_id,
                "code" => $code,
                "code1" => $code1,
                "code2" => $code2,
                "code3" => $code3,
                "code4" => $code4,
                "keterangan" => $desc,
                "amount" => $totalamountinterest,
            );
            $this->_model->createsubaccountjournal($recordsub);
        }
    }

//    function create_summary($param) {
//        $voucher_no = $param['voucher_no'];
//        $resultjournal = $this->_model->getjournalbyvoucherno($voucher_no);
//        $rowh = $resultjournal[0][0];
//        $journal_id = $rowh['journal_id'];
//        $sumdebet = $this->_queryshl->get_summaryaccountjournal($journal_id, 'D');
//        $sumcredit = $this->_queryshl->get_summaryaccountjournal($journal_id, 'C');
//        $selisih = $sumdebet - $sumcredit;
//
//        $record = array(
//            "debit_total" => $sumdebet,
//            "credit_total" => $sumdebet,
//            "selisih" => $selisih
//        );
//
//        $this->_queryshl->update_journal($journal_id, $record);
//    }
    function create_summary($param) {
        $voucher_no = $param['voucher_no'];
        $resultjournal = $this->_model->getjournalbyvoucherno($voucher_no);
        $rowh = $resultjournal[0][0];
        $journal_id = $rowh['journal_id'];
        $this->_queryshl->set_sumdatajournal($journal_id);
    }

    public function create_journal($param) {
        if ($param['flag'] == 'H') {
            $this->create_header($param);
            $resultprefixmjb = $this->_queryshl->check_prefixmjb();
            $voucher_no = $resultprefixmjb['prefix'] . "0001/" . date('m', strtotime($this->_data['reportdate']));
            $voucher_date = $this->_data['reportdate'];
            $countermjb = $this->_queryshl->check_vouchermjb($voucher_no);

            $param['voucher_no'] = $voucher_no;
            $param['voucher_date'] = $voucher_date;
            if ($countermjb > 0) {
                $this->create_accountjournal($param);
            }
        }
    }

    public function Journal() {
        $result = $this->_queryshl->getbungashl('ALL', $this->_filterreport['fromdate'], $this->_filterreport['untildate']);
        if (!empty($result[0])) {
            $this->create_journal($result[0][0]);
            $counter = 0;
            $message = 'Generate Journal Bunga SHL, Finish';
        } else {
            $counter = 1;
            $message = 'Data account SHL is null on this periode';
        }

        $return = array(
            "counter" => $counter,
            "message" => $message,
        );
        return $return;
    }

    public function genPeriode() {
        $activedb = explode("_", $this->_db);
        $year = $activedb[1];
        $sumdaydecember = $this->_helperdata->sum_day(12, $year);
        $reportdate = date('Y-m-d', strtotime($this->_param['reportdate']));
        $resultcoalr = $this->_queryshl->getcoalr();
        $this->_coalr = $resultcoalr[0][0];

        $tmpdate = explode("-", $reportdate);
        $t_year = $tmpdate[0];
        $t_month = $tmpdate[1];
        $t_date = $tmpdate[2];
      

        $startdatemonth = date('Y-m-d', strtotime($t_year . '-' . $t_month . '-01'));
        $enddatemonth = date('Y-m-t', strtotime($reportdate));

        $startdateyear = date('Y-m-d', strtotime($year . '-01-01'));
        $enddateyear = date('Y-m-d', strtotime($year . '-12-' . $sumdaydecember));
        $sumdayendofyear = $this->_query->get_sumday($startdateyear, $enddateyear);

        
        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $from = $startdateyear;
            $until = $reportdate;
        } else {
            $from = $startdatemonth;
            $until = $reportdate;
        }

        $this->_filterreport = array(
            "fromdate" => $from,
            "untildate" => $until
        );

        $this->_data = array(
            "reportdate" => $reportdate,
            "startdatemonth" => $startdatemonth,
            "enddatemonth" => $enddatemonth,
            "startdateyear" => $startdateyear,
            "enddateyear" => $enddateyear,
            "sumdayendofyear" => $sumdayendofyear,
        );
        
      
       
    }

    public function checkData() {
        $this->genPeriode();
        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $this->generateByyear();
        } else {
            $this->generateBymonth();
        }


        $frommonth = date('m', strtotime($this->_loop['from']));
        $untilmonth = date('m', strtotime($this->_loop['until']));

        $data = array();
        for ($month = $frommonth; $month <= $untilmonth; $month++) {
            $countermonth = $this->check_bungaloan($month);
            $msgcounter = ($countermonth == 0) ? 'empty' : 'exist';
            $messagemonth = 'month :' . $month . ' bunga :' . $msgcounter . '<br/>';
            $data['bungaloan']['countermonth'][] = $countermonth;
            $data['bungaloan']['messagemonth'][] = $messagemonth;
        }

        $resultprefixmjb = $this->_queryshl->check_prefixmjb();
        $vouchernoforcheck = $resultprefixmjb['prefix'] . "0001/" . date('m', strtotime($this->_data['enddatemonth']));
        $countermjb = $this->_queryshl->check_vouchermjb($vouchernoforcheck);

        if (in_array(0, $data['bungaloan']['countermonth'], true)) {
            $flagbunga = 1;
            $messagebunga = 'Same month bunga for loan is 0% : (<br/> ' . implode(' ', $data['bungaloan']['messagemonth']) . '<br/>) please setup your bunga loan on master parameter and try again, thanks';
        } else {
            $flagbunga = 0;
            $messagebunga = null;
        }

        if (is_null($this->_coalr['coa_bungaloan1']) or $this->_coalr['coa_bungaloan1'] == '') {
            $flagaccount = 1;
            $messageaccount = " COA for Bunga Loan SHL on Master Parameter <br/> Kode Account Rugi Laba not Yet, Please setup your COA.";
        } else {
            $flagaccount = 0;
            $messageaccount = null;
        }

        if ($countermjb > 0) {
            $flagjournal = 1;
            $messagejournal = " Voucher No :" . $vouchernoforcheck . ' already exist, are you sure continue this generate ...?';
        } else {
            $flagjournal = 0;
            $messagejournal = null;
        }


        if ($flagbunga > 0 and $flagaccount < 1) {
            $flag = 1;
            $message = $messagebunga;
        } else if ($flagbunga < 1 and $flagaccount > 0) {
            $flag = 1;
            $message = $messageaccount;
        } else if ($flagbunga > 0 and $flagaccount > 0) {
            $flag = 1;
            $message = $messageaccount . ' And <br/> ' . $messagebunga;
        } else {
            $flag = 0;
            $message = null;
        }

        $return = array(
            "counter" => $flag,
            "flagjournal" => $flagjournal,
            "message" => $message,
            "messagejournal" => $messagejournal,
        );

        return $return;
    }

    public function check_bungaloan($month) {
        $result = $this->_model->getbungalaon_bymonth($month);
        $counter = $result[0][0]['COUNTERDATA'];
        

        if ($counter > 0) {
            $row = $result[1][0];
            $bunga = $row['bunga'];
            if (!is_null($bunga) or !empty($bunga)) {
                $count = 1;
            } else {
                $count = 0;
            }

            $data = $count;
        } else {
            $data = 0;
        }

        return $data;
    }

    public function istext($param) {
        return $this->_helperdata->textforquery($param);
    }

    public function delete_journal($voucherno) {
        $resulth = $this->_model->getjournalbyvoucherno($voucherno);
        $rowh = $resulth[0][0];
        $journal_id = $rowh['journal_id'];
        $this->_queryshl->deletejournalsubdetail_byjournalid($journal_id);
        $this->_queryshl->deletejournaldetail_byjournalid($journal_id);
        $this->_queryshl->deletejournal_byjournalid($journal_id);
    }

    public function createReport() {
        $this->genPeriode();
        $resultprefixmjb = $this->_queryshl->check_prefixmjb();
        $vouchernoforcheck = $resultprefixmjb['prefix'] . "0001/" . date('m', strtotime($this->_data['reportdate']));
        $countermjb = $this->_queryshl->check_vouchermjb($vouchernoforcheck);

        if ($countermjb > 0) {
            //delete data journal with param voucher no
            $this->delete_journal($vouchernoforcheck);
        }

        $counter = $this->_queryshl->count_tmpbungashl();
        if ($counter > 0) {
            $counterbyuser = $this->_queryshl->count_tmpbungashlbyuser();
            if ($counter == $counterbyuser) {
                $this->_queryshl->truncate_tmpbungashl();
            } else {
                $this->_queryshl->delete_tmpbungashl();
            }
        } else {
            $this->_queryshl->truncate_tmpbungashl();
        }
        $this->createDatadesember();
        $this->createLoopMonth();
        $this->TotalAmont();
    }

    public function generateByyear() {
        $this->_loop = array("from" => $this->_data['startdateyear'],
            "until" => $this->_data['reportdate']
        );
    }

    public function generateBymonth() {
        $this->_loop = array("from" => $this->_data['startdateyear'],
            "until" => $this->_data['reportdate']
        );
    }

    public function createDatadesember() {
        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $this->generateByyear();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['reportdate']);
        } else {
            $this->generateBymonth();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['reportdate']);
        }
        foreach ($result[0] as $row) {
            if ($row['voucher_no'] == 'MJ0001/01' and $row['voucher_date'] == $this->_data['startdateyear']) {
                $arraydata = array(
                    "flag" => 'begin',
                    "data" => $row,
                );
                $this->insertdata($arraydata);
            }
        }
    }

    public function createLoopMonth() {
        $frommonth = date('m', strtotime($this->_loop['from']));
        $untilmonth = date('m', strtotime($this->_loop['until']));
        $this->_untilmonth = $untilmonth;
        for ($month = $frommonth; $month <= $untilmonth; $month++) {
            $this->processbyMonth($month, $untilmonth);
        }
    }

    public function processbyMonth($month, $untilmonth) {
        $activedb = explode("_", $this->_db);
        $year = $activedb[1];
        $fromdate = date('Y-m-01', strtotime($year . '-' . $month));

        if ($untilmonth == $month) {
            $fromdate = date('Y-m-01', strtotime($year . '-' . $month));
            $endfilterdate = date('Y-m-d', strtotime($this->_loop['until']));
            $enddate = date('Y-m', strtotime($endfilterdate));
            $prevenddate = date('Y-m-t', strtotime($enddate . ' -1 months'));
            $this->_untildate = $endfilterdate;
        } else {
            $fromdate = date('Y-m-01', strtotime($year . '-' . $month));
            $endfilterdate = date('Y-m-t', strtotime($year . '-' . $month));
            $enddate = date('Y-m', strtotime($endfilterdate));
            $prevenddate = date('Y-m-t', strtotime($enddate . ' -1 months'));
            $this->_untildate = $endfilterdate;
        }

        $untildate = $endfilterdate;
        $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $fromdate, $endfilterdate);

        if (!empty($result[0])) {
            $enddate = date('Y-m', strtotime($untildate));
            $rowamountprev = $this->calculatedata($prevenddate);
            $this->insertprevdata_basearray($rowamountprev, $fromdate, $untildate);
            foreach ($result[0] as $row) {
                if ($row['voucher_no'] !== 'MJ0001/01') {
                    $arraydata = array(
                        "flag" => 'next',
                        "untildate" => $untildate,
                        "data" => $row,
                    );
                    $this->insertdata($arraydata);
                }
            }
        }
    }

    public function insertprevdata_basearray($arrayprev, $voucher_date, $untildate) {
        if (!empty($arrayprev[0])) {
            foreach ($arrayprev as $rowprev) {
                $resultprefixmjb = $this->_queryshl->check_prefixmjb();
                $voucherno = "SALDO AWAL " . trim($rowprev['kelsub']) . '-' . trim($rowprev['code']) . " of month " . date('m', strtotime($rowprev['endofmonthdate']));
                $checkmjb = $this->_queryshl->check_tmpbungashl($voucherno);

                if ($checkmjb < 1) {
                    $monthprev = date('F', strtotime($rowprev['endofmonthdate']));
                    $yearprev = date('Y', strtotime($rowprev['endofmonthdate']));
                    $month = date('m', strtotime($voucher_date));
                    //$endmonthdate = date('Y-m-t', strtotime($voucher_date));
                    $endmonthdate = $untildate;
                    $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
                    $interest = $resultbungaloan[1][0]['bunga'] / 100;
                    $sumdayyear = $this->_data['sumdayendofyear'];
                    $amountdata = $rowprev['amountendbalance'];
                    $tenor = (strtotime($endmonthdate) - strtotime($rowprev['endofmonthdate'])) / (24 * 3600);
                    $amountinterest = ($rowprev['amountendbalance'] * $tenor) * ($interest / $sumdayyear);
                    $desc = $this->_coalr['bungaloan_desc'] . ' ' . $monthprev . ' ' . $yearprev;
                    $coa = $this->_coalr['coa_bungaloan1'];
                    $rowcoa = $this->_queryshl->getcoabycoa($coa);
                    $rowkelsub = $this->_queryshl->getkelsubbykelsub($rowprev['kelsub']);
                    $rowsubgl = $this->_queryshl->getsubglbycode($rowprev['code']);
                    $coaname = $rowcoa['name'];
                    $coa_id = $rowcoa['coa_id'];
                    $kelsub_id = $rowkelsub['kelsub_id'];
                    $subgl_id = $rowsubgl['subgl_id'];
                    $coatype = $rowcoa['type'];

                    $record = array(
                        "project_id" => $this->_project_id,
                        "pt_id" => $this->_pt_id,
                        "coa_id" => $coa_id,
                        "kelsub_id" => $kelsub_id,
                        "subgl_id" => $subgl_id,
                        "flag" => $this->istext('H'),
                        "voucher_no" => $this->istext($voucherno),
                        "voucher_date" => $this->istext($rowprev['endofmonthdate']),
                        "kelsub" => $this->istext($rowprev['kelsub']),
                        "code" => $this->istext($rowprev['code']),
                        "month" => $month,
                        "reportdate" => $this->istext($this->_data['reportdate']),
                        "endofmonthdate" => $this->istext($endmonthdate),
                        "coa" => $this->istext($coa),
                        "coaname" => $this->istext($coaname),
                        "typecoa" => $this->istext($coatype),
                        "typetrx" => $this->istext('C'),
                        "sumyearday" => $sumdayyear,
                        "tenor" => $tenor,
                        "interest" => $interest,
                        "amountsub" => $amountdata,
                        "amountdata" => $amountdata,
                        "amountinterest" => $amountinterest,
                        "description" => $this->istext($desc),
                        "addby" => $this->_user_id,
                        "addon" => $this->istext($this->_curdatetime),
                    );
                    $this->_queryshl->insert_tmpbungashl($record);
                }
            }
        }
    }

    public function insertdata($param) {
        $flag = $param['flag'];
        $row = $param['data'];
        $voucher_no = $row['voucher_no'];

        if ($flag == 'begin') {
            $voucher_date = date('Y-m-d', strtotime("-1 day", strtotime($row['voucher_date'])));
            $voucher_datejan = date('Y-m-d', strtotime($row['voucher_date']));

            $month = date('m', strtotime($voucher_date));
            $monthjan = date('m', strtotime($voucher_datejan));

            $endmonthdate = date('Y-m-t', strtotime($voucher_date));
            $endmonthdatejan = date('Y-m-t', strtotime($row['voucher_date']));

            // $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
            $resultbungaloan = $this->_model->getbungalaon_bymonth($monthjan);
            //$interest = $resultbungaloan[1][0]['bunga'] / 100;
            $interest = 0;
            $sumdayyear = $this->_data['sumdayendofyear'];
            $amountbasetype = $row['amountsubbaseaccount'];
            // $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
            $tenor = (strtotime($endmonthdatejan) - strtotime($voucher_datejan)) / (24 * 3600);
            $amountinterest = ($amountbasetype * $tenor) * ($interest / $sumdayyear);
        } else {
            $voucher_date = date('Y-m-d', strtotime($row['voucher_date']));
            $month = date('m', strtotime($voucher_date));
            //$endmonthdate = date('Y-m-t', strtotime($voucher_date));
            $endmonthdate = $param['untildate'];
            $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
            $interest = $resultbungaloan[1][0]['bunga'] / 100;
            $sumdayyear = $this->_data['sumdayendofyear'];
            $amountbasetype = $row['amountsubbaseaccount'];
            $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
            $amountinterest = ($amountbasetype * $tenor) * ($interest / $sumdayyear);
        }

        $record = array(
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
            "prefix_id" => $row['prefix_id'],
            "coa_id" => $row["coa_id"],
            "kelsub_id" => $row["kelsub_id"],
            "subgl_id" => $row["subgl_id"],
            "flag" => $this->istext('D'),
            "prefix" => $this->istext($row["prefix"]),
            "voucher_no" => $this->istext($voucher_no),
            "voucher_date" => $this->istext($voucher_date),
            "reportdate" => $this->istext($this->_data['reportdate']),
            "month" => $this->istext($month),
            "endofmonthdate" => $this->istext($endmonthdate),
            "coa" => $this->istext($row["coa"]),
            "coaname" => $this->istext($row["coaname"]),
            "typecoa" => $this->istext($row["coatype"]),
            "typetrx" => $this->istext($row["typetrx"]),
            "kelsub" => $this->istext($row["kelsub"]),
            "code" => $this->istext($row["code"]),
            "sumyearday" => $sumdayyear,
            "tenor" => $tenor,
            "interest" => $interest,
            "amountsub" => $row["amountsub"],
            "amountdata" => $row["amountsubbaseaccount"],
            "amountinterest" => round($amountinterest,2), //$amountinterest dilakukan round 2 digit 22-08-2016,
            "description" => $this->istext($row['ketsub']),
            "addby" => $this->_user_id,
            "addon" => $this->istext($this->_curdatetime)
        );
        $this->_queryshl->insert_tmpbungashl($record);
    }

    public function TotalAmont() {
        $result = $this->_queryshl->getdistinctendofmonthdate();
        foreach ($result[0] as $row) {
            $kelsub = $row['kelsub'];
            $subgl = $row['code'];
            $enddate = date('Y-m', strtotime($row['endofmonthdate']));
            $nextenddate = date('Y-m-t', strtotime($enddate . ' +1 months'));
            $checkmonth = date('m', strtotime($nextenddate));
            if ($checkmonth == $this->_untilmonth) {
                $nextenddate = $this->_untildate;
            }

            $resultcurent = $this->calculatedata($nextenddate);
            if (!empty($resultcurent[0])) {
                $resultnext = $this->_queryshl->getdatareport('H', $kelsub, $subgl, $nextenddate);
                if (!empty($resultnext[0])) {
                    foreach ($resultnext[0] as $row) {
                        $key = $this->_model->getindex_array($resultcurent, 'code', $subgl);
                        $rowcurrent = $resultcurent[$key];
                        if ($rowcurrent['endofmonthdate'] == $row['endofmonthdate'] and $subgl == $row['code']) {

                            $record = array(
                                "total_beginingbalance" => $row['amountdata'],
                                "total_amountdata" => $rowcurrent['totalamount'],
                                "total_amountin" => $rowcurrent['totalcredit'],
                                "total_amountout" => $rowcurrent['totaldebet'],
                                "total_amountinterest" => $rowcurrent['totalinterest'],
                                "total_endbalance" => $rowcurrent['amountendbalance']
                            );

                            $this->_queryshl->update_tmpbungashlbyenddate($kelsub, $subgl, $row['endofmonthdate'], $record);
                        }
                    }
                }
            }
        }
    }

    public function calculatedata($prevenddate) {
        $this->_queryshl->settotalamount();
        $this->_queryshl->settotaldebet();
        $this->_queryshl->settotalcredit();
        $this->_queryshl->settotalinterest();
        $this->_queryshl->setendbalance();
        $this->_queryshl->uniontotal($prevenddate);
        $this->_amountshl = $this->_queryshl->gettotaldata();

        if (!empty($this->_amountshl[0])) {
            $rowamountprev = $this->_amountshl[0];
        } else {
            $rowamountprev = 'empty';
        }
        return $rowamountprev;
    }

}

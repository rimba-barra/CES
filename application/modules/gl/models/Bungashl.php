<?php

class Gl_Models_Bungashl extends Zend_Db_Table_Abstract {

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

    function genPeriode() {
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
            "message" => $message
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

    public function createReport() {
        $this->genPeriode();
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
                    // $this->insertprevdata($rowamountprev, $row);
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
            $interest = 0;
            $sumdayyear = $this->_data['sumdayendofyear'];
            $amountbasetype = $row['amountsubbaseaccount'];
            // $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
            $tenor = (strtotime($endmonthdatejan) - strtotime($voucher_datejan)) / (24 * 3600);
            $amountinterest = ($amountbasetype * $tenor) * ($interest / $sumdayyear);
        } else {
            $voucher_date = date('Y-m-d', strtotime($row['voucher_date']));
            $month = date('m', strtotime($voucher_date));
            // $endmonthdate = date('Y-m-t', strtotime($voucher_date));
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
            "amountinterest" => round($amountinterest, 2),//$amountinterest dilakukan round 2 digit 22-08-2016,
            "description" => $this->istext($row['ketsub']),
            "addby" => $this->_user_id,
            "addon" => $this->istext($this->_curdatetime)
        );
        $this->_queryshl->insert_tmpbungashl($record);
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
                    // print_r($voucherno.' '.$endmonthdate.' '.$amountdata);
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

    public function Create($param) {
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
                    case 'generatereport':
                        $this->createReport();
                        $result = $this->_queryshl->getreport($this->_filterreport['fromdate'], $this->_filterreport['untildate']);
                        $result['periode']=date('d F Y',  strtotime($this->_filterreport['fromdate'])).' to '.date('d F Y',  strtotime($this->_filterreport['untildate']));
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
                    $count = 0;
                    $msg = " ";
                } else {
                    $count = $counter;
                    $msg = $message;
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

}

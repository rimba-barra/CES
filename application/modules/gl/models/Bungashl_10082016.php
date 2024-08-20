<?php

class Gl_Models_Bungashl_10082016 extends Zend_Db_Table_Abstract {

    private $_param = null;
    private $_loop = null;
    private $_filterreport = null;
    private $_data = null;
    private $_coalr = null;
    private $_amountshl = null;

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

        $tmpdate = explode("-", $this->_param['reportdate']);
        $t_date = $tmpdate[0];
        $t_month = $tmpdate[1];
        $t_year = $tmpdate[2];

        $startdatemonth = date('Y-m-d', strtotime($t_year . '-' . $t_month . '-01'));
        $enddatemonth = date('Y-m-t', strtotime($reportdate));

        $startdateyear = date('Y-m-d', strtotime($year . '-01-01'));
        $enddateyear = date('Y-m-d', strtotime($year . '-12-' . $sumdaydecember));
        $sumdayendofyear = $this->_query->get_sumday($startdateyear, $enddateyear);

        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $from = $startdateyear;
            $until = $enddateyear;
        } else {
            $from = $startdatemonth;
            $until = $enddatemonth;
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
        $row = $result[1][0];

        if ($counter > 0) {
            $bunga = $row['bunga'];
            if ($bunga > 0) {
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
        $this->grandAmont();
    }

    public function generateByyear() {
        $this->_loop = array("from" => $this->_data['startdateyear'],
            "until" => $this->_data['enddateyear']
        );
    }

    public function generateBymonth() {
        $this->_loop = array("from" => $this->_data['startdateyear'],
            "until" => $this->_data['enddatemonth']
        );
    }

    public function createDatadesember() {
        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $this->generateByyear();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['enddateyear']);
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
        //$minusdate = date('Y-m-d', strtotime("-1 day", strtotime($this->_data['startdateyear'])));
        //$endofmonthdate = date('Y-m-t', strtotime($minusdate));
        //->calculatedata($endofmonthdate);
    }

    public function createLoopMonth() {
        $frommonth = date('m', strtotime($this->_loop['from']));
        $untilmonth = date('m', strtotime($this->_loop['until']));
        for ($month = $frommonth; $month <= $untilmonth; $month++) {
            $this->processbyMonth($month);
        }
    }

    public function processbyMonth($month) {
        $activedb = explode("_", $this->_db);
        $year = $activedb[1];
        $fromdate = date('Y-m-01', strtotime($year . '-' . $month));
        $untildate = date('Y-m-t', strtotime($year . '-' . $month));
        $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $fromdate, $untildate);

        if (!empty($result[0])) {
            $enddate = date('Y-m', strtotime($untildate));
            $prevenddate = date('Y-m-t', strtotime($enddate . ' -1 months'));
            $rowamountprev = $this->calculatedata($prevenddate);
            foreach ($result[0] as $row) {
                if ($row['voucher_no'] !== 'MJ0001/01') {
                    $this->insertprevdata($rowamountprev, $row);
                    $arraydata = array(
                        "flag" => 'next',
                        "data" => $row,
                    );
                    $this->insertdata($arraydata);
                }
            }
        }
    }

    public function grandAmont() {
        $result = $this->_queryshl->getdistinctendofmonthdate();
        foreach ($result[0] as $row) {
            $enddate = date('Y-m', strtotime($row['endofmonthdate']));
            $nextenddate = date('Y-m-t', strtotime($enddate . ' +1 months'));
            $this->calculatedata($nextenddate);
            $resultcurent = $this->_queryshl->gettotaldata();
            if (!empty($resultcurent[0])) {
                $resultnext = $this->_queryshl->getdatareport('H', $nextenddate);
                if (!empty($resultnext[0])) {
                    if ($resultcurent[0][0]['endofmonthdate'] == $resultnext[0][0]['endofmonthdate']) {
                        //print_r($resultnext);
                        //print_r($resultcurent);
                        $record = array(
                            "grand_beginingbalance" => $resultnext[0][0]['amountdata'],
                            "grand_totalamount" => $resultcurent[0][0]['totalamount'],
                            "grand_amountin" => $resultcurent[0][0]['totalcredit'],
                            "grand_amountout" => $resultcurent[0][0]['totaldebet'],
                            "grand_amountinterest" => $resultcurent[0][0]['totalinterest'],
                            "grand_endbalance" => $resultcurent[0][0]['amountendbalance']
                        );
                        $this->_queryshl->update_tmpbungashlbyenddate($resultnext[0][0]['endofmonthdate'], $record);
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
            $interest = $resultbungaloan[1][0]['bunga'] / 100;
            $sumdayyear = $this->_data['sumdayendofyear'];
            $amountbasetype = $row['amountsubbaseaccount'];
           // $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
            $tenor = (strtotime($endmonthdatejan) - strtotime($voucher_datejan)) / (24 * 3600);
            $amountinterest = ($amountbasetype * $tenor) * ($interest / $sumdayyear);
            
        } else {
            $voucher_date = date('Y-m-d', strtotime($row['voucher_date']));
            $month = date('m', strtotime($voucher_date));
            $endmonthdate = date('Y-m-t', strtotime($voucher_date));
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
            "amountinterest" => $amountinterest,
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
        $this->_queryshl->uniontotal($prevenddate);
        $this->_amountshl = $this->_queryshl->gettotaldata();
        if (!empty($this->_amountshl[0])) {
            $rowamountprev = $this->_amountshl[0][0];
        } else {
            $rowamountprev = 'empty';
        }
        return $rowamountprev;
    }

    public function insertprevdata($rowprev, $rowcurrent) {
        $resultprefixmjb = $this->_queryshl->check_prefixmjb();
        $voucherno = $resultprefixmjb['prefix']."0001/" . date('m', strtotime($rowprev['endofmonthdate']));
        $checkmjb = $this->_queryshl->check_tmpbungashl($voucherno);

        if ($checkmjb < 1) {
            $voucher_date = date('Y-m-d', strtotime($rowcurrent['voucher_date']));
            $monthprev = date('F', strtotime($rowprev['endofmonthdate']));
            $yearprev = date('Y', strtotime($rowprev['endofmonthdate']));
            $month = date('m', strtotime($voucher_date));
            $endmonthdate = date('Y-m-t', strtotime($voucher_date));
            $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
            $interest = $resultbungaloan[1][0]['bunga'] / 100;
            $sumdayyear = $this->_data['sumdayendofyear'];
            $amountdata = $rowprev['amountendbalance'];
            $tenor = (strtotime($endmonthdate) - strtotime($rowprev['endofmonthdate'])) / (24 * 3600);
            $amountinterest = ($rowprev['amountendbalance'] * $tenor) * ($interest / $sumdayyear);
            $desc = $this->_coalr['bungaloan_desc'].' '. $monthprev . ' ' . $yearprev;
            

            $record = array(
                "project_id" => $this->_project_id,
                "pt_id" => $this->_pt_id,
                "coa_id" => $rowcurrent['coa_id'],
                "prefix_id" => $resultprefixmjb['prefix_id'],
                "prefix" => $this->istext($resultprefixmjb['prefix']),
                "flag" => $this->istext('H'),
                "voucher_no" => $this->istext($voucherno),
                "voucher_date" => $this->istext($rowprev['endofmonthdate']),
                "month" => $month,
                "reportdate" => $this->istext($this->_data['reportdate']),
                "endofmonthdate" => $this->istext($endmonthdate),
                "coa" => $this->istext($rowcurrent['coa']),
                "coaname" => $this->istext($rowcurrent['coaname']),
                "typecoa" => $this->istext($rowcurrent['coatype']),
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

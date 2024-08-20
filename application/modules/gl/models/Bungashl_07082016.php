<?php

class Gl_Models_Bungashl_07082016 extends Zend_Db_Table_Abstract {

    private $_param = null;
    private $_loop = null;
    private $_data = null;
    private $_coalr = null;
    private $_amountshl = null;

    function init() {
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
            $this->generatebyyear();
        } else {
            $this->generatebymonth();
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
        $this->_queryshl->create_tmpbungashl();
        $this->createdatadesember();
        $this->createdataafterdecember();
    }

    public function createdatadesember() {
        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $this->generatebyyear();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['enddateyear']);
        } else {
            $this->generatebymonth();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['reportdate']);
        }
        foreach ($result[0] as $row) {
            if ($row['voucher_no'] == 'MJ0001/01' and $row['voucher_date'] == $this->_data['startdateyear']) {
                $voucher_no = $row['voucher_no'];
                $voucher_date = date('Y-m-d', strtotime("-1 day", strtotime($row['voucher_date'])));
                $month = date('m', strtotime($voucher_date));
                $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
                $interest = $resultbungaloan[1][0]['bunga'] / 100;
                $endmonthdate = date('Y-m-t', strtotime($voucher_date));
                $sumdayyear = $this->_data['sumdayendofyear'];
                $amountbasetype = $row['amountsubbaseaccount'];
                // $tenor = (strtotime($until) - strtotime($from)) / (24 * 3600) + 1;
                $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
                $amountinterest = ($amountbasetype * $tenor) * ($interest / $sumdayyear);

                $recordinsert = array(
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "prefix_id" => $row['prefix_id'],
                    "coa_id" => $row["coa_id"],
                    "kelsub_id" => $row["kelsub_id"],
                    "subgl_id" => $row["subgl_id"],
                    "user_id" => $this->_user_id,
                    "prefix" => $this->istext($row["prefix"]),
                    "voucher_no" => $this->istext($row["voucher_no"]),
                    "voucher_date" => $this->istext($voucher_date),
                    "monthdata" => $this->istext($month),
                    "endofmonthdate" => $this->istext($endmonthdate),
                    "reportdate" => $this->istext($this->_data['reportdate']),
                    "coa" => $this->istext($row["coa"]),
                    "name" => $this->istext($row["coaname"]),
                    "kelsub" => $this->istext($row["kelsub"]),
                    "code" => $this->istext($row["code"]),
                    "typecoa" => $this->istext($row["coatype"]),
                    "typetrx" => $this->istext($row["typetrx"]),
                    "amountdata" => $row["amountsubbaseaccount"],
                    "amountsub" => $row["amountsub"],
                    "sumday" => $sumdayyear,
                    "interest" => $interest,
                    "tenor" => $tenor,
                    "amountinterest" => $amountinterest,
                    "description" => $this->istext($row['ketsub']),
                    "addby" => $this->_user_id,
                    "addon" => $this->istext($this->_curdatetime)
                );
                $this->_queryshl->insert_tmpbungashl($recordinsert);
            }
        }
        $this->_queryshl->settotalamount();
        $this->_queryshl->settotaldebet();
        $this->_queryshl->settotalcredit();
        $this->_queryshl->settotalinterest();
        $this->_queryshl->uniontotal();
        $this->_amountshl = $this->_queryshl->gettotaldata();
        
    }

    public function createdataafterdecember() {
        $reporttype = $this->_param['reportby'];
        if ($reporttype == '1') {
            $this->generatebyyear();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['enddateyear']);
        } else {
            $this->generatebymonth();
            $result = $this->_queryshl->getjournalaccountshl($this->_coalr['coa_bungaloan1'], $this->_data['startdateyear'], $this->_data['reportdate']);
        }
        
        $lastendmonthdate = '';
        foreach ($result[0] as $row) {
            if ($row['voucher_no'] !== 'MJ0001/01') {
                $voucher_date = date('Y-m-d', strtotime($row['voucher_date']));
                $month = date('m', strtotime($voucher_date));
                $endmonthdate = date('Y-m-t', strtotime($voucher_date));
                if($endmonthdate !== $lastendmonthdate){
                    
                }
                
                $voucher_no = $row['voucher_no'];
                $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
                $interest = $resultbungaloan[1][0]['bunga'] / 100;
                $sumdayyear = $this->_data['sumdayendofyear'];
                
                $date_prev = date('Y-m-d', strtotime("-1 month", strtotime($row['voucher_date'])));
                $endmonthdate_prev = date('Y-m-t', strtotime($date_prev)); 
                $rowamountprev = $this->_amountshl;
                $amountbasetype = $row['amountsubbaseaccount'];
                
                if($endmonthdate_prev == $rowamountprev['endofmonthdate']){                   
                    $this->insertprevdata($rowamountprev,$row);                   
                }
                // $tenor = (strtotime($until) - strtotime($from)) / (24 * 3600) + 1;
                $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
                $amountinterest = ($amountbasetype * $tenor) * ($interest / $sumdayyear);

                $recordinsert = array(
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "prefix_id" => $row['prefix_id'],
                    "coa_id" => $row["coa_id"],
                    "kelsub_id" => $row["kelsub_id"],
                    "subgl_id" => $row["subgl_id"],
                    "user_id" => $this->_user_id,
                    "prefix" => $this->istext($row["prefix"]),
                    "voucher_no" => $this->istext($row["voucher_no"]),
                    "voucher_date" => $this->istext($voucher_date),
                    "monthdata" => $this->istext($month),
                    "endofmonthdate" => $this->istext($endmonthdate),
                    "reportdate" => $this->istext($this->_data['reportdate']),
                    "coa" => $this->istext($row["coa"]),
                    "name" => $this->istext($row["coaname"]),
                    "kelsub" => $this->istext($row["kelsub"]),
                    "code" => $this->istext($row["code"]),
                    "typecoa" => $this->istext($row["coatype"]),
                    "typetrx" => $this->istext($row["typetrx"]),
                    "amountdata" => $row["amountsubbaseaccount"],
                    "amountsub" => $row["amountsub"],
                    "sumday" => $sumdayyear,
                    "interest" => $interest,
                    "tenor" => $tenor,
                    "amountinterest" => $amountinterest,
                    "description" => $this->istext($row['ketsub']),
                    "addby" => $this->_user_id,
                    "addon" => $this->istext($this->_curdatetime)
                );
                $this->_queryshl->insert_tmpbungashl($recordinsert);                
                $lastendmonthdate = $endmonthdate;
            }
        }
    }
    
    public function insertprevdata($rowprev, $rowcurrent) {
        $voucherno = "MJB0001/" . date('m', strtotime($rowprev['endofmonthdate']));
        $voucher_date = date('Y-m-d', strtotime($rowcurrent['voucher_date']));
        $month = date('m', strtotime($voucher_date));
        $endmonthdate = date('Y-m-t', strtotime($voucher_date));
        $resultbungaloan = $this->_model->getbungalaon_bymonth($month);
        $interest = $resultbungaloan[1][0]['bunga'] / 100;
        $sumdayyear = $this->_data['sumdayendofyear'];
        $amountdata = $rowprev['amountendbalance'];
        $tenor = (strtotime($endmonthdate) - strtotime($voucher_date)) / (24 * 3600);
        $amountinterest = ($rowprev['amountendbalance'] * $tenor) * ($interest / $sumdayyear);
        $desc = "Bunga Loan SHL";

        $record = array(
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
            "kelsub_id" => $rowcurrent['kelsub_id'],
            "voucher_no" => $this->istext($voucherno),
            "voucher_date" => $this->istext($rowprev['endofmonthdate']),
            "endofmonthdate" => $this->istext($rowprev['endofmonthdate']),
            "coa" => $this->istext($rowcurrent['endofmonthdate']),
            "type" => $this->istext($rowcurrent['type']),
            "tenor" => $tenor,
            "interest" => $interest,
            "amountdata" => $amountdata,
            "amountinterest" => $amountinterest,
            "description" => $desc,
            "addon" => $this->_user_id,
            "addby" => $this->_curdatetime,
        );
        $this->_queryshl->insert_bungashl($record);
    }

    public function generatebyyear() {
        $this->_loop = array("from" => $this->_data['startdateyear'],
            "until" => $this->_data['enddateyear']
        );
    }

    public function generatebymonth() {
        $this->_loop = array("from" => $this->_data['startdateyear'],
            "until" => $this->_data['enddatemonth']
        );
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
        $processdate = $fromdate;
        while ($processdate <= $untildate) {
            $date = $processdate;
            $processdate = date('Y-m-d', strtotime("+1 day", strtotime($date)));
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
                        $result = $this->createReport();
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

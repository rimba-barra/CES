<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Report_Bankpositionreport extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $helper = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->helper = new Cashier_Helpers_Functionmodule;
        $this->function = new Cashier_Models_Function_Bankposition;
        $this->setting->_storeprocedure = 'sp_report_fin_bankpositionreport';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->function->deletetable($param['reportfile']);
                        $this->createBegindata($param);
                        $hasil = $this->resultData($param);
                        $param['qdata'] = $hasil;
                        $data = $param;
                        $counter = 1;
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
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
                
            }
        }
        return $return;
    }

    protected function txt($param) {
        return $this->function->istext($param);
    }

    function resultData($param) {
        if ($param['detailaccount'] == 'yes') {
            $leveldata = '';
        } else {
            $leveldata = 1;
        }
        $where = array(
            "a.user_id" => $this->_user_id,
            "a.user_project_id" => $this->_project_id,
            "a.user_pt_id" => $this->_pt_id,
            "a.reportfile" => $param['reportfile'],
            "a.reportdate" => $this->_curdate,
            "a.leveldata" => $leveldata,
        );

        $qdata = $this->function->getfinaldata($where);
        return $qdata;
    }
    
    

    function createBegindata($param) {
        $result = $this->function->getbegindata($param);
        $arrayinfo = array();
        if (!empty($result)) {
            $user_id = $this->_user_id;
            $user_project_id = $this->_project_id;
            $user_pt_id = $this->_pt_id;
            $reportfile = $param['reportfile'];

            $this->function->deletedata($user_id, $user_project_id, $user_pt_id, $reportfile);
            foreach ($result as $row) {
                $record = array(
                    "leveldata" => 1,
                    "user_id" => $user_id,
                    "user_project_id" => $user_project_id,
                    "user_pt_id" => $user_pt_id,
                    "reportfile" => $this->txt($reportfile),
                    "reportdate" => $this->txt($this->_curdatetime),
                    "project_id" => $row['project_id'],
                    "pt_id" => $row['pt_id'],
                    "coa_id" => $row['coa_id'],
                    "bankvoucher_no" => $this->txt($row['name'].' ('.$row['coa'].')'),
                    "beginingbalance" => $row['beginingbalance'],
                    "debit" => $row['debit'],
                    "credit" => $row['credit'],
                    "amount" => $row['endingbalance'],
                    "endingbalance" => $row['endingbalance'],
                );
                $return = $this->function->insertdata($record);
                if (!empty($return[0])) {
                    if ($param['detailaccount'] == 'yes') {
                        if ($return[0] > 0) {
                            $paramwhere = array(
                                'project_id' => $row['project_id'],
                                'pt_id' => $row['pt_id'],
                                'coa_id' => $row['coa_id'],
                                'fromdate' => $param['fromperiode'],
                                'untildate' => $param['untilperiode'],
                                'kasbank' => 'BANK',
                                'status_giro' => 'PAID',
                                'reportfile' => $param['reportfile'],
                            );
                            $this->createDetail($paramwhere);
                            $this->createEndingBalanceLeveltwo($paramwhere);
                        }
                    }
                }
            }
        }
        return $arrayinfo;
    }

    function createDetail($param) {
        $result = $this->function->query_getdata_kasbak($param);
        $arraycout = array();
        $arraymessage = array();
        if (!empty($result[0])) {
            foreach ($result[0] as $row) {
                if ($row['dataflow'] == 'I') {
                    $amount = $row['amount'];
                    $debit = $row['amount'];
                    $credit = 0;
                } else {
                    $amount = '-' . $row['amount'];
                    $debit = 0;
                    $credit = $row['amount'];
                }

                $record = array(
                    "leveldata" => 2,
                    "user_id" => $this->_user_id,
                    "user_project_id" => $this->_project_id,
                    "user_pt_id" => $this->_pt_id,
                    "reportfile" => $param['reportfile'],
                    "reportdate" => $this->_curdatetime,
                    "project_id" => $row['project_id'],
                    "pt_id" => $row['pt_id'],
                    "kasbank_id" => $row['kasbank_id'],
                    "prefix_id" => $row['prefix_id'],
                    "grouptrans_id" => $row['grouptrans_id'],
                    "coa_id" => $row['coa_id'],
                    "bankvoucher_no" => $row['voucher_no'],
                    "voucherdate" => $row['accept_date'],
                    "chequegiro_no" => $row['chequegiro_no'],
                    "description" => $row['description'],
                    "amount" => $amount,
                    "debit" => $debit,
                    "credit" => $credit,
                );
                $this->setting->_tabledata = $this->function->_tmp_report;
                $return = $this->setting->insertdata($record);
                if (!empty($return[0])) {
                    if ($return[0] > 0) {
                        $arraycout[] = $return[0];
                    } else {
                        $arraymessage[] = "error process generate level 2 in kasbank id " . $row['kasbank_id'];
                    }
                }
            }
        }
        return array("counter" => $arraycout, "message" => $arraymessage);
    }

    function createEndingBalanceLeveltwo($param) {
        $result = $this->function->query_getdata_sumendingtotal($param);
        $valid = 0;
        if (!empty($result[0])) {
            foreach ($result[0] as $row) {
                $leveldata = $row['leveldata'];
                if ($leveldata > 1) {
                    $this->setting->_tabledata = $this->function->_tmp_report;
                    $where = array('rpt_id' => $row['rpt_id']);
                    unset($row['rpt_id']);
                    unset($row['leveldata']);
                    $return = $this->setting->updatedata($row, $where);
                    if (!empty($return[0])) {
                        $valid = $return[0];
                    }
                }
            }
        }
        return $valid;
    }

}

<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Cashreport_backup extends Zend_Db_Table_Abstract {
    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->function = new Cashier_Models_Function_Cashreport;
        $this->setting->_storeprocedure = 'sp_report_cashreport';
        $this->_user_id = $this->_session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
    }

    function CashreportRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
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

    protected function txt($param) {
        return $this->function->istext($param);
    }

    protected function truncatedata() {
        $this->function->truncatetable();
    }

    protected function generatedataHeader($param) {
        $result = $this->function->getprojectpt('sp_report_cashreport', $param);
        if (!empty($result[0])) {
            try {
                foreach ($result as $row) {
                    $record = array(
                        "project_id" => $row['project_id'],
                        "pt_id" => $row['pt_id'],
                        "projectcode" => $this->txt($row['projectcode']),
                        "projectname" => $this->txt($row['projectname']),
                        "ptcode" => $this->txt($row['ptcode']),
                        "ptname" => $this->txt($row['ptname']),
                        "leveldata" => 1,
                        "userid" => $this->_user_id,
                        "reportdate" => $this->txt($this->_curdate),
                    );
                    $return = $this->function->insertdata($record);
                    if (!empty($return[0])) {
                        $this->generatesubHeader($param, $row['project_id'], $row['pt_id']);
                        $this->generatedatagGrandprojectpttotal($row['project_id'], $row['pt_id']);
                    }
                }
                return $this->function->showreportbyuser('sp_report_cashreport');
            } catch (Exception $ex) {
                
            }
        }
    }

    protected function generatesubHeader($param, $project_id, $pt_id) {
        $result = $this->function->getkasbankbyprojectpt('sp_report_cashreport', $param, $project_id, $pt_id);
        if (!empty($result[0])) {
            try {
                foreach ($result as $row) {
                    if ($row['dataflow'] == 'I') {
                        $type = "D";
                    } else if ($row['dataflow'] == 'O') {
                        $type = "C";
                    }
                    $record = array(
                        "kasbank_id" => $row['kasbank_id'],
                        "project_id" => $row['project_id'],
                        "pt_id" => $row['pt_id'],
                        "department_id" => $row['department_id'],
                        "coa_id" => $row['coa_id'],
                        "projectcode" => $this->txt($row['projectcode']),
                        "projectname" => $this->txt($row['projectname']),
                        "ptcode" => $this->txt($row['ptcode']),
                        "ptname" => $this->txt($row['ptname']),
                        "deptcode" => $this->txt($row['deptcode']),
                        "department" => $this->txt($row['department']),
                        "coa" => $this->txt($row['coa']),
                        "coaname" => $this->txt($row['coaname']),
                        "leveldata" => 2,
                        "dataflow" => $this->txt($row['dataflow']),
                        "type" => $this->txt($type),
                        "voucher_no" => $this->txt($row['voucher_no']),
                        "chequegiro_no" => $this->txt($row['chequegiro_no']),
                        "voucher_date" => $this->txt($row['accept_date']),
                        "payment_date" => $this->txt($row['chequegiro_payment_date']),
                        "amount" => $this->txt($row['amount']),
                        "debit" => $this->txt($row['debit']),
                        "credit" => $this->txt($row['credit']),
                        "description" => $this->txt($row['description']),
                        "userid" => $this->_user_id,
                        "reportdate" => $this->txt($this->_curdate),
                    );
                    $return = $this->function->insertdata($record);
                    if (!empty($return[0])) {
                        $this->generatedataDetail($row, $row['kasbank_id']);
                    }
                }
            } catch (Exception $ex) {
                
            }
        }
    }

    public function generatedataDetail($data, $kasbank_id) {
        $result = $this->function->getdatadetailbyidheader('sp_report_cashreport', $kasbank_id);
        if ($result) {
            foreach ($result as $row) {
                if ($row['dataflow'] == 'I') {
                    $type = "D";
                } else if ($row['dataflow'] == 'O') {
                    $type = "C";
                }
                $record = array(
                    "kasbank_id" => $row['kasbank_id'],
                    "kasbankdetail_id" => $row['kasbankdetail_id'],
                    "project_id" => $row['project_id'],
                    "pt_id" => $row['pt_id'],
                    "department_id" => $data['department_id'],
                    "coa_id" => $row['coa_id'],
                    "coa" => $this->txt($row['coatmp']),
                    "coaname" => $this->txt($row['coanametmp']),
                    "leveldata" => 3,
                    "dataflow" => $this->txt($row['dataflow']),
                    "type" => $this->txt($type),
                    "amount" => $this->txt($row['amount']),
                    "debit" => $this->txt($row['debit']),
                    "credit" => $this->txt($row['credit']),
                    "description" => $this->txt($row['description']),
                    "userid" => $this->_user_id,
                    "reportdate" => $this->txt($this->_curdate),
                );
                $this->function->insertdata($record);
            }
            $this->generatedataSubtotal($data, $kasbank_id);
        }
    }

    function generatedataSubtotal($data, $kasbank_id) {
        $result = $this->function->getsubtotalkasbank('sp_report_cashreport', $kasbank_id);
        if ($result) {
            foreach ($result as $row) {
                $description = $coaname = str_repeat("-", 50) . "SUB TOTAL";
                $record = array(
                    "kasbank_id" => $data['kasbank_id'],
                    "project_id" => $data['project_id'],
                    "pt_id" => $data['pt_id'],
                    "department_id" => $data['department_id'],
                    "leveldata" => 4,
                    "total_debit" => $this->txt($row['subtotal_debit']),
                    "total_credit" => $this->txt($row['subtotal_credit']),
                    "description" => $this->txt($description),
                    "userid" => $this->_user_id,
                    "reportdate" => $this->txt($this->_curdate),
                );
                $this->function->insertdata($record);
            }
        }
    }

    function generatedatagGrandprojectpttotal($project_id, $pt_id) {
        $rowgrandprojectpt = $this->function->getgrandprojectpttotalkasbank('sp_report_cashreport', $project_id, $pt_id);
        if ($rowgrandprojectpt) {
            $description = $coaname = str_repeat("-", 50) . "GRAND TOTAL";
            $record = array(
                "project_id" => $project_id,
                "pt_id" => $pt_id,
                "leveldata" => 5,
                "total_debit" => $this->txt($rowgrandprojectpt['grandprojectpttotal_debit']),
                "total_credit" => $this->txt($rowgrandprojectpt['grandprojectpttotal_credit']),
                "description" => $this->txt($description),
                "userid" => $this->_user_id,
                "reportdate" => $this->txt($this->_curdate),
            );
            $this->function->insertdata($record);
        }
    }

    protected function showreportdata() {
        return $this->function->showreportbyuser('sp_report_cashreport');
    }

    public function CashreportCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $periode = date('d-m-Y', strtotime($param['fromperiode'])) . ' s/d ' . date('d-m-Y', strtotime($param['untilperiode']));
                if ($param['typetrans'] == 'All') {
                    $dataflow = "IN AND OUT";
                } else if ($param['typetrans'] == 'I') {
                    $dataflow = "IN";
                } else if ($param['typetrans'] == 'O') {
                    $dataflow = "OUT";
                }
                if ($param['dataindexby'] == 'voucherno') {
                    $dataindex = "Voucher No";
                } else if ($param['dataindexby'] == 'voucherdate') {
                    $dataindex = "Voucher Date";
                } else if ($param['dataindexby'] == 'department') {
                    $dataindex = "Department";
                } else if ($param['dataindexby'] == 'paymentdate') {
                    $dataindex = "Payment Date";
                } else if ($param['dataindexby'] == 'chequegirono') {
                    $dataindex = "Cheque / Giro No.";
                } else if ($param['dataindexby'] == 'amountvalue') {
                    $dataindex = "Amount / Value";
                }
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        //$data = $this->setting->executeSP();
                        $this->truncatedata();
                        $result = $this->generatedataHeader($param);
                        $result = array(
                            "qparam" => $result,
                            "userid" => $this->_user_id,
                            "reportdate" => $this->_curdate,
                            "periode" => $periode,
                            "dataflow" => $dataflow,
                            "filterdetailcoa" => strtoupper($param['detailaccount']),
                        );
                        $valid = true;
                        $counter = 1;
                        $message = 'generate param';
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

}

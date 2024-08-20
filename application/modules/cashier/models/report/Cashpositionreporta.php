<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Report_Cashpositionreporta extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $helper = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->helper = new Cashier_Helpers_Functionmodule;
        $this->function = new Cashier_Models_Function_Cashposition;
        $this->setting->_storeprocedure = 'sp_report_cashposition';
    }

    public function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->function->deletetable('cashpositiona');
                        $this->createBeginingbalance($param);
                        $this->setting->_paramsql = 'default';
                        $result = $this->setting->executeSP();
                        $qparam = array(
                            "q1" => $result[1][0]['QDATA'],
                            "q2" => $result[2][0]['QPROJECTPT'],
                            "reportfile" => 'Cashposition1',
                            "paramjs" => $param,
                        );
                        $data = $qparam;
                        $counter = $result[0][0]['RECORD_TOTAL'];
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

    public function createBeginingbalance($param) {
        $result = $this->function->getBeginingbalance($param);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "reportfile" => $this->helper->txt('cashpositiona'),
                    "user_id" => $this->_user_id,
                    "user_project_id" => $this->_project_id,
                    "user_pt_id" => $this->_pt_id,
                    "reportdate" => $this->helper->txt($this->_curdate),
                    "leveldata" => 1,
                    "project_id" => $row['project_id'],
                    "pt_id" => $row['pt_id'],
                    "voucher_no" => $this->helper->txt('BALANCE'),
                    "description" => $this->helper->txt(''),
                    "beginingbalance" => $this->helper->txt($row['beginingbalance']),
                );
                $resultinsert = $this->function->insertdata($record);
                if ($resultinsert) {
                    $this->createdatafromTransaction($param, $record['project_id'], $record['pt_id']);
                    $this->getendBalance($record['project_id'], $record['pt_id']);
                    $this->getSumdata($record['project_id'], $record['pt_id']);
                }
            }
        }
    }

    public function createdatafromTransaction($param, $project_id, $pt_id) {
        $result = $this->function->getdataTrans($param, $project_id, $pt_id);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "reportfile" => $this->helper->txt('cashpositiona'),
                    "user_id" => $this->_user_id,
                    "user_project_id" => $this->_project_id,
                    "user_pt_id" => $this->_pt_id,
                    "reportdate" => $this->helper->txt($this->_curdate),
                    "leveldata" => 2,
                    "project_id" => $row['project_id'],
                    "pt_id" => $row['pt_id'],
                    "kasbank_id" => $row['kasbank_id'],
                    "voucher_no" => $this->helper->txt($row['voucher_no']),
                    "voucher_date" => $this->helper->txt(date('Y-m-d', strtotime($row['accept_date']))),
                    "description" => $this->helper->txt($row['description']),
                    "amount" => $this->helper->txt($row['amount']),
                    "debit" => $this->helper->txt($row['debit']),
                    "credit" => $this->helper->txt($row['credit']),
                );

                $this->function->insertdata($record);
            }
        }
    }

    public function getendBalance($project_id, $pt_id) {
        $result = $this->function->getdataendBalance('cashpositiona', $project_id, $pt_id);
        if (!empty($result)) {
            foreach ($result as $row) {
                $rpt_id = $row['rpt_id'];
                $record = array(
                    "endingbalance" => $row['ending_amount']
                );
                $this->function->updatedata($rpt_id, $record);
            }
        }
    }

    public function getSumdata($project_id, $pt_id) {
        $result = $this->function->getdataSum('cashpositiona', $project_id, $pt_id);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "reportfile" => $this->helper->txt('cashpositiona'),
                    "user_id" => $this->_user_id,
                    "user_project_id" => $this->_project_id,
                    "user_pt_id" => $this->_pt_id,
                    "reportdate" => $this->helper->txt($this->_curdate),
                    "leveldata" => 3,
                    "project_id" => $row['project_id'],
                    "pt_id" => $row['pt_id'],
                    "description" => $this->helper->txt('                                               TOTAL '),
                    "beginingbalance" => $this->helper->txt($row['sum_beginingamount']),
                    "debit" => $this->helper->txt($row['sum_debit']),
                    "credit" => $this->helper->txt($row['sum_credit']),
                    "endingbalance" => $this->helper->txt($row['sum_endamount']),
                );
                $this->function->insertdata($record);
            }
        }
    }

}

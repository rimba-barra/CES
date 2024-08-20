<?php

class Gl_Models_Prosesposting_Summarytemporary extends Zend_Db_Table_Abstract {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_modelcoa = new Gl_Models_Coa();
        $this->_model = new Gl_Models_Prosesposting_Modelsp();
    }

    public function generatetmpdebet($coa, $date, $summary) {
        $counter = $this->_model->checkdatatmpsummary($coa, $date);
        $rowcoa = $this->_model->getcoa($coa);
        if ($rowcoa[0][0]['counterdata'] > 0) {
            $parent = $rowcoa[1][0]['parent_code'];
            $level = $rowcoa[1][0]['level'];

            if ($counter > 0) {
                $summaryid = $this->_model->gettmpsummaryid($coa, $date);
                $resultsum = $this->_model->gettmpsummarybyid($summaryid);

                $record = array(
                    "summary_id" => $summaryid,
                    "coa_id" => $this->_modelcoa->getcoaid($coa),
                    "coa" => $coa,
                    "parent" => $parent,
                    "level" => $level,
                    "voucherdate" => date('Y-m-d', strtotime($date)),
                    "debit_summary" => $summary,
                    "credit_summary" => $resultsum['credit_summary'],
                    "net_summary" => $summary - $resultsum['credit_summary']
                );
                $this->_model->update_tmp($record);
            } else {
                $record = array(
                    "coa_id" => $this->_modelcoa->getcoaid($coa),
                    "coa" => $coa,
                    "parent" => $parent,
                    "level" => $level,
                    "voucherdate" => date('Y-m-d', strtotime($date)),
                    "debit_summary" => $summary,
                    "credit_summary" => 0,
                    "net_summary" => $summary
                );
                $this->_model->create_tmp($record);
            }
        }
    }

    function generatetmpcredit($coa, $date, $summary) {
        $counter = $this->_model->checkdatatmpsummary($coa, $date);
        $rowcoa = $this->_model->getcoa($coa);
        if ($rowcoa[0][0]['counterdata'] > 0) {
            $parent = $rowcoa[1][0]['parent_code'];
            $level = $rowcoa[1][0]['level'];

            if ($counter > 0) {
                $summaryid = $this->_model->gettmpsummaryid($coa, $date);
                $resultsum = $this->_model->gettmpsummarybyid($summaryid);

                $record = array(
                    "summary_id" => $summaryid,
                    "coa_id" => $this->_modelcoa->getcoaid($coa),
                    "coa" => $coa,
                    "parent" => $parent,
                    "level" => $level,
                    "voucherdate" => date('Y-m-d', strtotime($date)),
                    "debit_summary" => $resultsum['debit_summary'],
                    "credit_summary" => $summary,
                    //"net_summary"=>$resultsum['debit_summary'] - $summary
                    //jika credit maka credit - debet konfirmasi pak iwan 20-06-2016
                    "net_summary" => $summary - $resultsum['debit_summary']
                );
                $this->_model->update_tmp($record);
            } else {
                $record = array(
                    "coa_id" => $this->_modelcoa->getcoaid($coa),
                    "coa" => $coa,
                    "parent" => $parent,
                    "level" => $level,
                    "voucherdate" => date('Y-m-d', strtotime($date)),
                    "debit_summary" => 0,
                    "credit_summary" => $summary,
                    "net_summary" => 0 - $summary
                );
                $this->_model->create_tmp($record);
            }
        }
    }

}

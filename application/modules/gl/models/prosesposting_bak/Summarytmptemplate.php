<?php

class Gl_Models_Prosesposting_Summarytmptemplate extends Zend_Db_Table_Abstract {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_modelcoa = new Gl_Models_Coa();
        $this->_sumtmp = new Gl_Models_Prosesposting_Summarytemporary();
        $this->_model = new Gl_Models_Prosesposting_Modelsp();
    }

    public function setuptermporary($date) {
        $result = $this->_model->readtmpsummary($date);
        $this->_model->createtemplatesummary();
        foreach ($result as $row) {
            $this->getparentfrommastercoa($row);
        }
        $this->generatesummary($date);
        $this->gettemplatesummary($date);
    }

    public function getparentfrommastercoa($row) {
        $rowcoa = $this->_model->getcoafortmp($row['coa']);
        $array_coa = $this->chield_coa($rowcoa[0]['coa'], $row['debit_summary'], $row['credit_summary'], $row['net_summary'], $row['voucher_date']);
        $this->buildparent($array_coa);
    }

    public function chield_coa($coa = null, $debet, $credit, $net, $date) {
        $result = $this->_model->getcoafortmp($coa);
        $recursive_header = array();
        $data = array();
        foreach ($result as $row) {
            $data['date'] = $date;
            $data['coa_id'] = $row['coa_id'];
            $data['coa'] = $row['coa'];
            $data['level'] = $row['level'];
            $data['parent'] = $row['parent_code'];
            $data['debet'] = $debet;
            $data['credit'] = $credit;
            $data['net'] = $net;
            $data['child'] = $this->chield_coa($row['parent_code'], $debet, $credit, $net, $date);
            $recursive_header[] = $data;
        }

        return $recursive_header;
    }

    public function buildparent($data) {
        if (is_array($data)) {
            foreach ((array) $data as $row) {
                $count = $this->_model->checkCOAtemplateSummary($row['coa'], $row['date']);
                if ($count < 1) {

                    $record = array(
                        "coa_id" => $row['coa_id'],
                        "coa" => $row['coa'],
                        "level" => $row['level'],
                        "parent" => $row['parent'],
                        "voucherdate" => $row['date'],
                        "debet" => 0,
                        "credit" => 0,
                        "net" => 0
                    );

                    $this->_model->insertTemplateSummary($record);
                    $countersetup = $this->_model->checkSetParent($row['coa'], $row['date']);
                    if ($countersetup > 0) {
                        $result = $this->_model->getdataSetParent($row['coa'], $row['date']);
                        $rowsum = $this->_model->getdataTemplateSummary($row['coa'], $row['date']);
                        $summary_id = $rowsum[1][0]['summary_id'];

                        $recordaupdate = array(
                            "summaryid" => $summary_id,
                            "debet" => $result['debit_summary'],
                            "credit" => $result['credit_summary'],
                            "net" => $result['net_summary']
                        );

                        $this->_model->updateTemplateAmount($recordaupdate);
                    }
                }
                if (!empty($row['child'])) {
                    $this->buildparent($row['child']);
                }
            }
        }
    }

    public function generatesummary($date) {
        $result = $this->_model->readtmptemplatesummary($date);
        foreach ($result as $row) {
            $checkparent = $this->_model->getdataTemplateSummary($row['parent_code'], $row['voucher_date']);
            $chekactive = $this->_model->getdataTemplateSummary($row['coa'], $row['voucher_date']);

            if ($checkparent[0][0]['counterdata'] > 0) {
                $rowparent = $checkparent[1][0];
                $rowactive = $chekactive[1][0];

                $rowcoa = $this->_model->getcoa($rowparent['coa']);
                if ($rowcoa[0][0]['counterdata'] > 0) {
                    $typeparent = $rowcoa[1][0]['type'];

                    $summaryid = $rowparent['summary_id'];
                    $debet = $rowparent['debit_summary'] + $rowactive['debit_summary'];
                    $credit = $rowparent['credit_summary'] + $rowactive['credit_summary'];

                    if ($typeparent == 'D') {
                        $net = ($debet - $credit);
                    } else if ($typeparent == 'C') {
                        $net = ($credit - $debet);
                    }

                    $record = array(
                        "summaryid" => $summaryid,
                        "debet" => $debet,
                        "credit" => $credit,
                        "net" => $net
                    );
                    $this->_model->updateTemplateAmount($record);
                }
            }
        }
    }

    public function gettemplatesummary($date) {
        $result = $this->_model->readtmptemplate($date);
        foreach ($result as $row) {
            $counter = $this->_model->checkdatasummary($row['coa'], $row['voucher_date']);
            if ($counter < 1) {
                $recordcreate = array(
                    "coa_id" => $row['coa_id'],
                    "coa" => $row['coa'],
                    "voucherdate" => $row['voucher_date'],
                    "debit_summmary" => $row['debit_summary'],
                    "credit_summmary" => $row['credit_summary'],
                    "net_summmary" => $row['net_summary'],
                );
                $this->_model->createsummary($recordcreate);
            } else {
                $summaryid = $this->_model->getsummaryid($row['coa'], $row['voucher_date']);
                $recordupdate = array(
                    "summaryid" => $summaryid,
                    "coa_id" => $row['coa_id'],
                    "coa" => $row['coa'],
                    "voucherdate" => $row['voucher_date'],
                    "debit_summmary" => $row['debit_summary'],
                    "credit_summmary" => $row['credit_summary'],
                    "net_summmary" => $row['net_summary'],
                );
                $this->_model->updatesummary($recordupdate);
            }
        }
    }

}

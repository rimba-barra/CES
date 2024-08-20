<?php

class Gl_Models_Prosesposting_Summary extends Zend_Db_Table_Abstract {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Prosesposting_Modelsp();
        $this->_modelcoa = new Gl_Models_Coa();
        $this->_tmpsum = new Gl_Models_Prosesposting_Summarytemporary();
        $this->_tmptemplate = new Gl_Models_Prosesposting_Summarytmptemplate();
    }

    public function gerenateth_summary($date, $flag) {
        $result = $this->_model->getjournaldetailbyvoucherdate($date, $flag);
        if ($result[0][0]['counterdata'] > 0) {
            foreach ($result[1] as $row) {
                if ($flag == 'D') {
                    $this->_tmpsum->generatetmpdebet($row['coa'], $row['voucher_date'], $row['sumamount']);
                } else if ($flag == 'C') {
                    $this->_tmpsum->generatetmpcredit($row['coa'], $row['voucher_date'], $row['sumamount']);
                }
                //$this->_tmptemplate->setuptermporary($row['voucher_date']);
                //$this->updatejournalflag($row['voucher_date']);
            }
            $this->_tmptemplate->setuptermporary($row['voucher_date']);
            $this->updatejournalflag($date);
        }
    }

    public function updatejournalflag($date) {
        $result = $this->_model->getjournalbyvoucherdate($date);
        foreach ($result as $row) {
            $this->_model->setflag($row['journal_id']);
        }
    }

}

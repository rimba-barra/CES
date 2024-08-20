<?php

class Cashier_Models_Prosesposting_Summary extends Zend_Db_Table_Abstract {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Cashier_Models_Prosesposting_Modelsp();
        $this->_modelcoa = new Cashier_Models_Coa();
        $this->_tmpsum = new Cashier_Models_Prosesposting_Summarytemporary();
        $this->_tmptemplate = new Cashier_Models_Prosesposting_Summarytmptemplate();
    }

    public function gerenateth_summary($date) {
        // ##tmp_summary_setparent
        $resultdebet = $this->_model->getjournaldetailbyvoucherdate($date, 'D');
        $resultcredit = $this->_model->getjournaldetailbyvoucherdate($date, 'C');
        
        if ($resultdebet[0][0]['counterdata'] > 0) {
            foreach ($resultdebet[1] as $row) {
                $this->_tmpsum->generatetmpdebet($row['coa'], $row['voucher_date'], $row['sumamount']);
            }
        }
        if ($resultcredit[0][0]['counterdata'] > 0) {
            foreach ($resultcredit[1] as $row) {
                $this->_tmpsum->generatetmpcredit($row['coa'], $row['voucher_date'], $row['sumamount']);
            }
        }
        
        if ($resultdebet[0][0]['counterdata'] > 0 or $resultcredit[0][0]['counterdata'] > 0) {
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

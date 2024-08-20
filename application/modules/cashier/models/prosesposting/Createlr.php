<?php

class Cashier_Models_Prosesposting_Createlr extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_summary';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_modelcoa = new Cashier_Models_Coa();
        $this->_model = new Cashier_Models_Prosesposting_Modelsp();
        $this->_helperdata = new Cashier_Models_Function_Helperdata();
        $this->_journal = new Cashier_Models_Journal();
        $this->_summary = new Cashier_Models_Prosesposting_Summary();
    }

    public function checkJournal($coa1, $coa2, $enddate, $netcomprehenship, $absolutenet) {
        $voucherno = "LR0001/" . date("m", strtotime($enddate));
        $voucerdate = date("Y-m-d", strtotime($enddate));
        $rowprefix = $this->_model->getprefixbycode("LR");

        $check = $this->_journal->checkExist(array("voucher_no" => $voucherno));
        if ($check[0][0]['counterdata'] > 0) {
            $journal_id = $this->_journal->getVoucherid($voucherno);
            $this->_model->deletejournallr($journal_id);
            $this->createjournalheader($voucherno, $voucerdate, $rowprefix, $absolutenet);
        } else {
            $this->createjournalheader($voucherno, $voucerdate, $rowprefix, $absolutenet);
        }
        $this->createAccountJournal($voucherno, $coa1, $coa2, $enddate, $netcomprehenship, $absolutenet);
    }

    public function createjournalheader($voucherno, $voucerdate, $rowprefix, $absolutenet) {
        $record = array(
            "no_generate" => $voucherno,
            "voucher_date" => $voucerdate,
            "prefix_id" => $rowprefix['prefix_id'],
            "debit_total" => $absolutenet,
            "credit_total" => $absolutenet,
            "selisih" => $absolutenet - $absolutenet,
        );
        $this->_journal->createData($record);
    }

    public function createAccountJournal($voucherno, $coa1, $coa2, $enddate, $netcomprehenship, $absolutenet) {
        $monthyear = date("F/Y", strtotime($enddate));
        if ($netcomprehenship < 0) {
            $record1 = array(
                'deleted' => false,
                "voucherno" => $voucherno,
                "sort" => 1,
                "kelsub_id" => 0,
                "kelsub" => null,
                "coa" => $coa1,
                "type" => "D",
                "keterangan" => 'PROFIT LOSS ' . $monthyear,
                "amount" => $absolutenet,
            );
            $record2 = array(
                'deleted' => false,
                "voucherno" => $voucherno,
                "sort" => 2,
                "kelsub_id" => 0,
                "kelsub" => null,
                "coa" => $coa2,
                "type" => "C",
                "keterangan" => 'PROFIT LOSS ' . $monthyear,
                "amount" => $absolutenet,
            );
            $this->_journal->accountjournalCreate($record1);
            $this->_journal->accountjournalCreate($record2);
        } else {
            $record1 = array(
                'deleted' => false,
                "voucherno" => $voucherno,
                "sort" => 1,
                "kelsub_id" => 0,
                "kelsub" => null,
                "coa" => $coa2,
                "type" => "D",
                "keterangan" => 'PROFIT LOSS ' . $monthyear,
                "amount" => $absolutenet,
            );
            $record2 = array(
                'deleted' => false,
                "voucherno" => $voucherno,
                "sort" => 2,
                "kelsub_id" => 0,
                "kelsub" => null,
                "coa" => $coa1,
                "type" => "C",
                "keterangan" => 'PROFIT LOSS ' . $monthyear,
                "amount" => $absolutenet,
            );

            $this->_journal->accountjournalCreate($record2);
            $this->_journal->accountjournalCreate($record1);
        }        
        $this->_summary->gerenateth_summary($enddate, "D");
        $this->_summary->gerenateth_summary($enddate, "C");    
        
        //die();
    }

}

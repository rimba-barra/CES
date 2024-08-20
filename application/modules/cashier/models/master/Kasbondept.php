<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Kasbondept extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

 private $duedate;
 private $accept_date;
 private $claim_date;
 private $dataflow;
 private $kasbongiro;
 private $status;
 private $voucher_no;
 private $amount;
 private $cashback;
 private $paid;
 private $balance;
 private $description;
 private $madeby;
 private $cheque;
 private $dept;
 
 
    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->payment = new Cashier_Models_Master_Kasbondept();
        $this->embedPrefix = 'kasbon_';
        $this->detail = array();
        $this->subdetail = array();
    }
  
        

                public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['kasbank_id'])) {
            $this->setId($x['kasbank_id']);
        }

       
        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "kasbank_id" => $this->getId(),
            
        );

        return $x;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(), $this->getPt(), $this->getPayment(), $this->getCheque());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon", 'posting_date', 'chequegiro_date', 'accept_date', 'chequegiro_payment_date', 'chequegiro_receive_date', 'chequegiro_reject_date', 'chequegiro_release_date', 'journal_voucher_date'));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }

}

?>

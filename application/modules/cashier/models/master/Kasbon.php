<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Kasbon extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $duedate;
    private $accept_date;
    private $claim_date;
    private $dataflow;
    private $kasbongiro;
    private $status;
    private $status_special;
    private $statusdata;
    private $voucher_no;
    private $voucher_date;
    private $amount;
    private $cashback;
    private $paid;
    private $balance;
    private $selisih;
    private $description;
    private $madeby;
    private $chequegiro_no;
    private $chequegiro_claim_date;
    private $chequegiro_date;
    private $chequegiro_reject_date;
    private $kasbondept;
    private $projectptid;   
 


    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       // $this->kasbondept = new Cashier_Models_Master_Kasbondept();
        $this->embedPrefix = 'kasbon_';
        $this->detail = array();
        $this->subdetail = array();
    }
    
    
    function getDuedate() {
        return $this->duedate;
    }

    function getAccept_date() {
        return $this->accept_date;
    }

    function getClaim_date() {
        return $this->claim_date;
    }

    function getDataflow() {
        return $this->dataflow;
    }

    function getKasbongiro() {
        return $this->kasbongiro;
    }

    function getStatus() {
        return $this->status;
    }

    function getStatus_special() {
        return $this->status_special;
    }

    function getStatusdata() {
        return $this->statusdata;
    }

    function getVoucher_no() {
        return $this->voucher_no;
    }

    function getVoucher_date() {
        return $this->voucher_date;
    }

    function getAmount() {
        return $this->amount;
    }

    function getCashback() {
        return $this->cashback;
    }

    function getPaid() {
        return $this->paid;
    }

    function getBalance() {
        return $this->balance;
    }

    function getSelisih() {
        return $this->selisih;
    }

    function getDescription() {
        return $this->description;
    }

    function getMadeby() {
        return $this->madeby;
    }

    function getChequegiro_no() {
        return $this->chequegiro_no;
    }

    function getChequegiro_claim_date() {
        return $this->chequegiro_claim_date;
    }

    function getChequegiro_date() {
        return $this->chequegiro_date;
    }

    function getChequegiro_reject_date() {
        return $this->chequegiro_reject_date;
    }

    function setDuedate($duedate) {
        $this->duedate = $duedate;
    }

    function setAccept_date($accept_date) {
        $this->accept_date = $accept_date;
    }

    function setClaim_date($claim_date) {
        $this->claim_date = $claim_date;
    }

    function setDataflow($dataflow) {
        $this->dataflow = $dataflow;
    }

    function setKasbongiro($kasbongiro) {
        $this->kasbongiro = $kasbongiro;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setStatus_special($status_special) {
        $this->status_special = $status_special;
    }

    function setStatusdata($statusdata) {
        $this->statusdata = $statusdata;
    }

    function setVoucher_no($voucher_no) {
        $this->voucher_no = $voucher_no;
    }

    function setVoucher_date($voucher_date) {
        $this->voucher_date = $voucher_date;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setCashback($cashback) {
        $this->cashback = $cashback;
    }

    function setPaid($paid) {
        $this->paid = $paid;
    }

    function setBalance($balance) {
        $this->balance = $balance;
    }

    function setSelisih($selisih) {
        $this->selisih = $selisih;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setMadeby($madeby) {
        $this->madeby = $madeby;
    }

    function setChequegiro_no($chequegiro_no) {
        $this->chequegiro_no = $chequegiro_no;
    }

    function setChequegiro_claim_date($chequegiro_claim_date) {
        $this->chequegiro_claim_date = $chequegiro_claim_date;
    }

    function setChequegiro_date($chequegiro_date) {
        $this->chequegiro_date = $chequegiro_date;
    }

    function setChequegiro_reject_date($chequegiro_reject_date) {
        $this->chequegiro_reject_date = $chequegiro_reject_date;
    }
    
    function getProjectptid() {
        return $this->projectptid;
    }

    function setProjectptid($projectptid) {
        $this->projectptid = $projectptid;
    }

    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['kasbon_id'])) {
            $this->setId($x['kasbon_id']);
        }
        if (isset($x['dataflow'])) {
            $this->setDataflow($x['dataflow']);
        }
        if (isset($x['claim_date'])) {
            $this->setClaim_date($x['claim_date']);
        }
        if (isset($x['accept_date'])) {
            $this->setAccept_date($x['accept_date']);
        }
        if (isset($x['kasbongiro'])) {
            $this->setKasbongiro($x['kasbongiro']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['status_special'])) {
            $this->setStatus_special($x['status_special']);
        }
        if (isset($x['statusdata'])) {
            $this->setStatusdata($x['statusdata']);
        }
        if (isset($x['voucher_no'])) {
            $this->setVoucher_no($x['voucher_no']);
        }
        if (isset($x['voucher_date'])) {
            $this->setVoucher_date($x['voucher_date']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['cashback'])) {
            $this->setCashback($x['cashback']);
        }
        if (isset($x['paid'])) {
            $this->setPaid($x['paid']);
        }
        if (isset($x['balance'])) {
            $this->setBalance($x['balance']);
        }
        if (isset($x['selisih'])) {
            $this->setSelisih($x['selisih']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['madeby'])) {
            $this->setMadeby($x['madeby']);
        }
        if (isset($x['chequegiro_no'])) {
            $this->setChequegiro_no($x['chequegiro_no']);
        }
        if (isset($x['chequegiro_claim_date'])) {
            $this->setChequegiro_claim_date($x['chequegiro_claim_date']);
        }
        if (isset($x['chequegiro_date'])) {
            $this->setChequegiro_date($x['chequegiro_date']);
        }
        if (isset($x['cashbon_projectpt_id'])) {
            $this->setProjectptid($x['cashbon_projectpt_id']);
        }


        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "kasbon_id" => $this->getId(),
            "accept_date" => $this->getAccept_date(),
            "claim_date" => $this->getClaim_date(),
            "dataflow" => $this->getDataflow(),
            "kasbongiro" => $this->getKasbongiro(),
            "status" => $this->getStatus(),
            "status_special" => $this->getStatus_special(),
            "statusdata" => $this->getStatusdata(),
            "voucher_no" => $this->getVoucher_no(),
            "voucher_date" => $this->getVoucher_date(),
            "amount" => $this->getAmount(),
            "cashback" => $this->getCashback(),
            "paid" => $this->getPaid(),
            "balance" => $this->getBalance(),
            "selisih" => $this->getSelisih(),
            "description" => $this->getDescription(),
            "madeby" => $this->getMadeby(),
            "chequegiro_no" => $this->getChequegiro_no(),
            "chequegiro_claim_date" => $this->getChequegiro_claim_date(),
            "chequegiro_date" => $this->getChequegiro_date(),
            "chequegiro_reject_date" => $this->getChequegiro_reject_date(),
            "cashbon_projectpt_id" => $this->getProjectptid(),
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

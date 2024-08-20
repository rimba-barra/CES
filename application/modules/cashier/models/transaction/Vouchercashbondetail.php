<?php

/**
 * Description of PaymentDetail
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Vouchercashbondetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $kasbon_payment_id;
    private $voucher_id;
    private $kasbondept_id;
    private $amount;
    private $remaining_amount;
    private $pay_amount;
    private $kasbondept_no;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "cashbonpayment_";
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
    }
    
    function getKasbon_payment_id() {
        return $this->kasbon_payment_id;
    }

    function getVoucher_id() {
        return $this->voucher_id;
    }

    function getKasbondept_id() {
        return $this->kasbondept_id;
    }

    function getAmount() {
        return $this->amount;
    }

    function getRemaining_amount() {
        return $this->remaining_amount;
    }

    function getPay_amount() {
        return $this->pay_amount;
    }
    
    function getKasbondept_no() {
        return $this->kasbondept_no;
    }

    function setKasbondept_no($kasbondept_no) {
        $this->kasbondept_no = $kasbondept_no;
    }

    
    function setKasbon_payment_id($kasbon_payment_id) {
        $this->kasbon_payment_id = $kasbon_payment_id;
    }

    function setVoucher_id($voucher_id) {
        $this->voucher_id = $voucher_id;
    }

    function setKasbondept_id($kasbondept_id) {
        $this->kasbondept_id = $kasbondept_id;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setRemaining_amount($remaining_amount) {
        $this->remaining_amount = $remaining_amount;
    }

    function setPay_amount($pay_amount) {
        $this->pay_amount = $pay_amount;
    }

    
    public function setArrayTable($dataArray = NULL) {
        // $x = $dataArray;
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['kasbon_payment_id'])) {
            $this->setKasbon_payment_id($x['kasbon_payment_id']);
        }
        if (isset($x['voucher_id'])) {
            $this->setVoucher_id($x['voucher_id']);
        }
        if (isset($x['kasbondept_id'])) {
            $this->setKasbondept_id($x['kasbondept_id']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['remaining_amount'])) {
            $this->setRemaining_amount($x['remaining_amount']);
        }
        if (isset($x['pay_amount'])) {
            $this->setPay_amount($x['pay_amount']);
        }
        if (isset($x['kasbondept_no'])) {
            $this->setKasbondept_no($x['kasbondept_no']);
        }
        unset($x);

        /* end add voucher */
    }

    public function getArrayTable() {
        $x = array(
            'kasbon_payment_id' => $this->getKasbon_payment_id(),
            'voucher_id' => $this->getVoucher_id(),
            'kasbondept_id' => $this->getKasbondept_id(),
            'amount' => $this->getAmount(),
            'remaining_amount' => $this->getRemaining_amount(),
            'pay_amount' => $this->getPay_amount(),
            'kasbondept_no' => $this->getKasbondept_no(),
        );
        return $x;
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
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

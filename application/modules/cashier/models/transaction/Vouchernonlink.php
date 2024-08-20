<?php

/**
 * Description of PaymentDetail
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Vouchernonlink extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $payment_id;
    private $kasbank_id;
    private $paymenttype_id;
    private $amount;
    private $description;
    private $addon;
    private $addby;
    private $modion;
    private $modiby;
    private $deleteon;
    private $deleteby;
    private $paymenttype;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "vouchernonlink_";
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
    }
    function getPaymenttype() {
        return $this->paymenttype;
    }

    function setPaymenttype($paymenttype) {
        $this->paymenttype = $paymenttype;
    }

        
    function getPayment_id() {
        return $this->payment_id;
    }

    function getKasbank_id() {
        return $this->kasbank_id;
    }

    function getPaymenttype_id() {
        return $this->paymenttype_id;
    }

    function getAmount() {
        return $this->amount;
    }

    function getDescription() {
        return $this->description;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function getModion() {
        return $this->modion;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getDeleteon() {
        return $this->deleteon;
    }

    function getDeleteby() {
        return $this->deleteby;
    }

    function setPayment_id($payment_id) {
        $this->payment_id = $payment_id;
    }

    function setKasbank_id($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }

    function setPaymenttype_id($paymenttype_id) {
        $this->paymenttype_id = $paymenttype_id;
    }

    function setAmount($amount) {
        $this->amount = $amount;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setDeleteon($deleteon) {
        $this->deleteon = $deleteon;
    }

    function setDeleteby($deleteby) {
        $this->deleteby = $deleteby;
    }

        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['payment_id'])) { $this->setPayment_id($x['payment_id']); }
        if (isset($x['kasbank_id'])) { $this->setKasbank_id($x['kasbank_id']); }
        if (isset($x['paymenttype_id'])) { $this->setPaymenttype_id($x['paymenttype_id']); }
        if (isset($x['amount'])) { $this->setAmount($x['amount']); }
        if (isset($x['description'])) { $this->setDescription($x['description']); }
        if (isset($x['addon'])) { $this->setAddon($x['addon']); }
        if (isset($x['addby'])) { $this->setAddby($x['addby']); }
        if (isset($x['modion'])) { $this->setModion($x['modion']); }
        if (isset($x['modiby'])) { $this->setModiby($x['modiby']); }
        if (isset($x['deleteon'])) { $this->setDeleteon($x['deleteon']); }
        if (isset($x['deleteby'])) { $this->setDeleteby($x['deleteby']); }
        if (isset($x['paymenttype'])) { $this->setPaymenttype($x['paymenttype']); }

        unset($x);

        /* end add voucher */
    }

    public function getArrayTable() {
        $x = array(
            'payment_id' => $this->getPayment_id(),
            'kasbank_id' => $this->getKasbank_id(),
            'paymenttype_id' => $this->getPaymenttype_id(),
            'amount' => $this->getAmount(),
            'description' => $this->getDescription(),
            'addon' => $this->getAddon(),
            'addby' => $this->getAddby(),
            'modion' => $this->getModion(),
            'modiby' => $this->getModiby(),
            'deleteon' => $this->getDeleteon(),
            'deleteby' => $this->getDeleteby(),
            'paymenttype' => $this->getPaymenttype(),

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

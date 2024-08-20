<?php
class Cashier_Models_Master_Pemutihandenda extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $payment_id;
    private $kasbank_id;
    private $payment_no;
    private $purchaseletter_id;
    private $unit_id;
    private $unit_number;
    private $payment_date;
    private $total_payment;
    private $note;
    private $payment_id_erems;

    

    public function __construct() {
        parent::__construct();
        $this->project     = new Cashier_Box_Models_Master_Project();
        $this->pt          = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'pemutihandenda_';
    }

    function setPayment_id($payment_id) {
        $this->payment_id = $payment_id;
    }

    function getPayment_id() {
        return $this->payment_id;
    }

    function setKasbank_id($kasbank_id) {
        $this->kasbank_id = $kasbank_id;
    }

    function getKasbank_id() {
        return $this->kasbank_id;
    }

    function setPayment_no($payment_no) {
        $this->payment_no = $payment_no;
    }

    function getPayment_no() {
        return $this->payment_no;
    }

    function setPurchaseletter_id($purchaseletter_id) {
        $this->purchaseletter_id = $purchaseletter_id;
    }

    function getPurchaseletter_id() {
        return $this->purchaseletter_id;
    }

    function setUnit_id($unit_id) {
        $this->unit_id = $unit_id;
    }

    function getUnit_id() {
        return $this->unit_id;
    }

    function setUnit_number($unit_number) {
        $this->unit_number = $unit_number;
    }

    function getUnit_number() {
        return $this->unit_number;
    }

    function setPayment_date($payment_date) {
        $this->payment_date = $payment_date;
    }

    function getPayment_date() {
        return $this->payment_date;
    }

    function setTotal_payment($total_payment) {
        $this->total_payment = $total_payment;
    }

    function getTotal_payment() {
        return $this->total_payment;
    }

    function setNote($note) {
        $this->note = $note;
    }

    function getNote() {
        return $this->note;
    }

    function setPayment_id_erems($payment_id_erems) {
        $this->payment_id_erems = $payment_id_erems;
    }

    function getPayment_id_erems() {
        return $this->payment_id_erems;
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['payment_id'])) {
            $this->setPayment_id($x['payment_id']);
        }
        if (isset($x['kasbank_id'])) {
            $this->setKasbank_id($x['kasbank_id']);
        }
        if (isset($x['payment_no'])) {
            $this->setPayment_no($x['payment_no']);
        }
        if (isset($x['purchaseletter_id'])) {
            $this->setPurchaseletter_id($x['purchaseletter_id']);
        }
        if (isset($x['unit_id'])) {
            $this->setUnit_id($x['unit_id']);
        }
        if (isset($x['unit_number'])) {
            $this->setUnit_number($x['unit_number']);
        }
        if (isset($x['payment_date'])) {
            $this->setPayment_date($x['payment_date']);
        }
        if (isset($x['total_payment'])) {
            $this->setTotal_payment($x['total_payment']);
        }
        if (isset($x['note'])) {
            $this->setNote($x['note']);
        }
        if (isset($x['payment_id_erems'])) {
            $this->setPayment_id_erems($x['payment_id_erems']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "payment_id"        => $this->getPayment_id(),
            "kasbank_id"        => $this->getKasbank_id(),
            "payment_no"        => $this->getPayment_no(),
            "purchaseletter_id" => $this->getPurchaseletter_id(),
            "unit_id"           => $this->getUnit_id(),
            "unit_number"       => $this->getUnit_number(),
            "payment_date"      => $this->getPayment_date(),
            "total_payment"     => $this->getTotal_payment(),
            "note"              => $this->getNote(),
            "payment_id_erems"  => $this->getPayment_id_erems(),
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
        $this->pt      = $pt;
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
        return array($this->getProject(), $this->getPt());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon", "issued_date"));
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

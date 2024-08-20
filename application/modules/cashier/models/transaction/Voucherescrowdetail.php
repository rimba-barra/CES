<?php

/**
 * Description of PaymentDetail
 *
 * @author MIS
 */
class Cashier_Models_Transaction_Voucherescrowdetail extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $paymentType;
    private $schedule;
    private $description;
    private $amount;
    private $payment;
    private $remainingBalance;
    private $denda;
    private $isDebitNote;
    private $isCreditNote;
    private $debitNote;
    private $creditNote;
    private $kasbank;
    private $duedate;
    private $remaingPay;
    private $final;
    private $noAR;
    private $pencairan_date;
    private $pengajuanberkasdate;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "paymentdetail_";
        $this->schedule = new Cashier_Models_Purchaseletter_Schedule();
        $this->paymentType = new Cashier_Models_Master_PaymentType();
        $this->kasbank = new Cashier_Models_Master_Kasbank();
    }
    function getPengajuanberkasdate() {
        return $this->pengajuanberkasdate;
    }

    function setPengajuanberkasdate($pengajuanberkasdate) {
        $this->pengajuanberkasdate = $pengajuanberkasdate;
    }

        public function getPaymentType() {
        if (!$this->paymentType) {
            $this->paymentType = new Cashier_Models_Master_PaymentType();
        }
        return $this->paymentType;
    }

    public function setPaymentType(Cashier_Models_Master_PaymentType $paymentType) {
        $this->paymentType = $paymentType;
    }

    public function getSchedule() {
        if (!$this->schedule) {
            $this->schedule = new Cashier_Models_Purchaseletter_Schedule();
        }
        return $this->schedule;
    }

    public function setSchedule(Cashier_Models_Purchaseletter_Schedule $schedule) {
        $this->schedule = $schedule;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getAmount() {
        return (double) $this->amount;
    }

    public function setAmount($amount) {
        $this->amount = (double) $amount;
    }

    public function getPayment() {
        return (double) $this->payment;
    }

    public function setPayment($payment) {
        $this->payment = (double) $payment;
    }

    public function getRemainingBalance() {
        return (double) $this->remainingBalance;
    }

    public function setRemainingBalance($remainingBalance) {
        $this->remainingBalance = (double) $remainingBalance;
    }

    public function getDenda() {
        return (double) $this->denda;
    }

    public function setDenda($denda) {
        $this->denda = (double) $denda;
    }

    public function getIsDebitNote() {
        return $this->isDebitNote;
    }

    public function setIsDebitNote($isDebitNote) {
        $this->isDebitNote = $isDebitNote;
    }

    public function getIsCreditNote() {
        return $this->isCreditNote;
    }

    public function setIsCreditNote($isCreditNote) {
        $this->isCreditNote = $isCreditNote;
    }

    public function getDebitNote() {
        return $this->debitNote;
    }

    public function setDebitNote($debitNote) {
        $this->debitNote = $debitNote;
    }

    public function getCreditNote() {
        return $this->creditNote;
    }

    public function setCreditNote($creditNote) {
        $this->creditNote = $creditNote;
    }

    function getKasbank() {
        if (!$this->kasbank) {
            $this->kasbank = new Cashier_Models_Master_Kasbank();
        }
        return $this->kasbank;
    }

    function setKasbank(Cashier_Models_Master_Kasbank $kasbank) {
        $this->kasbank = $kasbank;
    }

    function getDuedate() {
        return $this->duedate;
    }

    function setDuedate($duedate) {
        $this->duedate = $duedate;
    }
    function getRemaingPay() {
        return $this->remaingPay;
    }

    function getFinal() {
        return $this->final;
    }

    function setRemaingPay($remaingPay) {
        $this->remaingPay = $remaingPay;
    }

    function setFinal($final) {
        $this->final = $final;
    }
    function getNoAR() {
        return $this->noAR;
    }

    function setNoAR($noAR) {
        $this->noAR = $noAR;
    }
    function getPencairan_date() {
        return $this->pencairan_date;
    }

    function setPencairan_date($pencairan_date) {
        $this->pencairan_date = $pencairan_date;
    }

                public function setArrayTable($dataArray = NULL) {
        // $x = $dataArray;
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['paymentdetail_id'])) {
            $this->setId($x['paymentdetail_id']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        if (isset($x['amount'])) {
            $this->setAmount($x['amount']);
        }
        if (isset($x['payment'])) {
            $this->setPayment($x['payment']);
        }
        if (isset($x['remaining_balance'])) {
            $this->setRemainingBalance($x['remaining_balance']);
        }
        if (isset($x['denda'])) {
            $this->setDenda($x['denda']);
        }
        if (isset($x['is_debitnote'])) {
            $this->setIsDebitNote($x['is_debitnote']);
        }
        if (isset($x['is_creditnote'])) {
            $this->setIsCreditNote($x['is_creditnote']);
        }
        if (isset($x['debitnote'])) {
            $this->setDebitNote($x['debitnote']);
        }

        if (isset($x['creditnote'])) {
            $this->setCreditNote($x['creditnote']);
        }
        if (isset($x['duedate'])) {
            $this->setDuedate($x['duedate']);
        }
        if (isset($x['remaining_pay'])) {
            $this->setRemaingPay($x['remaining_pay']);
        }
        if (isset($x['final'])) {
            $this->setFinal($x['final']);
        }
        if (isset($x['noAR'])) {
            $this->setNoAR($x['noAR']);
        }
        if (isset($x['pencairan_date'])) {
            $this->setPencairan_date($x['pencairan_date']);
        }
        
        if (isset($x['pengajuan_berkas_date'])) {
            $this->setPengajuanberkasdate($x['pengajuan_berkas_date']);
        }

        if (isset($x['schedule_id'])) {
            $this->getSchedule()->setId($x['schedule_id']);
        }
        if (isset($x['kasbank_id'])) {
            $this->getKasbank()->setId($x['kasbank_id']);
        }
        unset($x);

        /* end add voucher */
    }

    public function getArrayTable() {
        $x = array(
            'paymentdetail_id' => $this->getId(),
            'description' => $this->getDescription(),
            'amount' => $this->getAmount(),
            'payment' => $this->getPayment(),
            'remaining_balance' => $this->getRemainingBalance(),
            'denda' => $this->getDenda(),
            'is_debitnote' => $this->getIsDebitNote(),
            'is_creditnote' => $this->getIsCreditNote(),
            'debitnote' => $this->getDebitNote(),
            'creditnote' => $this->getCreditNote(),
            'duedate' => $this->getDuedate(),
            'remaining_pay' => $this->getRemaingPay(),
            'final' => $this->getFinal(),
            'noAR' => $this->getNoAR(),
            'pencairan_date' => $this->getPencairan_date(),
            'pengajuan_berkas_date' => $this->getPengajuanberkasdate(),
            'schedule_id' => $this->getSchedule()->getId(),
            'paymenttype_id' => $this->getPaymentType()->getId(),
            'kasbank_id' => $this->getKasbank()->getId()
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
        return array($this->getPaymentType(), $this->getSchedule());
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
